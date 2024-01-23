import React from "react";
import styles from "../ui/painel/painel.module.css";
import Card from "../ui/painel/card/card";
import Rightbar from "../ui/painel/rightbar/rightbar";
import Transactions from "../ui/painel/transactions/transactions";
import Chart from "../ui/painel/chart/chart";

const Dahsboard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          <Card />
          <Card />
          <Card />
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

export default Dahsboard;
