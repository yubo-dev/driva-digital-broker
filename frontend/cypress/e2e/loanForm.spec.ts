/// <reference types="cypress" />

describe("Loan Application Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  const fillPersonalDetails = () => {
    cy.get('input[name="personalDetails.firstName"]').type("Yubo");
    cy.get('input[name="personalDetails.lastName"]').type("Yang");
    cy.get('input[name="personalDetails.email"]').type("yubo.yang@gmail.com");
    cy.get('select[name="personalDetails.employmentStatus"]').select(
      "Employed"
    );
    cy.get('input[name="personalDetails.employerName"]').type("Yubo Inc");
  };

  const fillLoanDetails = () => {
    cy.get('input[name="loanDetails.vehiclePrice"]').type("15000");
    cy.get('input[name="loanDetails.deposit"]').type("2000");
    cy.get('select[name="loanDetails.loanPurpose"]').select("Personal Use");
    cy.get('input[name="loanDetails.loanTerm"]').type("5");
  };

  const submitForm = () => {
    cy.get('button[type="submit"]').click();
  };

  it("should load the form correctly", () => {
    cy.get('input[name="personalDetails.firstName"]').should("be.visible");
    cy.get('input[name="personalDetails.lastName"]').should("be.visible");
    cy.get('input[name="personalDetails.email"]').should("be.visible");
    cy.get('select[name="personalDetails.employmentStatus"]').should(
      "be.visible"
    );
    cy.get('input[name="personalDetails.employerName"]').should("not.exist");
    cy.get('input[name="loanDetails.vehiclePrice"]').should("be.visible");
    cy.get('input[name="loanDetails.deposit"]').should("be.visible");
    cy.get('select[name="loanDetails.loanPurpose"]').should("be.visible");
    cy.get('input[name="loanDetails.loanTerm"]').should("be.visible");
  });

  it("should show validation errors if required fields are missing", () => {
    submitForm();

    cy.contains("First name cannot be empty").should("be.visible");
    cy.contains("Last name cannot be empty").should("be.visible");
    cy.contains("Invalid email address").should("be.visible");
    cy.contains("Employment status must be selected").should("be.visible");
    cy.contains("Vehicle price is required").should("be.visible");
    cy.contains("Deposit is required").should("be.visible");
    cy.contains("Loan purpose must be selected").should("be.visible");
    cy.contains("Loan term is required").should("be.visible");
  });

  it("should submit the form successfully with correct data", () => {
    fillPersonalDetails();
    fillLoanDetails();
    submitForm();

    cy.contains("Loan Offers").should("be.visible");
    cy.get(".loan-offer").should("have.length.greaterThan", 0);
  });

  it("should display employer name input if employment status is 'Employed'", () => {
    cy.get('select[name="personalDetails.employmentStatus"]').select(
      "Employed"
    );

    cy.get('input[name="personalDetails.employerName"]').should("be.visible");
  });

  it("should hide employer name input if employment status is not 'Employed'", () => {
    cy.get('select[name="personalDetails.employmentStatus"]').select(
      "Unemployed"
    );

    cy.get('input[name="personalDetails.employerName"]').should("not.exist");
  });

  it("should show validation error for vehicle price below $2000 minimum", () => {
    fillPersonalDetails();
    fillLoanDetails();
    cy.get('input[name="loanDetails.vehiclePrice"]').clear().type("1999");
    submitForm();

    cy.contains("Vehicle price must be at least $2000").should("be.visible");
  });

  it("should show validation error when deposit is smaller than $0", () => {
    fillPersonalDetails();
    fillLoanDetails();
    cy.get('input[name="loanDetails.deposit"]').clear().type("-1");

    cy.get('button[type="submit"]').click();

    cy.contains("Deposit cannot be less than $0").should("be.visible");
  });

  it("should show validation when vehicle price minus deposit is less than or equal to $2000", () => {
    fillPersonalDetails();
    fillLoanDetails();
    cy.get('input[name="loanDetails.vehiclePrice"]').clear().type("2001");
    cy.get('input[name="loanDetails.deposit"]').clear().type("2");

    cy.get('button[type="submit"]').click();

    cy.contains(
      "Loan amount (vehicle price - deposit) must be greater than $2000"
    ).should("be.visible");
  });

  it("should show validation when deposit is greater than vehicle price", () => {
    fillPersonalDetails();
    fillLoanDetails();
    cy.get('input[name="loanDetails.deposit"]').clear().type("15001");

    cy.get('button[type="submit"]').click();

    cy.contains("Deposit cannot exceed the vehicle price").should("be.visible");
  });

  it("should show validation error for loan term below minimum", () => {
    fillPersonalDetails();
    fillLoanDetails();
    cy.get('input[name="loanDetails.loanTerm"]').clear().type("0");
    submitForm();

    cy.contains("Loan term must be at least 1 year").should("be.visible");
  });

  it("should show validation error for loan term above maximum", () => {
    fillPersonalDetails();
    fillLoanDetails();
    cy.get('input[name="loanDetails.loanTerm"]').clear().type("10");
    submitForm();

    cy.contains("Loan term cannot exceed 7 years").should("be.visible");
  });

  it("should display correct lender and offer details in loan offers", () => {
    fillPersonalDetails();
    fillLoanDetails();
    submitForm();

    cy.contains("Loan Offers").should("be.visible");

    cy.get(".loan-offer").eq(0).should("contain.text", "Lender A");
    cy.get(".loan-offer")
      .eq(0)
      .should("contain.text", "Monthly Repayment: $250");
    cy.get(".loan-offer")
      .eq(0)
      .should("contain.text", "Interest Rate: 5.7% APR");
    cy.get(".loan-offer")
      .eq(0)
      .should("contain.text", "Fees: $20 processing fee");

    cy.get(".loan-offer").eq(1).should("contain.text", "Lender B");
    cy.get(".loan-offer")
      .eq(1)
      .should("contain.text", "Monthly Repayment: $252");
    cy.get(".loan-offer").eq(1).should("contain.text", "Interest Rate: 6% APR");
    cy.get(".loan-offer")
      .eq(1)
      .should("contain.text", "Fees: $15 processing fee");

    cy.get(".loan-offer").eq(2).should("contain.text", "Lender C");
    cy.get(".loan-offer")
      .eq(2)
      .should("contain.text", "Monthly Repayment: $246");
    cy.get(".loan-offer").eq(2).should("contain.text", "Interest Rate: 5% APR");
    cy.get(".loan-offer")
      .eq(2)
      .should("contain.text", "Fees: $0 processing fee");

    cy.get(".loan-offer").eq(3).should("contain.text", "Lender D");
    cy.get(".loan-offer")
      .eq(3)
      .should("contain.text", "Monthly Repayment: $249");
    cy.get(".loan-offer")
      .eq(3)
      .should("contain.text", "Interest Rate: 5.5% APR");
    cy.get(".loan-offer")
      .eq(3)
      .should("contain.text", "Fees: $10 processing fee");
  });

  it("should reset all fields when the reset button is clicked", () => {
    fillPersonalDetails();
    fillLoanDetails();

    cy.get('button[type="button"]').contains("Reset").click();

    cy.get('input[name="personalDetails.firstName"]').should("have.value", "");
    cy.get('input[name="personalDetails.lastName"]').should("have.value", "");
    cy.get('input[name="personalDetails.email"]').should("have.value", "");
    cy.get('select[name="personalDetails.employmentStatus"]').should(
      "have.value",
      null
    );
    cy.get('input[name="personalDetails.employerName"]').should("not.exist");
    cy.get('input[name="loanDetails.vehiclePrice"]').should("have.value", "");
    cy.get('input[name="loanDetails.deposit"]').should("have.value", "");
    cy.get('select[name="loanDetails.loanPurpose"]').should("have.value", null);
    cy.get('input[name="loanDetails.loanTerm"]').should("have.value", "");

    cy.contains("Loan Offers").should("not.exist");
    cy.get(".loan-offer").should("not.exist");
  });

  it("should display an error message when the backend returns an error", () => {
    cy.intercept("POST", "http://localhost:8080/api/loan-offers", {
      statusCode: 400,
      body: {
        error: "Sever internal error",
      },
    }).as("postLoanApplication");

    fillPersonalDetails();
    fillLoanDetails();

    submitForm();

    cy.wait("@postLoanApplication");

    cy.contains("Sever internal error").should("be.visible");
  });
});
