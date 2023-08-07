import { NumericFormat } from "react-number-format"
import { FieldError } from "./FieldError"

interface InputCurrencyProps {
  error?: string;
  value?: string;
  onChange?(value: string): void;
}

export function InputCurrency({ error, onChange, value }: InputCurrencyProps) {
  return (
    <div>
      <NumericFormat
        thousandSeparator="."
        decimalSeparator=","
        value={value}
        onChange={event => onChange?.(event.target.value)}
        className="w-full text-[32px] font-bold text-gray-800 tracking-[-1px] outline-none"
      />

      {error && (
        <FieldError errorMessage={error} />
      )}
    </div>
  )
}
