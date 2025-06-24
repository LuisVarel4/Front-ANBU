import React, { type HTMLAttributes } from "react";

export const CardHeader: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = "",
  ...props
}) => (
  <div className={`p-2 ${className}`} {...props}>
    {children}
  </div>
);

export default CardHeader;
