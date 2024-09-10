import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../atoms/Button";
import SelectField from "../molecules/SelectField";
import { loanApplicationSchema } from "../../schemas/loanSchemas";
import {
  EmploymentStatus,
  LenderOffer,
  LoanFormInputs,
} from "../../interfaces/loan";
import InputField from "../molecules/InputField";
import LenderOfferItem from "../LenderOfferItem";
import backendUrl from "../../config";

const LoanForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [loanOffers, setLoanOffers] = useState<LenderOffer[] | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<LoanFormInputs>({
    resolver: zodResolver(loanApplicationSchema),
  });

  const employmentStatus = watch("personalDetails.employmentStatus");

  // Reset the Employer Name to undefined, when Employment Status is not 'Employed'
  useEffect(() => {
    if (employmentStatus !== EmploymentStatus.EMPLOYED) {
      setValue("personalDetails.employerName", undefined);
    }
  }, [employmentStatus, setValue]);

  const onSubmit = async (data: LoanFormInputs) => {
    setLoading(true);
    try {
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log({ response: errorData });
        throw new Error(errorData.error || "Failed to fetch loan offers");
      }

      const result = await response.json();

      setLoanOffers(result.lenders);
      setApiError(null);
    } catch (error) {
      setApiError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const onReset = () => {
    reset();
    setLoanOffers(null);
  };

  return (
    <div className="loan-form-container">
      <form onSubmit={handleSubmit(onSubmit)} className="loan-form">
        <h2>Personal Details</h2>
        <InputField
          label="First Name"
          register={register("personalDetails.firstName")}
          error={errors.personalDetails?.firstName?.message}
        />
        <InputField
          label="Last Name"
          register={register("personalDetails.lastName")}
          error={errors.personalDetails?.lastName?.message}
        />
        <InputField
          label="Email"
          type="email"
          register={register("personalDetails.email")}
          error={errors.personalDetails?.email?.message}
        />

        <SelectField
          label="Employment Status"
          register={register("personalDetails.employmentStatus")}
          error={errors.personalDetails?.employmentStatus?.message}
          options={[
            { value: "Employed", label: "Employed" },
            { value: "Self-Employed", label: "Self-Employed" },
            { value: "Unemployed", label: "Unemployed" },
          ]}
        />

        {watch("personalDetails.employmentStatus") === "Employed" && (
          <InputField
            label="Employer Name"
            register={register("personalDetails.employerName")}
            error={errors.personalDetails?.employerName?.message}
          />
        )}

        <h2>Loan Details</h2>
        <InputField
          label="Vehicle Price"
          type="number"
          register={register("loanDetails.vehiclePrice", {
            valueAsNumber: true,
          })}
          error={errors.loanDetails?.vehiclePrice?.message}
        />
        <InputField
          label="Deposit"
          type="number"
          register={register("loanDetails.deposit", { valueAsNumber: true })}
          error={errors.loanDetails?.deposit?.message}
        />
        <SelectField
          label="Loan Purpose"
          register={register("loanDetails.loanPurpose")}
          error={errors.loanDetails?.loanPurpose?.message}
          options={[
            { value: "Personal Use", label: "Personal Use" },
            { value: "Business Use", label: "Business Use" },
          ]}
        />
        <InputField
          label="Loan Term (years)"
          type="number"
          register={register("loanDetails.loanTerm", { valueAsNumber: true })}
          error={errors.loanDetails?.loanTerm?.message}
        />

        <Button label={loading ? "Submitting..." : "Submit"} type="submit" />
        <Button label="Reset" type="button" onClick={onReset} />

        {apiError && <p className="error">{apiError}</p>}
      </form>

      {loanOffers && (
        <div className="loan-offers">
          <h3>Loan Offers</h3>
          {loanOffers.map((offer: LenderOffer, index: number) => (
            <LenderOfferItem key={index} offer={offer} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LoanForm;
