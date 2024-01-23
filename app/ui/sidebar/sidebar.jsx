import React from "react";
import styles from "./sidebar.module.css";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
} from "react-icons/md";
import MenuLink from "../menulink/menuLink";
import Image from "next/image";

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
        title: "Clientes",
        path: "/clientes",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Produtos",
        path: "/produtos",
        icon: <MdShoppingBag />,
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

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image className={styles.userImage} src="/logo_ideal_bgSoft.png" alt="" width={50} height={50} />
        <div className={styles.userDetail}>
          <span className={styles.userName}>Rafael Fagundes</span>
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
      <button className={styles.logout}>
        <MdLogout/>
        sair
      </button>
    </div>
  );
};

export default Sidebar;
