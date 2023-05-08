import { afterAll, beforeAll, it, describe, expect, beforeEach } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'
import { execSync } from 'node:child_process'

describe('Transactions Routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex  migrate:rollback --all')
    execSync('npm run knex  migrate:latest')
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

    expect(listTransacionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'New Transactions',
        amount: -100,
      }),
    ])
  })

  it('should be able to get specific transaction', async () => {
    // fazer a chamda HTTP p/ buscar uma transação específica
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

    const transactionId = listTransacionsResponse.body.transactions[0].id

    const getTransacionsResponse = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set('Cookie', cookies)
      .expect(200)

    expect(getTransacionsResponse.body.transaction).toEqual(
      expect.objectContaining({
        title: 'New Transactions',
        amount: -100,
      }),
    )
  })

  it('should be able to get the summary', async () => {
    // fazer a chamda HTTP p/ criar uma nova transação
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'Credit Transaction',
        amount: 5000,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie')

    await request(app.server)
      .post('/transactions')
      .set('Cookie', cookies)
      .send({
        title: 'Debit Transaction',
        amount: 2000,
        type: 'debit',
      })

    const summaryResponse = await request(app.server)
      .get('/transactions/summary')
      .set('Cookie', cookies)
      .expect(200)

    expect(summaryResponse.body.summary).toEqual({
      amount: 3000,
    })
  })
})
