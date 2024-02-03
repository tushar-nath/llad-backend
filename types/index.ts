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

export interface ICardFront {
  text: string
  example: string
}

export interface ICardBack {
  text: string
  example: string
}

export interface ICard {
  id: number
  userId: IAccount
  front: ICardFront
  back: ICardBack
  note: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
  __v: number
  remove: () => Promise<ICard>
}
