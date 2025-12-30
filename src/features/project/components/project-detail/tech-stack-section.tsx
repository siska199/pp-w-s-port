import ContainerSection from '@components/ui/container/container-section';

const TechStackSection = () => {
    return (
        <ContainerSection title="Tech Stack" gap="large" className="">
            <div className="flex flex-wrap h-auto gap-8  w-full max-w-md  items-center justify-center mx-auto">
                {/* {skillCategories[0]?.skills.map((skill, j) => (
                    <div key={j}>
                        <Image className="w-[5rem] h-[5rem] hover:animate-pulse rounded-full p-5 bg-card-transparent " src={skill.url} />
                        <p className="text-center">{skill.name}</p>
                    </div>
                ))} */}
            </div>
        </ContainerSection>
    );
};

export default TechStackSection;
