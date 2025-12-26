import { zEmail, zFileLocale, zPhoneNumber, zString } from '@validation/reusable-schema';
import z from 'zod';

import { TTypeFile } from '@typescript/ui-types';
import { TOption } from '@typescript/ui-types';

export const initialFormGeneralPersonalInfo = {
    id: {
        value: '',
        name: 'id',
        errorMessage: '',
        label: 'ID',
    },
    first_name: {
        name: 'first_name',
        label: 'First Name',
        placeholder: 'e.g Siska Apriana',
        value: '',
        errorMessage: '',
    },
    last_name: {
        name: 'last_name',
        label: 'Last Name',
        placeholder: 'e.g Rifianti',
        value: '',
        errorMessage: '',
    },
    email: {
        name: 'email',
        label: 'email',
        placeholder: 'e.g XXXXX@gmail.com',
        value: '',
        errorMessage: '',
    },
    phone_number: {
        name: 'phone_number',
        placeholder: 'e.g 08X-XXX-XXX-XXX',
        label: 'Phone Number',
        value: '',
        errorMessage: '',
    },
    id_profession: {
        name: 'id_profession',
        label: 'Profession',
        options: [] as TOption[],
        placeholder: 'e.g Frontend Developer',
        value: '',
        errorMessage: '',
    },

    id_province: {
        name: 'id_province',
        options: [] as TOption[],
        label: 'Province (Opsional)',
        placeholder: 'e.g Jawa Timur',
        value: '',
        autoComplete: 'new-password',
        errorMessage: '',
        disabled: false,
    },
    id_city: {
        name: 'id_city',
        placeholder: 'e.g Situbondo',
        label: 'City (Opsional)',
        options: [] as TOption[],
        disabled: true,
        value: '',
        autoComplete: 'new-password',
        errorMessage: '',
    },
    id_district: {
        name: 'id_district',
        label: 'District (Opsional)',
        placeholder: 'e.g Besuki',
        options: [] as TOption[],
        disabled: true,
        value: '',
        autoComplete: 'new-password',
        errorMessage: '',
    },

    id_postal_code: {
        name: 'id_postal_code',
        options: [] as TOption[],
        label: 'Postal Code (Opsional)',
        placeholder: 'e.g 68356',
        disabled: true,
        value: '',
        errorMessage: '',
        autoComplete: 'new-password',
    },

    bio: {
        name: 'bio',
        maxLength: 100,
        label: 'Bio',
        placeholder: `e.g I'm Frontend Developer based on Jakarta, Indonesia`,
        value: '',
        errorMessage: '',
    },
    about_me: {
        name: 'about_me',
        label: 'About Me',
        placeholder: 'Write a brief summary about your professional background and skills',
        value: '',
        maxLength: 1500,
        rows: 4,
        errorMessage: '',
    },
    professional_image: {
        name: 'professional_image',
        label: 'Professional Image',
        value: null as null | File,
        listAcceptedTypeFile: [TTypeFile.JPEG, TTypeFile.JPG, TTypeFile.PNG, TTypeFile.PDF],
        errorMessage: '',
    },
    resume: {
        name: 'resume',
        label: 'Resume',
        value: null as null | File,
        listAcceptedTypeFile: [TTypeFile.PDF],
        totalMaxSize: 10,
        errorMessage: '',
 
    },
};

export type TFormGeneralPersonalInfo = typeof initialFormGeneralPersonalInfo;

const generalPersonalInfoSchema = z
    .object({
        id: zString({ name: 'ID', mandatory: false }),
        first_name: zString({ name: 'First Name', max: 50 }),
        last_name: zString({ name: 'Last Name', max: 50 }),
        id_profession: zString({ name: 'Profession' }),

        id_province: zString({ name: 'Province', max: 255, mandatory: false }),
        id_city: zString({ name: 'City', max: 255, mandatory: false }),
        id_district: zString({ name: 'District', max: 255, mandatory: false }),
        id_postal_code: zString({ name: 'Postal Code', max: 255, mandatory: false }),

        phone_number: zPhoneNumber(true),
        email: zEmail(),
        bio: zString({ name: 'Bio', max: 100 }),
        about_me: zString({ name: 'About Me', max: initialFormGeneralPersonalInfo.about_me.maxLength }),
        professional_image: zFileLocale({
            name: 'Professional Image',
            listAcceptedTypeFile: initialFormGeneralPersonalInfo.professional_image.listAcceptedTypeFile,
        }),
        resume: zFileLocale({
            name: 'Resume',
            listAcceptedTypeFile: initialFormGeneralPersonalInfo.resume.listAcceptedTypeFile,
        }),
    })
    ?.strict();

export type TGeneralPersonalInfoSchema = z.input<typeof generalPersonalInfoSchema>;

export default generalPersonalInfoSchema;
