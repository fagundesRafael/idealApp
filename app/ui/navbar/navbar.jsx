"use client";
import React from "react";
import styles from "./navbar.module.css";
import {
  MdNotifications,
  MdOutlineChat,
  MdPublic,
  MdSearch,
} from "react-icons/md";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const ordenedPathname = pathname.split("/");

  return (
    <div className={styles.container}>
      {ordenedPathname.length === 2 ? (
        <div className={styles.title}>{ordenedPathname[1]}</div>
      ) : (
        <div className={styles.title}>Adicionar {ordenedPathname[1].split("s")}</div>
      )}

      <div className={styles.menu}>
        <div className={styles.search}>
          <MdSearch />
          <input className={styles.input} type="text" placeholder="Buscar..." />
        </div>
        <div className={styles.icons}>
          <MdOutlineChat size={20} />
          <MdNotifications size={20} />
          <MdPublic size={20} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
