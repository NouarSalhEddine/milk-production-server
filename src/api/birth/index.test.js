import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Birth } from '.'

const app = () => express(apiRoot, routes)

let birth

beforeEach(async () => {
  birth = await Birth.create({})
})

test('POST /births 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ cow: 'test', birth_date: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.cow).toEqual('test')
  expect(body.birth_date).toEqual('test')
})

test('GET /births 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /births/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${birth.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(birth.id)
})

test('GET /births/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /births/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${birth.id}`)
    .send({ cow: 'test', birth_date: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(birth.id)
  expect(body.cow).toEqual('test')
  expect(body.birth_date).toEqual('test')
})

test('PUT /births/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ cow: 'test', birth_date: 'test' })
  expect(status).toBe(404)
})

test('DELETE /births/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${birth.id}`)
  expect(status).toBe(204)
})

test('DELETE /births/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
