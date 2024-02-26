import { Client, Transaction, User } from "./models";
import { connectToDB } from "./utils";

export const fetchUsers = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 10;

  try {
    connectToDB();
    const count = await User.find({ username: { $regex: regex } }).count();
    const users = await User.find({ username: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, users };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};

export const fetchUser = async (id) => {
  console.log(id);
  try {
    connectToDB();
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};

export const fetchClients = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 10

  try {
    connectToDB();
    const count = await Client.find({ clientName: { $regex: regex } }).count()
    const clients = await Client.find({ clientName: { $regex: regex } }).limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page -1));
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

export const fetchTransactions = async (q, page) => {
  const regex = new RegExp(q, "i");

  const ITEM_PER_PAGE = 10

  try {
    connectToDB();
    const count = await Transaction.find({ transactionName: { $regex: regex } }).count()
    const transactions = await Transaction.find({ transactionName: { $regex: regex } }).limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page -1));
    return {count, transactions};
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch transactions!");
  }
};

export const fetchTransaction = async (id) => {

  try {
    connectToDB();
    const transaction = await Transaction.findById(id)
    return transaction
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch transaction!");
  }
};
