"use client";
import React, { useState } from "react";
import styles from "../../ui/servicos/addService.module.css";
import { useRouter } from "next/navigation";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/app/firebase";

const AddServicePage = () => {
  const [data, setData] = useState({});
  const [service, setService] = useState("");
  const [especification, setEspecification] = useState();
  const [price, setPrice] = useState();
  const [desc, setDesc] = useState("");

  const router = useRouter();

  const handleAdd = async (e) => {
    e.preventDefault();

    setData({ ...data });

    try {
      // --------------write a document (insert in users)---------------------//
      const docRef = await addDoc(collection(db, "services"), {
        ...data,
        service,
        especification,
        price,
        desc,
      });
      console.log("Document written with ID: ", docRef.id);
      // ---------------------------------------------------------------//
      router.push("/servicos");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleAdd} className={styles.form}>
        <input
          type="text"
          placeholder="nome do serviço:"
          name="service"
          autoCapitalize="on"
          max={18}
          min={3}
          required
          onChange={(e) => setService(e.target.value)}
        />
        <select
          onChange={(e) => setEspecification(e.target.value)}
          name="especification"
          id="especification"
          required
        >
          <option value="">especifique o tipo de serviço:</option>
          <option value="design">design</option>
          <option value="impressão">impressão</option>
          <option value="instalação">instalação</option>
          <option value="tercerização">tercerização</option>
          <option value="outros">outros</option>
        </select>
        <input
          type="number"
          placeholder="custo do serviço R$:"
          name="price"
          autoCapitalize="on"
          required
          onChange={(e) => setPrice(parseFloat(e.target.value))}
        />
        <textarea
          name="desc"
          id="desc"
          rows="8"
          placeholder="descrição do serviço:"
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
        <button type="submit">Adicionar novo serviço!</button>
      </form>
    </div>
  );
};

export default AddServicePage;
