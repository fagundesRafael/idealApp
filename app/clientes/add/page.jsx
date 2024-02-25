import React from "react";
import styles from "../../ui/clientes/addCliente.module.css";
import { addClient } from "@/app/lib/actions";

const AddClientePage = () => {
  return (
    <div className={styles.container}>
      <form action={addClient} className={styles.form}>
        <input type="text" placeholder="nome" name="clientName" required />
        <input type="email" placeholder="email" name="email" />
        <input type="text" placeholder="telefone" name="phone" />
        <input type="text" placeholder="imagem (URL)" id="clientImage" name="clientImage" />
        <textarea
          name="address"
          id="address"
          rows="8"
          placeholder="endereço"
        ></textarea>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default AddClientePage;
