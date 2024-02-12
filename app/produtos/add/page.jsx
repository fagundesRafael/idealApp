"use client";
import React, { useEffect, useState } from "react";
import styles from "../../ui/produtos/addProduto.module.css";
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "@/app/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { FiUpload } from "react-icons/fi";

const AddProductPage = () => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPer] = useState(null);

  const [product, setProduct] = useState("");
  const [originPrice, setOriginPrice] = useState();
  const [measurementUnit, setMeasurementUnit] = useState("");
  const [desc, setDesc] = useState("");

  const router = useRouter();

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPer(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleAdd = async (e) => {
    e.preventDefault();

    setData({ ...data });

    try {
      // --------------write a document (insert in users)---------------------//
      const docRef = await addDoc(collection(db, "products"), {
        ...data,
        product,
        originPrice,
        measurementUnit,
        desc,
        timeStamp: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);
      // ---------------------------------------------------------------//
      router.push("/produtos");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleAdd} className={styles.form}>
        <input
          type="text"
          placeholder="nome do produto"
          name="product"
          required
          onChange={(e) => setProduct(e.target.value)}
        />
        <input
          type="number"
          placeholder="preço de origem do produto"
          name="originPrice"
          required
          onChange={(e) => setOriginPrice(parseFloat(e.target.value))}
        />
        <select
          onChange={(e) => setMeasurementUnit(e.target.value)}
          name="measurementeUnit"
          id="measurementeUnit"
          required
        >
          <option value="">escolha uma unidade de medida</option>
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
        <label htmlFor="file">
          <FiUpload /> imagem
        </label>
        {per !== 100 && per !== null && <span>. . . carregando</span>}
        {per === 100 && <span>. . . . . . . . . OK!</span>}
        <input
          type="file"
          id="file"
          autoComplete="off"
          onChange={(e) => setFile(e.target.files[0])}
          className={styles.file}
        />
        <textarea
          name="desc"
          id="desc"
          rows="8"
          placeholder="Descrição do produto"
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
        <button type="submit">Adicionar novo produto!</button>
      </form>
    </div>
  );
};

export default AddProductPage;
