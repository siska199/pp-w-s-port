import { useContext } from 'react';

import { contextProject } from '@features/project/context/context-project';
import ContainerSection from '@components/ui/container/container-section';

const ResponsibilitySection = () => {
    const { project: data } = useContext(contextProject);

    if (data?.project_responsibilities?.length == 0) return null;
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
