import classNames from "classnames";
import React, { useState, useRef } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface PincodeProps {
  length: number;
  name: string;
  label: string;
  errors: FieldErrors;
  register: UseFormRegister<any>;
}

const Pincode: React.FC<PincodeProps> = ({
  length,
  register,
  name,
  label,
  errors,
}) => {
  const { onChange } = register(name);

  const [pincode, setPincode] = useState<(number | null)[]>(
    Array(length).fill(null)
  );
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // Allow only single digit

    const newPincode = [...pincode];
    newPincode[index] = value ? parseInt(value) : null;
    setPincode(newPincode);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    onChange({
      target: {
        name,
        value: parseInt(newPincode.join("")),
      },
    });
  };

  const handlePaste = (event: React.ClipboardEvent) => {
    const pasteData = event.clipboardData.getData("Text").slice(0, length);
    if (!/^\d+$/.test(pasteData)) return;

    const newPincode = pasteData
      .split("")
      .map((digit) => parseInt(digit))
      .slice(0, length);
    setPincode(newPincode);

    newPincode.forEach((digit, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index]!.value = digit.toString();
      }
    });

    onChange({
      target: {
        name,
        value: parseInt(newPincode.join("")),
      },
    });
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent) => {
    if (event.key === "Backspace" && !pincode[index]) {
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="block mb-2 text-md font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div
        onPaste={handlePaste}
        className="w-full flex justify-between items-center"
      >
        {pincode.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={digit !== null ? digit.toString() : ""}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            ref={(el) => (inputRefs.current[index] = el)}
            className={classNames(
              `w-[40px] border h-[40px] rounded-md p-3 focus:outline-primary disabled:opacity-70 border-gray-300`,
              errors[name] && "border-red-500 focus:ring-red-500 focus:ring-0"
            )}
          />
        ))}
      </div>
      {errors[name] && (
        <span className="text-sm text-red-500">
          {(errors[name] as any).message}
        </span>
      )}
    </div>
  );
};

export default Pincode;
