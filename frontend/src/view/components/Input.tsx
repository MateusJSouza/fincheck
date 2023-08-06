import { ComponentProps, forwardRef } from 'react'

import { cn } from '../../app/utils/cn';

import { FieldError } from './FieldError';

interface InputProps extends ComponentProps<'input'> {
  name: string;
  error?: string,
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, error, className, name, id, ...props }, ref) => {
    const inputId = id ?? name;

    return (
      <div className="relative">
        <input
          {...props}
          ref={ref}
          name={name}
          id={inputId}
          className={cn(
            'bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 pt-4 peer placeholder-shown:pt-0 focus:border-gray-800 transition-all outline-none',
            className
          )}
          placeholder=" "
        />

        <label
          htmlFor={inputId}
          className="absolute text-xs left-[13px] top-2 pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all"
        >
          {placeholder}
        </label>

        {error && (
          <FieldError />
        )}
      </div>
    )
  }
);
Input.displayName = 'Input';
