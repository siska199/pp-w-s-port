import { TTypeLevelSkill } from '@lib/data/enum'
import { generateOptionsFromEnum } from '@lib/helper/function'

export const levelSkillOptions = generateOptionsFromEnum(TTypeLevelSkill)

export const yearsOfExperiances = [...Array(40)]?.map((_, i) => ({
  label: `${i + 1} year`,
  value: `${i + 1}`
}))
