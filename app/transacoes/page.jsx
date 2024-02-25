import React from "react";
import styles from "../ui/transacoes/transactions.module.css";
import Link from "next/link";
import Image from "next/image";
import Search from "../ui/search/search";
import Pagination from "../ui/pagination/pagination";
import { fetchTransactions } from "../lib/data";
import { deleteTransaction } from "../lib/actions";

const ProductsPage = async ({searchParams}) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, transactions } = await fetchTransactions(q, page);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a product..." />
        <Link href="/transacoes/add">
          <button className={styles.addButton}>Adicionar nova transação</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
          <td>Transação</td>
            <td>Cliente</td>
            <td>Quantidade</td>
            <td>Valor R$</td>
            <td>Lucro R$</td>
            <td>Liquidez</td>
            <td>Status</td>
            <td>Ações</td>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>
                <div className={styles.product}>
                  <Image
                    className={styles.transactionImage}
                    src={transaction.transactionImage || "/noproduct.jpg"}
                    alt=""
                    width={40}
                    height={40}
                  />
                  {transaction.transactionName}
                </div>
              </td>
              <td>{transaction.clientName}</td>
              <td>{transaction.quantity}</td>
              <td>{transaction.price}</td>
              <td>{transaction.downPayment - transaction.cost}</td>
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
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default ProductsPage;
