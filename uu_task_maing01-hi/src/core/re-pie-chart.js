import React from "react";
import { Lsi } from "uu5g05";
import { PieChart, Pie, Cell, Legend } from "recharts";
import importLsi from "../lsi/import-lsi.js";

function RePieChart({ doneTrueCount, doneFalseCount }) {

  const data = [
    { name: <Lsi import = { importLsi } path = {[ "RePieChart", "legend2" ]} />, value: doneTrueCount },
    { name: <Lsi import = { importLsi } path = {[ "RePieChart", "legend1" ]} />, value: doneFalseCount },
  ];
  const COLORS = ['#0088FE', '#FF8042']; 
 
  return (
    <div>
      <div width = "100%" height = "100%">
        <PieChart width = {500} height = {500}>
          <Pie
            data = {data}
            dataKey = "value"
            cx = "50%"
            cy = "50%"
            labelLine = {false}
            innerRadius = {70}
            outerRadius = {150}
            label
          >
            { data.map(( entry, index ) => (
              <Cell key = { `cell-${index}` } fill = { COLORS[index % COLORS.length] } />
            ))}
          </Pie>
          <Legend align = "center" verticalAlign = "bottom" height = {36} />
        </PieChart>
      </div>
    </div>
  );
}
export default RePieChart;