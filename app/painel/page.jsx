import React from "react";
import styles from "../ui/painel/painel.module.css";
import Card from "../ui/painel/card/card";
import Rightbar from "../ui/painel/rightbar/rightbar";
import Transactions from "../ui/painel/transactions/transactions";
import Chart from "../ui/painel/chart/chart";
import { fetchAllClients, fetchAllTransactions } from "../lib/data";

const Painel = async () => {
  const { clients } = await fetchAllClients();
  const { transactions } = await fetchAllTransactions()

  const totalDebtsinPercentage = (() => {
    if (transactions.length === 0) {
      return 0;
    }

    const debtClients = transactions.filter(
      (transaction) => transaction.downPayment < transaction.price
    );

    return (debtClients.length / transactions.length) * 100;
  })();

  const totalProductionInProgress = (() => {
    const inProgress = transactions.filter(
      (transaction) => transaction.orderStatus === "pendente"
    );
    return inProgress.length;
  })();

  const totalPending = (() => {
    const penddingTransactions = transactions.filter(
        (transaction) => transaction.downPayment !== transaction.price
    );

    const commited = penddingTransactions.reduce(
        (acc, transaction) => acc + transaction.price,
        0
    );

    const earned = penddingTransactions.reduce(
        (acc, transaction) => acc + transaction.downPayment,
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
            itemData={clients.length + " total"}
            percentage={totalDebtsinPercentage.toString().slice(0, 2) + " %"}
            text=" desses clientes estão com pendências financeiras!"
          />
          <Card
            title={"Em produção"}
            itemData={totalProductionInProgress + " unidades"}
            text={"monitorar com atenção as ordens de serviço em andamento!"}
          />
          <Card
            title={"Pendências"}
            itemData={"R$ " + totalPending}
            percentage={""}
            text={"montante total de valores a receber!"}
          />
        </div>
        <Transactions/>
        <Chart/>
      </div>
      <div className={styles.side}>
        <Rightbar/>
      </div>
    </div>
  );
};

export default Painel;
