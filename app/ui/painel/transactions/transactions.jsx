import React from "react";
import styles from "./transactions.module.css";
import { fetchAllTransactions } from "@/app/lib/data";

const Transactions = async () => {
  const { transactions } = await fetchAllTransactions();

  const getOnlyFiveLast = (() => {
  
    const sortedTransactions = transactions.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  
    const recentTransactions = sortedTransactions.slice(0, 5);
  
    return recentTransactions
  }) ()

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
          {getOnlyFiveLast?.map((transaction) => (
            <tr key={transaction.id}>
              <td className={styles.transaction}>{transaction.transactionName}</td>
              <td>{transaction.clientName.slice(0, 16) || "_"}</td>
              <td>
                {transaction.quantity} {transaction.measurementUnit}
              </td>
              <td>R$ {transaction.price}</td>
              <td>R$ {transaction.downPayment - transaction.cost}</td>
              {transaction.downPayment < transaction.cost ? (
                <td className={styles.negativa}>negativa</td>
              ) : (
                <td className={styles.positiva}>positiva</td>
              )}
              {transaction.orderStatus === "pendente" && (
                <td className={styles.pending}>{transaction.orderStatus}</td>
              )}
              {transaction.orderStatus === "concluso" && (
                <td className={styles.done}>{transaction.orderStatus}</td>
              )}
              {transaction.orderStatus === "cancelado" && (
                <td className={styles.cancelled}>{transaction.orderStatus}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
