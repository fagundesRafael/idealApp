"use client"
import React, { useEffect, useState } from "react";
import styles from "../ui/produtos/produtos.module.css";
import Link from "next/link";
import Image from "next/image";
import Search from "../ui/search/search";
import Pagination from "../ui/pagination/pagination";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const ProductsPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "products"),
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
      await deleteDoc(doc(db, "products", id));
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Procure por um produto..." />
        <Link href="/produtos/add">
          <button className={styles.addButton}>Add</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Nome</td>
            <td>Unid. de medida</td>
            <td>Preço de origem</td>
            <td>Ação</td>
          </tr>
        </thead>
        <tbody>
            {data.map(itemData => (
              <tr key={itemData.product}>
            <td>
              <div className={styles.product}>
                <Image
                  className={styles.productImage}
                  src={itemData.img || "/noproduct.jpg"}
                  alt=""
                  width={40}
                  height={40}
                  />
                {itemData.product}
              </div>
            </td>
            <td>{itemData.measurementUnit}</td>
            <td>R$ {itemData.originPrice}</td>
            <td className={styles.buttons}>
                <Link href={`/produtos/${itemData.id}/`}>
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
      <Pagination/>
    </div>
  )
};

export default ProductsPage;
