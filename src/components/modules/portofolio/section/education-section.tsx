import ContainerSection from '@components/ui/container/container-section'
import HeaderSection from '@components/ui/header/header-section'
import SliderScrollInHorizontal from '@components/ui/slider/slider-scroll-in-horizontal'

import { educations } from '@lib/data/dummy'

const EducationSection = () => {
  return (
    <ContainerSection>
      <SliderScrollInHorizontal header={<HeaderSection title={'Education'} />}>
        {educations?.map((education, i) => <CardEducation key={i} {...education} />)}
      </SliderScrollInHorizontal>
    </ContainerSection>
  )
}

interface TPropsCardEducation {
  level: string
  major: string
  school: string
  description: string
  start_at: string
  end_at: string
}
const CardEducation = (props: TPropsCardEducation) => {
  const { level, major, school, description, start_at, end_at } = props

  return (
    <div className='relative min-w-[30rem] bg-card-transparent flex pb-4 h-auto  rounded-md overflow-hidden'>
      <div className='p-4'>
        <div className='rounded-full flex items-center justify-center bg-glass h-fit p-2 border'>
          <div className='w-3 h-3 bg-white rounded-full' />
        </div>
      </div>

      <div className='space-y-2  py-4 pr-4 rounded-md md:max-w-md'>
        <h5 className='text-body-large'>{level}</h5>
        <h5 className='text-body-large font-normal'>
          {school} - {major}
        </h5>
        <p className='font-thin'>
          {start_at} | {end_at}
        </p>
        <div dangerouslySetInnerHTML={{ __html: description }}></div>
      </div>
    </div>
  )
}

export default EducationSection
