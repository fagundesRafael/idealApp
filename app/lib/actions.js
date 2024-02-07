"use server";
import { revalidatePath } from "next/cache";
import { Client, Product, User } from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt"

export const addUser = async (formData) => {
  //   const name = formData.get("name");
  //   const email = formData.get("email");
  //   const phone = formData.get("phone");
  //   const clientImage = formData.get("clientImage");
  //   const address = formData.get("address");
  const { name, email, password, phone, isAdmin } =
    Object.fromEntries(formData);

  try {
    connectToDB();
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      isAdmin,
    });

    await newUser.save();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to register a new user!");
  }

  revalidatePath("/team");
  redirect("/team");
};

export const addClient = async (formData) => {
  const { name, email, phone, clientImage, address } =
    Object.fromEntries(formData);

  try {
    connectToDB();
    const newClient = new Client({
      name,
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
  const { id, name, email, phone, clientImage, address } =
    Object.fromEntries(formData);

  try {
    connectToDB();
    const updateFields = {
      name,
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

export const addProduct = async (formData) => {
  const {
    title,
    unidType,
    originPrice,
    orderPrice,
    stock,
    materialType,
    productImage,
  } = Object.fromEntries(formData);

  try {
    connectToDB();
    const newProduct = new Product({
      title,
      unidType,
      originPrice,
      orderPrice,
      stock,
      materialType,
      productImage,
    });

    await newProduct.save();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to register a new product!");
  }

  revalidatePath("/produtos");
  redirect("/produtos");
};

export const updateProduct = async (formData) => {
  const { id, title, unidType, originPrice, orderPrice, stock, materialType, productImage } =
    Object.fromEntries(formData);

  try {
    connectToDB();
    const updateFields = {
      title,
      unidType,
      originPrice,
      orderPrice,
      stock,
      materialType,
      productImage
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    await Product.findByIdAndUpdate(id, updateFields);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update product!");
  }

  revalidatePath("/produtos");
  redirect("/produtos");
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

export const deleteProduct = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDB();

    await Product.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete a product!");
  }

  revalidatePath("/produtos");
};
