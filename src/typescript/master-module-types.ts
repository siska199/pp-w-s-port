export interface TMasterProfession {
    id: string;
    name: string;
}

export interface TMasterCompany {
    id: string;
    name: string;
    image: string;
}

export interface TMasterCategorySocialLink {
    id: string;
    name: string;
    image: string;
    placeholder: string;
    default_value: string;
}

export interface TMasterEducationLevel {
    id: string;
    name: string;
}

export interface TMasterEducationMajor {
    id: string;
    name: string;
    id_levels: string[];
    levels: TMasterEducationLevel[];
}

export interface TMasterEducationSchool {
    id: string;
    name: string;
    id_levels: string;
    levels: TMasterEducationLevel[];
}

export interface TMasterSkill {
    id: string;
    name: string;
    image: string;
    color: string;
    id_category: string;
    created_at: string;
    updated_at: string;
}

export interface TMasterCategorySkill {
    id: string;
    name: string;
}
export interface TUser {
    first_name: string;
    last_name: string;
    username: string;
    password: string;
    email: string;
    phone_number: number;
    id_profession: string;

    id: string;
    image: string;
    profession: TMasterProfession;
}

export interface TMasterCompany {
    id: string;
    name: string;
    image: string;
}
