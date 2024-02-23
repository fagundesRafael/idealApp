"use client";
import React, { useEffect, useState } from "react";
import styles from "./chart.module.css";
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/app/firebase";

const timeMonthNow = new Date().toString().slice(4, 7);
const timeYearNow = new Date().toString().slice(11, 15);

const Chart = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(timeMonthNow);
  const [selectedYear, setSelectedYear] = useState(timeYearNow);
  const [selectedIssue, setSelectedIssue] = useState("invoicing");
  const [numberDates, setNumberDates] = useState("");
  const [dailyCosts, setDailyCosts] = useState([]);
  const [dataChart, setDataChart] = useState([]);

  console.log(selectedMonth);
  console.log(selectedYear);
  console.log(selectedIssue);

  useEffect(() => {
    const unsubTransactions = onSnapshot(
      collection(db, "transactions"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setTransactionData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsubTransactions();
    };
  }, []);

  useEffect(() => {
    const transactionDates = transactionData.map((transaction) =>
      transaction.timeStamp.toDate().toString().slice(4, 15)
    );

    const filteredDate = transactionDates.filter(
      (dates) => dates.includes(selectedYear) && dates.includes(selectedMonth)
    );

    const days = filteredDate.map((data) => parseInt(data.split(" ")[1]));

    const uniqueDays = days.filter(
      (dia, index, array) => array.indexOf(dia) === index
    );

    const sortedDays = uniqueDays.sort((a, b) => a - b);

    setNumberDates(sortedDays);
  }, [transactionData, selectedMonth, selectedYear]);

  console.log(numberDates);

  useEffect(() => {
    const calculateDailyCosts = () => {
      const dailyCostsArray = numberDates.map((day) => {
        const totalSumOriginPrice = transactionData
          .filter((transaction) => {
            const transactionDate = transaction.timeStamp.toDate();
            return (
              transactionDate.getMonth() ===
                new Date(selectedYear + " " + selectedMonth).getMonth() &&
              transactionDate.getDate() === day
            );
          })
          .reduce((sum, transaction) => {
            const originPrice = parseFloat(transaction.originPrice);
            return sum + (isNaN(originPrice) ? 0 : originPrice);
          }, 0);

        return { day, costs: totalSumOriginPrice };
      });

      setDailyCosts(dailyCostsArray);
    };

    if (numberDates.length > 0 && transactionData.length > 0) {
      calculateDailyCosts();
    }
  }, [numberDates, transactionData, selectedMonth, selectedYear]);

  console.log(dailyCosts);

  useEffect(() => {
    const calculateDataChart = () => {
      const dataChartArray = numberDates.map((day) => {
        const totalSumOriginPrice = transactionData
          .filter((transaction) => {
            const transactionDate = transaction.timeStamp.toDate();
            return (
              transactionDate.getMonth() ===
                new Date(selectedYear + " " + selectedMonth).getMonth() &&
              transactionDate.getDate() === day
            );
          })
          .reduce((sum, transaction) => {
            const originPrice = parseFloat(transaction.originPrice);
            return sum + (isNaN(originPrice) ? 0 : originPrice);
          }, 0);

        const totalSumPayload = transactionData
          .filter((transaction) => {
            const transactionDate = transaction.timeStamp.toDate();
            return (
              transactionDate.getMonth() ===
                new Date(selectedYear + " " + selectedMonth).getMonth() &&
              transactionDate.getDate() === day
            );
          })
          .reduce((sum, transaction) => {
            const payload = parseFloat(transaction.payload);
            return sum + (isNaN(payload) ? 0 : payload);
          }, 0);

        const totalSumProfit = totalSumPayload - totalSumOriginPrice;

        return {
          day,
          custos: totalSumOriginPrice,
          recebimentos: totalSumPayload,
          lucro: totalSumProfit,
        };
      });

      setDataChart(dataChartArray);
    };

    if (numberDates.length > 0 && transactionData.length > 0) {
      calculateDataChart();
    }
  }, [numberDates, transactionData, selectedMonth, selectedYear]);

  console.log(dataChart);

  return (
    <div className={styles.container}>
      <div className={styles.topInfos}>
        <h2 className={styles.title}>Relatório da empresa:</h2>
        <select
          onChange={(e) => setSelectedIssue(e.target.value)}
          name="byIssue"
          id="byIssue"
          value={selectedIssue}
        >
          <option value="invoicing">Faturamento</option>
          <option value="production">Produção</option>
        </select>
        <select
          onChange={(e) => setSelectedMonth(e.target.value)}
          name="byMonth"
          id="byMonth"
          value={selectedMonth}
        >
          <option value="Jan">Janeiro</option>
          <option value="Feb">Fevereiro</option>
          <option value="Mar">Março</option>
          <option value="Apr">Abril</option>
          <option value="May">Maio</option>
          <option value="Jun">Junho</option>
          <option value="Jul">Julho</option>
          <option value="Aug">Agosto</option>
          <option value="Sep">Setembro</option>
          <option value="Oct">Outubro</option>
          <option value="Nov">Novembro</option>
          <option value="Dec">Dezembro</option>
        </select>
        <select
          onChange={(e) => setSelectedYear(e.target.value)}
          name="byYear"
          id="byYear"
          value={selectedYear}
        >
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
          <option value="2028">2028</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={dataChart}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip contentStyle={{ background: "#151c2c", border: "none" }} />
          <Legend />
          <Line
            type="monotone"
            dataKey="recebimentos"
            stroke="#8884d8"
            strokeDasharray="5 5"
          />
          <Line
            type="monotone"
            dataKey="custos"
            stroke="#ff0000"
            strokeDasharray="3 4 5 2"
          />
          <Line
            type="monotone"
            dataKey="lucro"
            stroke="#82ca9d"
            strokeDasharray="3 4 5 2"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
