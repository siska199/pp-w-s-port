import { TTypeCategoryProject } from '@features/project/types/project-type'
import { TTypeLevelSkill } from '@features/skill-user/types/skill-user-type'

import { generateOptionsFromEnum } from '@lib/helper/function'

export const levelSkillOptions = generateOptionsFromEnum(TTypeLevelSkill)

export const yearsOfExperiances = [...Array(40)]?.map((_, i) => ({
  label: `${i + 1} year`,
  value: `${i + 1}`
}))

export const categoryProjectOptions = generateOptionsFromEnum(TTypeCategoryProject)
