import classNames from "classnames";
import { InputHTMLAttributes } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  required?: boolean;
  className?: string;
  errors: FieldErrors;
}

export default function CustomInput({
  type = "text",
  label,
  name,
  register,
  errors,
  required = false,
  className,
  ...props
}: CustomInputProps) {
  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="block mb-2 text-md font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <input
        type={type}
        {...register(name, { required })}
        {...props}
        className={classNames(
          `w-full border h-[40px] rounded-md p-3 focus:outline-primary disabled:opacity-70 border-gray-300`,
          errors[name] && "border-red-500 focus:ring-red-500 focus:ring-0",
          className
        )}
      />
      {errors[name] && (
        <span className="text-sm  text-red-500">
          {(errors[name] as any).message}
        </span>
      )}
    </div>
  );
}
