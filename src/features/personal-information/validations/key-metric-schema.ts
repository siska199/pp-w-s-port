import { zString } from '@validation/reusable-schema';
import z from 'zod';

export const initialFormKeyMetric = {
    id: {
        value: '',
        name: 'id',
        errorMessage: '',
        label: 'ID',
    },
    key: {
        name: 'key',
        label: 'Key',
        placeholder: 'e.g Years of experience',
        value: '',
        errorMessage: '',
    },
    value: {
        name: 'value',
        label: 'Value',
        placeholder: 'e.g 4',
        value: '',
        errorMessage: '',
    },
};

const keyMetricSchema = z.object({
    id: zString({ name: 'ID', mandatory: false }),
    key: zString({ name: 'Key' }),
    value: zString({ name: 'Value' }),
});

export type TKeyMetricSchema = z.input<typeof keyMetricSchema>;

export default keyMetricSchema;
