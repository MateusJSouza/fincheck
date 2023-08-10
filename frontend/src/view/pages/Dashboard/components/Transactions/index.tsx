import { SliderOption } from "./SliderOption";
import { SliderNavigation } from "./SliderNavigation";
import { Spinner } from "../../../../components/Spinner";
import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";

import { cn } from "../../../../../app/utils/cn";
import { MONTHS } from "../../../../../app/config/constants";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";

import { Swiper, SwiperSlide } from "swiper/react";

import { useTransactionsController } from "./useTransactionsController";

import emptyStateImage from '../../../../../assets/empty-state.svg'
import { TransactionTypeDropdown } from "./TransactionTypeDropdown";
import { FiltersModal } from "./FiltersModal";
import { formatDate } from "../../../../../app/utils/formatDate";

export function Transactions() {
  const {
    areValuesVisible,
    isInitialLoading,
    isLoading,
    transactions,
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    handleChangeMonth,
    filters
  } = useTransactionsController()

  const hasTransactions = transactions.length > 0;

  return (
    <div className="bg-gray-100 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col">

      {isInitialLoading && (
        <div className="flex items-center justify-center w-full h-full">
          <Spinner className="w-10 h-10" />
        </div>
      )}

      {/* Primeiro carregamento */}
      {!isInitialLoading && (
        <>
          <FiltersModal
            onClose={handleCloseFiltersModal}
            open={isFiltersModalOpen}
          />
          <header>
            <div className="flex justify-between items-center">
              <TransactionTypeDropdown />

              <button onClick={handleOpenFiltersModal}>
                <FilterIcon />
              </button>
            </div>

            <div className="mt-6 relative">
              <Swiper
                slidesPerView={3}
                centeredSlides
                onSlideChange={(swiper) => {
                  if (swiper.realIndex === filters.month) return;
                  handleChangeMonth(swiper.realIndex)
                }}
                initialSlide={filters.month}
              >
                <SliderNavigation />
                {MONTHS.map((month, index) => (
                  <SwiperSlide
                    key={month}
                  >
                    {({ isActive }) => (
                      <SliderOption
                        index={index}
                        isActive={isActive}
                        month={month}
                      />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </header>

          <main className="mt-4 space-y-2 flex-1 overflow-y-auto scrollbar scrollbar-thumb-rounded-full scrollbar-track-gray-200 scrollbar-thumb-gray-400 scrollbar-w-2">
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-full">
                <Spinner className="w-10 h-10" />
              </div>
            )}

            {(!hasTransactions && !isLoading) && (
              <div className="h-full w-full flex flex-col items-center justify-center">
                <img src={emptyStateImage} alt="Ilustração em preto e branco de uma moça com uma lupa procurando algo em sua bolsa" />
                <p className="text-gray-700">
                  Não encontramos nenhuma transação!
                </p>
              </div>
            )}

            {(hasTransactions && !isLoading) && transactions.map(transaction => (
              <div
                key={transaction.id}
                className="p-4 rounded-2xl bg-white flex items-center justify-between gap-4"
              >
                <div className="flex-1 flex items-center gap-3">
                  <CategoryIcon
                    category={transaction.category?.icon}
                    type={transaction.type === 'EXPENSE' ? 'expense' : 'income'}
                  />

                  <div>
                    <strong className="tracking-[-0.5px] block">{transaction.name}</strong>
                    <span className="text-sm text-gray-600">{formatDate(new Date(transaction.date))}</span>
                  </div>
                </div>

                <span
                  className={cn(
                    'text-red-800 font-medium tracking-[-0.5px]',
                    transaction.type === 'EXPENSE' ? 'text-red-800' : 'text-green-800',
                    !areValuesVisible && 'blur-sm',
                  )}
                >
                  {transaction.type === 'EXPENSE' ? '-' : '+'}
                  {formatCurrency(transaction.value)}
                </span>
              </div>
            ))}
          </main>
        </>
      )}
    </div>
  )
}
