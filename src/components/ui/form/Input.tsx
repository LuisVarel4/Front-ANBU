import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...rest }, ref) => {
    return (
      <input
        ref={ref}
        className={`bg-gray3-anbu focus:ring-red-anbu w-full rounded-md px-2 py-1 text-xs text-black placeholder:text-gray-600 focus:ring-2 focus:outline-none ${className}`}
        {...rest}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
