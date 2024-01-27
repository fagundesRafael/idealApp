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
    clientImage: {
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
    title: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    unidType: {
      type: String,
      required: true,
      unique: true,
    },
    originPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    orderPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    materialType: {
      type: String,
    },
    productImage: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Client =
  mongoose.models.Client || mongoose.model("Client", clientSchema); 
export const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
