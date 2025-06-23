import React, { type HTMLAttributes } from "react";

export const CardTitle: React.FC<HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className = "",
  ...props
}) => (
  <h2
    className={`text-lg leading-none font-semibold tracking-tight ${className}`}
    {...props}
  >
    {children}
  </h2>
);

export default CardTitle;
