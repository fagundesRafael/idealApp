import React from 'react'
import { MdSupervisedUserCircle } from 'react-icons/md'
import styles from "./card.module.css"

const Card = () => {
  return (
    <div className={styles.container}>
      <MdSupervisedUserCircle size={24}/>
      <div className={styles.texts}>
        <span className={styles.title}>Total de clientes</span>
        <span className={styles.number}>10.273</span>
        <span className={styles.detail}> 
          <span className={styles.positive}>12%</span> em comparação a semana passada</span>
      </div>
    </div>
  )
}

export default Card