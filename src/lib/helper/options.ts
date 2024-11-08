import { generateOptionsFromEnum } from '@lib/helper/function'
import { TTypeCategoryProject } from '@typescript/modules/project/project-type.d'
import { TTypeLevelSkill } from '@typescript/modules/skill/skill-type.d'

export const levelSkillOptions = generateOptionsFromEnum(TTypeLevelSkill)

export const yearsOfExperiances = [...Array(40)]?.map((_, i) => ({
  label: `${i + 1} year`,
  value: `${i + 1}`
}))

export const categoryProjectOptions = generateOptionsFromEnum(TTypeCategoryProject)
