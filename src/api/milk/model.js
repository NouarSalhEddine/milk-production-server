import mongoose, { Schema } from 'mongoose'

const milkSchema = new Schema({
  production_date: {
    type: Date
  },
  quantity: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

milkSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      production_date: this.production_date,
      quantity: this.quantity,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Milk', milkSchema)

export const schema = model.schema
export default model
