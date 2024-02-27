import React from "react";
import styles from "../../ui/transacoes/addTransaction.module.css";
import { addTransaction } from "@/app/lib/actions";
import { fetchAllClients } from "@/app/lib/data";

const AddTransactionPage = async () => {
  const { clients } = await fetchAllClients();

  return (
    <div className={styles.container}>
      <form action={addTransaction} className={styles.form}>
        <input
          type="text"
          placeholder="nome da transação:"
          name="transactionName"
          required
        />
        <select  name="clientName" id="clientName" required>
        <option value="">nome do cliente:</option>
        {clients.map(client => (
          <option key={client.id} value={client.clientName}>{client.clientName}</option>
          ))}
        </select>
        <select name="provider" id="provider" required>
          <option value="">informar o fornecedor:</option>
          <option value="Ideal Comunicação">Ideal Comunicação</option>
          <option value="RD Gráfica">RD Gráfica</option>
          <option value="Atual Card">Atual Card</option>
          <option value="Outro">Outro</option>
        </select>
        <select name="source" id="source" required>
          <option value="">(selecionar máquina / equipamento):</option>
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
          placeholder="quantidade:"
          name="quantity"
          autoComplete="off"
          required
        />
        <select name="measurementUnit" id="measurementUnit" required>
          <option value="">und. de medida:</option>
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
          name="cost"
          autoComplete="off"
          required
        />
        <input
          type="number"
          step={0.1}
          placeholder="valor final R$:"
          name="price"
          autoComplete="off"
          required
        />
        <input
          type="number"
          step={0.1}
          placeholder="valor pago R$:"
          name="downPayment"
          autoComplete="off"
          required
        />
        <select name="orderStatus" id="orderStatus" required>
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
        ></textarea>
        <button>Registrar</button>
      </form>
    </div>
  );
};

export default AddTransactionPage;
