"use client";
import React, { useState } from "react";
import styles from "../ui/login/login.module.css";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault();

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
        router.push("/painel")

      })
      .catch((error) => {
        setError(true);
      });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin} className={styles.form}>
        <h1>Login</h1>
        <input
          type="email"
          id="email"
          placeholder="insira e-mail de usuário"
          required
          autoComplete="on"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          placeholder="informe a senha de usuário"
          required
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
        {error && <span>Email e/ou senha incorreto(s)!</span>}
      </form>
    </div>
  );
};

export default LoginPage;
