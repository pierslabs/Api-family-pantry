import mongoose from "mongoose";

const { Schema, model } = mongoose;

const PantrySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "product",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("pantry", PantrySchema);
