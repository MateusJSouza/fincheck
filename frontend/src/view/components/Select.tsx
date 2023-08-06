import * as RdxSelect from '@radix-ui/react-select';

import { FieldError } from './FieldError';

import { cn } from '../../app/utils/cn';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

interface SelectProps {
  className?: string;
  error?: string;
  placeholder?: string;
  options: {
    value: string;
    label: string;
  }[],
}

export function Select({ className, placeholder, error, options }: SelectProps) {
  const [selectedValue, setSelectedValue] = useState('');

  function handleSelect(value: string) {
    setSelectedValue(value);
  }

  return (
    <div>
      <div className="relative">
        <label className={cn(
          'absolute z-10 top-1/2 -translate-y-1/2 left-3 text-gray-700 pointer-events-none',
          selectedValue && 'text-xs left-[13px] top-2 transition-all translate-y-0'
        )}>
          {placeholder}
        </label>
        <RdxSelect.Root onValueChange={handleSelect}>
          <RdxSelect.Trigger
            className={cn(
              'bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 focus:border-gray-800 transition-all outline-none text-left relative pt-4',
              error && '!border-red-900',
              className
            )}
          >
            <RdxSelect.Value />

            <RdxSelect.Icon className="absolute right-3 top-1/2 -translate-y-1/2">
              <ChevronDownIcon className="w-6 h-6 text-gray-800" />
            </RdxSelect.Icon>
          </RdxSelect.Trigger>
          <RdxSelect.Portal>
            <RdxSelect.Content className="overflow-hidden z-[99] bg-white rounded-2xl border border-gray-100 shadow-[0px_11px_20px_0px_rgba(0,0,0, 0.10)]">
              <RdxSelect.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-gray-800 cursor-default">
                <ChevronUpIcon />
              </RdxSelect.ScrollUpButton>

              <RdxSelect.Viewport className="p-2">
                {options.map(option => (
                  <RdxSelect.Item
                    key={option.value}
                    value={option.value}
                    className="p-2 text-sm text-gray-800 data-[state=checked]:font-bold data-[highlighted]:hover:bg-gray-50 transition-colors rounded-lg outline-none"
                  >
                    <RdxSelect.ItemText>{option.label}</RdxSelect.ItemText>
                  </RdxSelect.Item>
                ))}
              </RdxSelect.Viewport>

              <RdxSelect.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-gray-800 cursor-default">
                <ChevronDownIcon />
              </RdxSelect.ScrollDownButton>
            </RdxSelect.Content>
          </RdxSelect.Portal>
        </RdxSelect.Root>
      </div>

      {error && (
        <FieldError errorMessage={error} />
      )}
    </div>
  );
}