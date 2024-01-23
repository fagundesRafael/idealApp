import Image from "next/image";
import styles from "./rightbar.module.css";
import { MdPlayCircleFilled, MdReadMore } from "react-icons/md";

const Rightbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.bgContainer}>
          <Image className={styles.bg} src="/astronaut.png" alt="" fill />
        </div>
        <div className={styles.text}>
          <span className={styles.notification}>🔥 Disponível</span>
          <h3 className={styles.title}>
            Precisando aprender como utilizar o idealApp?
          </h3>
          <span className={styles.subtitle}>Só 4 minutos pra aprenser (se for retardado).</span>
          <p className={styles.desc}>
            Pra você que é retardado e não consegue se virar sozinho, baixe o
            vídeo tutorial e aprenda seu jumento!
          </p>
          <button className={styles.button}>
            <MdPlayCircleFilled />
            Assista
          </button>
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.text}>
          <span className={styles.notification}>🚀 Atualizaçãoes</span>
          <h3 className={styles.title}>
            Verificar aqui atualizações do aplicativo!
          </h3>
          <span className={styles.subtitle}>Aprimore o desenpenho da aplicação!</span>
          <p className={styles.desc}>
            Qualquer novidade pertinente ao sistema você será sempre notificado por aqui!
          </p>
          <button className={styles.button}>
            <MdReadMore />
            Verificar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
