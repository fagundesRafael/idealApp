import React from "react";
import styles from "../../ui/clientes/singleCliente.module.css";
import Image from "next/image";
import { fetchClient } from "@/app/lib/data";
import { updateClient } from "@/app/lib/actions";

const SingleClientePage = async ({params}) => {
  const { id } = params
  const client = await fetchClient(id)
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image alt="" src={client.clientImage || "/noavatar.png"} fill />
        </div>
        {client.clientName}
      </div>
      <div className={styles.formContainer}>
        <form action={updateClient} className={styles.form}>
          <input type="hidden" name="id" value={client.id} />
          <label>Nome do usuário:</label>
          <input type="text" name="clientName" placeholder={client.clientName} />
          <label>Email:</label>
          <input type="email" name="email" placeholder={client.email} />
          <label>Telefone:</label>
          <input type="number" name="phone" placeholder={client.phone} />
          <label>Imagem (URL):</label>
          <input type="string" name="clientImage" placeholder={client.clientImage} />
          <label>Endereço:</label>
          <textarea type="text" name="address" placeholder={client.address} />
          <button>Atualizar</button>
        </form>
      </div>
    </div>
  );
};

export default SingleClientePage;
