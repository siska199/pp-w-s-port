import { generateDefaultValue } from '@lib/helper';
import { zString } from '@lib/validation/reusable-schema';
import z from 'zod';

const skillSchema = z.object({
  category: zString({ name: 'Category' }),
  skill: zString({ name: 'Skill' }),
  level: zString({ name: 'Level' }),
  yearOfExperiance: zString({
    name: 'Year of Experiance',
  }),
});

export const initialFormSkill = {
  category: {
    label: 'Category',
    placeholder: 'Select a category',
    options: [],
  },
  skill: {
    label: 'Skill',
    placeholder: 'Select a skill',
    options: [],
  },
  level: {
    label: 'Level',
    placeholder: 'Select a level',
    options: [],
  },
  yearOfExperiance: {
    label: 'Year of Experience',
    placeholder: 'Select years of experience',
    options: [],
  },
};

export const skillDefaultValues = {
  ...generateDefaultValue(skillSchema),
  level: '',
  yearOfExperiance: '',
} as TFormSkill;

export type TFormSkill = z.input<typeof skillSchema>;

export default skillSchema;
