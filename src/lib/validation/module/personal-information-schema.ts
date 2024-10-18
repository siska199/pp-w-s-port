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
    listAcceptedType: [TTypeFile.JPEG, TTypeFile.JPG, TTypeFile.PNG],
  }),
});

export const personalInformationDefaultValues = generateDefaultValue(
  personalInformationSchema
);

export type TFormPersonalInformation = z.input<
  typeof personalInformationSchema
>;

export default personalInformationSchema;
