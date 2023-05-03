import fastify from 'fastify'
// import crypto from 'node:crypto'
import { knex } from './database'

const app = fastify()

app.get('/hello', async () => {
  // const transactions = await knex('transactions')
  //   .insert({
  //     id: crypto.randomUUID(),
  //     title: 'Transação Teste',
  //     amount: 1000,
  //   })
  //   .returning('*')

  const transactions = await knex('transactions').select('*')

  return transactions
})

app.listen({ port: 3333 }).then(() => {
  console.log('http://localhost:3333/')
})
