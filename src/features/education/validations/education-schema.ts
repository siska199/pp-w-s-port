import { zDate, zNumber, zString } from '@validation/reusable-schema';
import z from 'zod';

import { TMasterEducationLevel } from '@typescript/master-module-types';
import { TOption } from '@typescript/ui-types';

export interface TOptionsFormEducation {
    levels: TOption[];
    majors: (TOption & {
        levels: TMasterEducationLevel[];
    })[];
    schools: (TOption & {
        levels: TMasterEducationLevel[];
    })[];
}

export const initialFormEducation = {
    id: {
        value: '',
        name: 'id',
        errorMessage: '',
        label: 'ID',
    },
    id_level: {
        name: 'id_level',
        label: 'Level',
        placeholder: 'Select a level',
        options: [] as TOptionsFormEducation['levels'],
        value: '',
        errorMessage: '',
    },
    id_major: {
        name: 'id_major',
        label: 'Major',
        placeholder: 'Select a major',
        options: [] as TOptionsFormEducation['majors'],
        value: '',
        errorMessage: '',
        disabled: true,
    },
    id_school: {
        name: 'id_school',
        label: 'School',
        placeholder: 'Select a school',
        options: [] as TOptionsFormEducation['schools'],
        value: '',
        errorMessage: '',
        disabled: true,
    },
    gpa: {
        name: 'gpa',
        label: 'GPA',
        placeholder: 'e.g 3.86',
        value: 0.0,
        errorMessage: '',
        type: 'float' as const,
        max: 100,
        min: 0,
    },
    start_at: {
        name: 'start_at',
        label: 'Start At',
        placeholder: 'Select a Start At',
        value: null,
        errorMessage: '',
    },
    end_at: {
        name: 'end_at',
        label: 'End At',
        placeholder: 'Select a End At',
        value: null,
        errorMessage: '',
        disabled: true,
    },
    description: {
        name: 'description',
        label: 'Description',
        placeholder: 'Enter a brief description of your education or experience',
        value: '',
        errorMessage: '',
    },
};

const educationSchema = z.object({
    id: zString({ name: 'ID', mandatory: false }),
    id_level: zString({ name: 'Level' }),
    id_major: zString({ name: 'Major' }),
    id_school: zString({ name: 'School' }),
    gpa: zNumber({ name: 'GPA' }),
    start_at: zDate({ name: 'Start At', mandatory: true }),
    end_at: zDate({ name: 'End At', mandatory: false }),
    description: zString({ name: 'Description' }),
});

export type TEducationSchema = z.input<typeof educationSchema>;

export default educationSchema;
