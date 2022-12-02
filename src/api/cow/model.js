import mongoose, { Schema } from "mongoose";
import { MedicalHistory } from "../medical_history";
import { Birth } from "../birth";

const cowSchema = new Schema(
  {
    serial_number: {
      type: String,
    },
    entry_date: {
      type: Date,
    },
    breed: {
      type: String,
    },
  },
  {
    timestamps: true,
    // toJSON: {
    //   virtuals: true,
    //   transform: (obj, ret) => { delete ret._id }
    // }
  }
);

cowSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      serial_number: this.serial_number,
      entry_date: new Date(this.entry_date),
      breed: this.breed,
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

cowSchema.pre("remove", function (next) {
  MedicalHistory.remove({ cow: this._id }).exec();
  Birth.remove({ cow: this._id }).exec();
  next()
});

const model = mongoose.model("Cow", cowSchema);

export const schema = model.schema;
export default model;
