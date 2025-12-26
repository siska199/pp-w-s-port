import { useState } from 'react';


import useProjectMenuApi, { TParamsListProjectMenu } from '@features/project/apis/use-project-menu-api';
import { TProjectMenuParams } from '@features/project/types/project-type';

const useProjectMenu = () => {
    const [listProjectMenu, setListProjectMenu] = useState<TProjectMenuParams[]>([]);
    const { getListProjectMenu: getListProjectMenuApi } = useProjectMenuApi();

    const getListProjectMenu = async (params: TParamsListProjectMenu) => {
        const result = await getListProjectMenuApi(params);
        if (!result.data) return;
        setListProjectMenu(result.data);
    };

    return {
        listProjectMenu,
        getListProjectMenu,
    };
};

export default useProjectMenu;
