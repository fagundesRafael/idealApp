import React from "react";
import styles from "../ui/clientes/clientes.module.css";
import Search from "../ui/search/search";
import Link from "next/link";
import Image from "next/image";
import Pagination from "../ui/pagination/pagination";
import { fetchClients } from "../lib/data";
import { deleteClient } from "../lib/actions";

const ClientesPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, clients } = await fetchClients(q, page);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Procurar um cliente..." />
        <Link href="/clientes/add">
          <button className={styles.addButton}>Adicionar novo cliente</button>
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
                <form action={deleteClient}>
                  <input type="hidden" name="id" value={client.id} />
                  <button className={`${styles.button} ${styles.delete}`}>
                    Deletar
                  </button>
                </form>
              </div>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default ClientesPage;
