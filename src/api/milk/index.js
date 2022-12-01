import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Milk, { schema } from './model'

const router = new Router()
const { production_date, quantity } = schema.tree

/**
 * @api {post} /milks Create milk
 * @apiName CreateMilk
 * @apiGroup Milk
 * @apiParam production_date Milk's production_date.
 * @apiParam quantity Milk's quantity.
 * @apiSuccess {Object} milk Milk's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Milk not found.
 */
router.post('/',
  body({ production_date, quantity }),
  create)

/**
 * @api {get} /milks Retrieve milks
 * @apiName RetrieveMilks
 * @apiGroup Milk
 * @apiUse listParams
 * @apiSuccess {Object[]} milks List of milks.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /milks/:id Retrieve milk
 * @apiName RetrieveMilk
 * @apiGroup Milk
 * @apiSuccess {Object} milk Milk's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Milk not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /milks/:id Update milk
 * @apiName UpdateMilk
 * @apiGroup Milk
 * @apiParam production_date Milk's production_date.
 * @apiParam quantity Milk's quantity.
 * @apiSuccess {Object} milk Milk's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Milk not found.
 */
router.put('/:id',
  body({ production_date, quantity }),
  update)

/**
 * @api {delete} /milks/:id Delete milk
 * @apiName DeleteMilk
 * @apiGroup Milk
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Milk not found.
 */
router.delete('/:id',
  destroy)

export default router
