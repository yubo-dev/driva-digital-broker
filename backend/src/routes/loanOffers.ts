import express from "express";
import { LenderOffer, LoanRequest } from "../interfaces/loan";
import { lenders } from "../constants/lenders";
import { calculateMonthlyRepayment } from "../helpers/loanCalculator";

const router = express.Router();

router.post("/", (req, res) => {
  const { vehiclePrice, deposit, loanTerm } = req.body as LoanRequest;

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
});

export default router;
