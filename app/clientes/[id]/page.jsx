import React from "react";
import styles from "../../ui/clientes/singleCliente.module.css";
import Image from "next/image";

const SingleClientePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image alt="" src="/noavatar.png" fill />
        </div>
        João das Couves
      </div>
      <div className={styles.formContainer}>
        <form className={styles.form}>
          <label>Nome do usuário:</label>
          <input type="text" name="username" placeholder="João das Couves" />
          <label>Email</label>
          <input type="email" name="email" placeholder="joaodascouves@gmail.com" />
          <label>Telefone:</label>
          <input type="number" name="phone" placeholder="69 9 9377-5174" />
          <label>Endereço:</label>
          <textarea type="text" name="address" placeholder="Machadinho D'Oeste RO" />
          <label>Pessoa Jurídica?</label>
          <select name="isCompany" id="isCompany">
            <option value={false}>No</option>
            <option value={true}>Yes</option>
          </select>
          <label>Is Active?</label>
          <select name="isActive" id="isActive">
            <option value={false}>No</option>
            <option value={true}>Yes</option>
          </select>
        </form>
      </div>
    </div>
  );
};

export default SingleClientePage;
