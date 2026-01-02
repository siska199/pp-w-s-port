import ContainerSection from '@components/ui/container/container-section';
import { contextProject } from '@features/project/context/context-project';
import { useContext } from 'react';

const ResponsibilitySection = () => {
    const { project: data } = useContext(contextProject);

    return (
        <ContainerSection title="Responsibility">
            <ul className="space-y-4 list-disc">
                {data?.project_responsibilities?.map((responsibility, i) => (
                    <li key={i} className="ml-4" dangerouslySetInnerHTML={{ __html: responsibility.description ?? '' }}></li>
                ))}
            </ul>
        </ContainerSection>
    );
};

export default ResponsibilitySection;
