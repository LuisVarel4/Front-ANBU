import React, { useEffect, useRef } from "react";

type OtpInputProps = {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
  inputType?: "text" | "password";
  className?: string;
  inputClassName?: string;
};

export const OtpInput: React.FC<OtpInputProps> = ({
  value,
  onChange,
  length = 6,
  disabled = false,
  inputType = "password",
  className = "flex gap-2",
  inputClassName = "w-10 h-12 rounded border text-center text-xl border-gray-300 focus:outline-none focus:border-red-anbu",
}) => {
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const val = e.target.value.replace(/\D/g, "");
    if (!val) return;

    const newValue = value.split("");
    newValue[index] = val[0];
    onChange(newValue.join(""));

    if (val && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault(); // Previene comportamiento nativo
      const newValue = value.split("");

      if (value[index]) {
        // Si hay algo en este input, bórralo
        newValue[index] = "";
        onChange(newValue.join(""));
      } else if (index > 0) {
        // Si ya está vacío, borra el anterior y enfoca
        newValue[index - 1] = "";
        onChange(newValue.join(""));
        inputs.current[index - 1]?.focus();
      }
    }
  };

  useEffect(() => {
    // Asegura que el arreglo tiene la longitud correcta
    inputs.current = inputs.current.slice(0, length);
  }, [length]);

  return (
    <div className={className}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputs.current[index] = el;
          }}
          type={inputType}
          inputMode="numeric"
          maxLength={1}
          disabled={disabled}
          value={value[index] || ""}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className={inputClassName}
          autoComplete="one-time-code"
        />
      ))}
    </div>
  );
};

export default OtpInput;
