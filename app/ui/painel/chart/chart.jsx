"use client";
import React from "react";
import styles from "./chart.module.css"
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Dom",
    vvvv: 4000,
    cccc: 2400,
  },
  {
    name: "Seg",
    vvvv: 3000,
    cccc: 1398,
  },
  {
    name: "Ter",
    vvvv: 2000,
    cccc: 3800,
  },
  {
    name: "Qua",
    vvvv: 2780,
    cccc: 3908,
  },
  {
    name: "Qui",
    vvvv: 1890,
    cccc: 4800,
  },
  {
    name: "Sex",
    vvvv: 2390,
    cccc: 3800,
  },
  {
    name: "Sab",
    vvvv: 3490,
    cccc: 4300,
  },
];

const Chart = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Relatório semanal</h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip contentStyle={{background: "#151c2c", border: "none"}} />
          <Legend />
          <Line
            type="monotone"
            dataKey="vvvv"
            stroke="#8884d8"
            strokeDasharray="5 5"
          />
          <Line
            type="monotone"
            dataKey="cccc"
            stroke="#82ca9d"
            strokeDasharray="3 4 5 2"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
