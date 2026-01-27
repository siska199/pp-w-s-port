import { messageError } from '@validation/constant';
import { zBooleanCheckbox, zDate, zString } from '@validation/reusable-schema';
import z from 'zod';

import appMessage from '@lib/data/app-message';
import { TOption } from '@typescript/ui-types';
export interface TOptionsFormExperiance {
    companies: TOption[];
    professions: TOption[];
}
const experianceSchema = z
    .object({
        id: zString({ name: 'ID', mandatory: false }),
        id_company: zString({ name: 'Company' }),
        id_profession: zString({ name: 'Profession' }),
        start_at: zDate({ name: 'Start At' }),
        end_at: zDate({ name: 'End At', mandatory: false }),
        description: zString({ name: 'Description', max: 10000 }),
        is_currently_work_here: zBooleanCheckbox({ name: 'Currently Work Here' }),
    })
    .superRefine((data, ctx) => {
        const defaultValueDate = '1970-01-01T00:00:00.000Z';
        if (data.is_currently_work_here !== 'true' && [defaultValueDate, '', null, undefined]?.includes(data.end_at as any)) {
            ctx.addIssue({
                path: ['end_at'],
                code: z.ZodIssueCode.custom,
                message: messageError.required('End Date'),
            });
        }
    });

export type TExperianceSchema = z.input<typeof experianceSchema>;

export const initialFormExperiance = {
    id: {
        value: '',
        name: 'id',
        errorMessage: '',
        label: 'ID',
    },
    id_company: {
        name: 'id_company',
        label: 'Company',
        placeholder: appMessage.selectInputPlaceolder('company'),
        options: [] as TOption[],
        value: '',
        errorMessage: '',
    },
    id_profession: {
        name: 'id_profession',
        label: 'Profession',
        placeholder: appMessage.selectInputPlaceolder('profession'),
        options: [] as TOption[],
        value: '',
        errorMessage: '',
    },
    start_at: {
        name: 'start_at',
        label: 'Start At',
        placeholder: appMessage.selectInputPlaceolder('start at date'),
        value: null,
        errorMessage: '',
    },
    end_at: {
        name: 'end_at',
        label: 'End At',
        placeholder: appMessage.selectInputPlaceolder('end at date'),
        value: null,
        errorMessage: '',
    },
    description: {
        name: 'description',
        label: 'Description',
        value: '',
        errorMessage: '',
    },
    is_currently_work_here: {
        name: 'is_currently_work_here',
        label: 'Is Currently Work Here',
        placeholder: appMessage.selectInputPlaceolder('Is Currently Work Here'),
        value: 'false',
        errorMessage: '',
    },
};

export default experianceSchema;
