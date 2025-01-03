export enum TTypeLevelSkill {
  ADVANCE = 'ADVANCE',
  INTERMEDIATE = 'INTERMEDIATE',
  BEGINNER = 'BEGINNER'
}

export interface TSkill {
  id: string
  name: string
  image: string
  color: string
  id_category: string
  created_at: string
  updated_at: string
}

export interface TSkillUser {
  id: string
  id_skill: string
  skill_name: string
  year_of_experiance: string
  level: TTypeLevelSkill
  id_user: string
  created_at: string
  updated_at: string
  id_category: string
  category_name: string
  years_of_experience: string
  projects: {
    id: string
    name: string
  }[]
}

export interface TCategorySkill {
  id: string
  name: string
}
