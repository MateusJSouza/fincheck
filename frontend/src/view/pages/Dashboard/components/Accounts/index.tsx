import { EyeIcon } from "../../../../components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { SliderNavigation } from "./SliderNavigation";
import { useAccountsController } from "./useAccountsController";
import { formatCurrency } from "../../../../../app/utils/formatCurrency";
import { cn } from "../../../../../app/utils/cn";
import { Spinner } from "../../../../components/Spinner";

export function Accounts() {
  const {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValueVisibility,
    isLoading
  } = useAccountsController()

  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col">
      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <Spinner className="text-teal-950/50 fill-white w-10 h-10" />
        </div>
      )}

      {!isLoading && (
        <>
          {/* Saldo */}
          <div>
            <span className="tracking-[-0.5px] text-white block">Saldo atual</span>
            <div className="flex items-center gap-2">

              <strong className={cn(
                'text-2xl tracking-[-1px] text-white',
                !areValuesVisible && 'blur-md'
              )}>
                {formatCurrency(1000)}
              </strong>

              <button
                className="w-8 h-8 flex items-center justify-center"
                onClick={toggleValueVisibility}
              >
                <EyeIcon open={areValuesVisible} />
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-end mt-10 md:mt-0">
            <div>
              <Swiper
                spaceBetween={16}
                slidesPerView={windowWidth >= 500 ? 2.1 : 1.2}
                onSlideChange={swiper => {
                  setSliderState({
                    isBeginning: swiper.isBeginning,
                    isEnd: swiper.isEnd
                  })
                }}
              >
                <div className="flex justify-between items-center mb-4" slot="container-start">
                  <strong className="text-white tracking-[-1px] text-lg font-bold">
                    Minhas contas
                  </strong>

                  <SliderNavigation
                    isBeginning={sliderState.isBeginning}
                    isEnd={sliderState.isEnd}
                  />
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
        </>
      )}

    </div >
  )
}
