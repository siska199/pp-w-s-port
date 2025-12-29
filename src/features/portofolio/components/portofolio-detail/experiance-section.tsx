import { useContext, useRef } from 'react';
import { motion } from 'framer-motion';

import { TExperiance } from '@features/experiance/types/experiance-type';
import { contextPortfolio, EPortfolioLoading } from '@features/portofolio/context/context-portofolio';
import { TProject } from '@features/project/types/project-type';
import Badge from '@components/ui/badge';
import Container from '@components/ui/container/container';
import ContainerSection from '@components/ui/container/container-section';

import { useAnimateScrollCustome } from '@hooks/use-animate-scroll-custome';
import { useFetchOnView } from '@hooks/use-fetch-on-view';
import { useAppDispatch } from '@store/store';
import { handleSetModal } from '@store/ui-slice';
import { formatDate } from '@lib/helper/function';

const ExperianceSection = () => {
    const { isLoading, getExperienceList, experienceList } = useContext(contextPortfolio);

    const { ref } = useFetchOnView({
        fetcher: async () => {
            await getExperienceList();
        },
    });
    return (
        <ContainerSection ref={ref} title={'Experiance'} className="h-screen">
            {isLoading[EPortfolioLoading.EXPERIENCE_LIST] ? (
                <div className="my-auto">Loading Section Experiance...</div>
            ) : (
                <Container className="h-full w-auto relative gap-8 ">
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
    const { company_name, profession, start_at, end_at, tech_stacks, projects } = props;
    const targetRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useAnimateScrollCustome({
        targetRef,
        offset: ['0 1', '1.33 1'],
    });

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
                    {formatDate({ date: start_at })} | {formatDate({ date: end_at })}
                </p>

                <div className="flex gap-6 justify-between">
                    <p className="font-medium w-auto min-w-[5rem]">Tech Stacks</p>
                    <Container variant={'hsc'} className="!flex-wrap gap-3">
                        {tech_stacks?.map((tect, i) => (
                            <Badge key={i} variant={'soft-gray'} label={tect.name} />
                        ))}
                    </Container>
                </div>

                <CardProjects projects={projects} />
            </div>
        </motion.div>
    );
};

type TPropsProjects = {
    projects: TProject[];
};
const CardProjects = (props: TPropsProjects) => {
    const { projects } = props;
    const dispatch = useAppDispatch();

    const handleClickItemProject = (idProject: string) => {
        dispatch(
            handleSetModal({
                isShow: true,
                title: `My Responsibilities in ${idProject} Project`,
                customeClass: {
                    mdContent: 'shadow-none border-none',
                    mdBody: 'overflow-y-auto ',
                },
                children: <ListResponsibility />,
            }),
        );
    };

    return (
        <div className="space-y-2">
            <p className="font-medium">Projects</p>
            <ul className="flex flex-col gap-2">
                {projects?.map((project, i) => (
                    <li key={i} onClick={() => handleClickItemProject(project?.id)} className="p-2 bg-glass-animation border-b cursor-pointer-custome rounded-md font-thin">
                        {'-'} {project?.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export const ListResponsibility = () => {
    return (
        <ul className="ml-4 list-disc  space-y-4">
            <li className="p-2  border-b  rounded-md font-thin">
                Reengineered the GOA application, transitioning from an outdated .NET 4 UI to a modern React-based interface using Vite, resulting in a 62% increase in speed compared to the previous
                application. This transition also led to improved user satisfaction, evidenced by positive feedback from users regarding the enhanced performance and usability of the new
                interface.{' '}
            </li>
            <li className="p-2  border-b  rounded-md font-thin">
                Contributed to the setup of the application, including organizing the file and folder structure, configuring public and private routes, implementing global state management using
                Zustand with persistent data encryption, and utilizing session storage with secure-web-storage for enhanced security.{' '}
            </li>
            <li className="p-2  border-b  rounded-md font-thin">
                Proposed the use of functional components to enhance code readability, advocated for the adoption of hooks to separate the presentation layer from business logic, and suggested using
                absolute imports and implementing custom hooks to replace higher-order components (HOCs), resulting in cleaner and more maintainable code.{' '}
            </li>
            <li className="p-2  border-b  rounded-md font-thin">
                Restyled legacy codebase components to align with Figma designs provided by the UI/UX team and created new reusable components that increased development speed by approximately 40%
                (2md faster), streamlining the overall development process.{' '}
            </li>
            <li className="p-2  border-b  rounded-md font-thin">
                Restyled legacy codebase components to align with Figma designs provided by the UI/UX team and created new reusable components that increased development speed by approximately 40%
                (2md faster), streamlining the overall development process.{' '}
            </li>
            <li className="p-2  border-b  rounded-md font-thin">
                Restyled legacy codebase components to align with Figma designs provided by the UI/UX team and created new reusable components that increased development speed by approximately 40%
                (2md faster), streamlining the overall development process.{' '}
            </li>
            <li className="p-2  border-b  rounded-md font-thin">
                Restyled legacy codebase components to align with Figma designs provided by the UI/UX team and created new reusable components that increased development speed by approximately 40%
                (2md faster), streamlining the overall development process.{' '}
            </li>

            <li className="p-2  border-b  rounded-md font-thin">
                Restyled legacy codebase components to align with Figma designs provided by the UI/UX team and created new reusable components that increased development speed by approximately 40%
                (2md faster), streamlining the overall development process.{' '}
            </li>
        </ul>
    );
};
export default ExperianceSection;
