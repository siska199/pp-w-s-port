import { TFormFilterProject } from '@features/project/components/project-list/form-filter-project';
import { TProjectMenu } from '@features/project/validation/project-menu-schema';
import { TResponsibilityProject } from '@features/project/validation/responsiblity-project-schema';

import { TTypeActionData, TTypeActionModalForm } from '@typescript/index-type';

const EVENT_PROJECT = {
    SET_FORM_PROJECT: 'SET_FORM_PROJECT',
    SEARCH_DATA_TABLE_PROJECT: 'SEARCH_DATA_TABLE_PROJECT',
    REFRESH_DATA_TABLE_PROJECT: 'REFRESH_DATA_TABLE_PROJECT',

    SET_MODAL_FORM_MENU_PROJECT: 'SET_MODAL_FORM_MENU_PROJECT',
    SET_SELECTED_MENU_PROJECT: 'SET_SELECTED_MENU_PROJECT',
    REFRESH_DATA_LIST_MENU_PROJECT: 'REFRESH_DATA_LIST_MENU_PROJECT',

    SET_MODAL_FORM_RESPONSIBILITY_PROJECT: 'SET_MODAL_FORM_RESPONSIBILITY_PROJECT',
    SET_SELECTED_RESPONSIBILITY_PROJECT: 'SET_SELECTED_RESPONSIBILITY_PROJECT',

    ONCHANGE_TECH_STACKS: 'ONCHANGE_TECH_STACKS',
    ONCHANGE_LIST_MENU_PROJECT: 'ONCHANGE_LIST_MENU_PROJECT',
} as const;

export type TEventMapProject = {
    [EVENT_PROJECT.SET_FORM_PROJECT]: {
        action: TTypeActionModalForm;
        id: string;
    };
    [EVENT_PROJECT.SEARCH_DATA_TABLE_PROJECT]: TFormFilterProject;

    [EVENT_PROJECT.REFRESH_DATA_TABLE_PROJECT]: boolean;

    [EVENT_PROJECT.SET_MODAL_FORM_RESPONSIBILITY_PROJECT]: {
        isShow: boolean;
        action: TTypeActionModalForm;
    };

    [EVENT_PROJECT.SET_SELECTED_MENU_PROJECT]: {
        data: TProjectMenu;
        action: TTypeActionData;
    };
    [EVENT_PROJECT.SET_MODAL_FORM_MENU_PROJECT]: {
        isShow: boolean;
        action: TTypeActionModalForm;
    };

    [EVENT_PROJECT.SET_SELECTED_RESPONSIBILITY_PROJECT]: {
        action: TTypeActionData;
        data: TResponsibilityProject;
    };

    [EVENT_PROJECT.ONCHANGE_TECH_STACKS]: string[];

    [EVENT_PROJECT.ONCHANGE_LIST_MENU_PROJECT]: {
        action: TTypeActionData;
        projectMenu: TProjectMenu;
    };
    [EVENT_PROJECT.REFRESH_DATA_LIST_MENU_PROJECT]: boolean;
};

export default EVENT_PROJECT;
