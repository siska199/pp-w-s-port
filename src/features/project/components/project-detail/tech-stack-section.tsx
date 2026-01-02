import ContainerSection from '@components/ui/container/container-section';
import Image from '@components/ui/image';
import { contextProject } from '@features/project/context/context-project';
import { useContext } from 'react';

const TechStackSection = () => {
    const { project: data } = useContext(contextProject);

    return (
        <ContainerSection title="Tech Stack" gap="large" className="min-h-screen">
            <div className="flex flex-wrap h-auto gap-8  w-full max-w-md  items-center justify-center mx-auto">
                {data.tech_stacks?.map((skill, j) => (
                    <div key={j}>
                        <Image className="w-[5rem] h-[5rem] hover:animate-pulse rounded-full p-5 bg-card-transparent " src={skill?.image} />
                        <p className="text-center">{skill.name}</p>
                    </div>
                ))}
            </div>
        </ContainerSection>
    );
};

export default TechStackSection;
