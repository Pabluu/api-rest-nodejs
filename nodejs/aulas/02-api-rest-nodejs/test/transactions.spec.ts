import { afterAll, beforeAll, it, describe, expect } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'

describe('Transactions Routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new transaction', async () => {
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

  it('should be able to list all transactions', async () => {
    // fazer a chamda HTTP p/ criar uma nova transação
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New Transactions',
        amount: 100,
        type: 'debit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie')

    const listTransacionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    console.log(listTransacionsResponse.body.transactions[0])

    expect(listTransacionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'New Transactions',
        amount: -100,
      }),
    ])
  })
})
