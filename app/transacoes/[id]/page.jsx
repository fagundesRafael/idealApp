"use client";
import React, { useEffect, useState } from "react";
import styles from "../../ui/transacoes/singleTransacao.module.css";
import { useParams } from "next/navigation";
import { useFetchDocument } from "@/app/hooks/useFetchDocument";
import { useUpdateDocument } from "@/app/hooks/useUpdateDocument";
import { useRouter } from "next/navigation";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase";

const SingleTransactionPage = () => {
  const { id } = useParams();
  const { document, loading } = useFetchDocument("transactions", id);
  const { updateDocument, response } = useUpdateDocument("transactions");

  const [clients, setClients] = useState([]);

  const [transaction, setTransaction] = useState("");
  const [client, setClient] = useState("");
  const [provider, setProvider] = useState("");
  const [source, setSource] = useState("");
  const [quantity, setQuantity] = useState();
  const [measurementeUnit, setMeasurementUnit] = useState("");
  const [status, setStatus] = useState("");
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

  const router = useRouter();

  const data = {
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
  };

  const handleUpDate = async (e) => {
    e.preventDefault();

    updateDocument(id, data);

    router.push("/transacoes");
  };

  useEffect(() => {
    if (document) {
      setTransaction(document.transaction);
      setClient(document.client);
      setProvider(document.provider);
      setSource(document.source);
      setQuantity(document.quantity);
      setMeasurementUnit(document.measurementeUnit);
      setOriginPrice(document.originPrice);
      setFinalPrice(document.finalPrice);
      setPayload(document.payload);
      setObservations(document.observations);
    }
  }, [document]);

  return (
    <div className={styles.container}>
      <form onSubmit={handleUpDate} className={styles.form}>
        <input
          type="text"
          name="transaction"
          required
          autoComplete="off"
          placeholder="nome da transação:"
          value={transaction}
          onChange={(e) => setTransaction(e.target.value)}
        />
        <select
          name="client"
          id="client"
          value={client}
          onChange={(e) => setClient(e.target.value)}
        >
          {clients.map((item) => (
            <option key={item.id} value={item.client}>
              {item.client}
            </option>
          ))}
        </select>
        <select
          name="source"
          id="source"
          value={source}
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
        <input
          type="number"
          placeholder="quantidade"
          step={0.1}
          name="quantity"
          autoComplete="off"
          required
          value={quantity}
          onChange={(e) => setQuantity(parseFloat(e.target.value))}
        />
        <select
          onChange={(e) => setMeasurementUnit(e.target.value)}
          name="measurementeUnit"
          id="measurementeUnit"
          required
          value={measurementeUnit}
        >
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
        <select
          name="provider"
          id="provider"
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
        >
          <option value="Outro">Outro</option>
          <option value="Ideal Comunicação">Ideal Comunicação</option>
          <option value="RD Gráfica">RD Gráfica</option>
          <option value="Atual Card">Atual Card</option>
        </select>
        <select
          onChange={(e) => setStatus(e.target.value)}
          name="status"
          id="status"
          value={status}
        >
          <option value="pendente">pendente</option>
          <option value="concluso">concluso</option>
          <option value="cancelado">cancelado</option>
        </select>
        <input
          type="number"
          placeholder="Custo inicial R$:"
          step={0.1}
          name="originPrice"
          autoComplete="off"
          required
          value={originPrice}
          onChange={(e) => setOriginPrice(parseFloat(e.target.value))}
        />
        <input
          type="number"
          placeholder="valor final R$:"
          step={0.1}
          name="finalPrice"
          autoComplete="off"
          required
          value={finalPrice}
          onChange={(e) => setFinalPrice(parseFloat(e.target.value))}
        />
        <input
          type="number"
          placeholder="pagamento R$:"
          step={0.1}
          name="payload"
          autoComplete="off"
          required
          value={payload}
          onChange={(e) => setPayload(parseFloat(e.target.value))}
        />
        <textarea
          name="observations"
          id="observations"
          placeholder="observações gerais:"
          rows="8"
          autoComplete="off"
          value={observations}
          onChange={(e) => setObservations(e.target.value)}
        ></textarea>
        <button disabled={response === true || loading === true} type="submit">
          Atualizar informações da transação!
        </button>
      </form>
    </div>
  );
};

export default SingleTransactionPage;
