import mongoose, { Schema } from "mongoose";

const medicalHistorySchema = new Schema(
  {
    diagnosis_date: {
      type: Date,
    },
    sickeness: {
      type: String,
    },
    cow: {
      type: Schema.Types.ObjectId,
      ref: "Cow",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id;
      },
    },
  }
);

medicalHistorySchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      cow: this.cow,
      diagnosis_date: this.diagnosis_date,
      sickeness: this.sickeness,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };

    return full
      ? {
          ...view,
          // add properties for a full view
        }
      : view;
  },
};

const model = mongoose.model("MedicalHistory", medicalHistorySchema);

export const schema = model.schema;
export default model;
