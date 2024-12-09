import { useState } from 'react'
import { SwiperClass } from 'swiper/react'

import SliderRelatedImageMenu from '@features/project/components/project-detail/menu-section/slider-related-image-menu'
import ContainerSection from '@components/ui/container/container-section'
import Image from '@components/ui/image'
import SliderImage3D from '@components/ui/slider/slider-image-3d'

import { useAppDispatch } from '@store/store'
import { handleSetModal } from '@store/ui-slice'

const MenuSection = () => {
  const listImage = [
    'dummy-images/project-goa/1.png',
    'dummy-images/project-goa/2.png',
    'dummy-images/project-goa/3.png',
    'dummy-images/project-goa/4.png',
    'dummy-images/project-goa/1.png',
    'dummy-images/project-goa/2.png'
  ]

  const listFeatures = ['Create Form Registration', 'Add Data Bengkel', 'Edit Data bengkerl']

  const [_currIndexImg, setCurrIndexImg] = useState(0)

  const handleOnChangeSlide = (swiper: SwiperClass) => {
    setCurrIndexImg(swiper.realIndex)
  }

  return (
    <ContainerSection title='Menu' className=' '>
      <SliderImage3D
        images={listImage}
        onClick={handleOnChangeSlide}
        onSlideChange={handleOnChangeSlide}
        swiperSlideProps={{
          className: `min-w-auto md:min-h-[20rem] min-w-[20rem] max-w-[25rem] md:min-w-[40rem] md:max-w-[40rem] rounded-lg overflow-hidden`
        }}
      />

      <div className='-mt-[6rem] space-y-4 w-full'>
        <CardIntroMenu
          title={'Menu Login'}
          description={`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero vitae temporibus quasi
            minus natus maxime optio eaque doloremque inventore non, officia dignissimos sed ex ipsa
            asperiores facilis ea iure, itaque neque magni exercitationem hic ut fugiat eveniet!
            Assumenda dolores nihil, quo debitis suscipit facere. Facere voluptatum repudiandae.`}
        />
        <ListRelatedImageMenu images={listImage} />
        <ListFeature features={listFeatures} />
      </div>
    </ContainerSection>
  )
}

interface TCardIntroMenu {
  title: string
  description: string
}
const CardIntroMenu = (props: TCardIntroMenu) => {
  const { title, description } = props
  return (
    <div className='space-y-2'>
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  )
}

interface TPropsRelatedImagesMenu {
  images: string[]
}

const ListRelatedImageMenu = (props: TPropsRelatedImagesMenu) => {
  const { images } = props
  const dispatch = useAppDispatch()
  const handleOnClickMenu = (index: number) => {
    dispatch(
      handleSetModal({
        isShow: true,
        children: <SliderRelatedImageMenu activeIndex={index} />,
        customeClass: {
          mdContent: 'bg-white/0  h-[90vh]',
          btnClose: {
            icon: '!w-[2rem] !h-[2rem] icon-white'
          }
        }
      })
    )
  }
  return (
    <>
      <div className='space-y-2'>
        <p className='text-body-large font-medium'>Related Image</p>
        <div className='flex gap-4 overflow-x-auto py-4 pr-4'>
          {images?.map((image, i) => (
            <Image
              onClick={() => handleOnClickMenu(i)}
              key={i}
              src={image}
              className='min-w-[10rem] zoom-out-effect cursor-pointer rounded-md'
            />
          ))}
        </div>
      </div>
    </>
  )
}

interface TPorpsListFeature {
  features: string[]
}
const ListFeature = (props: TPorpsListFeature) => {
  const { features } = props

  return (
    <div className='space-y-2'>
      <p className='text-body-large font-medium'>Features:</p>
      <ul className='flex flex-col gap-4'>
        {features?.map((feature, i) => (
          <li key={i}>
            {'-'} {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MenuSection
