import React from "react";
import styles from "../ui/produtos/produtos.module.css";
import Link from "next/link";
import Image from "next/image";
import Search from "../ui/search/search";
import Pagination from "../ui/pagination/pagination";

const ProductsPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a product..." />
        <Link href="/produtos/add">
          <button className={styles.addButton}>Add</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Nome</td>
            <td>Descrição</td>
            <td>Preço</td>
            <td>Marca</td>
            <td>Estoque</td>
            <td>Ação</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className={styles.product}>
                <Image
                  className={styles.productImage}
                  src="/noproduct.jpg"
                  alt=""
                  width={40}
                  height={40}
                />
                Lona
              </div>
            </td>
            <td>Mt²</td>
            <td>R$ 30,00</td>
            <td>Datase</td>
            <td>72</td>
            <div className={styles.buttons}>
              <Link href="/products/test">
                <button className={`${styles.button} ${styles.view}`}>
                  Ver
                </button>
              </Link>
              <Link href="/">
                <button className={`${styles.button} ${styles.delete}`}>
                  Deletar
                </button>
              </Link>
            </div>
          </tr>
        </tbody>
      </table>
      <Pagination/>
    </div>
  )
};

export default ProductsPage;
