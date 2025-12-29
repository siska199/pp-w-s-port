import { useContext, useEffect } from 'react';
import { motion } from 'framer-motion';

import { contextPortfolio } from '@features/portofolio/context/context-portofolio';
import { TSkillUser } from '@features/skill-user/types/skill-user-type';
import Badge from '@components/ui/badge';
import Button from '@components/ui/button';
import Container from '@components/ui/container/container';
import ContainerSection from '@components/ui/container/container-section';
import Image from '@components/ui/image';

import { useFetchOnView } from '@hooks/use-fetch-on-view';
import { cn } from '@lib/helper/function';
import { cardAnimation, slideInAnimation } from '@assets/styles/animation';

const SkillSection = () => {
    const { isLoading, activeIdCat, skillList, skillCategoryList, getSkillList, getSkillCategoryList } = useContext(contextPortfolio);

    const { ref } = useFetchOnView({
        fetcher: async () => {
            await getSkillCategoryList();
        },
    });

    useEffect(() => {
        const id_category = skillCategoryList?.[0]?.categoryId || '';
        if (id_category) {
            getSkillList({
                id_category,
            });
        }
    }, [skillCategoryList?.length]);

    return (
        <ContainerSection ref={ref} title={'Skill'} className="h-screen">
            {isLoading['SKILL_CATEGORY'] ? (
                <div className="my-auto">Loading Section Skill...</div>
            ) : (
                <Container variant={'hsc'} gap="large" className="flex-col md:flex-row flex-grow">
                    <motion.div {...slideInAnimation({ direction: 'left' })}>
                        <Container gap="base" className="flex-row md:flex-col md:pb-0 md:border-none w-auto">
                            {skillCategoryList?.map((category, i) => (
                                <Button
                                    key={i}
                                    variant={'no-style'}
                                    className={cn({
                                        'bg-glass-animation flex flex-grow text-body-medium font-medium md:min-w-[10rem] !justify-start !text-start': true,
                                        'bg-glass': category?.categoryId === activeIdCat,
                                    })}
                                    onClick={() => getSkillList({ id_category: category?.categoryId })}
                                >
                                    {category?.categoryName}
                                </Button>
                            ))}
                        </Container>
                    </motion.div>

                    <div className="md:p-8 grid grid-cols-2 md:flex flex-wrap m-auto justify-center items-center gap-4">
                        {isLoading['SKILL_LIST'] && <div>Loading Skill</div>}
                        {skillList.map((skill, j) => (
                            <CardItemSkill key={j} {...skill} index={j} />
                        ))}
                    </div>
                </Container>
            )}
        </ContainerSection>
    );
};

type TCardItemSkill = TSkillUser & {
    index: number;
};

const CardItemSkill = (props: TCardItemSkill) => {
    const { skill_name, index, skill, project_tech_stacks } = props;
    return (
        <motion.div key={skill_name} {...cardAnimation({ index })} className=" bg-card-transparent  flex gap-4 items-center md:w-[12rem] md:max-w-[12rem] md:min-w-[12rem] p-4 rounded-md">
            <Image src={skill?.image || ''} className="w-10 md:w-[3.5rem] flex-shrink-0 aspect-square rounded-full shadow-2xl" />
            <div className="flex flex-col gap-2">
                <p className="md:text-body-medium font-bold line-clamp-1 text-start ">{skill_name}</p>
                <Badge className="truncate" variant={'solid-blue'} label={`${project_tech_stacks.length}+ Project`} />
            </div>
        </motion.div>
    );
};

export default SkillSection;
