"use client";
import React, { useEffect, useState } from "react";
import styles from "../../ui/clientes/singleCliente.module.css";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useFetchDocument } from "@/app/hooks/useFetchDocument";
import { useUpdateDocument } from "@/app/hooks/useUpdateDocument";
import { useRouter } from "next/navigation";

const SingleClientePage = () => {
  const { id } = useParams();
  const { document, loading } = useFetchDocument("clients", id);
  const { updateDocument, response } = useUpdateDocument("clients");

  const [client, setClient] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [img, setImg] = useState("");

  const router = useRouter();

  const data = {
    client,
    email,
    phone,
    address,
    img,
  };

  const handleUpDate = async (e) => {
    e.preventDefault();

    updateDocument(id, data);

    router.push("/clientes");
  };

  useEffect(() => {
    if (document) {
      setClient(document.client);
      setEmail(document.email);
      setPhone(document.phone);
      setAddress(document.address);
      setImg(document.img);
    }
  }, [document]);

  console.log(document);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          {document?.img ? (
            <Image alt="" src={document.img} fill />
          ) : (
            <Image alt="" src="/noavatar.png" fill />
          )}
        </div>
        {document?.client}
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleUpDate} className={styles.form}>
          <label>Nome do usuário:</label>
          <input
            type="text"
            placeholder="atualize o nome do cliente"
            name="client"
            required
            autoComplete="off"
            value={client}
            onChange={(e) => setClient(e.target.value)}
          />
          <label>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="atualize o email do cliente"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Telefone:</label>
          <input
            type="phone"
            placeholder="atualize o telefone do cliente"
            name="phone"
            autoComplete="off"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          
          <label>Endereço:</label>
          <textarea
            name="address"
            id="address"
            rows="8"
            placeholder="endereço"
            autoComplete="off"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
          <button
            disabled={response === true || loading === true}
            type="submit"
          >
            Atualizar cliente!
          </button>
        </form>
      </div>
    </div>
  );
};

export default SingleClientePage;
