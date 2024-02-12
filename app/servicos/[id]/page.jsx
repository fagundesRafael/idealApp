"use client";
import React, { useEffect, useState } from "react";
import styles from "../../ui/servicos/singleService.module.css";
import { useParams, useRouter } from "next/navigation";
import { useFetchDocument } from "@/app/hooks/useFetchDocument";
import { useUpdateDocument } from "@/app/hooks/useUpdateDocument";

const SingleServicePage = () => {
  const { id } = useParams();
  const { document, loading } = useFetchDocument("services", id);
  const { updateDocument, response } = useUpdateDocument("services");

  const [service, setService] = useState("");
  const [especification, setEspecification] = useState();
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");

  const router = useRouter();

  const data = {
    service,
    especification,
    price,
    desc,
  };

  const handleUpDate = async (e) => {
    e.preventDefault();

    updateDocument(id, data);

    router.push("/servicos");
  };

  useEffect(() => {
    if (document) {
      setService(document.service);
      setEspecification(document.especification);
      setPrice(document.price);
      setDesc(document.desc);
    }
  }, [document]);

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <form onSubmit={handleUpDate} className={styles.form}>
          <label>Serviço:</label>
          <input
            type="text"
            name="service"
            value={service}
            required
            autoComplete="off"
            onChange={(e) => setService(e.target.value)}
          />
          <label>Especificação:</label>
          <select
            name="especification"
            id="especification"
            value={especification}
            onChange={(e) => setEspecification(e.target.value)}
          >
            <option value="arte">arte</option>
            <option value="orçamento">orçamento</option>
            <option value="impressão">impressão</option>
            <option value="instalação">instalação</option>
            <option value="tercerização">tercerização</option>
            <option value="outros">outros</option>
          </select>
          <label>Preço do serviço em R$:</label>
          <input
            type="number"
            name="price"
            required
            value={price}
            autoComplete="off"
            onChange={(e) => setPrice(parseInt(e.target.value))}
          />
          <label>Descrição:</label>
          <textarea
            type="text"
            name="desc"
            id="desc"
            rows={8}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button
            disabled={response === true || loading === true}
            type="submit"
          >
            Atualizar informações do serviço!
          </button>
        </form>
      </div>
    </div>
  );
};

export default SingleServicePage;
