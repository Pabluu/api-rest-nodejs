import { FastifyInstance } from 'fastify'
import { knex } from '../database'

export async function transactionsRouter(app: FastifyInstance) {
  app.get('/hello', async () => {
    const transactions = await knex('transactions')
      .where('amount', 500)
      .select('*')

    return transactions
  })
}
