import React from "react";
import styles from "../../ui/clientes/addCliente.module.css";
import { MdUploadFile } from "react-icons/md";

const AddClientePage = () => {
  return (
    <div className={styles.container}>
      <form action="" className={styles.form}>
        <input type="text" placeholder="nome" name="name" required />
        <input type="email" placeholder="email" name="email" />
        <input type="text" placeholder="telefone" name="phone" required />
        <input type="file" id="image" name="image" />
        <label htmlFor="image"> <MdUploadFile className={styles.upfile}/> imagem</label>
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
