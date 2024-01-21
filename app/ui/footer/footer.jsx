import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Image alt="" src="/logo_ideal_bg.png" height={20} width={20} />
        Ideal App
      </div>
      <div className={styles.created}>
        © Created by: <span>Rafael Fagundes</span>
      </div>
    </div>
  );
};

export default Footer;
