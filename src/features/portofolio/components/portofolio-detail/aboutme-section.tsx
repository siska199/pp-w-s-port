import { useContext } from 'react';
import { motion } from 'framer-motion';

import { contextPortfolio, EPortfolioLoading } from '@features/portofolio/context/context-portofolio';
import { AnimatedCountNumber } from '@components/ui/animated/animated-count-number';
import Container from '@components/ui/container/container';
import ContainerSection from '@components/ui/container/container-section';

import { useFetchOnView } from '@hooks/use-fetch-on-view';
import { slideInAnimation } from '@assets/styles/animation';

const AboutMeSection = () => {
    const { isLoading, personalInformation: data, keyMetricList, getKeyMetricList } = useContext(contextPortfolio);

    const { ref } = useFetchOnView({
        fetcher: async () => {
            await getKeyMetricList();
        },
    });
    return (
        <ContainerSection ref={ref} title={'About Me'} className="h-screen">
            {isLoading[EPortfolioLoading.KEY_METRIC] ? (
                <div className="my-auto">Loading About Me...</div>
            ) : (
                <Container variant={'hsc'} gap="medium" className="flex-col-reverse md:flex-row overflow-x-hidden">
                    <motion.div {...slideInAnimation({ direction: 'left' })} className="flex md:flex-col flex-grow min-w-[20rem] gap-2">
                        {keyMetricList?.map?.((info, i) => (
                            <CardKeyMetric key={i} value={info.value} keyMetric={info?.key} />
                        ))}
                    </motion.div>
                    <motion.p {...slideInAnimation({ direction: 'right' })} className="indent-16 md:text-body-large h-auto my-auto p-4 rounded-md bg-card-transparent">
                        {data?.about_me}
                    </motion.p>
                </Container>
            )}
        </ContainerSection>
    );
};

interface TPropsKeyMetric {
    value: string;
    keyMetric: string;
}

const CardKeyMetric = (props: TPropsKeyMetric) => {
    const { value, keyMetric } = props;
    return (
        <Container variant={'hsc'} className="  bg-glass-animation rounded-lg p-4 gap-8 md:gap-2">
            <h1 className="md:flex text-heading-05 md:text-heading-01">
                <AnimatedCountNumber number={Number(value)} className="text-heading-05 md:text-heading-01 w-[5rem] md:w-auto font-bold" /> +
            </h1>
            <p className="text-start text-white flex-grow">{keyMetric}</p>
        </Container>
    );
};

export default AboutMeSection;
