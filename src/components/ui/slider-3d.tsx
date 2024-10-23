import Image from '@components/ui/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface TPropsSlider3D {
  images: string[];
}

const Slider3D = (props: TPropsSlider3D) => {
  const { images } = props;
  return (
    <Swiper
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      loop={true}
      slidesPerView={'auto'}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 10,
      }}
      modules={[EffectCoverflow, Pagination, Navigation]} // Include necessary modules here
      pagination={{ el: '.swiper-pagination', clickable: true }}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      className="swiper_container "
    >
      {images?.map((image, i) => (
        <SwiperSlide
          key={i}
          className="min-w-auto max-w-[15rem] md:min-w-[30rem] md:max-w-[30rem] rounded-lg overflow-hidden"
        >
          <Image
            src={image}
            alt={`slide_image_${i}`}
            customeClassName={{ image: 'object-cover' }}
            className=" w-full h-full "
          />
        </SwiperSlide>
      ))}
      {/* 
      <div className="slider-controler">
        <div className="swiper-button-prev slider-arrow">BACK</div>
        <div className="swiper-button-next slider-arrow">FORWARD</div>
        <div className="swiper-pagination"></div>
      </div> */}
    </Swiper>
  );
};

export default Slider3D;
