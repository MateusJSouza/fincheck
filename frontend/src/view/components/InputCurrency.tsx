import { NumericFormat } from "react-number-format"
import { FieldError } from "./FieldError"

interface InputCurrencyProps {
  error?: string;
  onChange(value: string): void;
}

export function InputCurrency({ error, onChange }: InputCurrencyProps) {
  return (
    <div>
      <NumericFormat
        thousandSeparator="."
        decimalSeparator=","
        onChange={event => onChange(event.target.value)}
        className="w-full text-[32px] font-bold text-gray-800 tracking-[-1px] outline-none"
        defaultValue="0"
      />

      {error && (
        <FieldError errorMessage={error} />
      )}
    </div>
  )
}
