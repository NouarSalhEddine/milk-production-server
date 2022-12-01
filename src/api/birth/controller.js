import { success, notFound } from "../../services/response/";
import { Birth } from ".";

export const create = ({ bodymen: { body } }, res, next) =>
  Birth.create(body)
    .then((birth) => birth.view(true))
    .then(success(res, 201))
    .catch(next);

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Birth.find(query, select, cursor)
    .then((births) => births.map((birth) => birth.view()))
    .then(success(res))
    .catch(next);

export const show = ({ params }, res, next) =>
  Birth.findById(params.id)
    .then(notFound(res))
    .then((birth) => (birth ? birth.view() : null))
    .then(success(res))
    .catch(next);

export const showCow = ({ params }, res, next) =>
  Birth.find({cow: params.id})
    .then(notFound(res))
    .then((births) => births.map((birth) => birth.view()))
    .then(success(res))
    .catch(next);

export const update = ({ bodymen: { body }, params }, res, next) =>
  Birth.findById(params.id)
    .then(notFound(res))
    .then((birth) => (birth ? Object.assign(birth, body).save() : null))
    .then((birth) => (birth ? birth.view(true) : null))
    .then(success(res))
    .catch(next);

export const destroy = ({ params }, res, next) =>
  Birth.findById(params.id)
    .then(notFound(res))
    .then((birth) => (birth ? birth.remove() : null))
    .then(success(res, 204))
    .catch(next);
