import { EyeIcon } from "../../../components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { AccountsSliderNavigation } from "./AccountsSliderNavigation";

export function Accounts() {
  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col">

      {/* Saldo */}
      <div>
        <span className="tracking-[-0.5px] text-white block">Saldo atual</span>
        <div className="flex items-center gap-2">

          <strong className="text-2xl tracking-[-1px] text-white">
            R$ 100,00
          </strong>

          <button className="w-8 h-8 flex items-center justify-center">
            <EyeIcon open={true} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-end">
        <div>
          <Swiper
            spaceBetween={16}
            slidesPerView={2.1}
          >
            <div className="flex justify-between items-center mb-4" slot="container-start">
              <strong className="text-white tracking-[-1px] text-lg font-bold">
                Minhas contas
              </strong>

              <AccountsSliderNavigation />
            </div>

            {/* Cards */}
            <SwiperSlide>
              <AccountCard
                type="CASH"
                name="Nubank"
                color="#7950f2"
                balance={1000}
              />
            </SwiperSlide>

            <SwiperSlide>
              <AccountCard
                type="INVESTMENT"
                name="XP Investimentos"
                color="#333"
                balance={1000}
              />
            </SwiperSlide>

            <SwiperSlide>
              <AccountCard
                type="CHECKING"
                name="Carteira"
                color="#0f0"
                balance={1000}
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div >
  )
}
