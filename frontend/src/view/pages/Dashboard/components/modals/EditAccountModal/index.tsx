import { Input } from "../../../../../components/Input";
import { Modal } from "../../../../../components/Modal";
import { Select } from "../../../../../components/Select";
import { InputCurrency } from "../../../../../components/InputCurrency";
import { ColorsDropdownInput } from "../../../../../components/ColorsDropdownInput";
import { Button } from "../../../../../components/Button";
import { Controller } from "react-hook-form";
import { useEditAccountModal } from "./useEditAccountModal";
import { TrashIcon } from "../../../../../components/icons/TrashIcon";
import { ConfirmDeleteModal } from "../../../../../components/ConfirmDeleteModal";

export function EditAccountModal() {
  const {
    isEditAccountModalOpen,
    closeEditAccountModal,
    errors,
    handleSubmit,
    register,
    control,
    isLoading,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    isDeleteModalOpen,
    handleDeleteAccount,
    isLoadingDelete
  } = useEditAccountModal()

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        isLoading={isLoadingDelete}
        onConfirm={handleDeleteAccount}
        title="Tem certeza que deseja excluir esta conta?"
        onClose={handleCloseDeleteModal}
        description="Ao excluir a conta, também serão excluídos todos os registros de receita e despesas relacionados."
      />
    )
  }

  return (
    <Modal
      title="Editar Conta"
      open={isEditAccountModalOpen}
      onClose={closeEditAccountModal}
      rightAction={(
        <button onClick={handleOpenDeleteModal}>
          <TrashIcon className="text-red-900 w-6 h-6" />
        </button>
      )}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 text-xs tracking-[-0.5px]">Saldo inicial</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-lg tracking-[-0.5px]">R$</span>
            <Controller
              control={control}
              name="initialBalance"
              defaultValue="0"
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  value={value}
                  error={errors.initialBalance?.message}
                  onChange={onChange}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Nome da Conta"
            error={errors.name?.message}
            {...register('name')}
          />

          <Controller
            control={control}
            name="type"
            defaultValue="CASH"
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Tipo"
                error={errors.type?.message}
                onChange={onChange}
                value={value}
                options={[
                  { value: 'CHECKING', label: 'Conta Corrente' },
                  { value: 'INVESTMENT', label: 'Investimentos' },
                  { value: 'CASH', label: 'Dinheiro Físico' },
                ]}
              />
            )}
          />

          <Controller
            control={control}
            name="color"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <ColorsDropdownInput
                error={errors.color?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />
        </div>

        <Button
          type="submit"
          className="w-full mt-6"
          isLoading={isLoading}
        >
          Salvar
        </Button>
      </form>
    </Modal>
  )
}
