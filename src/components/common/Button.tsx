import { type ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-wellness-600 text-white hover:bg-wellness-700 shadow-sm focus:ring-wellness-500',
  secondary:
    'bg-white text-wellness-700 border border-wellness-200 hover:bg-wellness-50 focus:ring-wellness-500',
  ghost: 'bg-transparent text-wellness-700 hover:bg-wellness-50 focus:ring-wellness-500',
  danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      className = '',
      disabled,
      children,
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  ),
);

Button.displayName = 'Button';
