import { useRef } from 'react'
import { motion } from 'framer-motion'

import Badge from '@components/ui/badge'
import Container from '@components/ui/container/container'
import ContainerSection from '@components/ui/container/container-section'

import { useAnimateScrollCustome } from '@hooks/use-animate-scroll-custome'
import { useAppDispatch } from '@store/store'
import { handleSetModal } from '@store/ui-slice'
import { experiances } from '@lib/data/dummy/dummy'

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

        <CardProjects projects={projects} />
      </div>
    </motion.div>
  )
}

interface TPropsProjects {
  projects: string[]
}
const CardProjects = (props: TPropsProjects) => {
  const { projects } = props
  const dispatch = useAppDispatch()

  const handleClickItemProject = (idProject: string) => {
    dispatch(
      handleSetModal({
        isShow: true,
        title: `My Responsibilities in ${idProject} Project`,
        customeClass: {
          mdModal: '',
          mdContent: 'bg-white/0 shadow-none border-none',
          mdBody: 'overflow-y-auto ',
          mdOverlay: 'blur-4xl bg-white'
        },
        children: <ListResponsibility />
      })
    )
  }

  return (
    <div className='space-y-2'>
      <p className='font-medium'>Projects</p>
      <ul className='flex flex-col gap-2'>
        {projects?.map((project, i) => (
          <li
            key={i}
            onClick={() => handleClickItemProject(project)}
            className='p-2 bg-glass-animation border-b cursor-pointer-custome rounded-md font-thin'
          >
            {'-'} {project}
          </li>
        ))}
      </ul>
    </div>
  )
}

export const ListResponsibility = () => {
  return (
    <ul className='ml-4 list-disc  space-y-4'>
      <li className='p-2  border-b  rounded-md font-thin'>
        Reengineered the GOA application, transitioning from an outdated .NET 4 UI to a modern
        React-based interface using Vite, resulting in a 62% increase in speed compared to the
        previous application. This transition also led to improved user satisfaction, evidenced by
        positive feedback from users regarding the enhanced performance and usability of the new
        interface.{' '}
      </li>
      <li className='p-2  border-b  rounded-md font-thin'>
        Contributed to the setup of the application, including organizing the file and folder
        structure, configuring public and private routes, implementing global state management using
        Zustand with persistent data encryption, and utilizing session storage with
        secure-web-storage for enhanced security.{' '}
      </li>
      <li className='p-2  border-b  rounded-md font-thin'>
        Proposed the use of functional components to enhance code readability, advocated for the
        adoption of hooks to separate the presentation layer from business logic, and suggested
        using absolute imports and implementing custom hooks to replace higher-order components
        (HOCs), resulting in cleaner and more maintainable code.{' '}
      </li>
      <li className='p-2  border-b  rounded-md font-thin'>
        Restyled legacy codebase components to align with Figma designs provided by the UI/UX team
        and created new reusable components that increased development speed by approximately 40%
        (2md faster), streamlining the overall development process.{' '}
      </li>
      <li className='p-2  border-b  rounded-md font-thin'>
        Restyled legacy codebase components to align with Figma designs provided by the UI/UX team
        and created new reusable components that increased development speed by approximately 40%
        (2md faster), streamlining the overall development process.{' '}
      </li>
      <li className='p-2  border-b  rounded-md font-thin'>
        Restyled legacy codebase components to align with Figma designs provided by the UI/UX team
        and created new reusable components that increased development speed by approximately 40%
        (2md faster), streamlining the overall development process.{' '}
      </li>
      <li className='p-2  border-b  rounded-md font-thin'>
        Restyled legacy codebase components to align with Figma designs provided by the UI/UX team
        and created new reusable components that increased development speed by approximately 40%
        (2md faster), streamlining the overall development process.{' '}
      </li>

      <li className='p-2  border-b  rounded-md font-thin'>
        Restyled legacy codebase components to align with Figma designs provided by the UI/UX team
        and created new reusable components that increased development speed by approximately 40%
        (2md faster), streamlining the overall development process.{' '}
      </li>
    </ul>
  )
}
export default ExperianceSection
