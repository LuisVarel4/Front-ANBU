import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "secondary";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  className = "",
}) => {
  const baseClasses =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium";

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
