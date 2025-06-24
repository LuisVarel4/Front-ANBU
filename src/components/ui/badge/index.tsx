import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "secondary";
  className?: string;
  rounded?: boolean;
  floating?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  className = "",
  rounded = false,
  floating = false,
}) => {
  const baseClasses = `
    inline-flex items-center text-sm font-medium px-2 py-1 
    ${rounded ? "rounded-full" : "rounded-md"} 
    ${floating ? "absolute top-2 right-3" : ""}
  `;

  const variants = {
    default: "bg-blue-600 text-white",
    secondary: "bg-gray-200 text-gray-800",
  };

  return (
    <span className={`${baseClasses} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
