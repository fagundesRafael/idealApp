import React from "react";
import styles from "../ui/login/login.module.css";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h1>Login</h1>
        <input type="text" id="username" placeholder="usuário" />
        <input type="password" id="password" placeholder="senha" />
        <button>Entrar</button>
      </form>
    </div>
  );
};

export default LoginPage;
