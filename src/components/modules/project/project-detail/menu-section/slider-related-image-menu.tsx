import { useEffect, useState } from 'react'
import { Swiper } from 'swiper/types'

import SliderImageBase from '@components/ui/slider/slider-image-base'

import useMediaQuery from '@hooks/use-media-query'
import { navigationSliderClass } from '@lib/helper/constant'
interface TPropsSliderRelatedImageMenu {
  activeIndex: number
}
const SliderRelatedImageMenu = (props: TPropsSliderRelatedImageMenu) => {
  const { activeIndex } = props
  const [swiper, setSwiper] = useState<Swiper | null>(null)
  const { isMaxMd } = useMediaQuery()

  const listImage = [
    'dummy-images/project-goa/1.png',
    'dummy-images/project-goa/2.png',
    'dummy-images/project-goa/3.png',
    'dummy-images/project-goa/4.png',
    'dummy-images/project-goa/1.png',
    'dummy-images/project-goa/2.png'
  ]

  useEffect(() => {
    if (swiper) {
      swiper.slideTo(activeIndex + 1)
    }
  }, [swiper, activeIndex])

  return (
    <SliderImageBase
      images={listImage}
      onSwiper={(swiper: Swiper) => setSwiper(swiper)}
      swiperSlideProps={{
        className: 'md:h-[27rem] min-w-[20rem]'
      }}
      spaceBetween={5}
      className='px-0'
      navigation={isMaxMd ? false : navigationSliderClass}
    />
  )
}

export default SliderRelatedImageMenu
