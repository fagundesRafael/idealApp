"use client";
import React, { useEffect, useState } from "react";
import styles from "../ui/clientes/clientes.module.css";
import Search from "../ui/search/search";
import Link from "next/link";
import Image from "next/image";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const timeMonthNow = new Date().toString().slice(4, 7);
const timeYearNow = new Date().toString().slice(11, 15);

const ClientesPage = () => {
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(timeMonthNow);
  const [selectedYear, setSelectedYear] = useState(timeYearNow);

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



  const selectedData = data.filter(
    (item) =>
      item.timeStamp.toDate().toString().slice(4, 15).includes(selectedMonth) &&
      item.timeStamp.toDate().toString().slice(4, 15).includes(selectedYear)
  );


  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Procurar um cliente..." />
        <div className={styles.filterData}>
          <label>Exibir clientes registrados em: </label>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className={styles.monthSelect}
        >
          <option value={""}>Todos os meses</option>
          <option value={"Jan"}>Janeiro</option>
          <option value={"Feb"}>Fevereiro</option>
          <option value={"Mar"}>Março</option>
          <option value={"Apr"}>Abril</option>
          <option value={"May"}>Maio</option>
          <option value={"Jun"}>Junho</option>
          <option value={"Jul"}>Julho</option>
          <option value={"Aug"}>Agosto</option>
          <option value={"Sep"}>Setembro</option>
          <option value={"Oct"}>Outubro</option>
          <option value={"Nov"}>Novembro</option>
          <option value={"Dec"}>Dezembro</option>
        </select>
        <label>de </label>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className={styles.yearSelect}
        >
          <option value={""}>Todos os anos</option>
          <option value={"2024"}>2024</option>
          <option value={"2025"}>2025</option>
          <option value={"2026"}>2026</option>
          <option value={"2027"}>2027</option>
          <option value={"2028"}>2028</option>
        </select>
        </div>
        <Link href="/clientes/add">
          <button className={styles.addButton}>Registrar novo cliente</button>
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
          {selectedData.map((itemData) => (
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
    </div>
  );
};

export default ClientesPage;
