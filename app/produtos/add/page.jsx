import React from "react";
import styles from "../../ui/produtos/addProduto.module.css";
import { addProduct } from "@/app/lib/actions";

const AddProductPage = () => {
  return (
    <div className={styles.container}>
      <form action={addProduct} className={styles.form}>
        <input type="text" placeholder="title" name="title" required />
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
        <select name="materialType" id="materialType" required>
          <option value="">tipo do material</option>
          <option value="adesivo comum">adesivo comum</option>
          <option value="adesivo recortado">adesivo recortado</option>
          <option value="adesivo perfurado">adesivo perfurado</option>
          <option value="lona">lona</option>
          <option value="pvc">pvc</option>
        </select>
        <input type="text" placeholder="imagem (URL)" id="productImage" name="productImage" />
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
