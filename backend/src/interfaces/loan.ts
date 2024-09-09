export enum EmploymentStatus {
  EMPLOYED = "Employed",
  SELF_EMPLOYED = "Self-Employed",
  UNEMPLOYED = "Unemployed",
}

export interface Lender {
  name: string;
  interestRate: number;
  processingFee: number;
}

export interface LenderOffer extends Lender {
  monthlyRepayment: number;
}

interface LoanDetails {
  vehiclePrice: number;
  deposit: number;
  loanTerm: number;
}

interface PersonalDetails {
  firsName: string;
  lastName: string;
  email: string;
  employmentStatus: EmploymentStatus;
  employer?: string;
}

export interface LoanApplication {
  loanDetails: LoanDetails;
  personalDetails: PersonalDetails;
}

export interface LoanParameters {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
}
