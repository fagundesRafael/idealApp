import { Client } from "./models";
import { connectToDB } from "./utils";

export const fetchClients = async () => {
  try {
    connectToDB()
    const clients = await Client.find();
    return clients;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch clients!");
  }
};
