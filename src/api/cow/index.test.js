import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Cow } from '.'

const app = () => express(apiRoot, routes)

let cow

beforeEach(async () => {
  cow = await Cow.create({})
})

test('POST /cows 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ serial_number: 'test', entry_date: 'test', breed: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.serial_number).toEqual('test')
  expect(body.entry_date).toEqual('test')
  expect(body.breed).toEqual('test')
})

test('GET /cows 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /cows/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${cow.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(cow.id)
})

test('GET /cows/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /cows/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${cow.id}`)
    .send({ serial_number: 'test', entry_date: 'test', breed: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(cow.id)
  expect(body.serial_number).toEqual('test')
  expect(body.entry_date).toEqual('test')
  expect(body.breed).toEqual('test')
})

test('PUT /cows/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ serial_number: 'test', entry_date: 'test', breed: 'test' })
  expect(status).toBe(404)
})

test('DELETE /cows/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${cow.id}`)
  expect(status).toBe(204)
})

test('DELETE /cows/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
