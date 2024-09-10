import request from "supertest";
import app from "../app";
import {
  EmploymentStatus,
  LoanApplication,
  LoanPurpose,
} from "../interfaces/loan";
import * as calculator from "../helpers/loan-calculator";

const baseLoanApplication: LoanApplication = {
  loanDetails: {
    vehiclePrice: 15000,
    deposit: 3000,
    loanTerm: 5,
    loanPurpose: LoanPurpose.PERSONAL_USE,
  },
  personalDetails: {
    firstName: "Yubo",
    lastName: "Yang",
    email: "yubo.yang@gmail.com",
    employmentStatus: EmploymentStatus.EMPLOYED,
    employerName: "Yubo Pty Ltd",
  },
};

const requiredProperties = {
  firstName: "First name",
  lastName: "Last name",
  email: "Email",
  employmentStatus: "Employment status",
  vehiclePrice: "Vehicle price",
  deposit: "Deposit",
  loanTerm: "Loan term",
  loanPurpose: "Loan purpose",
};

const createLoanApplication = (
  overrides: Partial<typeof baseLoanApplication>
) => {
  return {
    ...baseLoanApplication,
    ...overrides,
    loanDetails: {
      ...baseLoanApplication.loanDetails,
      ...overrides.loanDetails,
    },
    personalDetails: {
      ...baseLoanApplication.personalDetails,
      ...overrides.personalDetails,
    },
  };
};

const removeProperty = (obj: any, key: string) => {
  const { [key]: _, ...rest } = obj;
  return { [key]: undefined, ...rest };
};

describe("POST /api/loan-offers", () => {
  it("should return 200 and a list of lender offers", async () => {
    const loanApplication = createLoanApplication({});

    const response = await request(app)
      .post("/api/loan-offers")
      .send(loanApplication);

    expect(response.status).toBe(200);
    expect(response.body.lenders).toBeDefined();
    expect(response.body.lenders.length).toBeGreaterThan(0);
  });

  Object.entries(requiredProperties).forEach(([property, displayName]) => {
    it(`should return 400 if ${property} is missing`, async () => {
      const loanApplication = createLoanApplication(
        property in baseLoanApplication.loanDetails
          ? {
              loanDetails: removeProperty(
                baseLoanApplication.loanDetails,
                property
              ),
            }
          : {
              personalDetails: removeProperty(
                baseLoanApplication.personalDetails,
                property
              ),
            }
      );

      const response = await request(app)
        .post("/api/loan-offers")
        .send(loanApplication);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(`${displayName} is required`);
    });
  });

  it("should return 400 if loan amount is less than $2000", async () => {
    const invalidLoanApplication = createLoanApplication({
      loanDetails: {
        vehiclePrice: 3000,
        deposit: 1500,
      },
    } as Partial<typeof baseLoanApplication>);

    const response = await request(app)
      .post("/api/loan-offers")
      .send(invalidLoanApplication);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Loan amount (vehicle price - deposit) must be greater than $2000"
    );
  });

  it("should return 400 if email format is invalid", async () => {
    const loanApplicationWithInvalidEmail = createLoanApplication({
      personalDetails: {
        email: "yubo@email",
      },
    } as Partial<typeof baseLoanApplication>);

    const response = await request(app)
      .post("/api/loan-offers")
      .send(loanApplicationWithInvalidEmail);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid email address");
  });

  it("should return 400 if loan term exceeds 7 years", async () => {
    const loanApplicationWithInvalidLoanTerm = createLoanApplication({
      loanDetails: {
        loanTerm: 8,
      },
    } as Partial<typeof baseLoanApplication>);

    const response = await request(app)
      .post("/api/loan-offers")
      .send(loanApplicationWithInvalidLoanTerm);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Loan term cannot exceed 7 years");
  });

  it("should return 400 if loan term less than 1 year", async () => {
    const loanApplicationWithInvalidLoanTerm = createLoanApplication({
      loanDetails: {
        loanTerm: 0.5,
      },
    } as Partial<typeof baseLoanApplication>);

    const response = await request(app)
      .post("/api/loan-offers")
      .send(loanApplicationWithInvalidLoanTerm);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Loan term must be at least 1 year");
  });

  it("should return 400 if vehicle price is less than $2000", async () => {
    const loanApplicationWithInvalidLoanTerm = createLoanApplication({
      loanDetails: {
        vehiclePrice: 1999,
      },
    } as Partial<typeof baseLoanApplication>);

    const response = await request(app)
      .post("/api/loan-offers")
      .send(loanApplicationWithInvalidLoanTerm);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Vehicle price must be at least $2000");
  });

  it("should return 400 if deposit exceeds the vehicle price", async () => {
    const loanApplicationWithInvalidLoanTerm = createLoanApplication({
      loanDetails: {
        vehiclePrice: 2000,
        deposit: 2001,
      },
    } as Partial<typeof baseLoanApplication>);

    const response = await request(app)
      .post("/api/loan-offers")
      .send(loanApplicationWithInvalidLoanTerm);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Deposit cannot exceed the vehicle price"
    );
  });

  it("should return 400 if employerName is missing while employmentStatus is 'Employed'", async () => {
    const loanApplicationWithoutEmployerName = createLoanApplication({
      personalDetails: removeProperty(
        baseLoanApplication.personalDetails,
        "employerName"
      ),
    } as Partial<typeof baseLoanApplication>);

    const response = await request(app)
      .post("/api/loan-offers")
      .send(loanApplicationWithoutEmployerName);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Employer name is required when employment status is 'Employed'"
    );
  });

  it("should return 500 if an error occurs during loan processing", async () => {
    const errorMessage = "Test error in repayment calculation";
    jest
      .spyOn(calculator, "calculateMonthlyRepayment")
      .mockImplementation(() => {
        throw new Error(errorMessage);
      });

    const response = await request(app)
      .post("/api/loan-offers")
      .send(baseLoanApplication);

    expect(response.status).toBe(500);
    expect(response.body.error).toContain(
      `Error occurred when processing the loan application - ${errorMessage}`
    );

    jest.restoreAllMocks();
  });
});
