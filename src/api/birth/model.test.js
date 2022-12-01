import { Birth } from '.'

let birth

beforeEach(async () => {
  birth = await Birth.create({ cow: 'test', birth_date: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = birth.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(birth.id)
    expect(view.cow).toBe(birth.cow)
    expect(view.birth_date).toBe(birth.birth_date)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = birth.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(birth.id)
    expect(view.cow).toBe(birth.cow)
    expect(view.birth_date).toBe(birth.birth_date)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
