export interface IAccount {
  id: number
  name: string
  email: string
  password?: string
  currentNorwegianSkill?: NorwegianSkillLevel
  accessToken?: string
  remove: () => Promise<IAccount>
}

export enum NorwegianSkillLevel {
  Beginner = 'beginner',
  Intermediate = 'intermediate',
  Advanced = 'advanced',
}
