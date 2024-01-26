import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    item: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    unit: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    type: {
      type: String,
    },
    productImage: {
      type: String,
    },
    desc: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Client =
  mongoose.models.Client || mongoose.model("Cliente", clientSchema);
export const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
