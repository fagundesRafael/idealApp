import React, { useEffect, useState } from "react";
import styles from "./transactions.module.css";
import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/app/firebase";

const Transactions = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      query(collection(db, "transactions"), orderBy("timeStamp", "desc"), limit(8)),
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
  
  // useEffect(() => {
  //   const unsub = onSnapshot(
  //     collection(db, "transactions"),
  //     (snapShot) => {
  //       let list = [];
  //       snapShot.docs.forEach((doc) => {
  //         list.push({ id: doc.id, ...doc.data() });
  //       });
  //       setData(list);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );

  //   return () => {
  //     unsub();
  //   };
  // }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Últimas Transações</h2>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
