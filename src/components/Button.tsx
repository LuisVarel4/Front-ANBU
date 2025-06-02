import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color: string;        // required background color (Tailwind class)
  textColor?: string;   // optional text color (Tailwind class)
  iconRight?: string;   // optional image/icon path
}

const Button: React.FC<ButtonProps> = ({
  children,
  color,
  textColor = 'text-white',
  iconRight,
  className = '',
  ...props
}) => {
  const baseClasses =
    'font-medium py-2 px-4 rounded-md transition duration-200 flex items-center justify-center gap-2';

  return (
    <button
      className={`${baseClasses} ${color} ${textColor} ${className}`}
      {...props}
    >
      <span>{children}</span>
      {iconRight && (
        <img
          src={iconRight}
          alt="icon"
          className="h-5 w-5 object-contain"
        />
      )}
    </button>
  );
};

export default Button;
