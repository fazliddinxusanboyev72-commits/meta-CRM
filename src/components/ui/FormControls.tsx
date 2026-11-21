import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, leftIcon, type = 'text', ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary">{label}</label>}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-secondary">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            type={type}
            className={cn(
              'w-full rounded-xl border border-border bg-background-panel px-4 py-2.5 text-sm text-text-main placeholder-text-muted transition-colors focus:border-primary-purple focus:outline-none focus:ring-1 focus:ring-primary-purple disabled:opacity-50',
              leftIcon && 'pl-10',
              error && 'border-status-error focus:border-status-error focus:ring-status-error',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-status-error mt-1">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary">{label}</label>}
        <textarea
          ref={ref}
          className={cn(
            'w-full rounded-xl border border-border bg-background-panel px-4 py-2.5 text-sm text-text-main placeholder-text-muted transition-colors focus:border-primary-purple focus:outline-none focus:ring-1 focus:ring-primary-purple disabled:opacity-50 min-h-[100px]',
            error && 'border-status-error focus:border-status-error',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-status-error mt-1">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { label: string; value: string | number }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && <label className="block text-xs font-semibold uppercase tracking-wider text-text-secondary">{label}</label>}
        <select
          ref={ref}
          className={cn(
            'w-full rounded-xl border border-border bg-background-panel px-4 py-2.5 text-sm text-text-main transition-colors focus:border-primary-purple focus:outline-none focus:ring-1 focus:ring-primary-purple disabled:opacity-50 cursor-pointer',
            error && 'border-status-error',
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-background-panel text-text-main">
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-xs text-status-error mt-1">{error}</p>}
      </div>
    );
  }
);
Select.displayName = 'Select';
