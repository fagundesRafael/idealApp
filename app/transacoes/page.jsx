"use client";
import React, { useEffect, useState } from "react";
import styles from "../ui/transacoes/transacoes.module.css";
import Search from "../ui/search/search";
import Link from "next/link";
import Pagination from "../ui/pagination/pagination";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const TransacoesPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "transactions"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "transactions", id));
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Procurar uma transação..." />
        <Link href="/transacoes/add">
          <button className={styles.addButton}>Add nova transação</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Transação</td>
            <td>Cliente</td>
            <td>Quantidade</td>
            <td>Valor</td>
            <td>Lucro</td>
            <td>Liquidez</td>
            <td>Status</td>
            <td>Ações</td>
          </tr>
        </thead>
        <tbody>
          {data.map((itemData) => (
            <tr key={itemData.id}>
              <td className={styles.user}>
                {itemData.transaction}
              </td>
              <td>{itemData.client.slice(0, 16) || "_"}</td>
              <td>{itemData.quantity} {itemData.measurementeUnit}</td>
              <td>R$ {itemData.finalPrice}</td>
              <td>R$ {(itemData.payload) - (itemData.originPrice)}</td>
              {itemData.payload < itemData.originPrice ? (
                <td className={styles.negativa}>negativa</td>
              ) : (
                <td className={styles.positiva}>positiva</td>
              )}
              {itemData.status === "pendente" && (<td className={styles.pendente}>{itemData.status}</td>)}
              {itemData.status === "concluso" && (<td className={styles.concluso}>{itemData.status}</td>)}
              {itemData.status === "cancelado" && (<td className={styles.cancelado}>{itemData.status}</td>)}
              <td className={styles.buttons}>
                <Link href={`/transacoes/${itemData.id}/`}>
                  <button className={`${styles.button} ${styles.view}`}>
                    Ver
                  </button>
                </Link>
                  <button onClick={() => handleDelete(itemData.id)} className={`${styles.button} ${styles.delete}`}>
                    Deletar
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default TransacoesPage;
