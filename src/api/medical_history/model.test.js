import { MedicalHistory } from '.'

let medicalHistory

beforeEach(async () => {
  medicalHistory = await MedicalHistory.create({ diagnosis_date: 'test', sickeness: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = medicalHistory.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(medicalHistory.id)
    expect(view.diagnosis_date).toBe(medicalHistory.diagnosis_date)
    expect(view.sickeness).toBe(medicalHistory.sickeness)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = medicalHistory.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(medicalHistory.id)
    expect(view.diagnosis_date).toBe(medicalHistory.diagnosis_date)
    expect(view.sickeness).toBe(medicalHistory.sickeness)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
