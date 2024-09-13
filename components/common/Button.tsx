import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClass = 'py-2 px-4 rounded transition duration-300';
  let variantClass = '';
  
  switch (variant) {
    case 'primary':
      variantClass = 'bg-blue-500 text-white hover:bg-blue-600';
      break;
    case 'secondary':
      variantClass = 'bg-white text-blue-600 border border-gray-300 hover:bg-gray-100';
      break;
    case 'outline':
      variantClass = 'bg-white text-blue-500 border border-blue-500 hover:bg-blue-100';
      break;
  }
  
  return (
    <button className={`${baseClass} ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;