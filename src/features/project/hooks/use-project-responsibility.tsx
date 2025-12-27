import useProjectResponsibilityApi, { TParamsListProjectResponsibility } from '@features/project/apis/use-project-responsibility-api';
import { TProjectResponsibilityItem } from '@features/project/types/project-type';
import { useState } from 'react';

const useProjectResponsibility = () => {
    const [listProjectResponsibility, setListProjectResponsibility] = useState<TProjectResponsibilityItem[]>([]);
    const { getListProjectResponsibility: getListProjectResponsibilityApi } = useProjectResponsibilityApi();

    const getListProjectResponsibility = async (params: TParamsListProjectResponsibility) => {
        const result = await getListProjectResponsibilityApi(params);
        if (!result.data) return;
        setListProjectResponsibility(result.data);
    };

    return {
        listProjectResponsibility,
        getListProjectResponsibility,
    };
};

export default useProjectResponsibility;
