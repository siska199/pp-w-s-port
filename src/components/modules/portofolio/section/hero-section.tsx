import { IconDownload } from '@assets/icons'
import { opacityAnimation } from '@assets/styles/animation'
import AnimatedText from '@components/ui/animated/animated-text'
import Button from '@components/ui/button'
import Container from '@components/ui/container/container'
import ContainerSection from '@components/ui/container/container-section'
import Image from '@components/ui/image'
import useMediaQuery from '@hooks/use-media-query'
import { socialLinks } from '@lib/data/dummy'
import { motion } from 'framer-motion'

const HeroSection = () => {
  const { isMaxMd } = useMediaQuery()

  return (
    <ContainerSection gap='xl' className='mt-10 md:mt-0 '>
      <Container gap='base' className='w-auto '>
        <AnimatedText
          text={`I'm Siska Apriana Rifianti`}
          className='!text-heading-05 text-center md:text-start mx-auto md:mx-0 '
        />

        <AnimatedText
          text={`Frontend Developer`}
          className='font-bubblegum-sans text-center md:text-start'
        />

        {isMaxMd && (
          <motion.div {...opacityAnimation()} className='m-auto'>
            <Image
              className='mt-8 animate-bounce-custome  mx-auto rounded-full md:rounded-none w-[10rem] md:w-[25rem] aspect-square bg-transparent'
              src='dummy-images/profesional-image.jpg'
            />
          </motion.div>
        )}

        <motion.div {...opacityAnimation()}>
          <Container variant={'vcc'} className='md:items-start' gap='base'>
            <AnimatedText
              text={`Sharp Thinking and Seamless Coding, Powered by Coffee ☕`}
              className='ml-1 text-center md:text-start italic text-body-large font-normal '
            />
            <Button shape={'circle'} variant={'glass'} className='font-bold '>
              <IconDownload className='icon-white' /> Download Resume
            </Button>

            <Container variant='hcc' className='justify-center md:justify-start gap-2'>
              {socialLinks?.map((socialAcc, i) => (
                <Button key={i} className='!p-2' variant={'soft-primary'}>
                  <Image className='w-6 aspect-square rounded-full' src={socialAcc.src} />
                </Button>
              ))}
            </Container>
          </Container>
        </motion.div>
      </Container>

      <motion.div {...opacityAnimation()} className='hidden md:flex w-full md:w-auto'>
        <Image
          className='animate-waved-border mx-auto rounded-full md:rounded-none w-[10rem] md:w-[25rem] aspect-square bg-transparent'
          customeClassName={{ image: 'object-center' }}
          src='dummy-images/profesional-image.jpg'
        />
      </motion.div>
    </ContainerSection>
  )
}

export default HeroSection
