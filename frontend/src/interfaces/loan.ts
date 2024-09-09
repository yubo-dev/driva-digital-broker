export enum EmploymentStatus {
  EMPLOYED = "Employed",
  SELF_EMPLOYED = "Self-Employed",
  UNEMPLOYED = "Unemployed",
}

export interface LoanFormInputs {
  personalDetails: {
    firstName: string;
    lastName: string;
    email: string;
    employmentStatus: string;
    employerName?: string;
  };
  loanDetails: {
    vehiclePrice: number;
    deposit: number;
    loanPurpose: string;
    loanTerm: number;
  };
}

export interface LenderOffer {
  name: string;
  monthlyRepayment: number;
  interestRate: number;
  processingFee: number;
}
