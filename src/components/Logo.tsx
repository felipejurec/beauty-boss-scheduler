
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
}

const Logo = ({ className, size = 'md', variant = 'dark' }: LogoProps) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  const variantClasses = {
    light: 'text-white',
    dark: 'text-brand-600',
  };

  return (
    <div className={cn('font-heading font-bold flex items-center', sizeClasses[size], variantClasses[variant], className)}>
      <span className="mr-2">✨</span>
      <span>Beauty<span className="text-brand-400">Boss</span></span>
    </div>
  );
};

export default Logo;
