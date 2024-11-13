import { TTypeCategoryProject, TTypeTypeProject } from '@features/project/types/project-type'

import { generateOptionsFromEnum } from '@lib/helper/function'

export const optionsCategoryProject = generateOptionsFromEnum(TTypeCategoryProject)

export const optionsTypeProject = generateOptionsFromEnum(TTypeTypeProject)
