export enum EmploymentStatus {
  EMPLOYED = "Employed",
  SELF_EMPLOYED = "Self-Employed",
  UNEMPLOYED = "Unemployed",
}

export enum LoanPurpose {
  PERSONAL_USE = "Personal Use",
  BUSINESS_USE = "Business Use",
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
  loanPurpose: LoanPurpose;
}

interface PersonalDetails {
  firstName: string;
  lastName: string;
  email: string;
  employmentStatus: EmploymentStatus;
  employerName?: string;
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
