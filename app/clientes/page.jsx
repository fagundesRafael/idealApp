"use client";
import React, { useEffect, useState } from "react";
import styles from "../ui/clientes/clientes.module.css";
import Search from "../ui/search/search";
import Link from "next/link";
import Image from "next/image";
import Pagination from "../ui/pagination/pagination";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const ClientesPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "clients"),
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
      await deleteDoc(doc(db, "clients", id));
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

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
            <td>Ações</td>
          </tr>
        </thead>
        <tbody>
          {data.map((itemData) => (
            <tr key={itemData.id}>
              <td className={styles.user}>
                <Image
                  className={styles.userImage}
                  src={itemData.img || "/noavatar.png"}
                  alt=""
                  width={40}
                  height={40}
                />
                {itemData.client}
              </td>
              <td>{itemData.email}</td>
              <td>{itemData.phone}</td>
              <td className={styles.buttons}>
                <Link href={`/clientes/${itemData.id}/`}>
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

export default ClientesPage;
