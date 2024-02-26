import React from "react";
import styles from "../ui/transacoes/transactions.module.css";
import Link from "next/link";
import Search from "../ui/search/search";
import Pagination from "../ui/pagination/pagination";
import { fetchTransactions } from "../lib/data";
import { deleteTransaction } from "../lib/actions";

const ProductsPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, transactions } = await fetchTransactions(q, page);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Pesquisar transação..." />
        <Link href="/transacoes/add">
          <button className={styles.addButton}>Adicionar nova transação</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Transação</td>
            <td>Cliente</td>
            <td>Qtd</td>
            <td>Valor</td>
            <td>Lucro</td>
            <td>Resumo</td>
            <td>Status</td>
            <td>Ações</td>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>
                  {transaction?.transactionName.slice(0, 22)}
              </td>
              <td>{transaction?.clientName.slice(0, 16)}</td>
              <td>{`${transaction.quantity} ${transaction.measurementUnit}`}</td>
              <td>R$ {transaction.price}</td>
              <td>R$ {(transaction.downPayment - transaction.cost).toString().slice(0, 5)}</td>
              {transaction?.downPayment < transaction.cost ? (
                <td className={styles.negative}>negativo</td>
              ) : (
                <td className={styles.positive}>positivo</td>
              )}
              {transaction?.orderStatus === "concluso" && (
                <td className={styles.done}>{transaction.orderStatus}</td>
              )}
              {transaction?.orderStatus === "pendente" && (
                <td className={styles.pending}>{transaction.orderStatus}</td>
              )}
              {transaction?.orderStatus === "cancelado" && (
                <td className={styles.cancelled}>{transaction.orderStatus}</td>
              )}
              <td>
                <div className={styles.buttons}>
                  <Link href={`/transacoes/${transaction.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      Ver
                    </button>
                  </Link>
                  <form action={deleteTransaction}>
                    <input type="hidden" name="id" value={transaction.id} />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Deletar
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default ProductsPage;
