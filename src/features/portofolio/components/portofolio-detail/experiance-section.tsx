import { useContext, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';

import { TExperiance } from '@features/experiance/types/experiance-type';
import { contextPortfolio, EPortfolioLoading } from '@features/portofolio/context/context-portofolio';
import { TProject } from '@features/project/types/project-type';
import Badge from '@components/ui/badge';
import Button from '@components/ui/button';
import Container from '@components/ui/container/container';
import ContainerSection from '@components/ui/container/container-section';

import { useAnimateScrollCustome } from '@hooks/use-animate-scroll-custome';
import { useFetchOnView } from '@hooks/use-fetch-on-view';
import { handleSetModal } from '@store/ui-slice';
import { formatDate, toLocalDateInputValue } from '@lib/helper/function';
import { routes } from '@routes/constant';
import { TTypeDateFormat } from '@typescript/ui-types';

const ExperianceSection = () => {
    const { isLoading, getExperienceList, experienceList } = useContext(contextPortfolio);

    const { ref } = useFetchOnView({
        fetcher: async () => {
            await getExperienceList();
        },
    });
    return (
        <ContainerSection ref={ref} title={'Experiance'} className="min-h-screen">
            {isLoading[EPortfolioLoading.EXPERIENCE_LIST] ? (
                <h5 className="text-body-large">Loading Section Experiance...</h5>
            ) : (
                <Container className="h-full w-auto relative gap-8 pt-8 ">
                    {experienceList?.map((experiance, i) => (
                        <CardExperiance key={i} {...experiance} />
                    ))}
                </Container>
            )}
        </ContainerSection>
    );
};

type TPropsExperiance = TExperiance;

const CardExperiance = (props: TPropsExperiance) => {
    const { company_name, profession, start_at, end_at, tech_stacks, projects, description } = props;
    const targetRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useAnimateScrollCustome({
        targetRef,
        offset: ['0 1', '1.33 1'],
    });
    const dispatch = useDispatch();
    const handleClickResAndCon = () => {
        dispatch(
            handleSetModal({
                isShow: true,
                title: `Responsibilities and Contributions`,
                customeClass: {
                    mdContent: 'shadow-none border-none',
                    mdBody: 'overflow-y-auto mb-4',
                },
                children: <div className="container-list-disc-style" dangerouslySetInnerHTML={{ __html: description }}></div>,
            }),
        );
    };
    return (
        <motion.div className="relative bg-card-transparent flex pb-4 w-full rounded-md" ref={targetRef} style={{ scale: scrollYProgress, opacity: scrollYProgress }}>
            <div className="p-4">
                <div className="rounded-full flex items-center justify-center bg-glass h-fit p-2 border">
                    <div className="w-3 h-3 bg-white rounded-full" />
                </div>
            </div>

            <div className="space-y-2  py-4 pr-4 rounded-md md:max-w-md">
                <h5 className="text-body-large">
                    {company_name} - {profession.name}
                </h5>
                <p className="font-thin">
                    {formatDate({ date: toLocalDateInputValue(start_at), format: TTypeDateFormat['DD MONTH YEAR'] })} |{' '}
                    {formatDate({ date: toLocalDateInputValue(end_at), format: TTypeDateFormat['DD MONTH YEAR'] })}
                </p>

                <div className=" flex flex-col md:flex-row gap-2 md:gap-6 justify-between">
                    <p className="font-medium w-auto min-w-[5rem]">Tech Stacks</p>
                    <Container variant={'hsc'} className="!flex-wrap gap-3">
                        {tech_stacks?.map((tect, i) => (
                            <Badge key={i} variant={'soft-gray'} label={tect.name} />
                        ))}
                    </Container>
                </div>

                <CardProjects projects={projects} />
                <div className="space-y-2">
                    <p onClick={() => handleClickResAndCon()} className="font-medium cursor-pointer hover:underline">
                        Resonsibility And Contribution 📍
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

type TPropsProjects = {
    projects: TProject[];
};
const CardProjects = (props: TPropsProjects) => {
    const { projects } = props;

    return (
        <div className="space-y-2">
            <p className="font-medium">Projects</p>
            <div className="flex flex-col gap-2">
                {projects?.map((project, i) => (
                    <Button key={i} to={routes.project.child.detail.fullPath(project.id)} target="_blank" className="w-full text-white !p-2 bg-glass-animation !border-b  !rounded-md font-thin">
                        {project?.name}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default ExperianceSection;
