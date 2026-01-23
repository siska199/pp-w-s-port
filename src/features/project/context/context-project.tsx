import React, { createContext, SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useProjectAPI from '@features/project/apis/use-project-api';
import { TProject } from '@features/project/types/project-type';

export interface TContextProject {
    isLoading: boolean;
    setIsLoading: React.Dispatch<SetStateAction<boolean>>;
    acitiveMenuIndex: number | null;
    project: TProject;
    setActiveMenuIndex: React.Dispatch<SetStateAction<number | null>>;
}

const initialContextProject = {
    project: {} as TProject,
    setProject: () => null,
    isLoading: false,
    setIsLoading: () => null,
    acitiveMenuIndex: 0,
    setActiveMenuIndex: () => null,
};

export const contextProject = createContext<TContextProject>(initialContextProject);

const ContextProjectProvider = (props: { children: React.ReactNode }) => {
    const { children } = props;
    const { id = '' } = useParams();

    const { getProjectDetail: getProjectDetailApi } = useProjectAPI();

    const [isLoading, setIsLoading] = useState(false);

    const [project, setProject] = useState<TProject>({} as TProject);
    const [acitiveMenuIndex, setActiveMenuIndex] = useState<number | null>(null);

    useEffect(() => {
        getProjectDetail();
    }, []);

    const getProjectDetail = async () => {
        setIsLoading(true);
        const result = await getProjectDetailApi(id, false);
        if (!result.data) return;
        setProject(result.data);
        setActiveMenuIndex(0)
        setIsLoading(true);
    };

    return (
        <contextProject.Provider
            value={{
                isLoading,
                setIsLoading,
                project,
                acitiveMenuIndex,
                setActiveMenuIndex,
            }}
        >
            {children}
        </contextProject.Provider>
    );
};
export default ContextProjectProvider;
