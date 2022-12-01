import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { MedicalHistory } from '.'

const app = () => express(apiRoot, routes)

let medicalHistory

beforeEach(async () => {
  medicalHistory = await MedicalHistory.create({})
})

test('POST /medical_histories 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ diagnosis_date: 'test', sickeness: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.diagnosis_date).toEqual('test')
  expect(body.sickeness).toEqual('test')
})

test('GET /medical_histories 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /medical_histories/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${medicalHistory.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(medicalHistory.id)
})

test('GET /medical_histories/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /medical_histories/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${medicalHistory.id}`)
    .send({ diagnosis_date: 'test', sickeness: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(medicalHistory.id)
  expect(body.diagnosis_date).toEqual('test')
  expect(body.sickeness).toEqual('test')
})

test('PUT /medical_histories/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ diagnosis_date: 'test', sickeness: 'test' })
  expect(status).toBe(404)
})

test('DELETE /medical_histories/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${medicalHistory.id}`)
  expect(status).toBe(204)
})

test('DELETE /medical_histories/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
