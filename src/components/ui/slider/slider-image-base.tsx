import Image from '@components/ui/image'
import SliderBase, { TPropsSliderBase } from '@components/ui/slider/slider-base'

import 'swiper/css'

import 'swiper/css/navigation'
import 'swiper/css/pagination'

export interface TPropsSliderImageBase extends Omit<TPropsSliderBase, 'items'> {
  images: string[]
}

const SliderImageBase = (props: TPropsSliderImageBase) => {
  const { images, swiperSlideProps, ...swiperProps } = props

  return (
    <SliderBase
      items={images?.map((image, i) => (
        <Image
          src={image}
          alt={`slide_image_${i}`}
          customeClassName={{ image: 'object-contain  ' }}
          className=' w-full h-full '
        />
      ))}
      swiperSlideProps={swiperSlideProps}
      {...swiperProps}
    />
  )
}

export default SliderImageBase
