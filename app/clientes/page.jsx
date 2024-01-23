import React from "react";
import styles from "../ui/clientes/clientes.module.css";
import Search from "../ui/search/search";
import Link from "next/link";
import Image from "next/image";
import Pagination from "../ui/pagination/pagination";

const ClientesPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Procurar um cliente..." />
        <Link href="/clientes/add">
          <button className={styles.addButton}>Add</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Nome</td>
            <td>Email</td>
            <td>Telefone</td>
            <td>Transações</td>
            <td>Pendências</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  className={styles.userImage}
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                />
                John Doe
              </div>
            </td>
            <td>john@gmail.com</td>
            <td>9 9377-5174</td>
            <td></td>
            <td>nenhuma</td>
            <div className={styles.buttons}>
              <Link href="/clientes/test">
                <button className={`${styles.button} ${styles.view}`}>
                  Ver
                </button>
              </Link>
              <Link href="/">
                <button className={`${styles.button} ${styles.delete}`}>
                  Deletar
                </button>
              </Link>
            </div>
          </tr>
        </tbody>
      </table>
      <Pagination/>
    </div>
  );
};

export default ClientesPage;
