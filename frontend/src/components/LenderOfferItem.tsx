import React from "react";
import { LenderOffer } from "../interfaces/loan";

interface LenderOfferItemProps {
  offer: LenderOffer;
}

const LenderOfferItem: React.FC<LenderOfferItemProps> = ({ offer }) => {
  return (
    <div className="loan-offer">
      <strong>{offer.name}:</strong>
      <ul>
        <li>Monthly Repayment: ${offer.monthlyRepayment}</li>
        <li>Interest Rate: {offer.interestRate}% APR</li>
        <li>Fees: ${offer.processingFee} processing fee</li>
      </ul>
    </div>
  );
};

export default LenderOfferItem;
