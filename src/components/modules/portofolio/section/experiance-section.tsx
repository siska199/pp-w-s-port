import ContainerSection from '@components/modules/portofolio/container-section';
import Badge from '@components/ui/badge';
import Container from '@components/ui/container';
import { useScrollCustome } from '@hooks/useScrollCustome';
import { experiances } from '@lib/data/dummy';
import { motion, useScroll } from 'framer-motion';
import { useEffect, useRef } from 'react';

const ExperianceSection = () => {
  return (
    <ContainerSection title="Experiance" className="">
      <Container className="h-full w-auto relative px-8 md:px-0 ">
        {experiances?.map((experiance, i) => (
          <CardExperiance key={i} {...experiance} />
        ))}
      </Container>
    </ContainerSection>
  );
};

interface TPropsExperiance {
  companyName: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  projects: string[];
  techStack: string[];
}

const CardExperiance = (props: TPropsExperiance) => {
  const { companyName, position, startDate, endDate, projects, techStack } =
    props;

  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScrollCustome({
    targetRef,
    offset: ['0 1', '1.33 1'],
  });

  return (
    <motion.div
      style={{ scale: scrollYProgress, opacity: scrollYProgress }}
      className="relative md:mb-8"
      ref={targetRef}
    >
      <div className="rounded-full flex items-center justify-center bg-glass z-2 absolute -left-[2.75rem] md:-left-[0.85rem] top-[1rem] p-2">
        <div className="w-3 h-3 bg-white rounded-full" />
      </div>

      <div className="md:ml-6 space-y-2  p-4 rounded-md md:max-w-md">
        <h5 className="text-body-large">
          {companyName} - {position}
        </h5>
        <p className="font-thin">
          {startDate} | {endDate}
        </p>

        <div className="flex gap-6 justify-between">
          <p className="font-medium w-auto min-w-[5rem]">Tech Stacks</p>
          <Container variant={'hsc'} className="!flex-wrap gap-3">
            {techStack?.map((tect, i) => (
              <Badge key={i} variant={'soft-gray'} label={tect} />
            ))}
          </Container>
        </div>

        <div className="space-y-2">
          <p className="font-medium">Projects</p>
          <ul className="flex flex-col gap-2">
            {projects?.map((project, i) => (
              <li
                key={i}
                className="p-2 bg-glass-animation border-b cursor-pointer-custome rounded-md font-thin"
              >
                {'-'} {project}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default ExperianceSection;
