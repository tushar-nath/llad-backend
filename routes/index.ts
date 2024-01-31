import { Request, Response, Router } from 'express'
import { Accounts } from '../handlers/accounts'

export const v1Router = Router()

v1Router.get('/healthcheck', (_req: Request, res: Response) => {
  res.send({ success: true })
})

v1Router.post('/signup', Accounts.signup)
v1Router.post('/login', Accounts.login)
