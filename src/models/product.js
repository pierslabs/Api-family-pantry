import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },

    user_id: {
      type: Schema.Types.ObjectId,
      ref: user,
    },
    pantry_id: {
      type: Schema.Types.ObjectId,
      ref: pantry,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("product", ProductSchema);
