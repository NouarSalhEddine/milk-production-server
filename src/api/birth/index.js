import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, showCow, update, destroy } from './controller'
import { schema } from './model'
export Birth, { schema } from './model'

const router = new Router()
const { cow, birth_date } = schema.tree

/**
 * @api {post} /births Create birth
 * @apiName CreateBirth
 * @apiGroup Birth
 * @apiParam cow Birth's cow.
 * @apiParam birth_date Birth's birth_date.
 * @apiSuccess {Object} birth Birth's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Birth not found.
 */
router.post('/',
  body({ cow, birth_date }),
  create)

/**
 * @api {get} /births Retrieve births
 * @apiName RetrieveBirths
 * @apiGroup Birth
 * @apiUse listParams
 * @apiSuccess {Object[]} births List of births.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /births/:id Retrieve birth
 * @apiName RetrieveBirth
 * @apiGroup Birth
 * @apiSuccess {Object} birth Birth's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Birth not found.
 */
router.get('/:id',
  show)

  router.get('/cow/:id',
  showCow)

/**
 * @api {put} /births/:id Update birth
 * @apiName UpdateBirth
 * @apiGroup Birth
 * @apiParam cow Birth's cow.
 * @apiParam birth_date Birth's birth_date.
 * @apiSuccess {Object} birth Birth's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Birth not found.
 */
router.put('/:id',
  body({ cow, birth_date }),
  update)

/**
 * @api {delete} /births/:id Delete birth
 * @apiName DeleteBirth
 * @apiGroup Birth
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Birth not found.
 */
router.delete('/:id',
  destroy)

export default router
