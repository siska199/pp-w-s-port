import { levelSkillOptions } from '@lib/data/options';
import { generateDefaultValue } from '@lib/helper';
import { zEnum, zNumber, zString } from '@lib/validation/reusable-schema';
import z from 'zod';

const skillSchema = z.object({
  category: zString({ name: 'Category' }),
  skill: zString({ name: 'Skill' }),
  level: zEnum({
    enum: levelSkillOptions?.map((data) => data?.value) as [
      string,
      ...string[]
    ],
    mandatory: true,
  }),
  yearOfExperiance: zNumber({ name: 'Year of Experiance', min: 0 }),
});

export const initialFormSkill = {
  category: {
    label: 'Category',
    options: [],
  },
  skill: {
    label: 'Skill',
    options: [],
  },
  level: {
    label: 'Level',
    options: [],
  },
  yearOfExperiance: {
    label: 'Year of Experiance',
    options: [],
  },
};

export const skillDefaultValues = {
  ...generateDefaultValue(skillSchema),
  level:
};

export type TFormSkill = z.input<typeof skillSchema>;

export default skillSchema;
