import { zEnum, zFileLocale, zString } from '@validation/reusable-schema';
import { z } from 'zod';

import { optionsCategoryProject, optionsTypeProject } from '@features/project/constants';

import appMessage from '@lib/data/app-message';
import { TOption, TTypeFile } from '@typescript/ui-types';

export interface TOptionsFormEducation {
    companies: TOption[];
    tech_stacks: TOption[];
}

export const initialFormInformationProject = {
    id: {
        name: 'id',
        label: 'ID',
        value: '',
    },
    name: {
        name: 'name',
        label: 'Name',
        value: '',
        placeholder: 'e.g GOA (Garda oto Akses)',
    },
    category: {
        name: 'category',
        value: '',
        options: optionsCategoryProject,
        placeholder: appMessage.selectInputPlaceolder('category'),
        label: 'Category',
    },
    id_skill_users: {
        label: 'Tech Stacks',
        placeholder: 'e.g React, Node js, Golang',
        name: 'id_skill_users',
        options: [],
        value: [] as string[],
    },
    id_experiance: {
        label: 'Company',
        placeholder: 'e.g PT Astra International',
        name: 'id_experiance',
        options: [],
        value: '',
    },
    type: {
        name: 'type',
        value: '',
        options: optionsTypeProject,
        placeholder: appMessage.selectInputPlaceolder('type'),
        label: 'Type',
    },
    thumbnail_image: {
        name: 'thumbnail_image',
        label: 'Thumbnail',
        value: null as null | File,
        listAcceptedTypeFile: [TTypeFile.JPEG, TTypeFile.JPG, TTypeFile.PNG],
    },
    description: {
        name: 'description',
        label: 'Description',
        placeholder: 'Enter a brief description of your project',
        value: '',
        errorMessage: '',
        rows: 5,
        maxLength: 500,
    },
};
const informationProjectSchema = z.object({
    id: zString({ name: 'ID', mandatory: false }),
    name: zString({ name: 'Name' }),
    category: zEnum({ name: 'Category', enum: ['WEBSITE', 'MOBILE', 'API', 'UI-UX'] as const }),
    type: zEnum({
        name: 'Type',
        enum: ['PERSONAL_PROJECT', 'COMPANY_PROJECT', 'FREELANCE'] as const,
    }),
    thumbnail_image: zFileLocale({
        name: 'thumbnail_image',
        listAcceptedTypeFile: initialFormInformationProject.thumbnail_image.listAcceptedTypeFile,
    }),
    description: zString({
        name: 'Description',
        max: initialFormInformationProject.description.maxLength,
    }),
});

export type TProjectSchema = z.input<typeof informationProjectSchema>;

export default informationProjectSchema;
