import fastify from 'fastify'
import cookie from '@fastify/cookie'
// import crypto from 'node:crypto'
import { env } from './env'
import { transactionsRouter } from './routes/transactions'

const app = fastify()

app.register(cookie)
app.register(transactionsRouter, {
  prefix: 'transactions',
})

app.listen({ port: env.PORT }).then(() => {
  console.log('http://localhost:3333/')
})
