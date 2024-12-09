import { motion } from 'framer-motion'

import ContainerSection from '@components/ui/container/container-section'
import SliderBase from '@components/ui/slider/slider-base'

import { educations } from '@lib/data/dummy/dummy'
import { slideInAnimation } from '@assets/styles/animation'

const EducationSection = () => {
  return (
    <ContainerSection title='Education'>
      <motion.div {...slideInAnimation({ direction: 'left' })} className=' max-w-full'>
        <SliderBase
          items={educations?.map((education, i) => <CardEducation key={i} {...education} />)}
        />
      </motion.div>
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
    <div className='space-y-2 p-8 rounded-md md:max-w-md min-w-full md:min-w-[30rem] bg-card-transparent'>
      <h5 className='text-body-large'>{level}</h5>
      <h5 className='text-body-large font-normal'>
        {school} - {major}
      </h5>
      <p className='font-thin'>
        {start_at} | {end_at}
      </p>
      <div
        className='container-list-disc-style'
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
    </div>
  )
}

export default EducationSection
