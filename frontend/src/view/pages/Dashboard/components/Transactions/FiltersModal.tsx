import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Modal } from "../../../../components/Modal";
import { Button } from "../../../../components/Button";

interface FiltersModalProps {
  open: boolean;
  onClose(): void;
}

export function FiltersModal({ open, onClose }: FiltersModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Filtros">
      <div className="space-y-1">
        <span className="text-lg font-bold tracking-[-1px] text-gray-800">
          Conta
        </span>
      </div>

      <div className="space-y-2 mt-2">
        <button className="p-2 rounded-2xl w-full !bg-gray-200 hover:bg-gray-50 transition-colors text-left text-gray-800">
          Nubank
        </button>

        <button className="p-2 rounded-2xl w-full text-left hover:bg-gray-50 transition-colors text-gray-800">
          XP Investimentos
        </button>

        <button className="p-2 rounded-2xl w-full text-left hover:bg-gray-50 transition-colors text-gray-800">
          Dinheiro
        </button>
      </div>

      <div className="mt-10 text-gray-800">
        <span className="text-lg font-bold tracking-[-1px] text-gray-800">
          Ano
        </span>
      </div>

      <div className="mt-2 w-52 flex items-center justify-between">
        <button className="w-12 h-12 flex items-center justify-center">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>

        <div className=" text-center flex-1">
          <span className="text-sm font-medium tracking-[-0.5px]">2023</span>
        </div>

        <button className="w-12 h-12 flex items-center justify-center">
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>

      <Button className="w-full mt-10">Aplicar Filtros</Button>
    </Modal>
  )
}
