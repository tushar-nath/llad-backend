import app from '.'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`)
})

process.on('SIGTERM', close)
process.on('SIGINT', close)

function close() {
  console.log('Shutting down gracefully')

  process.exit(0)
}
