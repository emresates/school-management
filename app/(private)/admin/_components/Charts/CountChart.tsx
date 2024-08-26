"use client";
import React, { PureComponent } from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Total",
    count: 100,
    fill: "white",
  },
  {
    name: "Girls",
    count: 56,
    fill: "#97BC62",
  },
  {
    name: "Boys",
    count: 80,
    fill: "#2C5F2D",
  },
];

const CountChart = () => {
  return (
    <ResponsiveContainer>
      <RadialBarChart
        cx="50%"
        cy="50%"
        innerRadius="40%"
        outerRadius="100%"
        barSize={28}
        data={data}
      >
        <RadialBar
          background
          dataKey="count"
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

export default CountChart;
