import { afterAll, beforeAll, test, describe } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'

describe('Transactions Routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('user can create a new transaction', async () => {
    // fazer a chamda HTTP p/ criar uma nova transação
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'New Transactions',
        amount: 100,
        type: 'debit',
      })
      .expect(201)
  })
})
