import { NumericFormat } from "react-number-format"
import { FieldError } from "./FieldError"

interface InputCurrencyProps {
  error?: string;
}

export function InputCurrency({ error }: InputCurrencyProps) {
  return (
    <div>
      <NumericFormat
        thousandSeparator="."
        decimalSeparator=","
        className="w-full text-[32px] font-bold text-gray-800 tracking-[-1px] outline-none"
        defaultValue="0"
      />

      {error && (
        <FieldError errorMessage={error} />
      )}
    </div>
  )
}
