import { TExperiance } from '@features/experiance/types/experiance-type';
import { TKeyVariantBadge } from '@lib/helper/variant/variant-badge';

export enum TTypeCategoryProject {
    WEBSITE = 'WEBSITE',
    MOBILE = 'MOBILE',
    API = 'API',
    UI_UX = 'UI_UX',
}

export enum TTypeTypeProject {
    PERSONAL_PROJECT = 'PERSONAL_PROJECT',
    COMPANY_PROJECT = 'COMPANY_PROJECT',
    FREELANCE = 'FREELANCE',
}

export interface TProject {
    id: string;
    name: string;
    thumbnail_image: string;
    description: string;
    category: TTypeCategoryProject;
    type: TTypeTypeProject;
    id_experiance: string;
    id_user: string;
    experiance: TExperiance;
    title: string;
    company_name: string;
    tech_stacks: TProjectTechStack[];
    id_skill_users: string[];
}



export interface TProjectMenuItem {
    id: string;
    name: string;
    description: string;
    main_image: string | null;
    features: string;
    id_project?: string;
    related_images: TProjectRelatedImageMenu[];
}

export interface TProjectRelatedImageMenu {
    id: string;
    image: string;
    id_project_menu?: string;
}

export interface TProjectTechStack {
    id: string;
    id_project: string;
    id_skill_user: string;
    name: string;
    color: TKeyVariantBadge;
}

export interface TProjectResponsibilityItem {
    id: string;
    description: string;
    id_project: string;
}
