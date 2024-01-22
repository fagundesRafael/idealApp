import React from "react";
import styles from "../ui/products/products.module.css";
import Link from "next/link";
import Image from "next/image";
import Search from "../ui/search/search";
import Pagination from "../ui/pagination/pagination";

const ProductsPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a product..." />
        <Link href="/products/add">
          <button className={styles.addButton}>Add</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Title</td>
            <td>Description</td>
            <td>Price</td>
            <td>Created At</td>
            <td>Stock</td>
            <td>Action</td>
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
                iPhone
              </div>
            </td>
            <td>Desc</td>
            <td>$ 999</td>
            <td>13.01.2022</td>
            <td>72</td>
            <div className={styles.buttons}>
              <Link href="/products/test">
                <button className={`${styles.button} ${styles.view}`}>
                  View
                </button>
              </Link>
              <Link href="/">
                <button className={`${styles.button} ${styles.delete}`}>
                  Delete
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
