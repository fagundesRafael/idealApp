import React from "react";
import styles from "./sidebar.module.css";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
  MdSupervisorAccount,
} from "react-icons/md";
import MenuLink from "../menulink/menuLink";
import Image from "next/image";
import { auth, signOut } from "@/app/auth";

const menuItems = [
  {
    title: "Páginas",
    list: [
      {
        title: "Painel",
        path: "/painel",
        icon: <MdDashboard />,
      },
      {
        title: "Usuários",
        path: "/usuarios",
        icon: <MdSupervisorAccount />,
      },
      {
        title: "Clientes",
        path: "/clientes",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Transações",
        path: "/transacoes",
        icon: <MdAttachMoney />,
      },
    ],
  },
  {
    title: "Estatísticas",
    list: [
      {
        title: "Receita",
        path: "/receita",
        icon: <MdWork />,
      },
      {
        title: "Relatórios",
        path: "/relatirios",
        icon: <MdAnalytics />,
      },
      {
        title: "Equipe",
        path: "/equipe",
        icon: <MdPeople />,
      },
    ],
  },
  {
    title: "Usuário",
    list: [
      {
        title: "Configurações",
        path: "/configuracoes",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Help",
        path: "/help",
        icon: <MdHelpCenter />,
      },
    ],
  },
];

const Sidebar = async () => {

  const { user } = await auth();

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image className={styles.userImage} src="/logo_ideal_bgSoft.png" alt="" width={50} height={50} />
        <div className={styles.userDetail}>
          <span className={styles.userName}>{user.username}</span>
          <span className={styles.userTitle}>Administrador</span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      <form action={async () => {
        "use server"
        await signOut()
      }}>

      <button className={styles.logout}>
        <MdLogout/>
        sair
      </button>
      </form>
    </div>
  );
};

export default Sidebar;
