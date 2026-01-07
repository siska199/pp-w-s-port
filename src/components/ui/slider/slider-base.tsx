import { useEffect } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperProps, SwiperSlide, SwiperSlideProps } from 'swiper/react';

import { IconChevronLeft, IconChevronRight } from '@assets/icons';

import 'swiper/css';

import 'swiper/css/navigation';
import 'swiper/css/pagination';

export interface TPropsSliderBase extends SwiperProps {
    items: React.ReactNode[];
    swiperSlideProps?: SwiperSlideProps;
    customeClassBtn?: {
        next: string;
        prev: string;
    };
}

const SliderBase = (props: TPropsSliderBase) => {
    const { items, swiperSlideProps, customeClassBtn, ...swiperProps } = props;
    useEffect(() => {
        import('@assets/styles/slider.css');
    }, []);
    return (
        <Swiper
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }}
            className="swiper_container sm:px-[5rem]"
            modules={[Navigation]}
            spaceBetween={40}
            {...swiperProps}
        >
            {items?.map((item, i) => (
                <SwiperSlide key={i} className="flex items-center  justify-center" {...swiperSlideProps}>
                    {item}
                </SwiperSlide>
            ))}
            {swiperProps.navigation !== false && (
                <>
                    <div className={`swiper-button-next ${customeClassBtn?.next}`}>
                        <IconChevronRight className="icon-white" />
                    </div>
                    <div className={`swiper-button-prev ${customeClassBtn?.prev}`}>
                        <IconChevronLeft className="icon-white" />
                    </div>
                </>
            )}
        </Swiper>
    );
};

export default SliderBase;
