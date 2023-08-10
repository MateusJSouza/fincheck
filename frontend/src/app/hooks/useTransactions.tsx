import { useQuery } from "@tanstack/react-query"
import { transactionsService } from "../services/transactionsService"

export function useTransactions() {
  const { data, isFetching, isInitialLoading, refetch } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => transactionsService.getAll({
      month: 7,
      year: 2023
    }),
  })

  return {
    transactions: data ?? [],
    isLoading: isFetching,
    isInitialLoading,
    refetchTransaction: refetch,
  }
}
