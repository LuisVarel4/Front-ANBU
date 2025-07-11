import React from "react";

// default icon anbu
import AnbuDecoration from "../../../assets/logos/anbuDecoration.svg?react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color: string;
  textColor?: string;
  iconRight?: React.ReactNode;
  isIcon?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  color,
  textColor = "text-white",
  iconRight,
  isIcon = false,
  className = "",
  ...props
}) => {
  const baseClasses =
    "font-medium py-2 px-4 rounded-md transition duration-200 flex items-center justify-center gap-2 cursor-pointer";

  return (
    <button
      className={`${baseClasses} ${color} ${textColor} ${className}`}
      {...props}
    >
      {isIcon ? (
        children || <AnbuDecoration className="h-4 w-4" />
      ) : (
        <>
          <span>{children}</span>
          {iconRight ? iconRight : <AnbuDecoration className="h-4 w-4" />}
        </>
      )}
    </button>
  );
};

export default Button;
