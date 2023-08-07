import { Input } from "../../../../../components/Input";
import { Modal } from "../../../../../components/Modal";
import { Select } from "../../../../../components/Select";
import { InputCurrency } from "../../../../../components/InputCurrency";
import { useNewAccountModalController } from "./useNewAccountModalController";
import { ColorsDropdownInput } from "../../../../../components/ColorsDropdownInput";
import { Button } from "../../../../../components/Button";
import { Controller } from "react-hook-form";

export function NewAccountModal() {
  const { isNewAccountModalOpen, closeNewAccountModal, errors, handleSubmit, register, control } = useNewAccountModalController()

  return (
    <Modal title="Nova Conta" open={isNewAccountModalOpen} onClose={closeNewAccountModal}>
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 text-xs tracking-[-0.5px]">Saldo inicial</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-lg tracking-[-0.5px]">R$</span>
            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <InputCurrency
                  error={errors.initialBalance?.message}
                  onChange={onChange}
                />
              )}
              name="initialBalance"
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

          <Select
            placeholder="Tipo"
            error={errors.type?.message}
            options={[
              { value: 'CHECKING', label: 'Conta Corrente' },
              { value: 'INVESTMENT', label: 'Investimentos' },
              { value: 'CASH', label: 'Dinheiro Físico' },
            ]}
          />

          <ColorsDropdownInput error={errors.color?.message} />
        </div>

        <Button type="submit" className="w-full mt-6">Criar</Button>
      </form>
    </Modal>
  )
}
