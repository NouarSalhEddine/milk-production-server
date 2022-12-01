import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, showCow, update, destroy } from './controller'
import { schema } from './model'
export MedicalHistory, { schema } from './model'

const router = new Router()
const { cow, diagnosis_date, sickeness } = schema.tree

/**
 * @api {post} /medical_histories Create medical history
 * @apiName CreateMedicalHistory
 * @apiGroup MedicalHistory
 * @apiParam diagnosis_date Medical history's diagnosis_date.
 * @apiParam sickeness Medical history's sickeness.
 * @apiSuccess {Object} medicalHistory Medical history's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Medical history not found.
 */
router.post('/',
  body({ cow, diagnosis_date, sickeness }),
  create)

/**
 * @api {get} /medical_histories Retrieve medical histories
 * @apiName RetrieveMedicalHistories
 * @apiGroup MedicalHistory
 * @apiUse listParams
 * @apiSuccess {Object[]} medicalHistories List of medical histories.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /medical_histories/:id Retrieve medical history
 * @apiName RetrieveMedicalHistory
 * @apiGroup MedicalHistory
 * @apiSuccess {Object} medicalHistory Medical history's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Medical history not found.
 */
router.get('/:id',
  show)


  router.get('/cow/:id',
  showCow)

/**
 * @api {put} /medical_histories/:id Update medical history
 * @apiName UpdateMedicalHistory
 * @apiGroup MedicalHistory
 * @apiParam diagnosis_date Medical history's diagnosis_date.
 * @apiParam sickeness Medical history's sickeness.
 * @apiSuccess {Object} medicalHistory Medical history's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Medical history not found.
 */
router.put('/:id',
  body({ cow, diagnosis_date, sickeness }),
  update)

/**
 * @api {delete} /medical_histories/:id Delete medical history
 * @apiName DeleteMedicalHistory
 * @apiGroup MedicalHistory
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Medical history not found.
 */
router.delete('/:id',
  destroy)

export default router
