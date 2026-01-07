import { TFormFilterEducation } from '@features/education/components/education-list/form-filter-education';
import { TEducationSchema } from '@features/education/validations/education-schema';

import { TTypeActionModalForm } from '@typescript/index-type';

const EVENT_EDUCATION = {
    SET_MODAL_FORM_EDUCATION: 'SET_MODAL_FORM_EDUCATION',
    SET_EDUCATION: 'SET_EDUCATION',
    SEARCH_DATA_TABLE_EDUCATION: 'SEARCH_DATA_TABLE_EDUCATION',
    REFRESH_DATA_TABLE_EDUCATION: 'REFRESH_DATA_TABLE_EDUCATION',

    SEARCH_DATA_TABLE_EDUCATION_WITH_CURR_FILTER: 'SEARCH_DATA_TABLE_EDUCATION_WITH_CURR_FILTER',
} as const;

export type TEventMapEducation = {
    [EVENT_EDUCATION.SET_MODAL_FORM_EDUCATION]: {
        isShow: boolean;
        action: TTypeActionModalForm;
    };
    [EVENT_EDUCATION.SET_EDUCATION]: TEducationSchema;
    [EVENT_EDUCATION.SEARCH_DATA_TABLE_EDUCATION]: TFormFilterEducation;
    [EVENT_EDUCATION.REFRESH_DATA_TABLE_EDUCATION]: boolean;
    [EVENT_EDUCATION.SEARCH_DATA_TABLE_EDUCATION_WITH_CURR_FILTER]:boolean
};

export default EVENT_EDUCATION;
