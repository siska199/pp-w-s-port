import { TCompany, TProfession } from '@typescript/general-module-types'

export interface TExperiance {
  id: string
  is_user: string
  id_company: string
  id_profession: string
  start_at: Date
  end_at: Date
  is_currently_work_here: boolean
  description: string
  company: TCompany
  profession: TProfession
}
