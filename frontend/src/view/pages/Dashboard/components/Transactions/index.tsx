import { SliderOption } from "./SliderOption";
import { SliderNavigation } from "./SliderNavigation";
import { Spinner } from "../../../../components/Spinner";
import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";

import { cn } from "../../../../../app/utils/cn";
import { MONTHS } from "../../../../../app/config/constants";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";

import { Swiper, SwiperSlide } from "swiper/react";

import { useTransactionsController } from "./useTransactionsController";

import { ChevronDownIcon } from "@radix-ui/react-icons";

import emptyStateImage from '../../../../../assets/empty-state.svg'

export function Transactions() {
  const { areValuesVisible, isInitialLoading, isLoading, transactions } = useTransactionsController()

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
          <header>
            <div className="flex justify-between items-center">
              <button className="flex items-center gap-2">
                <TransactionsIcon />
                <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">Transações</span>
                <ChevronDownIcon className="text-gray-900" />
              </button>

              <button>
                <FilterIcon />
              </button>
            </div>

            <div className="mt-6 relative">
              <Swiper
                slidesPerView={3}
                centeredSlides
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

          <main className="mt-4 space-y-2 flex-1 overflow-y-auto">
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

            {(hasTransactions && !isLoading) && (
              <>
                <div className="p-4 rounded-2xl bg-white flex items-center justify-between gap-4">
                  <div className="flex-1 flex items-center gap-3">
                    <CategoryIcon type="expense" />

                    <div>
                      <strong className="tracking-[-0.5px] block">Almoço</strong>
                      <span className="text-sm text-gray-600">04/06/2023</span>
                    </div>
                  </div>

                  <span
                    className={cn(
                      'text-red-800 font-medium tracking-[-0.5px]',
                      !areValuesVisible && 'blur-sm'
                    )}
                  >
                    - {formatCurrency(123)}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white flex items-center justify-between gap-4">
                  <div className="flex-1 flex items-center gap-3">
                    <CategoryIcon type="income" />

                    <div>
                      <strong className="tracking-[-0.5px] block">Salário</strong>
                      <span className="text-sm text-gray-600">10/06/2023</span>
                    </div>
                  </div>

                  <span
                    className={cn(
                      'text-red-800 font-medium tracking-[-0.5px]',
                      !areValuesVisible && 'blur-sm'
                    )}
                  >
                    - {formatCurrency(3000)}
                  </span>
                </div>
              </>
            )}
          </main>
        </>
      )}
    </div>
  )
}
