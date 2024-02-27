import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
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
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

const clientSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
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

const transactionSchema = new mongoose.Schema(
  {
    transactionName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    clientName: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    measurementUnit: {
      type: String,
    },
    cost: {
      type: Number,
      required: true,
      min: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    downPayment: {
      type: Number,
      required: true,
      min: 0,
    },
    orderStatus: {
      type: String,
      required: true,
    },
    notations: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Client =
  mongoose.models.Client || mongoose.model("Client", clientSchema);
export const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);
