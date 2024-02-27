"use server";
import { revalidatePath } from "next/cache";
import { User, Client, Transaction } from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { signIn } from "../auth";

export const addUser = async (formData) => {
  const { username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
      isAdmin,
      isActive,
    });

    await newUser.save();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create user!");
  }

  revalidatePath("/usuarios");
  redirect("/usuarios");
};

export const updateUser = async (formData) => {
  const { id, username, email, password, phone, address, isAdmin, isActive } =
    Object.fromEntries(formData);

  try {
    connectToDB();

    const updateFields = {
      username,
      email,
      password,
      phone,
      address,
      isAdmin,
      isActive,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await User.findByIdAndUpdate(id, updateFields);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update user!");
  }

  revalidatePath("/usuarios");
  redirect("/usuarios");
};

export const addClient = async (formData) => {
  const { clientName, email, phone, clientImage, address } =
    Object.fromEntries(formData);

  try {
    connectToDB();
    const newClient = new Client({
      clientName,
      email,
      phone,
      clientImage,
      address,
    });

    await newClient.save();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to register a new client!");
  }

  revalidatePath("/clientes");
  redirect("/clientes");
};

export const updateClient = async (formData) => {
  const { id, clientName, email, phone, clientImage, address } =
    Object.fromEntries(formData);

  try {
    connectToDB();
    const updateFields = {
      clientName,
      email,
      phone,
      clientImage,
      address,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Client.findByIdAndUpdate(id, updateFields);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update client!");
  }

  revalidatePath("/clientes");
  redirect("/clientes");
};

export const addTransaction = async (formData) => {
  const {
    transactionName,
    clientName,
    provider,
    source,
    quantity,
    measurementUnit,
    cost,
    price,
    downPayment,
    orderStatus,
    notations,
  } = Object.fromEntries(formData);

  try {
    connectToDB();
    const newTransaction = new Transaction({
      transactionName,
      clientName,
      provider,
      source,
      quantity,
      measurementUnit,
      cost,
      price,
      downPayment,
      orderStatus,
      notations,
    });

    await newTransaction.save();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to register a new transaction!");
  }

  revalidatePath("/transacoes");
  redirect("/transacoes");
};

export const updateTransaction = async (formData) => {
  const {
    id,
    transactionName,
    clientName,
    provider,
    source,
    quantity,
    measurementUnit,
    cost,
    price,
    downPayment,
    orderStatus,
    notations,
  } = Object.fromEntries(formData);

  try {
    connectToDB();
    const updateFields = {
      transactionName,
      clientName,
      provider,
      source,
      quantity,
      measurementUnit,
      cost,
      price,
      downPayment,
      orderStatus,
      notations,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Transaction.findByIdAndUpdate(id, updateFields);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update transaction!");
  }

  revalidatePath("/transacoes");
  redirect("/transacoes");
};

export const deleteClient = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();

    await Client.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete a Client!");
  }

  revalidatePath("/clientes");
};

export const deleteTransaction = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();

    await Transaction.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete a transaction!");
  }

  revalidatePath("/transacoes");
};

export const authenticate = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    if (err.message.includes("CredentialsSignin")) {
      return "Credenciais erradas!";
    }
    throw err;
  }
};