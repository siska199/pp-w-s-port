import { useRef } from 'react'
import { motion } from 'framer-motion'

import Badge from '@components/ui/badge'
import Container from '@components/ui/container/container'
import ContainerSection from '@components/ui/container/container-section'

import { useAnimateScrollCustome } from '@hooks/use-animate-scroll-custome'
import { experiances } from '@lib/data/dummy'

const ExperianceSection = () => {
  return (
    <ContainerSection title='Experiance' className=''>
      <Container className='h-full w-auto relative gap-8 '>
        {experiances?.map((experiance, i) => <CardExperiance key={i} {...experiance} />)}
      </Container>
    </ContainerSection>
  )
}

interface TPropsExperiance {
  companyName: string
  position: string
  startDate: string
  endDate: string
  projects: string[]
  techStack: string[]
}

const CardExperiance = (props: TPropsExperiance) => {
  const { companyName, position, startDate, endDate, projects, techStack } = props

  const targetRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useAnimateScrollCustome({
    targetRef,
    offset: ['0 1', '1.33 1']
  })

  return (
    <motion.div
      className='relative bg-card-transparent flex pb-4 w-full rounded-md'
      ref={targetRef}
      style={{ scale: scrollYProgress, opacity: scrollYProgress }}
    >
      <div className='p-4'>
        <div className='rounded-full flex items-center justify-center bg-glass h-fit p-2 border'>
          <div className='w-3 h-3 bg-white rounded-full' />
        </div>
      </div>

      <div className='space-y-2  py-4 pr-4 rounded-md md:max-w-md'>
        <h5 className='text-body-large'>
          {companyName} - {position}
        </h5>
        <p className='font-thin'>
          {startDate} | {endDate}
        </p>

        <div className='flex gap-6 justify-between'>
          <p className='font-medium w-auto min-w-[5rem]'>Tech Stacks</p>
          <Container variant={'hsc'} className='!flex-wrap gap-3'>
            {techStack?.map((tect, i) => <Badge key={i} variant={'soft-gray'} label={tect} />)}
          </Container>
        </div>

        <div className='space-y-2'>
          <p className='font-medium'>Projects</p>
          <ul className='flex flex-col gap-2'>
            {projects?.map((project, i) => (
              <li
                key={i}
                className='p-2 bg-glass-animation border-b cursor-pointer-custome rounded-md font-thin'
              >
                {'-'} {project}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

export default ExperianceSection
