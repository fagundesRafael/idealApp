"use client";
import React, { useEffect, useState } from "react";
import styles from "../../ui/transacoes/addTransacoes.module.css";
import { useRouter } from "next/navigation";
import { addDoc, collection, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "@/app/firebase";

const AddTransacaoPage = () => {
  const [data, setData] = useState({});
  const [clients, setClients] = useState([]);

  const [transaction, setTransaction] = useState("");
  const [client, setClient] = useState("");
  const [provider, setProvider] = useState("");
  const [source, setSource] = useState("");
  const [quantity, setQuantity] = useState();
  const [measurementeUnit, setMeasurementUnit] = useState("");
  const [originPrice, setOriginPrice] = useState();
  const [finalPrice, setFinalPrice] = useState();
  const [payload, setPayload] = useState();
  const [status, setStatus] = useState("")
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
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
        provider,
        source,
        quantity,
        measurementeUnit,
        originPrice,
        finalPrice,
        payload,
        observations,
        status,
        timeStamp: serverTimestamp(),
        timeStampString: day + "/" + month + "/" + year,
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
          <option value="">nome do cliente:</option>
          {clients.map((item) => (
            <option key={item.id} value={item.client}>
              {item.client}
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
          <option value="Epson T3170 CORANTE">Epson T3170 CORANTE</option>
          <option value="Epson T3170 PIGMENTADA">Epson T3170 PIGMENTADA</option>
        </select>
        <div className={styles.extraComponent01}>
          <input
            type="number"
            step={0.01}
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
            <option value="bloc">bloco</option>
            <option value="resm">resma</option>
            <option value="unid">unidade</option>
            <option value="cent">cento</option>
            <option value="milh">milheiro</option>
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
        <select name="status" id="status" onChange={(e) => setStatus(e.target.value)}>
          <option value="">status:</option>
          <option value="pendente">pendente</option>
          <option value="concluso">concluso</option>
          <option value="cancelado">cancelado</option>
        </select>
        <div className={styles.extraComponent02}>
          <select
            onChange={(e) => setDay(e.target.value)}
            name="day"
            id="day"
            required
          >
            <option value="">dia:</option>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="16">16</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25">25</option>
            <option value="26">26</option>
            <option value="27">27</option>
            <option value="28">28</option>
            <option value="29">29</option>
            <option value="30">30</option>
            <option value="31">31</option>
          </select>
          <select
            onChange={(e) => setMonth(e.target.value)}
            name="day"
            id="day"
            required
          >
            <option value="">mês:</option>
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
          <select
            onChange={(e) => setYear(e.target.value)}
            name="day"
            id="day"
            required
          >
            <option value="">ano:</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
            <option value="2028">2028</option>
          </select>
        </div>
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
