import React from "react";
import styles from "../ui/clientes/clientes.module.css";
import Search from "../ui/search/search";
import Link from "next/link";
import Image from "next/image";
import Pagination from "../ui/pagination/pagination";
import { fetchClients } from "../lib/data";

const ClientesPage = async () => {
  const clients = await fetchClients();
  console.log(clients);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Procurar um cliente..."/>
        <Link href="/clientes/add">
          <button className={styles.addButton}>Adicionar</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Nome</td>
            <td>Email</td>
            <td>Telefone</td>
            <td>Transações</td>
            <td>Pendências</td>
            <td>Ações</td>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
            <td>
              <div className={styles.client}>
                <Image
                  className={styles.clientImage}
                  src={client.clientImage || "/noavatar.png"}
                  alt=""
                  width={40}
                  height={40}
                />
                {client.name}
              </div>
            </td>
            <td>{client.email}</td>
            <td>{client.phone}</td>
            <td></td>
            <td>nenhuma</td>
            <div className={styles.buttons}>
              <Link href={`/clientes/${client.id}`}>
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
      <Pagination />
    </div>
  );
};

export default ClientesPage;
