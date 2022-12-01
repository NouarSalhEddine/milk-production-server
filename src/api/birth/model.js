import mongoose, { Schema } from 'mongoose'

const birthSchema = new Schema({
  cow: {
    type: Schema.Types.ObjectId,
    ref: "Cow",
  },
  birth_date: {
    type: Date
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

birthSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      cow: this.cow,
      birth_date: this.birth_date,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Birth', birthSchema)

export const schema = model.schema
export default model
