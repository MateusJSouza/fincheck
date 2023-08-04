import { formatCurrency } from "../../../../app/utils/formatCurrency";
import { BankAccountTypeIcon } from "../../../components/icons/BankAccountTypeIcon";

interface AccountCardProps {
  color: string;
  name: string;
  balance: number;
  type: 'CASH' | 'CHECKING' | 'INVESTMENT';
}

export function AccountCard({ color, name, balance, type }: AccountCardProps) {
  return (
    <div
      className="p-4 bg-white rounded-2xl h-[200px] flex flex-col justify-between border-b-2 border-b-teal-950"
      style={{ borderBottomColor: color }}
    >
      <div className="">
        <BankAccountTypeIcon type={type} />

        <span className="text-gray-800 font-medium tracking-[-0.5px] mt-4 block">
          {name}
        </span>
      </div>

      <div className="">
        <span className="text-gray-800 font-medium tracking-[-0.5px] block">{formatCurrency(balance)}</span>
        <small className="text-sm text-gray-600">Saldo atual</small>
      </div>
    </div>
  )
}