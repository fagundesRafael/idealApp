"use server"
import { revalidatePath } from "next/cache";
import { Client, Product } from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";

export const addClient = async (formData) => {
  //   const name = formData.get("name");
  //   const email = formData.get("email");
  //   const phone = formData.get("phone");
  //   const clientImage = formData.get("clientImage");
  //   const address = formData.get("address");
  const { name, email, phone, clientImage, address } =
    Object.fromEntries(formData);

  try {

    connectToDB()
    const newClient = new Client({
      name,
      email,
      phone,
      clientImage,
      address,
    });

    await newClient.save()
  } catch (error) {
    console.log(error);
    throw new Error("Failed to register a new client!");
  }

  revalidatePath("/clientes")
  redirect("/clientes")
};

export const addProduct = async (formData) => {
  const { title, unidType, originPrice, orderPrice, stock, materialType, productImage } =
    Object.fromEntries(formData);

  try {

    connectToDB()
    const newProduct = new Product({
        title, 
        unidType, 
        originPrice, 
        orderPrice, 
        stock, 
        materialType, 
        productImage,
    });

    await newProduct.save()
  } catch (error) {
    console.log(error);
    throw new Error("Failed to register a new product!");
  }

  revalidatePath("/produtos")
  redirect("/produtos")
};