import { Button } from "./Button";
import { Modal } from "./Modal";
import { TrashIcon } from "./icons/TrashIcon";

interface ConfirmDeleteModalProps {
  onConfirm(): void;
  onClose(): void;
  title: string;
  description?: string;
  isLoading: boolean;
}

export function ConfirmDeleteModal({
  onClose,
  title,
  onConfirm,
  isLoading,
  description
}: ConfirmDeleteModalProps) {
  return (
    <Modal title="Excluir" open onClose={onClose}>
      <div className="flex flex-col items-center text-center gap-6">
        <div className="w-[52px] h-[52px] rounded-full bg-red-50 flex items-center justify-center text-red-900">
          <TrashIcon className="w-6 h-6" />
        </div>

        <strong className="w-[180px] text-gray-800 tracking-[-0.5px]">{title}</strong>

        {description && (
          <p className="text-gray-800 tracking-[-0.5px]">
            {description}
          </p>
        )}
      </div>

      <div className="mt-10 flex flex-col items-center justify-center gap-2">
        <Button
          className="w-full"
          variant="danger"
          onClick={onConfirm}
          isLoading={isLoading}
        >
          Sim, desejo excluir
        </Button>

        <Button
          className="w-full"
          variant="ghost"
          onClick={onClose}
          disabled={isLoading}
        >
          Cancelar
        </Button>
      </div>
    </Modal>
  )
}
