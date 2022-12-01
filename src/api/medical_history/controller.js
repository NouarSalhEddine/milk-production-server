import { success, notFound } from "../../services/response/";
import { MedicalHistory } from ".";

export const create = ({ bodymen: { body } }, res, next) =>
  MedicalHistory.create(body)
    .then((medicalHistory) => medicalHistory.view(true))
    .then(success(res, 201))
    .catch(next);

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  MedicalHistory.find(query, select, cursor)
    .then((medicalHistories) =>
      medicalHistories.map((medicalHistory) => medicalHistory.view())
    )
    .then(success(res))
    .catch(next);

export const show = ({ params }, res, next) =>
  MedicalHistory.findById(params.id)
    .then(notFound(res))
    .then((medicalHistory) => (medicalHistory ? medicalHistory.view() : null))
    .then(success(res))
    .catch(next);

export const showCow = ({ params }, res, next) =>
  MedicalHistory.find({ cow: params.id })
    .then(notFound(res))
    .then((medicalHistories) => medicalHistories.map((medicalHistory) => medicalHistory.view()))
    .then(success(res))
    .catch(next);

export const update = ({ bodymen: { body }, params }, res, next) =>
  MedicalHistory.findById(params.id)
    .then(notFound(res))
    .then((medicalHistory) =>
      medicalHistory ? Object.assign(medicalHistory, body).save() : null
    )
    .then((medicalHistory) =>
      medicalHistory ? medicalHistory.view(true) : null
    )
    .then(success(res))
    .catch(next);

export const destroy = ({ params }, res, next) =>
  MedicalHistory.findById(params.id)
    .then(notFound(res))
    .then((medicalHistory) => (medicalHistory ? medicalHistory.remove() : null))
    .then(success(res, 204))
    .catch(next);
