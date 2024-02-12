"use client";
import React, { useEffect, useState } from "react";
import styles from "../../ui/clientes/addCliente.module.css";
import { useRouter } from "next/navigation";
import { storage, db } from "@/app/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { FiUpload } from "react-icons/fi";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const AddClientePage = () => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPer] = useState(null);

  const [client, setClient] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

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
      const docRef = await addDoc(collection(db, "clients"), {
        ...data,
        client,
        email,
        phone,
        address,
        timeStamp: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);
      // ---------------------------------------------------------------//
      router.push("/clientes");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleAdd} className={styles.form}>
        <input
          type="text"
          placeholder="nome do cliente"
          name="client"
          required
          autoComplete="off"
          value={client}
          onChange={(e) => setClient(e.target.value)}
        />
        <input
          type="email"
          placeholder="email:"
          name="email"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="phone"
          placeholder="telefone"
          name="phone"
          autoComplete="off"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
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
          name="address"
          id="address"
          rows="8"
          placeholder="endereço"
          autoComplete="off"
          onChange={(e) => setAddress(e.target.value)}
        ></textarea>
        <button type="submit">Adicionar novo cliente!</button>
      </form>
    </div>
  );
};

export default AddClientePage;
