import { env } from './env'
import { app } from './app'

app.listen({ port: env.PORT }).then(() => {
  console.log('http://localhost:3333/')
})
