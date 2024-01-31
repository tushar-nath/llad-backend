export interface IAccount {
  id: number
  name: string
  email: string
  password?: string
  currentNorwegianSkill?: NorwegianSkillLevel
  accessToken?: string
  createdAt: Date
  updatedAt: Date
  __v: number
  remove: () => Promise<IAccount>
}

export enum NorwegianSkillLevel {
  Beginner = 'beginner',
  Intermediate = 'intermediate',
  Advanced = 'advanced',
}
