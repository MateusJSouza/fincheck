import { SliderOption } from "./SliderOption";
import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";

import { MONTHS } from "../../../../../app/config/constants";

import { Swiper, SwiperSlide } from "swiper/react";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import { SliderNavigation } from "./SliderNavigation";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";

export function Transactions() {
  return (
    <div className="bg-gray-100 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col">
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

      <main className="mt-4 space-y-2 flex-1 overflow-y-auto scroll-smooth">
        <div className="p-4 rounded-2xl bg-white flex items-center justify-between gap-4">
          <div className="flex-1 flex items-center gap-3">
            <CategoryIcon type="expense" />

            <div>
              <strong className="tracking-[-0.5px] block">Almoço</strong>
              <span className="text-sm text-gray-600">04/06/2023</span>
            </div>
          </div>

          <span className="text-red-800 font-medium tracking-[-0.5px]">
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

          <span className="text-green-800 font-medium tracking-[-0.5px]">
            - {formatCurrency(3000)}
          </span>
        </div>
      </main>
    </div>
  )
}
