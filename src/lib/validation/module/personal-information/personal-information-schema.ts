import { provinces } from '@lib/data/dummy';
import { generateDefaultValue } from '@lib/helper';
import {
  zEmail,
  zFileLocale,
  zPhoneNumber,
  zString,
} from '@lib/validation/reusable-schema';
import { TTypeFile } from 'types/ui-types';
import z from 'zod';

const personalInformationSchema = z.object({
  firstName: zString({ name: 'First Name', max: 50 }),
  lastName: zString({ name: 'Last Name', max: 50 }),
  profession: zString({ name: 'Profession' }),
  province: zString({ name: 'Province', max: 255 }),
  city: zString({ name: 'City', max: 255 }),
  district: zString({ name: 'District', max: 255 }),
  postalCode: zString({ name: 'Postal Code', max: 255 }),
  phone: zPhoneNumber(),
  email: zEmail(),
  bio: zString({ name: 'Bio', max: 100 }),
  aboutMe: zString({ name: 'About Me', max: 1000 }),
  professionalImage: zFileLocale({
    name: 'Professional Image',
    listAcceptedType: [TTypeFile.JPEG, TTypeFile.JPG, TTypeFile.PNG],
  }),
});

export const initialFormPersonalInformation = {
  firstName: {
    label: 'First Name',
    placeholder: 'e.g Siska Apriana',
  },
  lastName: {
    label: 'Last Name',
    placeholder: 'e.g Rifianti',
  },
  profession: {
    label: 'Profession',
    placeholder: 'e.g Frontend Developer',
  },
  province: {
    options: [],
    label: 'Province',
    placeholder: 'e.g Jawa Timur',
  },
  city: {
    placeholder: 'e.g Situbondo',
    label: 'City',
    options: [],
    disabled: true,
  },
  district: {
    label: 'District',
    placeholder: 'e.g Besuki',
    options: [],
    disabled: true,
  },
  postalCode: {
    options: [],
    label: 'Postal Code',
    placeholder: 'e.g 68356',
    disabled: true,
  },
  bio: {
    maxLength: 100,
    label: 'Bio',
    placeholder: `e.g I'm Frontend Developer based on Jakarta, Indonesia`,
  },
  aboutMe: {
    label: 'About Me',
    placeholder:
      'Write a brief summary about your professional background and skills',
  },
  professionalImage: {
    label: 'Professional Image',
  },
};

export const personalInformationDefaultValues = generateDefaultValue(
  personalInformationSchema
);

export type TFormPersonalInformation = z.input<
  typeof personalInformationSchema
>;

export default personalInformationSchema;
