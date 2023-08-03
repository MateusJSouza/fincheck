import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { EyeIcon } from "../../../components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";

export function Accounts() {
  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col">

      {/* Saldo */}
      <div>
        <span className="tracking-[-0.5px] text-white block">Saldo atual</span>
        <div className="flex items-center gap-2">

          <strong className="text-2xl tracking-[-1px] text-white">
            R$ 100,00
          </strong>

          <button className="w-8 h-8 flex items-center justify-center">
            <EyeIcon open={true} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end">
        <div className="flex justify-between items-center">
          <strong className="text-white tracking-[-1px] text-lg">Minhas contas</strong>

          {/* Minhas contas */}
          <div className="flex items-center">
            <button
              className="py-3 pl-2.5 pr-3.5 rounded-full enabled:hover:bg-black/10 transition-colors disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeftIcon className="text-white w-6 h-6" />
            </button>

            <button
              className="py-3 pl-2.5 pr-3.5 rounded-full enabled:hover:bg-black/10 transition-colors disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRightIcon className="text-white w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-4">
          <AccountCard
            name="Nubank"
            color="#7950f2"
            balance={1000}
          />
        </div>
      </div>
    </div >
  )
}
