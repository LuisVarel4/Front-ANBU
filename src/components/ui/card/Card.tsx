import React from "react";
import type { HTMLAttributes } from "react";

export const Card: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = "",
  ...props
}) => (
  <div className={`rounded-xl border shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

export default Card;
