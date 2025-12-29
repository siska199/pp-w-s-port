import { motion } from 'framer-motion';

import ContainerSection from '@components/ui/container/container-section';
import SliderBase from '@components/ui/slider/slider-base';

import { slideInAnimation } from '@assets/styles/animation';
import { TEducation } from '@features/education/types/education-type';
import { contextPortfolio, EPortfolioLoading } from '@features/portofolio/context/context-portofolio';
import { useFetchOnView } from '@hooks/use-fetch-on-view';
import { formatDate } from '@lib/helper/function';
import { useContext } from 'react';

const EducationSection = () => {
    const { isLoading, getEducationList, educationList } = useContext(contextPortfolio);

    const { ref } = useFetchOnView({
        fetcher: async () => {
            await getEducationList();
        },
    });
    return (
        <ContainerSection ref={ref} title="Education">
            {isLoading[EPortfolioLoading.EDUCATION_LIST] ? (
                <div className="my-auto">Loading Section Education...</div>
            ) : (
                <motion.div {...slideInAnimation({ direction: 'left' })} className=" max-w-full">
                    <SliderBase
                        items={educationList?.map((education, i) => (
                            <CardEducation key={i} {...education} />
                        ))}
                    />
                </motion.div>
            )}
        </ContainerSection>
    );
};

type TPropsCardEducation = TEducation;
const CardEducation = (props: TPropsCardEducation) => {
    const { level, major, school, description, start_at, end_at } = props;

    return (
        <div className="space-y-2 p-8 rounded-md md:max-w-md min-w-full md:min-w-[30rem] bg-card-transparent">
            <h5 className="text-body-large">{level.name}</h5>
            <h5 className="text-body-large font-normal">
                {school.name} - {major.name}
            </h5>
            <p className="font-thin">
                {formatDate({ date: start_at })} | {formatDate({ date: end_at })}
            </p>
            <div className="container-list-disc-style" dangerouslySetInnerHTML={{ __html: description }}></div>
        </div>
    );
};

export default EducationSection;
