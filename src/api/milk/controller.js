import { success, notFound } from '../../services/response/'
import { Milk } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Milk.create(body)
    .then((milk) => milk.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Milk.find(query, select, cursor)
    .then((milks) => milks.map((milk) => milk.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Milk.findById(params.id)
    .then(notFound(res))
    .then((milk) => milk ? milk.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Milk.findById(params.id)
    .then(notFound(res))
    .then((milk) => milk ? Object.assign(milk, body).save() : null)
    .then((milk) => milk ? milk.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Milk.findById(params.id)
    .then(notFound(res))
    .then((milk) => milk ? milk.remove() : null)
    .then(success(res, 204))
    .catch(next)
