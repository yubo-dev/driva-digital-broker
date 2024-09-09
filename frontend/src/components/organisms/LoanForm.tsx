import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import SelectField from "../molecules/SelectField";
import { loanApplicationSchema } from "../../schemas/loanSchemas";
import { LoanFormInputs } from "../../interfaces/loan";

const LoanForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoanFormInputs>({
    resolver: zodResolver(loanApplicationSchema),
  });

  const onSubmit = (data: LoanFormInputs) => {
    console.log({ data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Personal Details</h2>
      <Input
        label="First Name"
        register={register("personalDetails.firstName")}
        error={errors.personalDetails?.firstName?.message}
      />
      <Input
        label="Last Name"
        register={register("personalDetails.lastName")}
        error={errors.personalDetails?.lastName?.message}
      />
      <Input
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
        <Input
          label="Employer Name"
          register={register("personalDetails.employerName")}
          error={errors.personalDetails?.employerName?.message}
        />
      )}

      <h2>Loan Details</h2>
      <Input
        label="Vehicle Price"
        type="number"
        register={register("loanDetails.vehiclePrice", { valueAsNumber: true })}
        error={errors.loanDetails?.vehiclePrice?.message}
      />
      <Input
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

      <Input
        label="Loan Term (years)"
        type="number"
        register={register("loanDetails.loanTerm", { valueAsNumber: true })}
        error={errors.loanDetails?.loanTerm?.message}
      />

      <Button label="Submit" type="submit" />
    </form>
  );
};

export default LoanForm;
