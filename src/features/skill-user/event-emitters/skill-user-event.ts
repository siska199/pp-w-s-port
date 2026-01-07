import { TFilterSkillUser } from '@features/skill-user/components/skill-user-list/form-filter-skill-user';
import { TSkillUserSchema } from '@features/skill-user/validation/skill-user-schema';

import { TTypeActionModalForm } from '@typescript/index-type';

const EVENT_SKILL_USER = {
    SET_MODAL_FORM_SKILL_USER: 'SET_MODAL_FORM_SKILL_USER',
    SET_SKILL_USER: 'SET_SKILL_USER',
    SEARCH_DATA_TABLE_SKILL_USER: 'SEARCH_DATA_TABLE_SKILL_USER',
    REFRESH_DATA_TABLE_SKILL_USER: 'REFRESH_DATA_TABLE_SKILL_USER',
    SEARCH_DATA_TABLE_SKILL_USER_WITH_CURR_FILTER: 'SEARCH_DATA_TABLE_SKILL_USER_WITH_CURR_FILTER',
} as const;

export type TEventMapSkillUser = {
    [EVENT_SKILL_USER.SET_MODAL_FORM_SKILL_USER]: {
        isShow: boolean;
        action: TTypeActionModalForm;
    };
    [EVENT_SKILL_USER.SET_SKILL_USER]: TSkillUserSchema;
    [EVENT_SKILL_USER.SEARCH_DATA_TABLE_SKILL_USER]: TFilterSkillUser;
    [EVENT_SKILL_USER.REFRESH_DATA_TABLE_SKILL_USER]: boolean;
    [EVENT_SKILL_USER.SEARCH_DATA_TABLE_SKILL_USER_WITH_CURR_FILTER]: true;
};

export default EVENT_SKILL_USER;
