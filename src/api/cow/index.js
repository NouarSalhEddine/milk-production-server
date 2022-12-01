import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Cow, { schema } from './model'

const router = new Router()
const { serial_number, entry_date, breed } = schema.tree

/**
 * @api {post} /cows Create cow
 * @apiName CreateCow
 * @apiGroup Cow
 * @apiParam serial_number Cow's serial_number.
 * @apiParam entry_date Cow's entry_date.
 * @apiParam breed Cow's breed.
 * @apiSuccess {Object} cow Cow's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Cow not found.
 */
router.post('/',
  body({ serial_number, entry_date, breed }),
  create)

/**
 * @api {get} /cows Retrieve cows
 * @apiName RetrieveCows
 * @apiGroup Cow
 * @apiUse listParams
 * @apiSuccess {Object[]} cows List of cows.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /cows/:id Retrieve cow
 * @apiName RetrieveCow
 * @apiGroup Cow
 * @apiSuccess {Object} cow Cow's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Cow not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /cows/:id Update cow
 * @apiName UpdateCow
 * @apiGroup Cow
 * @apiParam serial_number Cow's serial_number.
 * @apiParam entry_date Cow's entry_date.
 * @apiParam breed Cow's breed.
 * @apiSuccess {Object} cow Cow's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Cow not found.
 */
router.put('/:id',
  body({ serial_number, entry_date, breed }),
  update)

/**
 * @api {delete} /cows/:id Delete cow
 * @apiName DeleteCow
 * @apiGroup Cow
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Cow not found.
 */
router.delete('/:id',
  destroy)

export default router
