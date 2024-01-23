import React from "react";
import styles from "../../ui/produtos/singleProduto.module.css";
import Image from "next/image";

const SingleProductPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image alt="" src="/noavatar.png" fill />
        </div>
        iPhone
      </div>
      <div className={styles.formContainer}>
        <form className={styles.form}>
          <label>Title</label>
          <input type="text" name="username" placeholder="John Doe" />
          <label>price</label>
          <input type="number" name="price" placeholder="$" />
          <label>stock</label>
          <input type="number" name="stock" placeholder="stock" />
          <label>Phone</label>
          <input type="text" name="phone" placeholder="+55 69 9 9377-5174" />
          <label>Address</label>
          <textarea type="text" name="address" placeholder="New York" />
          <label>Is Admin?</label>
          <select name="isAdmin" id="isAdmin">
            <option value={false}>No</option>
            <option value={true}>Yes</option>
          </select>
          <label>Is Active?</label>
          <select name="isActive" id="isActive">
            <option value={false}>No</option>
            <option value={true}>Yes</option>
          </select>
        </form>
      </div>
    </div>
  );
};

export default SingleProductPage;
