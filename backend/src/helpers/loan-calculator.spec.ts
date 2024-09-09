import { calculateMonthlyRepayment } from "../helpers/loan-calculator";
import { LoanParameters } from "../interfaces/loan";

describe("calculateMonthlyRepayment", () => {
  it("should calculate the correct monthly repayment for given loan values", () => {
    const loanParameters: LoanParameters = {
      loanAmount: 15000,
      interestRate: 5.5,
      loanTerm: 5,
    };

    const monthlyRepayment = calculateMonthlyRepayment(loanParameters);
    expect(monthlyRepayment).toBeGreaterThan(0);
    expect(monthlyRepayment).toBe(287);
  });

  it("should return 0 if the denominator is 0 (zero interest rate)", () => {
    const loanParameters: LoanParameters = {
      loanAmount: 15000,
      interestRate: 0,
      loanTerm: 5,
    };

    const monthlyRepayment = calculateMonthlyRepayment(loanParameters);
    expect(monthlyRepayment).toBe(0);
  });

  it("should return 0 for a zero loan amount", () => {
    const loanParameters: LoanParameters = {
      loanAmount: 0,
      interestRate: 5.5,
      loanTerm: 5,
    };

    const monthlyRepayment = calculateMonthlyRepayment(loanParameters);
    expect(monthlyRepayment).toBe(0);
  });
});
