import { NumericFormat } from "react-number-format"

export function InputCurrency() {
  return (
    <NumericFormat
      thousandSeparator="."
      decimalSeparator=","
      className="w-full text-[32px] font-bold text-gray-800 tracking-[-1px] outline-none"
      defaultValue="0"
    />
  )
}
