import { Milk } from '.'

let milk

beforeEach(async () => {
  milk = await Milk.create({ production_date: 'test', quantity: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = milk.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(milk.id)
    expect(view.production_date).toBe(milk.production_date)
    expect(view.quantity).toBe(milk.quantity)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = milk.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(milk.id)
    expect(view.production_date).toBe(milk.production_date)
    expect(view.quantity).toBe(milk.quantity)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
