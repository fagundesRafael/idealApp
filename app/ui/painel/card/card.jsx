import React from 'react'
import { MdSupervisedUserCircle } from 'react-icons/md'
import styles from "./card.module.css"

const Card = ({itemData, title, percentage, text}) => {
  
  return (
    <div className={styles.container}>
      <MdSupervisedUserCircle size={24}/>
      <div className={styles.texts}>
        <span className={styles.title}>{title}</span>
        <span className={styles.number}>{itemData}</span>
        <span className={styles.detail}> 
          {percentage === 0 ? (<span className={styles.positive}>{percentage}</span>) : (<span className={styles.negative}>{percentage}</span>)}{text}</span>
      </div>
    </div>
  )
}

export default Card