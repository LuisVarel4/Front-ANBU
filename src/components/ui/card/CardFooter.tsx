import React, { type HTMLAttributes } from "react";

export const CardFooter: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = "",
  ...props
}) => (
  <div
    className={`border-gray1-anbu border-t px-4 py-2 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export default CardFooter;
