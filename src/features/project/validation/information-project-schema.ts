import { zArray, zDate, zEnum, zFileLocale, zString } from '@validation/reusable-schema';
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
        errorMessage: '',
        isUpdated: false,
    },
    name: {
        name: 'name',
        label: 'Name',
        value: '',
        placeholder: 'e.g GOA (Garda oto Akses)',
        errorMessage: '',
    },
    category: {
        name: 'category',
        value: '',
        options: optionsCategoryProject,
        placeholder: appMessage.selectInputPlaceolder('category'),
        label: 'Category',
        errorMessage: '',
    },
    id_skill_users: {
        label: 'Tech Stacks',
        placeholder: 'e.g React, Node js, Golang',
        name: 'id_skill_users',
        options: [],
        value: [] as string[],
        errorMessage: '',
    },
    id_experiance: {
        label: 'Company (Opsional)',
        placeholder: 'e.g PT Astra International',
        name: 'id_experiance',
        options: [],
        value: '',
        errorMessage: '',
    },
    type: {
        name: 'type',
        value: '',
        options: optionsTypeProject,
        placeholder: appMessage.selectInputPlaceolder('type'),
        label: 'Type',
        errorMessage: '',
    },
    thumbnail_image: {
        name: 'thumbnail_image',
        label: 'Thumbnail (Opsional)',
        value: null as null | File,
        listAcceptedTypeFile: [TTypeFile.JPEG, TTypeFile.JPG, TTypeFile.PNG],
        isCompress: true,
        errorMessage: '',
    },
    description: {
        name: 'description',
        label: 'Description',
        placeholder: 'Enter a brief description of your project',
        value: '',
        errorMessage: '',
        rows: 5,
        maxLength: 10000,
    },
    start_at: {
        name: 'start_at',
        label: 'Start At (Opsional)',
        placeholder: appMessage.selectInputPlaceolder('start at date'),
        value: null,
        errorMessage: '',
    },
    end_at: {
        name: 'end_at',
        label: 'End At (Opsional)',
        placeholder: appMessage.selectInputPlaceolder('end at date'),
        value: null,
        errorMessage: '',
    },
    id_profession: {
        name: 'id_profession',
        label: 'Role',
        placeholder: appMessage.selectInputPlaceolder('role'),
        options: [] as TOption[],
        value: '',
        errorMessage: '',
    },
    is_show: {
        name: 'is_show',
        label: 'Is Show Project',
        placeholder: appMessage.selectInputPlaceolder('Is Show Project'),
        value: 'true',
        errorMessage: '',
    },
};
const informationProjectSchema = z.object({
    id: zString({ name: 'ID', mandatory: false }),
    name: zString({ name: 'Name' }),
    category: zEnum({ name: 'Category', enum: ['WEBSITE', 'MOBILE', 'API', 'UI-UX'] as const }),
    id_experiance: zString({ name: 'Company', mandatory: false }),
    type: zEnum({
        name: 'Type',
        enum: ['PERSONAL_PROJECT', 'COMPANY_PROJECT', 'FREELANCE'] as const,
    }),
    thumbnail_image: zFileLocale({
        name: 'thumbnail_image',
        listAcceptedTypeFile: initialFormInformationProject.thumbnail_image.listAcceptedTypeFile,
        mandatory: false,
    }),
    description: zString({
        name: 'Description',
        max: initialFormInformationProject.description.maxLength,
    }),
    id_skill_users: zArray({
        name: 'Tech Stack',
        mandatory: true,
    }),
    id_profession: zString({ name: 'Role' }),
    start_at: zDate({ name: 'Start At', mandatory: false }),
    end_at: zDate({ name: 'End At', mandatory: false }),
    is_show: zString({
        name: 'Is Show Project',
        mandatory: false,
    }),
});

export type TInformationProjectSchema = z.input<typeof informationProjectSchema>;
export type TOptionalInformationProjectSchema = Partial<TInformationProjectSchema>;
export default informationProjectSchema;
