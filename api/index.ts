import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { v1Router } from '../routes'
import bodyParser from 'body-parser'
import AppConfig from '../config'
import session from 'express-session'
import passport, { configureGoogleStrategy } from '../middleware/passport'

dotenv.config()

const app = express()

// Set up sessions to store user data
app.use(
  session({ secret: 'llad-session', resave: true, saveUninitialized: true })
)

// Set up sessions to store user data
app.use(
  session({ secret: 'llad-session', resave: true, saveUninitialized: true })
)

// Initialize Passport and restore authentication state from session
configureGoogleStrategy() // Call the function to configure the Google Strategy
app.use(passport.initialize())
app.use(passport.session())

const corsOptions = {
  // TODO: Only allow all origins when running locally but restrict in production
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(bodyParser.json({ limit: AppConfig.BODY_PARSER_LIMIT }))

app.use('/api/v1', v1Router)

export default app
