"use client";
import React, { useEffect, useState } from "react";
import styles from "../ui/servicos/services.module.css";
import Link from "next/link";
import Search from "../ui/search/search";
import Pagination from "../ui/pagination/pagination";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import Image from "next/image";

const ServicosPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "services"),
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
      await deleteDoc(doc(db, "services", id));
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Procure por um serviço..." />
        <Link href="/servicos/add">
          <button className={styles.addButton}>Add</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Serviço:</td>
            <td>Especificação:</td>
            <td>Preço recomendado:</td>
            <td>Ação:</td>
          </tr>
        </thead>
        <tbody>
          {data.map((itemData) => (
            <tr key={itemData.service}>
              <td>
              <div className={styles.product}>
                <Image
                  className={styles.productImage}
                  src={itemData.img || "/noservice.jpg"}
                  alt=""
                  width={40}
                  height={40}
                  />
                {itemData.service}
              </div>
            </td>
              <td>{itemData.service}</td>
              <td>R$ {itemData.price}</td>
              <td className={styles.buttons}>
                <Link href={`/servicos/${itemData.id}/`}>
                  <button className={`${styles.button} ${styles.view}`}>
                    Ver
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(itemData.id)}
                  className={`${styles.button} ${styles.delete}`}
                >
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

export default ServicosPage;
