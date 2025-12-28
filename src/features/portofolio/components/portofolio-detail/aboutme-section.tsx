import { motion } from 'framer-motion';

import { AnimatedCountNumber } from '@components/ui/animated/animated-count-number';
import Container from '@components/ui/container/container';
import ContainerSection from '@components/ui/container/container-section';

import { aboutMeData } from '@lib/data/dummy/dummy';
import { slideInAnimation } from '@assets/styles/animation';

const AboutMeSection = () => {
    return (
        <ContainerSection title="About Me">
            <Container variant={'hsc'} gap="medium" className="flex-col-reverse md:flex-row overflow-x-hidden">
                <motion.div {...slideInAnimation({ direction: 'left' })} className="flex flex-col flex-grow min-w-[20rem] gap-2">
                    {aboutMeData?.experienceMetrics?.map?.((info, i) => (
                        <CardExperienceMetric key={i} {...info} />
                    ))}
                </motion.div>
                <motion.p {...slideInAnimation({ direction: 'right' })} className="indent-16 md:text-body-large h-auto my-auto p-4 rounded-md bg-card-transparent">
                    {aboutMeData.aboutMe}
                </motion.p>
            </Container>
        </ContainerSection>
    );
};

interface TPropsCardExperienceMetric {
    total: string;
    description: string;
}

const CardExperienceMetric = (props: TPropsCardExperienceMetric) => {
    const { total, description } = props;
    return (
        <Container variant={'hsc'} className="  bg-glass-animation rounded-lg p-4 gap-8 md:gap-2">
            <h1 className="md:flex text-heading-05 md:text-heading-01">
                <AnimatedCountNumber number={Number(total)} className="text-heading-05 md:text-heading-01 w-[5rem] md:w-auto font-bold" /> +
            </h1>
            <p className="text-start text-white flex-grow">{description}</p>
        </Container>
    );
};

export default AboutMeSection;
