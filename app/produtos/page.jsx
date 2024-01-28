import React from "react";
import styles from "../ui/produtos/produtos.module.css";
import Link from "next/link";
import Image from "next/image";
import Search from "../ui/search/search";
import Pagination from "../ui/pagination/pagination";
import { fetchProducts } from "../lib/data";

const ProductsPage = async ({searchParams}) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, products } = await fetchProducts(q, page);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a product..." />
        <Link href="/produtos/add">
          <button className={styles.addButton}>Adicionar novo produto</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Item</td>
            <td>Preço</td>
            <td>Preço originário</td>
            <td>Tipo</td>
            <td>Estoque</td>
            <td>Ação</td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <div className={styles.product}>
                  <Image
                    className={styles.productImage}
                    src={product.productImage || "/noproduct.jpg"}
                    alt=""
                    width={40}
                    height={40}
                  />
                  {product.title}
                </div>
              </td>
              <td>R$ {product.orderPrice}</td>
              <td>R$ {product.originPrice}</td>
              <td>{product.materialType}</td>
              <td>{`${product.stock} ${product.unidType}`}</td>
              <div className={styles.buttons}>
                <Link href={`/produtos/${product.id}`}>
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
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default ProductsPage;
