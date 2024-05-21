import React from "react";
import { Input } from "@nextui-org/react";

export type PropsInput = {
  value: any;
  setValue: (value: any) => void;
  label?: string;
  isError?: { isError: boolean; errorMessage: string };
  setErrors?: (error: { isError: boolean; errorMessage: string }) => void;
  disabled?: boolean;
  className?: string;
};

export const InputCustom: React.FC<PropsInput> = ({
  value,
  setValue,
  label,
  disabled,
  isError,
  setErrors,
  className,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue === "" || /^[0-9]*\.?[0-9]*$/.test(newValue)) {
      setValue(newValue);
      if (setErrors) {
        setErrors({ isError: false, errorMessage: "" });
      }
    } else {
      if (setErrors) {
        setErrors({
          isError: true,
          errorMessage: "Negative numbers are not allowed",
        });
      }
    }
  };

  return (
    <>
      <Input
        value={value}
        type="number"
        disabled={disabled}
        className={className}
        label={label}
        variant="bordered"
        isInvalid={isError?.isError}
        color={isError?.isError ? "danger" : "default"}
        errorMessage={isError?.isError && isError.errorMessage}
        onChange={handleChange}
      />
      {!isError?.isError && (
        <p className="text-tiny text-transparent mt-2">0</p>
      )}
    </>
  );
};
