import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules'

import SliderImageBase, { TPropsSliderImageBase } from '@components/ui/slider/slider-image-base'

import 'swiper/css'

import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface TPropsSlider3D extends TPropsSliderImageBase {
  images: string[]
}

const SliderImage3D = (props: TPropsSlider3D) => {
  const { images, ...attrs } = props
  return (
    <SliderImageBase
      images={images}
      effect={'coverflow'}
      coverflowEffect={{
        rotate: 10,
        stretch: 0,
        depth: 100,
        modifier: 10
      }}
      slidesPerView={'auto'}
      modules={[EffectCoverflow, Pagination, Navigation]}
      customeClassBtn={{
        next: 'top-[2rem] md:top-[5rem]',
        prev: 'top-[2rem] md:top-[5rem]'
      }}
      {...attrs}
    />
  )
}

export default SliderImage3D
