import React from "react";
import styles from "../../ui/clientes/singleCliente.module.css";
import Image from "next/image";
import { fetchClient } from "@/app/lib/data";
import { updateClient } from "@/app/lib/actions";

const SingleClientePage = async ({ params }) => {
  const { id } = params;
  const client = await fetchClient(id);
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
          <input
            defaultValue={client.clientName}
            type="text"
            name="clientName"
            placeholder="nome do(a) cliente:"
          />
          <label>Email:</label>
          <input
            defaultValue={client.email}
            type="email"
            name="email"
            placeholder="email do(a) cliente:"
          />
          <label>Telefone:</label>
          <input
            defaultValue={client.phone}
            type="number"
            name="phone"
            placeholder="telefone do(a) cliente:"
          />
          <label>Imagem (URL):</label>
          <input
            defaultValue={client.clientImage}
            type="string"
            name="clientImage"
            placeholder="imagem URL do(a) cliente:"
          />
          <label>Endereço:</label>
          <textarea type="text" name="address" defaultValue={client.address} placeholder="endereço do(a) cliente:" />
          <button>Atualizar</button>
        </form>
      </div>
    </div>
  );
};

export default SingleClientePage;
