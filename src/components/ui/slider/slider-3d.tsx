import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules'

import SliderBase, { TPropsSliderBase } from '@components/ui/slider/slider-base'

import 'swiper/css'

import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface TPropsSlider3D extends TPropsSliderBase {
  images: string[]
}

const Slider3D = (props: TPropsSlider3D) => {
  const { images } = props
  return (
    <SliderBase
      images={images}
      effect={'coverflow'}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 10
      }}
      slidesPerView={'auto'}
      modules={[EffectCoverflow, Pagination, Navigation]}
      swiperSlideProps={{
        className:
          'min-w-auto md:min-h-[20rem] min-w-[25rem] max-w-[25rem] md:min-w-[45rem] md:max-w-[45rem] rounded-lg overflow-hidden'
      }}
    />
  )
}

export default Slider3D
