import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cuantity: {
      type: String,
      required: true,
    },

    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    pantry_id: {
      type: Schema.Types.ObjectId,
      ref: "pantry",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("product", ProductSchema);
