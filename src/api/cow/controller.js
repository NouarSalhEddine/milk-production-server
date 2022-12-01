import { success, notFound } from '../../services/response/'
import { Cow } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Cow.create(body)
    .then((cow) => cow.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Cow.find(query, select, cursor)
    .then((cows) => cows.map((cow) => cow.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Cow.findById(params.id)
    .then(notFound(res))
    .then((cow) => cow ? cow.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Cow.findById(params.id)
    .then(notFound(res))
    .then((cow) => cow ? Object.assign(cow, body).save() : null)
    .then((cow) => cow ? cow.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Cow.findById(params.id)
    .then(notFound(res))
    .then((cow) => cow ? cow.remove() : null)
    .then(success(res, 204))
    .catch(next)
