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
        <ContainerSection ref={ref} title={'About Me'} className="min-h-screen">
            {isLoading[EPortfolioLoading.KEY_METRIC] ? (
                <h5 className="text-body-large">Loading About Me...</h5>
            ) : (
                <Container variant={'hsc'} gap="medium" className="overflow-x-hidden flex-col-reverse md:flex-row box-border">
                    <motion.div {...slideInAnimation({ direction: 'left' })} className="flex md:flex-col flex-wrap flex-grow md:min-w-[23rem] gap-2">
                        {keyMetricList?.map?.((info, i) => (
                            <CardKeyMetric key={i} value={info.value} keyMetric={info?.key} />
                        ))}
                    </motion.div>
                    <motion.p {...slideInAnimation({ direction: 'right' })} className=" indent-16 w-full  md:text-body-large h-auto my-auto p-4 rounded-md bg-card-transparent">
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
        <Container variant={'hsc'} className=" flex-nowrap bg-glass-animation rounded-lg p-4 gap-8 md:gap-2">
            <h1 className="flex flex-grow md:flex-grow-0  text-heading-05 md:text-heading-01">
                <span>
                    <AnimatedCountNumber number={Number(value)} className="text-heading-05 md:text-heading-01 w-[5rem] md:w-auto font-bold" />+
                </span>
            </h1>
            <p className=" text-end md:text-start text-white flex-grow break-words ">{keyMetric}</p>
        </Container>
    );
};

export default AboutMeSection;
