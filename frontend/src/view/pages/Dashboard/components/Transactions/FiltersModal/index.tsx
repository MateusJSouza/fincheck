import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Modal } from "../../../../../components/Modal";
import { Button } from "../../../../../components/Button";
import { cn } from "../../../../../../app/utils/cn";
import { useFiltersModalController } from "./useFiltersModalController";

interface FiltersModalProps {
  open: boolean;
  onClose(): void;
  onApplyFilters(filters: { bankAccountId: string | undefined, year: number }): void;
}

export function FiltersModal({ open, onClose, onApplyFilters }: FiltersModalProps) {
  const {
    handleSelectedBankAccount,
    selectedBankAccountId,
    selectedYear,
    handleChangeYear,
    accounts
  } = useFiltersModalController()

  return (
    <Modal open={open} onClose={onClose} title="Filtros">
      <div className="space-y-1">
        <span className="text-lg font-bold tracking-[-1px] text-gray-800">
          Conta
        </span>
      </div>

      <div className="space-y-2 mt-2">
        {accounts.map(account => (
          <button
            key={account.id}
            onClick={() => handleSelectedBankAccount(account.id)}
            className={cn(
              'p-2 rounded-2xl w-full hover:bg-gray-50 transition-colors text-left text-gray-800',
              account.id === selectedBankAccountId && '!bg-gray-200',
            )}
          >
            {account.name}
          </button>
        ))}
      </div>

      <div className="mt-10 text-gray-800">
        <span className="text-lg font-bold tracking-[-1px] text-gray-800">
          Ano
        </span>
      </div>

      <div className="mt-2 w-52 flex items-center justify-between">
        <button
          className="w-12 h-12 flex items-center justify-center"
          onClick={() => handleChangeYear(-1)}
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>

        <div className="text-center flex-1">
          <span className="text-sm font-medium tracking-[-0.5px]">
            {selectedYear}
          </span>
        </div>

        <button
          className="w-12 h-12 flex items-center justify-center"
          onClick={() => handleChangeYear(1)}
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>

      <Button
        className="w-full mt-10"
        onClick={() => onApplyFilters({
          bankAccountId: selectedBankAccountId,
          year: selectedYear
        })}
      >
        Aplicar Filtros
      </Button>
    </Modal>
  )
}
