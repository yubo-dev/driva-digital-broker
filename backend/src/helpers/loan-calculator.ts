import { LoanParameters } from "../interfaces/loan";

/**
 * Calculates the monthly repayment for a loan using the amortization formula.
 *
 * Amortization Formula:
 * M = P x [r(1 + r)^n] / [(1 + r)^n - 1]
 *
 * Where:
 * M = monthly payment
 * P = loan principal (total loan amount)
 * r = monthly interest rate (annual rate / 12)
 * n = number of payments (loan term in months)
 *
 * @param loanAmount - The principal loan amount (vehicle price minus deposit).
 * @param interestRate - The annual interest rate provided by the lender.
 * @param loanTerm - The loan term in years.
 * @returns The monthly repayment amount as a string formatted to 2 decimal places.
 *
 * Reference: https://www.ramseysolutions.com/real-estate/amortization-schedule#:~:text=M%20%3D%20P%20x,the%20exponent%20symbol
 */
export const calculateMonthlyRepayment = ({
  loanAmount,
  interestRate,
  loanTerm,
}: LoanParameters) => {
  const monthlyRate = interestRate / 100 / 12;
  const numberOfMonths = loanTerm * 12;

  const denominator = Math.pow(1 + monthlyRate, numberOfMonths) - 1;
  if (denominator === 0) {
    return 0;
  }

  const monthlyRepayment =
    (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths))) /
    denominator;

  return Math.ceil(monthlyRepayment);
};
