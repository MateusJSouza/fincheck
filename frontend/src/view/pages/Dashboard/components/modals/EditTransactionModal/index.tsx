import { Input } from "../../../../../components/Input";
import { Modal } from "../../../../../components/Modal";
import { Button } from "../../../../../components/Button";
import { Select } from "../../../../../components/Select";
import { InputCurrency } from "../../../../../components/InputCurrency";
import { DatePickerInput } from "../../../../../components/DatePickerInput";

import { Controller } from "react-hook-form";
import { useEditTransactionModalController } from "./useEditTransactionModalController";
import { Transaction } from "../../../../../../app/entities/Transaction";
import { ConfirmDeleteModal } from "../../../../../components/ConfirmDeleteModal";
import { TrashIcon } from "../../../../../components/icons/TrashIcon";

interface EditTransactionModalProps {
  open: boolean;
  onClose(): void;
  transaction: Transaction | null;
}

export function EditTransactionModal({ transaction, onClose, open }: EditTransactionModalProps) {
  const {
    control,
    errors,
    register,
    handleSubmit,
    accounts,
    categories,
    isLoading,
    isDeleteModalOpen,
    isLoadingDelete,
    handleDeleteTransaction,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
  } = useEditTransactionModalController(transaction, onClose)

  const isExpense = transaction?.type === 'EXPENSE';

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        isLoading={isLoadingDelete}
        onConfirm={handleDeleteTransaction}
        onClose={handleCloseDeleteModal}
        title={`Tem certeza que deseja excluir esta ${isExpense ? 'despesa' : 'receita'}?`}
      />
    )
  }

  return (
    <Modal
      title={isExpense ? 'Editar Despesa' : 'Editar Receita'}
      open={open}
      onClose={onClose}
      rightAction={(
        <button onClick={handleOpenDeleteModal}>
          <TrashIcon className="text-red-900 w-6 h-6" />
        </button>
      )}
    >
      <form onSubmit={handleSubmit}>
        <div className="">
          <span className="text-gray-600 text-xs tracking-[-0.5px]">
            Valor {isExpense ? 'da despesa' : 'da receita'}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-lg tracking-[-0.5px]">R$</span>
            <Controller
              control={control}
              name="value"
              defaultValue="0"
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  value={value}
                  error={errors.value?.message}
                  onChange={onChange}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder={isExpense ? 'Nome da Despesa' : 'Nome da Receita'}
            error={errors.name?.message}
            {...register('name')}
          />

          <Controller
            control={control}
            name="categoryId"
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <Select
                placeholder="Categoria"
                value={value}
                onChange={onChange}
                error={errors.categoryId?.message}
                options={categories.map(category => ({
                  value: category.id,
                  label: category.name
                }))}
              />
            )}
          />

          <Controller
            control={control}
            name="bankAccountId"
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <Select
                placeholder={isExpense ? 'Pagar com' : 'Receber com'}
                value={value}
                onChange={onChange}
                error={errors.bankAccountId?.message}
                options={accounts.map(account => ({
                  value: account.id,
                  label: account.name
                }))}
              />
            )}
          />

          <Controller
            control={control}
            name="date"
            defaultValue={new Date()}
            render={({ field: { value, onChange } }) => (
              <DatePickerInput error={errors.date?.message} value={value} onChange={onChange} />
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
