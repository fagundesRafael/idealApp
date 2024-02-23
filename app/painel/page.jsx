"use client";
import React, { useEffect, useState } from "react";
import styles from "../ui/painel/painel.module.css";
import Card from "../ui/painel/card/card";
import Rightbar from "../ui/painel/rightbar/rightbar";
import Transactions from "../ui/painel/transactions/transactions";
import Chart from "../ui/painel/chart/chart";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const Dashboard = () => {
  const [clientData, setClientData] = useState([]);
  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
    const unsubClients = onSnapshot(
      collection(db, "clients"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setClientData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    const unsubTransactions = onSnapshot(
      collection(db, "transactions"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setTransactionData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsubClients();
      unsubTransactions();
    };
  }, []);

  const totalDebtsinPercentage = (() => {
    if (transactionData.length === 0) {
      return 0;
    }

    const debtClients = transactionData.filter(
      (transaction) => transaction.payload < transaction.finalPrice
    );

    return (debtClients.length / transactionData.length) * 100;
  })();

  const totalProductionInProgress = (() => {
    const inProgress = transactionData.filter(
      (transaction) => transaction.status === "pendente"
    );
    return inProgress.length;
  })();

  const totalPending = (() => {
    const penddingTransactions = transactionData.filter(
        (transaction) => transaction.payload !== transaction.finalPrice
    );

    const commited = penddingTransactions.reduce(
        (acc, transaction) => acc + transaction.finalPrice,
        0
    );

    const earned = penddingTransactions.reduce(
        (acc, transaction) => acc + transaction.payload,
        0
    );

    return commited - earned;
}) ();

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          <Card
            title="Clientes"
            itemData={clientData.length + " total"}
            percentage={totalDebtsinPercentage.toString().slice(0, 5) + " %"}
            text=" de clientes com pendências financeiras!"
          />
          <Card
            title={"Em produção"}
            itemData={totalProductionInProgress + " unidades"}
            text={"monitorar o andamento das ordens de serviço!"}
          />
          <Card
            title={"Pendências"}
            itemData={"R$ " + totalPending}
            percentage={""}
            text={"montante total de valores a receber!"}
          />
        </div>
        <Transactions />
        <Chart />
      </div>
      <div className={styles.side}>
        <Rightbar />
      </div>
    </div>
  );
};

export default Dashboard;
