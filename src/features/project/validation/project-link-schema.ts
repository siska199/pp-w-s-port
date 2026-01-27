import { zString } from '@validation/reusable-schema';
import z from 'zod';

export const initialFormProjectLink = {
    id: {
        name: 'id',
        label: 'ID',
        value: '',
        errorMessage: '',
        isUpdated: false,
    },
    url: {
        name: 'url',
        label: 'URL',
        placeholder: 'e.g https://github.com/siska199',
        value: '',
        errorMessage: '',
        isUpdated: false,
    },
    label: {
        name: 'label',
        label: 'Label',
        placeholder: 'e.g 📂 Repository',
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

const projectLinkSchema = z.object({
    id: zString({ name: 'ID', mandatory: false }),
    url: zString({ name: 'Url' }),
    label: zString({ name: 'Label' }),
    id_project: zString({ name: 'ID Project', mandatory: false }),
});

export type TProjectLink = Required<z.input<typeof projectLinkSchema>>;

export default projectLinkSchema;
