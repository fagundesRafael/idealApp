import React from "react";
import styles from "../../ui/produtos/singleProduto.module.css";
import Image from "next/image";
import { fetchProduct } from "@/app/lib/data";
import { updateProduct } from "@/app/lib/actions";

const SingleProductPage = async ({ params }) => {
  const { id } = params;
  const product = await fetchProduct(id);
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image alt="" src={product.productImage || "/noavatar.png"} fill />
        </div>
        {product.title}
      </div>
      <div className={styles.formContainer}>
        <form action={updateProduct} className={styles.form}>
          <input type="hidden" name="id" value={product.id} />
          <label>Title</label>
          <input type="text" name="title" placeholder={product.title} />
          <label>Unidade de Medida</label>
          <select name="unidType" id="unidType" required>
            <option value="" required>
              unidade de medida
            </option>
            <option value="unidade">unidade</option>
            <option value="mt²">mt²</option>
            <option value="peso">Kg</option>
          </select>
          <label>Preço de origem R$:</label>
          <input
            type="number"
            name="originPrice"
            placeholder={product.originPrice}
          />
          <label>Preço atual R$:</label>
          <input
            type="number"
            name="orderPrice"
            placeholder={product.orderPrice}
          />
          <label>Estoque {product.unidType}</label>
          <input type="number" name="stock" placeholder={product.stock} />
          <label>Material</label>
          <select name="materialType" id="materialType" required>
            <option value="">tipo do material</option>
            <option value="adesivo comum">adesivo comum</option>
            <option value="adesivo recortado">adesivo recortado</option>
            <option value="adesivo perfurado">adesivo perfurado</option>
            <option value="lona">lona</option>
            <option value="pvc">pvc</option>
          </select>
          <label>Imagem (URL)</label>
          <input
            type="text"
            placeholder={product.productImage}
            id="productImage"
            name="productImage"
          />
          <textarea
            name="desc"
            id="desc"
            rows="8"
            placeholder="descrição"
          ></textarea>
          <button>Atualizar</button>
        </form>
      </div>
    </div>
  );
};

export default SingleProductPage;
