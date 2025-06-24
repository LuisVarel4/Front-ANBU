import React, { type HTMLAttributes } from "react";

export const CardContent: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = "",
  ...props
}) => (
  <div className={`px-4 py-2 ${className}`} {...props}>
    {children}
  </div>
);

export default CardContent;
