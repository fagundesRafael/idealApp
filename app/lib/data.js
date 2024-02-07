import { Client, Product } from "./models";
import { connectToDB } from "./utils";

export const fetchClients = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 5

  try {
    connectToDB();
    const count = await Client.find({ name: { $regex: regex } }).count()
    const clients = await Client.find({ name: { $regex: regex } }).limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page -1));
    return {count, clients};
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch clients!");
  }
};

export const fetchClient = async (id) => {

  try {
    connectToDB();
    const client = await Client.findById(id)
    return client
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch client!");
  }
};

export const fetchProducts = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 5

  try {
    connectToDB();
    const count = await Product.find({ title: { $regex: regex } }).count()
    const products = await Product.find({ title: { $regex: regex } }).limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page -1));
    return {count, products};
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch products!");
  }
};

export const fetchProduct = async (id) => {

  try {
    connectToDB();
    const product = await Product.findById(id)
    return product
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch product!");
  }
};
