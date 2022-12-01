import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Milk } from '.'

const app = () => express(apiRoot, routes)

let milk

beforeEach(async () => {
  milk = await Milk.create({})
})

test('POST /milks 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ production_date: 'test', quantity: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.production_date).toEqual('test')
  expect(body.quantity).toEqual('test')
})

test('GET /milks 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /milks/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${milk.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(milk.id)
})

test('GET /milks/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /milks/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${milk.id}`)
    .send({ production_date: 'test', quantity: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(milk.id)
  expect(body.production_date).toEqual('test')
  expect(body.quantity).toEqual('test')
})

test('PUT /milks/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ production_date: 'test', quantity: 'test' })
  expect(status).toBe(404)
})

test('DELETE /milks/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${milk.id}`)
  expect(status).toBe(204)
})

test('DELETE /milks/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
