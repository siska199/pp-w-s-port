import { zString } from '@validation/reusable-schema';
import z from 'zod';

export const initialFormProjectResponsibility = {
    id: {
        name: 'id',
        label: 'ID',
        value: '',
        errorMessage: '',
        isUpdated: false,
    },
    description: {
        name: 'description',
        label: 'Description',
        toolbar: {
            options: ['inline', 'colorPicker'],
            inline: {
                options: ['bold', 'underline', 'italic'],
            },
        },
        value: '',
        errorMessage: '',
        isUpdated: false,
    },
    id_project: {
        name: 'id_project',
        label: 'Id project',
        value: '',
        errorMessage: '',
        isUpdated: false,
    },
};

const projectResponsibilitySchema = z.object({
    description: zString({ name: 'Description', max: 2000 }),
    id: zString({ name: 'ID', mandatory: false }),
    id_project: zString({ name: 'ID Project', mandatory: false }),
});

export type TProjectResponsibility = z.input<typeof projectResponsibilitySchema>;

export default projectResponsibilitySchema;
