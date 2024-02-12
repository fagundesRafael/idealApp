"use client";
import React, { useEffect, useState } from "react";
import styles from "../../ui/clientes/addCliente.module.css";
import { useRouter } from "next/navigation";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/app/firebase";

const AddTransacaoPage = () => {
  const [data, setData] = useState({});
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);

  const [transaction, setTransaction] = useState("");
  const [client, setClient] = useState("");
  const [product, setProduct] = useState("");
  const [service, setService] = useState("");
  const [provider, setProvider] = useState("");
  const [source, setSource] = useState("");
  const [quantity, setQuantity] = useState();
  const [measurementeUnit, setMeasurementUnit] = useState("");
  const [originPrice, setOriginPrice] = useState();
  const [finalPrice, setFinalPrice] = useState();
  const [payload, setPayload] = useState();
  const [observations, setObservations] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "clients"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setClients(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "products"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setProducts(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "services"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setServices(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const router = useRouter();

  const handleAdd = async (e) => {
    e.preventDefault();

    setData({ ...data });

    try {
      // --------------write a document (insert in users)---------------------//
      const docRef = await addDoc(collection(db, "transactions"), {
        ...data,
        transaction,
        client,
        product,
        service,
        provider,
        source,
        quantity,
        measurementeUnit,
        originPrice,
        finalPrice,
        payload,
        observations,
        timeStamp: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);
      // ---------------------------------------------------------------//
      router.push("/transacoes");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleAdd} className={styles.form}>
        <input
          type="text"
          placeholder="nome da transação:"
          name="transaction"
          required
          autoComplete="on"
          onChange={(e) => setTransaction(e.target.value)}
        />
        <select
          name="client"
          id="client"
          required
          onChange={(e) => setClient(e.target.value)}
        >
          <option value="">informar o cliente:</option>
          {clients.map((item) => (
            <option key={item.id} value={item.client}>
              {item.client}
            </option>
          ))}
        </select>
        <select
          name="product"
          id="product"
          onChange={(e) => setProduct(e.target.value)}
        >
          <option value="">informar o produto:</option>
          {products.map((item) => (
            <option key={item.id} value={item.product}>
              {item.product}
            </option>
          ))}
        </select>
        <select
          name="service"
          id="service"
          onChange={(e) => setService(e.target.value)}
        >
          <option value="">informar o serviço:</option>
          {services.map((item) => (
            <option key={item.id} value={item.service}>
              {item.service}
            </option>
          ))}
        </select>
        <select
          name="provider"
          id="provider"
          required
          onChange={(e) => setProvider(e.target.value)}
        >
          <option value="">informar o fornecedor:</option>
          <option value="Outro">Outro</option>
          <option value="Ideal Comunicação">Ideal Comunicação</option>
          <option value="RD Gráfica">RD Gráfica</option>
          <option value="Atual Card">Atual Card</option>
        </select>
        <select
          name="source"
          id="source"
          required
          onChange={(e) => setSource(e.target.value)}
        >
          <option value="">(selecione a máquina / equipamento):</option>
          <option value="Outro">Outro</option>
          <option value="Tercerizado(a)">Tercerizado(a)</option>
          <option value="GoldCut JK Séries">GoldCut JK Séries</option>
          <option value="Epson WF-C5810 CORANTE">Epson WF-C5810 CORANTE</option>
          <option value="Epson WF-C5810 PIGMENTADA">
            Epson WF-C5810 PIGMENTADA
          </option>
        </select>
        <div className={styles.component}>
          <input
            type="number"
            step={0.1}
            placeholder="quantidade:"
            name="quantity"
            autoComplete="off"
            required
            onChange={(e) => setQuantity(parseFloat(e.target.value))}
          />
          <select
            onChange={(e) => setMeasurementUnit(e.target.value)}
            name="measurementeUnit"
            id="measurementeUnit"
            required
          >
            <option value="">und. de medida:</option>
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
        </div>
        <input
          type="number"
          step={0.1}
          placeholder="custo inicial R$:"
          name="originPrice"
          autoComplete="off"
          required
          onChange={(e) => setOriginPrice(parseFloat(e.target.value))}
        />
        <input
          type="number"
          step={0.1}
          placeholder="valor final R$:"
          name="finalPrice"
          autoComplete="off"
          required
          onChange={(e) => setFinalPrice(parseFloat(e.target.value))}
        />
        <input
          type="number"
          step={0.1}
          placeholder="valor pago R$:"
          name="payload"
          autoComplete="off"
          required
          onChange={(e) => setPayload(parseFloat(e.target.value))}
        />
        <textarea
          name="observations"
          id="observations"
          rows="8"
          placeholder="observações gerais:"
          autoComplete="off"
          onChange={(e) => setObservations(e.target.value)}
        ></textarea>
        <button type="submit">Registrar nova transação!</button>
      </form>
    </div>
  );
};

export default AddTransacaoPage;
