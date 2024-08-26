"use client";
import Image from "next/image";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Mon",
    present: 70,
    absent: 50,
  },
  {
    name: "Tue",
    present: 40,
    absent: 60,
  },
  {
    name: "Wed",
    present: 45,
    absent: 90,
  },
  {
    name: "Thu",
    present: 75,
    absent: 15,
  },
  {
    name: "Fri",
    present: 38,
    absent: 0,
  },
];

const AttendanceChart = () => {
  return (
    <div className="h-full rounded-lg border bg-white shadow-xs">
      <div className="flexicjb px-lg py-sm">
        <h1>Attendance</h1>
        <Image
          src="/images/moreDark.png"
          alt="student"
          width={100}
          height={100}
          className="h-5 w-5"
        />
      </div>
      <div className="px-4 h-full ">
        <ResponsiveContainer width="100%" height="90%">
          <BarChart width={500} height={300} data={data} barSize={20}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#ddd"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tick={{
                fill: "#d1d5db",
              }}
              tickLine={false}
            />
            <YAxis
              axisLine={false}
              tick={{
                fill: "#d1d5db",
              }}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                borderColor: "lightgray",
              }}
            />
            <Legend
              align="left"
              verticalAlign="top"
              wrapperStyle={{
                paddingTop: "10px",
                paddingBottom: "20px",
              }}
            />
            <Bar
              dataKey="present"
              fill="#97BC62"
              legendType="circle"
              radius={[10, 10, 0, 0]}
            />

            <Bar
              dataKey="absent"
              fill="#2C5F2D"
              legendType="circle"
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AttendanceChart;
