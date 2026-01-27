import { TMasterCategorySocialLink, TMasterProfession, TUser } from '@typescript/master-module-types';

export interface TKeyMetric {
    id?: string;
    key: string;
    value: string;

    isUpdated?: boolean;
}

export interface TSocialLink {
    id: string;
    url: string;
    id_category: string;
    id_user: string;
    category: TMasterCategorySocialLink;
}

export interface TSelectedSocialLink extends TSocialLink {
    errorMessage: string;
    default_value: string;
    value: string;
    image: string;
    name: string;
    placeholder: string;
    isUpdated: boolean;
}

export interface TPersonalInformation {
    id: string;
    professional_image: string;
    resume: string;
    first_name: string;
    last_name: string;

    id_province: string;
    id_city: string;
    id_district: string;
    id_postal_code: string;

    email: string;
    phone_number: string;
    about_me: string;
    bio: string;

    id_profession: string;
    profession?: TMasterProfession;

    user?: TUser;
}
