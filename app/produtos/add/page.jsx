import React from "react";
import styles from "../../ui/produtos/addProduto.module.css";
import { MdUploadFile } from "react-icons/md";

const AddProductPage = () => {
  return (
    <div className={styles.container}>
      <form action="" className={styles.form}>
        <input type="text" placeholder="item" name="item" required />
        <select name="unidType" id="unidType" required>
          <option value="" required>
            unidade de medida
          </option>
          <option value="unidade">unidade</option>
          <option value="mt²">mt²</option>
          <option value="weight">Kg</option>
        </select>
        <input type="number" placeholder="preço de origem" name="originPrice" />
        <input type="number" placeholder="preço atual" name="orderPrice" />
        <input type="number" placeholder="estoque" name="stock" />
        <select name="materialType" id="materialType">
          <option value="">tipo do material</option>
          <option value="sticker">adesivo comum</option>
          <option value="cropped-sticker">adesivo recortado</option>
          <option value="perforated-sticker">adesivo perfurado</option>
          <option value="design">arte</option>
          <option value="lona">lona</option>
          <option value="PVC">PVC</option>
        </select>
        <input type="file" id="productImage" name="productImage" />
        <label htmlFor="productImage"> <MdUploadFile className={styles.upfile}/> imagem</label>
        <textarea
          name="desc"
          id="desc"
          rows="8"
          placeholder="descrição"
        ></textarea>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default AddProductPage;
