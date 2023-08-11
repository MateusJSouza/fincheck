import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useBankAccounts } from "../../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../../app/hooks/useCategories";
import { useMemo } from "react";
import { Transaction } from "../../../../../../app/entities/Transaction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionsService } from "../../../../../../app/services/transactionsService";
import toast from "react-hot-toast";
import { currencyStringToNumber } from "../../../../../../app/utils/currencyStringToNumber";

const schema = z.object({
  value: z.union([
    z.string().nonempty('Informe o valor'),
    z.number(),
  ]),
  name: z.string().nonempty('Informe o nome'),
  categoryId: z.string().nonempty('Informe a categoria'),
  bankAccountId: z.string().nonempty('Informe a conta'),
  date: z.date()
})

type FormData = z.infer<typeof schema>;

export function useEditTransactionModalController(
  transaction: Transaction | null,
  onClose: () => void
) {
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      bankAccountId: transaction?.bankAccountId,
      categoryId: transaction?.categoryId,
      name: transaction?.name,
      value: transaction?.value,
      date: transaction ? new Date(transaction.date) : new Date(),
    }
  })

  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();
  const { isLoading, mutateAsync } = useMutation(transactionsService.update)
  const queryClient = useQueryClient()

  const handleSubmit = hookFormSubmit(async data => {
    try {
      await mutateAsync({
        ...data,
        id: transaction!.id,
        value: currencyStringToNumber(data.value),
        type: transaction!.type,
        date: data.date.toISOString(),
      })

      queryClient.invalidateQueries({
        queryKey: ['transactions']
      });
      queryClient.invalidateQueries({
        queryKey: ['bankAccounts']
      });
      toast.success(
        transaction!.type === 'EXPENSE'
          ? 'Despesa editada com sucesso!'
          : 'Receita editada com sucesso!'
      );
      onClose();
    } catch {
      toast.error(
        transaction!.type === 'EXPENSE'
          ? 'Erro ao salvar a despesa!'
          : 'Erro ao salvar a receita!'
      )
    }
  })

  const categories = useMemo(() => {
    return categoriesList.filter(category => category.type === transaction?.type)
  }, [categoriesList, transaction])

  return {
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
    transaction,
    isLoading
  }
}
