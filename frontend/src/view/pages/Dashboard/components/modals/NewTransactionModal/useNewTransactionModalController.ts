import { z } from "zod"
import { useDashboard } from "../../DashboardContext/useDashboard"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useBankAccounts } from "../../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../../app/hooks/useCategories";
import { useMemo } from "react";

const schema = z.object({
  value: z.string().nonempty('Informe o valor'),
  name: z.string().nonempty('Informe o nome'),
  categoryId: z.string().nonempty('Informe a categoria'),
  bankAccountId: z.string().nonempty('Informe a conta'),
  date: z.date()
})

type FormData = z.infer<typeof schema>;

export function useNewTransactionModalController() {
  const { isNewTransactionModalOpen, closeNewTransactionModal, newTransactionType, } = useDashboard()

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const handleSubmit = hookFormSubmit(data => {
    console.log(data)
  })

  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();

  const categories = useMemo(() => {
    return categoriesList.filter(category => category.type === newTransactionType)
  }, [categoriesList, newTransactionType])

  return {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
  }
}
