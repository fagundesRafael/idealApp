import React from "react";
import styles from "./transactions.module.css";
import Image from "next/image";

const Transactions = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Últimas Transações</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Nome</td>
            <td>Status</td>
            <td>Data</td>
            <td>Montante</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  className={styles.userImage}
                  src="/noavatar.png"
                  width={40}
                  height={40}
                  alt=""
                />
                Zé da Beira
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.pending}`}>
                Pendente
              </span>
            </td>
            <td>14/02/2024</td>
            <td>R$ 2.200</td>
          </tr>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  className={styles.userImage}
                  src="/noavatar.png"
                  width={40}
                  height={40}
                  alt=""
                />
                João das Couves
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.done}`}>Concluso</span>
            </td>
            <td>14/02/2024</td>
            <td>R$ 3.000</td>
          </tr>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  className={styles.userImage}
                  src="/noavatar.png"
                  width={40}
                  height={40}
                  alt=""
                />
                Maria das Quengas
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.cancelled}`}>
                Cancelado
              </span>
            </td>
            <td>14/02/2024</td>
            <td>R$ 600,00</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
