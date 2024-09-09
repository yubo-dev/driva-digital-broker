import express, { Request, Response } from "express";
import { LenderOffer, LoanApplication } from "../interfaces/loan";
import { lenders } from "../constants";
import { calculateMonthlyRepayment } from "../helpers/loan-calculator";
import { validateLoanApplication } from "../middlewares/validate-loan-request";

const router = express.Router();

router.post(
  "/",
  validateLoanApplication,
  (req: Request<{}, {}, LoanApplication>, res: Response) => {
    try {
      const {
        loanDetails: { vehiclePrice, deposit, loanTerm },
      } = req.body as LoanApplication;

      const loanAmount = vehiclePrice - deposit;

      const lenderOffers: LenderOffer[] = lenders.map((lender) => {
        const { interestRate } = lender;
        const monthlyRepayment = calculateMonthlyRepayment({
          loanAmount,
          interestRate,
          loanTerm,
        });

        return {
          ...lender,
          monthlyRepayment,
        };
      });

      res.json({ lenders: lenderOffers });
    } catch (e) {
      const error = `Error occurred when processing the loan application - ${
        (e as Error).message
      }`;
      console.error(error);
      res.status(500).json({
        error,
      });
    }
  }
);

export default router;
