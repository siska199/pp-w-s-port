import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

import Badge from '@components/ui/badge';
import Button from '@components/ui/button';
import Container from '@components/ui/container/container';
import ContainerSection from '@components/ui/container/container-section';
import Image from '@components/ui/image';
import InputBase from '@components/ui/input/input-base';

import { useFetchOnView } from '@hooks/use-fetch-on-view';
import { projects } from '@lib/data/dummy/dummy';
import { routes } from '@routes/constant';
import { IconArrowUp, IconSearch } from '@assets/icons';
import { cardAnimation } from '@assets/styles/animation';

const ProjectSection = () => {
    const [keyword, setKeyword] = useState('');
    const { ref } = useFetchOnView({
        fetcher: async () => {
            console.log('fet endpoint project');
        },
    });
    return (
        <ContainerSection ref={ref} title="Projects">
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
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Search Project by Name, Category Skill, Skill or Company... "
                />
                <div className="grid md:grid-cols-3 gap-8 px-4  mx-auto ">
                    {projects?.map((project, i) => (
                        <CardProject key={i} index={i} {...project} />
                    ))}
                </div>

                <Button shape={'rounded'} variant={'glass'} size={'large'} className="min-w-[15rem] mx-auto  md:text-body-large  md:font-bold">
                    Load More +
                </Button>
            </Container>
        </ContainerSection>
    );
};

interface TPropsCardProject {
    thumbnail: string;
    id: number;
    title: string;
    description: string;
    tech_stacks: string[];
    index: number;
}

const CardProject = (props: TPropsCardProject) => {
    const { thumbnail, index } = props;
    const targetRef = useRef<HTMLDivElement | null>(null);

    return (
        <motion.div className="overflow-hidden  bg-card-transparent rounded-md " ref={targetRef} {...cardAnimation({ index })}>
            <Image
                src={thumbnail}
                className="h-[13rem] md:h-[15rem] aspect-square border-1 shadow-image-arise border-gray-500 "
                customeClassName={{ image: '' }}
                overlay={{
                    withBackdrop: true,
                    isShowOnHover: true,
                    content: (
                        <Container variant={'vee'} className="p-4 gap-3">
                            <Badge variant={'solid-primary'} label={'Website'} />
                            <Badge variant={'outline-white'} className="bg-transparent  font-bold" label={'Personal Project - Fullstack Developer'} />
                            <p className="font-bold ">11 April 2022 - 15 April 2025</p>
                        </Container>
                    ),
                }}
            />
            <div className="space-y-4 p-4">
                <h5 className="  text-body-large font-bold">{props.title}</h5>
                <p className=" line-clamp-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum consequatur suscipit illo, enim accusantium repellat?</p>
                <Container variant={'hsc'} className="!flex-wrap gap-3">
                    {props?.tech_stacks?.map((tect, i) => (
                        <Badge key={i} variant={'soft-gray'} label={tect} />
                    ))}
                </Container>
                <Button to={`/${routes.project?.child?.detail?.name}/${index}`} variant={'solid-black'}>
                    View Project <IconArrowUp className="icon-white rotate-90 mt-1" />
                </Button>
            </div>
        </motion.div>
    );
};

export default ProjectSection;
