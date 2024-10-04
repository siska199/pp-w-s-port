import ContainerSection from '@components/modules/portofolio/container-section';
import Container from '@components/ui/container';
import { aboutMeData } from '@lib/data/dummy';

const AboutMeSection = () => {
  return (
    <ContainerSection title="About Me">
      <Container
        variant={'hsc'}
        gap="medium"
        className="flex-col-reverse md:flex-row"
      >
        <div className="flex flex-col flex-grow min-w-[20rem] gap-2">
          {aboutMeData?.experienceMetrics?.map?.((info, i) => (
            <CardExperienceMetric key={i} {...info} />
          ))}
        </div>
        <p className="indent-16 md:text-body-large h-auto my-auto p-4 rounded-md bg-card-transparent">
          {aboutMeData.aboutMe}
        </p>
      </Container>
    </ContainerSection>
  );
};

interface TPropsCardExperienceMetric {
  title: string;
  description: string;
}

const CardExperienceMetric = (props: TPropsCardExperienceMetric) => {
  const { title, description } = props;
  return (
    <Container variant={'hsc'} className="bg-glass-animation rounded-lg p-4">
      <h1 className="text-heading-05 md:text-heading-01 w-[5rem] md:w-auto ">
        {title}
      </h1>
      <p className="text-start text-white flex-grow">{description}</p>
    </Container>
  );
};

export default AboutMeSection;
