import { Request, Response, NextFunction } from "express";
import { loanApplicationSchema } from "../schemas/loan-schemas";

export const validateLoanApplication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = loanApplicationSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: result.error.errors[0].message,
    });
  }

  req.body = result.data;
  next();
};
