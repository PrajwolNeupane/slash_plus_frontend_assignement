import classNames from "classnames";
import { Oval } from "react-loader-spinner";

type CustomButtonProps = {
  isLoading?: boolean;
  text: string;
  color?: string;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
  variant?: "outline" | "filled";
  className?: string;
};

const CustomButton = ({
  isLoading,
  text,
  color,
  onClick,
  className,
  type,
  variant = "filled",
}: CustomButtonProps) => {
  const buttonStyle = classNames(
    "flex w-full justify-center items-center rounded-md",
    {
      "border-2 border-primary bg-transparent text-primary hover:bg-pr":
        variant === "outline",
      [`bg-primary hover:bg-primary/90`]: variant !== "outline" && !color,
      "text-white": variant !== "outline",
    },
    "px-[40px] py-2.5 text-base font-regular shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors duration-200 ease-in-out",
    className
  );

  return (
    <button
      type={type}
      className={buttonStyle}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <Oval height={25} width={25} color="#ffffff" secondaryColor="grey" />
      ) : (
        text
      )}
    </button>
  );
};

export default CustomButton;
