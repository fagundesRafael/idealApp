import React from "react";
import styles from "../../ui/users/singleUser.module.css";
import Image from "next/image";

const SingleUserPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image alt="" src="/noavatar.png" fill />
        </div>
        John Doe
      </div>
      <div className={styles.formContainer}>
        <form className={styles.form}>
          <label>Username</label>
          <input type="text" name="username" placeholder="John Doe" />
          <label>Email</label>
          <input type="email" name="email" placeholder="johndoe@gmail.com" />
          <label>Password</label>
          <input type="password" name="password" placeholder="password" />
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

export default SingleUserPage;
