import React from 'react';
import whiteLogo from '../assets/logos/logo_blanco.png';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color: string;        
  textColor?: string;   
  iconRight?: string;   
}

const Button: React.FC<ButtonProps> = ({
  children,
  color,
  textColor = 'text-white',
  iconRight = whiteLogo,
  className = '',
  ...props
}) => {
  const baseClasses =

    'font-medium py-2 px-4 rounded-md transition duration-200 flex items-center justify-center gap-2 cursor-pointer';

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
          className="text-2xl h-5 w-5 object-contain"
        />
      )}
    </button>
  );
};

export default Button;