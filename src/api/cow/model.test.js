import { Cow } from '.'

let cow

beforeEach(async () => {
  cow = await Cow.create({ serial_number: 'test', entry_date: 'test', breed: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = cow.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(cow.id)
    expect(view.serial_number).toBe(cow.serial_number)
    expect(view.entry_date).toBe(cow.entry_date)
    expect(view.breed).toBe(cow.breed)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = cow.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(cow.id)
    expect(view.serial_number).toBe(cow.serial_number)
    expect(view.entry_date).toBe(cow.entry_date)
    expect(view.breed).toBe(cow.breed)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
