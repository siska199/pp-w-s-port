import { TMasterSkill } from "@typescript/master-module-types";

export enum TTypeLevelSkill {
    ADVANCE = 'ADVANCE',
    INTERMEDIATE = 'INTERMEDIATE',
    BEGINNER = 'BEGINNER',
}

export interface TSkillUser {
    id: string;
    id_skill: string;
    skill_name: string;

    years_of_experiance: number;

    level: TTypeLevelSkill;
    id_user: string;
    created_at: string;
    updated_at: string;
    id_category: string;
    category_name: string;
    years_of_experience: string;

    project_tech_stacks: {
        id: string;
        name: string;
    }[];

    skill?: TMasterSkill
}

export interface TCategorySkill {
    id: string;
    name: string;
}
