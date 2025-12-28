import { TProject, TProjectTechStack } from '@features/project/types/project-type';

import { TMasterCompany, TMasterProfession } from '@typescript/master-module-types';

export interface TExperiance {
    id: string;
    is_user: string;
    id_company: string;
    id_profession: string;
    start_at: Date;
    end_at: Date;
    is_currently_work_here: boolean;
    description: string;
    company: TMasterCompany;
    profession: TMasterProfession;
    company_name: string;
    profession_name: string;
    projects: TProject[];
    tech_stacks: TProjectTechStack[];
    created_at: string;
    updated_at: string;
}
