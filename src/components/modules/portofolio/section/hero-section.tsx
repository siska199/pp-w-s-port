import { IconDownload } from '@assets/icons';
import ContainerSection from '@components/modules/portofolio/container-section';
import Button from '@components/ui/button';
import Container from '@components/ui/container';
import Image from '@components/ui/image';
import useMediaQuery from '@hooks/useMediaQuery';
import { socialLinks } from '@lib/data/dummy';

const HeroSection = () => {
  const { isMaxMd } = useMediaQuery();

  return (
    <ContainerSection gap="xl" className="mt-10 md:mt-0">
      <Container gap="base" className="w-auto">
        <h5 className="mx-auto md:mx-0">I'm Siska Apriana Rifianti</h5>
        <h1 className="mx-auto md:mx-0 text-heading-03 md:text-heading-01 bg-color-text-1">
          Frontend Developer
        </h1>
        {isMaxMd && (
          <Image
            className="mt-8 animate-bounce-custome  mx-auto rounded-full md:rounded-none w-[10rem] md:w-[25rem] aspect-square bg-transparent"
            src="dummy-images/profesional-image.jpg"
          />
        )}

        <Container variant={'vcc'} className="md:items-start" gap="base">
          <p className="ml-1 text-center md:text-start italic text-body-large ">
            Sharp Thinking and Seamless Coding, Powered by Coffee{' '}
            <span className="not-italic animate-pulse">☕</span>
          </p>

          <Button shape={'circle'}>
            <IconDownload className="icon-white" /> Download Resume
          </Button>

          <Container
            variant="hcc"
            className="justify-center md:justify-start gap-2"
          >
            {socialLinks?.map((socialAcc) => (
              <Button className="!p-2" variant={'soft-primary'}>
                <Image
                  className="w-6 aspect-square rounded-full"
                  src={socialAcc.src}
                />
              </Button>
            ))}
          </Container>
        </Container>
      </Container>

      <div className="hidden md:flex w-full md:w-auto">
        <Image
          className="animate-waved-border mx-auto rounded-full md:rounded-none w-[10rem] md:w-[25rem] aspect-square bg-transparent"
          customeClassName={{ image: 'object-center' }}
          src="dummy-images/profesional-image.jpg"
        />
      </div>
    </ContainerSection>
  );
};

export default HeroSection;
