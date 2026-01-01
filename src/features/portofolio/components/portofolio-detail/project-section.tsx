import { useCallback, useContext, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import { contextPortfolio } from '@features/portofolio/context/context-portofolio';
import { TParamsListProject } from '@features/project/apis/use-project-api';
import { TProject } from '@features/project/types/project-type';
import Badge from '@components/ui/badge';
import Button from '@components/ui/button';
import Container from '@components/ui/container/container';
import ContainerSection from '@components/ui/container/container-section';
import Image from '@components/ui/image';
import InputBase from '@components/ui/input/input-base';

import { useFetchOnView } from '@hooks/use-fetch-on-view';
import { convertEnumToLabel, debounce, formatDate } from '@lib/helper/function';
import { routes } from '@routes/constant';
import { TEventOnChange, TTypeDateFormat } from '@typescript/ui-types';
import { IconArrowUp, IconSearch } from '@assets/icons';
import { cardAnimation } from '@assets/styles/animation';

const ProjectSection = () => {
    const { isLoading, getProjectList, projectConfig } = useContext(contextPortfolio);

    const [keyword, setKeyword] = useState('');
    const { ref } = useFetchOnView({
        fetcher: async () => {
            await handleGetData({
                page_no: 1,
                keyword: '',
            });
        },
    });

    const handleGetData = debounce(async (params: Partial<TParamsListProject>) => {
        await getProjectList({
            page_no: params?.page_no,
            keyword: params?.keyword,
        });
    }, 1500);

    const handleOnChange = useCallback(async (e: TEventOnChange) => {
        const keyword = e.target.value;
        setKeyword(keyword);
        await handleGetData({
            page_no: 1,
            keyword: e.target.value,
        });
    }, []);
    return (
        <ContainerSection ref={ref} title={'Projects'} className="min-h-screen flex md:flex-col  flex-grow">
            <Container className="mt-8" gap={'large'}>
                <InputBase
                    customeClass={{
                        ciV4: 'max-w-[40rem] mx-auto',
                        ciV2: 'bg-transparent !border-primary',
                        input: 'bg-transparent placeholder:text-white text-white',
                    }}
                    customeElement={{ start: <IconSearch className="icon-white" /> }}
                    name={'keyword'}
                    value={keyword}
                    onChange={handleOnChange}
                    placeholder="Search Project by Name, Category Skill, Skill or Company... "
                />
                {isLoading['PROJECT_LIST'] ? (
                    <h5 className="text-body-large mx-auto">Loading Project Data...</h5>
                ) : (
                    <>
                        <div className="grid md:grid-cols-3 gap-8 px-4  mx-auto ">
                            {projectConfig?.projectList?.map((project, i) => (
                                <CardProject key={i} index={i} {...project} />
                            ))}
                        </div>

                        {(projectConfig?.projectList?.length != 0 || projectConfig?.currentPage !== projectConfig?.totalPage) && (
                            <Button shape={'rounded'} variant={'glass'} size={'large'} className="min-w-[15rem] mx-auto  md:text-body-large  md:font-bold">
                                Load More +
                            </Button>
                        )}
                    </>
                )}
            </Container>
        </ContainerSection>
    );
};

type TPropsCardProject = TProject & {
    index: number;
};

const CardProject = (props: TPropsCardProject) => {
    const { id, thumbnail_image, index, experiance, category, type, name, description } = props;
    const targetRef = useRef<HTMLDivElement | null>(null);

    return (
        <motion.div className="overflow-hidden  bg-card-transparent rounded-md " ref={targetRef} {...cardAnimation({ index })}>
            <Image
                src={thumbnail_image}
                className="h-[13rem] md:h-[15rem] aspect-square border-1 shadow-image-arise border-gray-500 "
                customeClassName={{ image: '' }}
                overlay={{
                    withBackdrop: true,
                    isShowOnHover: true,
                    content: (
                        <Container variant={'vee'} className="p-4 gap-3">
                            <Badge variant={'solid-primary'} label={convertEnumToLabel(category)} />
                            <Badge
                                variant={'outline-white'}
                                className="bg-transparent  font-bold text-white !text-end md:!text-center !justify-end md:!justify-center"
                                label={`${convertEnumToLabel(type)} - ${experiance.profession.name}`}
                            />
                            <p className="font-bold ">
                                {formatDate({ date: experiance.start_at, format: TTypeDateFormat['DD MONTH YEAR'] })} -{' '}
                                {formatDate({ date: experiance.end_at, format: TTypeDateFormat['DD MONTH YEAR'] })}
                            </p>
                        </Container>
                    ),
                }}
            />
            <div className="space-y-4 p-4">
                <h5 className="  text-body-large font-bold">{name}</h5>
                <p className=" line-clamp-3">{description}</p>
                <Container variant={'hsc'} className="!flex-wrap gap-3">
                    {props?.tech_stacks?.map((tech, i) => (
                        <Badge key={i} variant={'soft-gray'} label={tech?.name} />
                    ))}
                </Container>
                <Button to={`/${routes.project?.child?.detail?.name}/${id}`} target="_blank" variant={'solid-black'}>
                    View Project <IconArrowUp className="icon-white rotate-90 mt-1" />
                </Button>
            </div>
        </motion.div>
    );
};

export default ProjectSection;
