import React, { createContext, SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useProjectAPI from '@features/project/apis/use-project-api';
import { TProject } from '@features/project/types/project-type';

export interface TContextProject {
    isLoading: boolean;
    setIsLoading: React.Dispatch<SetStateAction<boolean>>;

    project: TProject;
}

const initialContextProject = {
    project: {} as TProject,
    setProject: () => null,
    isLoading: false,
    setIsLoading: () => null,
};

export const contextProject = createContext<TContextProject>(initialContextProject);

const ContextProjectProvider = (props: { children: React.ReactNode }) => {
    const { children } = props;
    const { id = '' } = useParams();

    const { getProjectDetail: getProjectDetailApi } = useProjectAPI();

    const [isLoading, setIsLoading] = useState(false);

    const [project, setProject] = useState<TProject>({} as TProject);

    useEffect(() => {
        getProjectDetail();
    }, []);

    const getProjectDetail = async () => {
        setIsLoading(true);
        const result = await getProjectDetailApi(id,false);
        if (!result.data) return;
        setProject(result.data);
        setIsLoading(true);
    };

    return (
        <contextProject.Provider
            value={{
                isLoading,
                setIsLoading,
                project,
            }}
        >
            {children}
        </contextProject.Provider>
    );
};
export default ContextProjectProvider;
