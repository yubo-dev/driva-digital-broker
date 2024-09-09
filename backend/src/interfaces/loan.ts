enum EmploymentStatus {
  EMPLOYED = "Employed",
  SELF_EMPLOYED = "Self-Employed",
  UNEMPLOYED = "Unemployed",
}

interface Lender {
  name: string;
  interestRate: number;
  processingFee: number;
}

export interface LenderOffer extends Lender {
  monthlyRepayment: number;
}

type LoanDetails = {
  vehiclePrice: number;
  deposit: number;
  loanTerm: number;
};

type PersonalDetails = {
  firsName: string;
  lastName: string;
  email: string;
  employmentStatus: EmploymentStatus;
  employer?: string;
};

export type LoanRequest = LoanDetails & PersonalDetails;

export interface LoanParameters {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
}
