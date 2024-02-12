"use client";
import React, { useEffect, useState } from "react";
import styles from "../../ui/produtos/singleProduto.module.css";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useFetchDocument } from "@/app/hooks/useFetchDocument";
import { useUpdateDocument } from "@/app/hooks/useUpdateDocument";

const SingleProductPage = () => {
  const { id } = useParams();
  const { document, loading } = useFetchDocument("products", id);
  const { updateDocument, response } = useUpdateDocument("products");

  const [product, setProduct] = useState("");
  const [originPrice, setOriginPrice] = useState();
  const [measurementUnit, setMeasurementUnit] = useState("");
  const [desc, setDesc] = useState("");

  const router = useRouter();

  const data = {
    product,
    originPrice,
    measurementUnit,
    desc,
  };

  const handleUpDate = async (e) => {
    e.preventDefault();

    updateDocument(id, data);

    router.push("/produtos");
  };

  useEffect(() => {
    if (document) {
      setProduct(document.product);
      setOriginPrice(document.originPrice);
      setMeasurementUnit(document.measurementUnit);
      setDesc(document.desc);
    }
  }, [document]);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          {document?.img ? (
            <Image alt="" src={document.img} fill />
          ) : (
            <Image alt="" src="/noavatar.png" fill />
          )}
        </div>
        {document?.product}
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleUpDate} className={styles.form}>
          <label>Produto:</label>
          <input
            type="text"
            name="product"
            value={product}
            required
            autoComplete="off"
            onChange={(e) => setProduct(e.target.value)}
          />
          <label>Preço de origem em R$:</label>
          <input
            type="number"
            name="price"
            required
            value={originPrice}
            autoComplete="off"
            onChange={(e) => setOriginPrice(parseInt(e.target.value))}
          />
          <label>Unidade de medida:</label>
          <select
            name="measurementeUnit"
            id="measurementeUnit"
            value={measurementUnit}
            onChange={(e) => setMeasurementUnit(e.target.value)}
          >
            <option value="mt²">mt²</option>
            <option value="bloco">bloco</option>
            <option value="resma">resma</option>
            <option value="unidade">unidade</option>
            <option value="cento">cento</option>
            <option value="milheiro">milheiro</option>
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="A3">A3</option>
            <option value="A4">A4</option>
            <option value="A5">A5</option>
          </select>
          <label>Descrição:</label>
          <textarea
            type="text"
            name="desc"
            id="desc"
            rows={8}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button
            disabled={response === true || loading === true}
            type="submit"
          >
            Atualizar produto!
          </button>
        </form>
      </div>
    </div>
  );
};

export default SingleProductPage;
