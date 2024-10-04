import { cardSkillAnimation } from '@assets/styles/animation';
import ContainerSection from '@components/modules/portofolio/container-section';
import Badge from '@components/ui/badge';
import Button from '@components/ui/button';
import Container from '@components/ui/container';
import Image from '@components/ui/image';
import { skillCategories } from '@lib/data/dummy';
import { cn } from '@lib/helper';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const SkillSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <ContainerSection title="Skill">
      <Container
        variant={'hsc'}
        gap="large"
        className="flex-col md:flex-row flex-grow"
      >
        <Container
          gap="base"
          className="flex-row md:flex-col md:pb-0 md:border-none w-auto"
        >
          {skillCategories?.map((category, i) => (
            <Button
              key={i}
              variant={'no-style'}
              className={cn({
                'bg-glass-animation text-body-medium font-medium md:min-w-[10rem] !justify-start !text-start':
                  true,
                'bg-glass': i === activeIndex,
              })}
              onClick={() => setActiveIndex(i)}
            >
              {category?.name}
            </Button>
          ))}
        </Container>

        <AnimatePresence mode="wait">
          <div className="md:p-8 grid grid-cols-2 md:flex flex-wrap m-auto justify-center items-center gap-4">
            {skillCategories[activeIndex]?.skills.map((skill, j) => (
              <CardItemSkill key={j} {...skill} index={j} />
            ))}
          </div>
        </AnimatePresence>
      </Container>
    </ContainerSection>
  );
};

interface TCardItemSkill {
  name: string;
  url: string;
  index: number;
}

const CardItemSkill = (props: TCardItemSkill) => {
  const { name, url, index } = props;
  return (
    <motion.div
      key={name}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      custom={index}
      variants={cardSkillAnimation}
      viewport={{ once: true }}
      className=" bg-card-transparent  flex gap-4 items-center md:min-w-[8rem] p-4 rounded-md"
    >
      <Image
        src={url}
        className="w-10 md:w-[3.5rem] aspect-square rounded-full shadow-2xl"
      />
      <div className="flex flex-col gap-2">
        <p className="md:text-body-medium font-bold line-clamp-1 text-start ">
          {name}
        </p>
        <Badge
          className="truncate"
          variant={'solid-blue'}
          label={'3+ Project'}
        />
      </div>
    </motion.div>
  );
};

export default SkillSection;