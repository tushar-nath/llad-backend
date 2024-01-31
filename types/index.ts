export interface IAccount {
  id: number
  username: string
  email: string
  password: string
  remove: () => Promise<IAccount>
}
