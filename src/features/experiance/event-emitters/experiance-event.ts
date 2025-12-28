import { TFilterExperiance } from '@features/experiance/components/experiance-list/form-filter-experiance';
import { TExperianceSchema } from '@features/experiance/validation/experiance-schema';

import { TTypeActionModalForm } from '@typescript/index-type';

const EVENT_EXPERIANCE = {
    SET_MODAL_FORM_EXPERIANCE: 'SET_MODAL_FORM_EXPERIANCE',
    SET_EXPERIANCE: 'SET_EXPERIANCE',
    SEARCH_DATA_TABLE_EXPERIANCE: 'SEARCH_DATA_TABLE_EXPERIANCE',
    REFRESH_DATA_TABLE_EXPERIANCE: 'REFRESH_DATA_TABLE_EXPERIANCE',
} as const;

export type TEventMapExperiance = {
    [EVENT_EXPERIANCE.SET_MODAL_FORM_EXPERIANCE]: {
        isShow: boolean;
        action: TTypeActionModalForm;
    };
    [EVENT_EXPERIANCE.SET_EXPERIANCE]: TExperianceSchema;
    [EVENT_EXPERIANCE.SEARCH_DATA_TABLE_EXPERIANCE]: TFilterExperiance;
    [EVENT_EXPERIANCE.REFRESH_DATA_TABLE_EXPERIANCE]: boolean;
};

export default EVENT_EXPERIANCE;
