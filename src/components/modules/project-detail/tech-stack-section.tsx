import ContainerSection from '@components/ui/container/container-section';
import Image from '@components/ui/image';
import { skillCategories } from '@lib/data/dummy';

const TechStackSection = () => {
  return (
    <ContainerSection title="Tech Stack" gap="large">
      <div className="flex gap-8 max-w-md flex-wrap items-center justify-center mx-auto">
        {skillCategories[0]?.skills.map((skill, j) => (
          <div>
            <Image
              className="w-[5rem] h-[5rem] hover:animate-pulse rounded-full p-5 bg-card-transparent"
              src={skill.url}
            />
            <p className="text-center">{skill.name}</p>
          </div>
        ))}
      </div>
    </ContainerSection>
  );
};

export default TechStackSection;
