import { z } from "zod";
import { EmploymentStatus } from "../interfaces/loan";

const EmploymentStatusEnum = [
  "Employed",
  "Self-Employed",
  "Unemployed",
] as const;
const LoanPurposeEnum = ["Personal Use", "Business Use"] as const;

const personalDetailsSchema = z
  .object({
    firstName: z
      .string({
        required_error: "First name is required",
      })
      .min(1, "First name cannot be empty"),
    lastName: z
      .string({
        required_error: "Last name is required",
      })
      .min(1, "Last name cannot be empty"),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email address"),
    employmentStatus: z
      .union([z.enum(EmploymentStatusEnum), z.literal("")])
      .refine((value) => value !== "", {
        message: "Employment status must be selected",
      }),
    employerName: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Check if employerName is required when employment status is 'Employed'
    if (
      data.employmentStatus === EmploymentStatus.EMPLOYED &&
      !data.employerName
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Employer name is required when employment status is 'Employed'",
        path: ["employerName"],
      });
    }
  });

const loanDetailsSchema = z
  .object({
    vehiclePrice: z.preprocess(
      (value) => (Number.isNaN(value) ? undefined : Number(value)),
      z
        .number({
          required_error: "Vehicle price is required", // Custom error message for required fields
        })
        .min(2000, "Vehicle price must be at least $2000")
    ),
    deposit: z.preprocess(
      (value) => (Number.isNaN(value) ? undefined : Number(value)),
      z
        .number({
          required_error: "Deposit is required",
        })
        .min(0, "Deposit cannot be less than $0")
    ),
    loanPurpose: z
      .union([z.enum(LoanPurposeEnum), z.literal("")])
      .refine((value) => value !== "", {
        message: "Loan purpose must be selected",
      }),
    loanTerm: z.preprocess(
      (value) => (Number.isNaN(value) ? undefined : Number(value)),
      z
        .number({
          required_error: "Loan term is required",
        })
        .min(1, "Loan term must be at least 1 year")
        .max(7, "Loan term cannot exceed 7 years")
    ),
  })
  .superRefine((data, ctx) => {
    // Ensure deposit does not exceed vehicle price
    if (data.deposit > data.vehiclePrice) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Deposit cannot exceed the vehicle price",
        path: ["deposit"],
      });
    }

    // Ensure vehiclePrice - deposit (loan amount) is greater than $2000
    if (data.vehiclePrice - data.deposit <= 2000) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Loan amount (vehicle price - deposit) must be greater than $2000",
        path: ["deposit"],
      });
    }
  });

export const loanApplicationSchema = z.object({
  personalDetails: personalDetailsSchema,
  loanDetails: loanDetailsSchema,
});
