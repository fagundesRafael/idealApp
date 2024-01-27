import { Client, Product } from "./models";
import { connectToDB } from "./utils";

export const fetchClients = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 2

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

export const fetchProducts = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 2

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
