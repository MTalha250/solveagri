import React from "react";
import { ArrowUpRight } from "lucide-react"; // Ensure you have Lucide installed

interface CustomButtonProps {
  isLoading: boolean;
  text: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  isLoading,
  text,
  type = "button",
  disabled = false,
  onClick,
}) => {
  return (
    <button
      type={type}
      className={`${
        isLoading || disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      } 
      text-white font-semibold rounded-full min-w-[82px] h-12 py-2 px-4 
      flex items-center justify-center gap-2 transition-all duration-300 ease-in-out`}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
      ) : (
        <>
          <span>{text}</span>
          <ArrowUpRight />
        </>
      )}
    </button>
  );
};

export default CustomButton;
