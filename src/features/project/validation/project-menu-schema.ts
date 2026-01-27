import { zFileLocale, zString } from '@validation/reusable-schema';
import { z } from 'zod';

import { TFileValue } from '@components/ui/input/input-file/input-file-v1';

import { defaultTTypeImage } from '@lib/helper/constant';
import { TTypeFile } from '@typescript/ui-types';

const projectMenuSchema = z.object({
    id: zString({ name: 'ID', mandatory: false }),
    name: zString({ name: 'Name' }),
    main_image: zFileLocale({ name: 'Main Image', listAcceptedTypeFile: [TTypeFile.IMAGE_ALL], mandatory: false }),
    description: zString({ name: 'Description', max: 1000 }),
    features: zString({ name: 'Description', max: 10000, mandatory: false }),
    related_images: z.array(zFileLocale({ name: 'Related Images', listAcceptedTypeFile: [TTypeFile.IMAGE_ALL], mandatory: false })).max(5, { message: 'A maximum of 5 images are allowed' }),
});

export type TProjectMenu = z.input<typeof projectMenuSchema> & {
    id: string;
};

export const initialFormProjectMenu = {
    id: {
        value: '',
        name: 'id',
        errorMessage: '',
        label: 'ID',
        isUpdated: false,
    },
    name: {
        name: 'name',
        label: 'Name',
        placeholder: 'e.g Login',
        value: '',
        errorMessage: '',
        isUpdated: false,
    },
    main_image: {
        name: 'main_image',
        label: 'Main Image (Opsional)',
        value: null,
        listAcceptedTypeFile: defaultTTypeImage,
        errorMessage: '',
        isUpdated: false,
    },
    description: {
        name: 'description',
        label: 'Desription',
        value: '',
        rows: 5,
        placeholder: 'Write a description about your menu project',
        errorMessage: '',
        isUpdated: false,
    },

    features: {
        name: 'features',
        label: 'Features (Opsional)',
        value: '',
        placeholder: 'List the features of your menu project',
        errorMessage: '',
        isUpdated: false,
    },
    related_images: {
        name: 'related_images',
        label: 'Related Images (Opsional)',
        value: [] as TFileValue[],
        multiple: true,
        totalMaxSize: 30,
        errorMessage: '',
        isUpdated: false,
    },
};
export default projectMenuSchema;
