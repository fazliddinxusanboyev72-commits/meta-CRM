import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline';
  size?: 'sm' | 'md';
}

export function Badge({ className, variant = 'primary', size = 'md', children, ...props }: BadgeProps) {
  const variants = {
    primary: 'bg-primary-purple/15 text-primary-cyan border-primary-purple/30',
    secondary: 'bg-background-elevated text-text-secondary border-border',
    success: 'bg-status-success/15 text-status-success border-status-success/30',
    warning: 'bg-status-warning/15 text-status-warning border-status-warning/30',
    error: 'bg-status-error/15 text-status-error border-status-error/30',
    outline: 'bg-transparent text-text-secondary border-border',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs font-medium',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border transition-colors',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
