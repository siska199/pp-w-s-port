import { Navigation } from 'swiper/modules'
import { Swiper, SwiperProps, SwiperSlide, SwiperSlideProps } from 'swiper/react'

import Image from '@components/ui/image'

import { IconChevronLeft, IconChevronRight } from '@assets/icons'

import 'swiper/css'

import 'swiper/css/navigation'
import 'swiper/css/pagination'

export interface TPropsSliderBase extends SwiperProps {
  images: string[]
  swiperSlideProps?: SwiperSlideProps
}

const SliderBase = (props: TPropsSliderBase) => {
  const { images, swiperSlideProps, ...swiperProps } = props
  return (
    <Swiper
      grabCursor={true}
      centeredSlides={true}
      loop={true}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }}
      className='swiper_container'
      modules={[Navigation]}
      {...swiperProps}
    >
      {images?.map((image, i) => (
        <SwiperSlide key={i} {...swiperSlideProps}>
          <Image
            src={image}
            alt={`slide_image_${i}`}
            customeClassName={{ image: 'object-cover' }}
            className=' w-full h-full '
          />
        </SwiperSlide>
      ))}
      <div className='swiper-button-next'>
        <IconChevronRight className='icon-white' />
      </div>
      <div className='swiper-button-prev'>
        <IconChevronLeft className='icon-white' />
      </div>
    </Swiper>
  )
}

export default SliderBase
