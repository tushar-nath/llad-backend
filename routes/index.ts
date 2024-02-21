import { Router } from 'express'
import passport from '../middleware/passport'
import { Accounts } from '../handlers/accounts'
import { Cards } from '../handlers/cards'

export const v1Router = Router()

/*** Healthcheck Route ***/
v1Router.get('/healthcheck', (_req, res) => {
  res.send({ success: true })
})
/*** Healthcheck Route ***/

/*** User Routes ***/
v1Router.post('/signup', Accounts.signup)
v1Router.post('/login', Accounts.login)
v1Router.post('/forgot-password', Accounts.forgotPassword)
v1Router.post('/reset-password', Accounts.resetPassword)
v1Router.post('/updateNorwegianLevel', Accounts.updateNorwegeinLevel)
v1Router.get('/get-tags/:userId', Accounts.getTags)
v1Router.post('/update-account-details', Accounts.updateAccountDetails)
v1Router.patch('/update-profile-picture', Accounts.updateProfilePicture)

v1Router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

v1Router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req: any, res) => {
    if (req.user) {
      const userData = req.user
      // Convert user data to JSON string
      const userDataString = JSON.stringify(userData)
      // Encode the user data string
      const encodedData = encodeURIComponent(userDataString)

      if (req.user.currentNorwegianSkill) {
        return res.redirect(`${process.env.CLIENT_URL}/?user=${encodedData}`)
      } else {
        return res.redirect(
          `${process.env.CLIENT_URL}/register?user=${encodedData}`
        )
      }
    }
    res.redirect('/')
  }
)
/*** User Routes ***/

/*** Card Routes ***/
v1Router.post('/create-card', Cards.createCard)
v1Router.get('/get-cards/:userId', Cards.getCards)
v1Router.patch('/update-card', Cards.updateCard)
v1Router.put('/revision', Cards.practiseCard)
v1Router.post('/star-card', Cards.starCard)
v1Router.delete('/delete-card', Cards.deleteCard)
/*** Card Routes ***/
