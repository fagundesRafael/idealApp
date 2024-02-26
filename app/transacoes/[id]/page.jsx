import React from "react";
import styles from "../../ui/transacoes/singleTransaction.module.css";
import { fetchClients, fetchTransaction } from "@/app/lib/data";
import { updateTransaction } from "@/app/lib/actions";

const SingleProductPage = async ({ params }) => {
  const { id } = params;
  const transaction = await fetchTransaction(id);
  const { clients } = await fetchClients();

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <form action={updateTransaction} className={styles.form}>
          <input type="hidden" name="id" value={transaction.id} />
          <input
          type="text"
          defaultValue={transaction.transactionName}
          placeholder="título da transação:"
          name="transactionName"
          required
         />
          <select name="clientName" id="clientName" defaultValue={transaction.clientName}>
        {clients.map(client => (
          <option key={client.id} value={client.clientName}>{client.clientName}</option>
          ))}
        </select>
        <select name="provider" id="provider" defaultValue={transaction.provider} >
          <option value="Ideal Comunicação">Ideal Comunicação</option>
          <option value="RD Gráfica">RD Gráfica</option>
          <option value="Atual Card">Atual Card</option>
          <option value="Outro">Outro</option>
        </select>
        <select name="source" id="source" defaultValue={transaction.source} >
          <option value="Tercerizado(a)">Tercerizado(a)</option>
          <option value="GoldCut JK Séries">GoldCut JK Séries</option>
          <option value="Epson WF-C5810 CORANTE">Epson WF-C5810 CORANTE</option>
          <option value="Epson WF-C5810 PIGMENTADA">
            Epson WF-C5810 PIGMENTADA
          </option>
          <option value="Epson T3170 CORANTE">Epson T3170 CORANTE</option>
          <option value="Epson T3170 PIGMENTADA">Epson T3170 PIGMENTADA</option>
          <option value="Outro">Outro</option>
        </select>
        <input
          type="number"
          step={0.01}
          defaultValue={transaction.quantity}
          placeholder="quantidade:"
          name="quantity"
          autoComplete="off"
          required
        />
        <select name="measurementUnit" id="measurementUnit" defaultValue={transaction.measurementUnit}>
          <option value="mt²">mt²</option>
          <option value="unid">unidade</option>
          <option value="cent">cento</option>
          <option value="milh">milheiro</option>
          <option value="fls">folha</option>
          <option value="blc">bloco</option>
        </select>
        <input
          type="number"
          step={0.1}
          placeholder="custo inicial R$:"
          defaultValue={transaction.cost}
          name="cost"
          autoComplete="off"
          required
        />
        <input
          type="number"
          step={0.1}
          placeholder="valor final R$:"
          defaultValue={transaction.price}
          name="price"
          autoComplete="off"
          required
        />
        <input
          type="number"
          step={0.1}
          placeholder="valor pago R$:"
          defaultValue={transaction.downPayment}
          name="downPayment"
          autoComplete="off"
          required
        />
        <select name="orderStatus" id="orderStatus" defaultValue={transaction.orderStatus}>
          <option value="">status do pedido:</option>
          <option value="pendente">pendente</option>
          <option value="concluso">concluso</option>
          <option value="cancelado">cancelado</option>
        </select>
        <textarea
          name="notations"
          id="notations"
          rows="8"
          placeholder="observações gerais (se necessário):"
          defaultValue={transaction.notations}
        ></textarea>
          <button>Atualizar</button>
        </form>
      </div>
    </div>
  );
};

export default SingleProductPage;
