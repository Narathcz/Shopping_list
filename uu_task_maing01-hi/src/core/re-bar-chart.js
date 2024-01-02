import React from 'react';
import { Lsi } from "uu5g05";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useMediaQuery } from 'react-responsive';
import importLsi from "../lsi/import-lsi.js";

function ReBarChart({ filteredList, background }) {

    const data = filteredList.map ( item => ({ 
        name: item.name, 
        ok: countItemsWithDoneValue( item.shoppingList, true ), 
        nok: countItemsWithDoneValue( item.shoppingList, false ) 
    }));

    function countItemsWithDoneValue( shoppingList, doneValue ) {
        return shoppingList.filter( item => item.done === doneValue ).length;
    }

    const maxCount = Math.max(...data.map( item => item.ok + item.nok ));
    const xAxisTicks = Array.from({ length: maxCount + 1 }, (_, index) => index);
    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

    const legendPayload = [
      { value: <Lsi import = { importLsi } path = {[ "RePieChart", "legend1" ]}/>, type: "rect", id: "ID01", color: "#FF9933" },
      { value: <Lsi import = { importLsi } path = {[ "RePieChart", "legend2" ]}/>, type: "rect", id: "ID02", color: "#0080FF" },
    ];

    const xAxisStrokeColor = background === "light" ? "#404040" : "#fff";  
    const yAxisStrokeColor = background === "light" ? "#404040" : "#fff";  

return (
    <div>
      <div width = "100%" height = "100%">
        
        <BarChart
            width = {isMobile ? 400 : 500} 
            height = {500}
            data = {data}
            margin = {{
            top: 20,
            right: 0,
            left: 60,
            bottom: 5,
            }}
            layout = "vertical"
            barCategoryGap = {10}
            >
            <CartesianGrid strokeDasharray = "3 3" />
            <XAxis type = "number" ticks = { xAxisTicks } stroke = { xAxisStrokeColor }/>
            <YAxis dataKey = "name" type = "category" stroke = { yAxisStrokeColor }/>
            <Tooltip />
            <Legend payload = { legendPayload } />
            <Bar dataKey = "ok" stackId = "a" fill = "#FF9933" />
            <Bar dataKey = "nok" stackId = "a" fill = "#0080FF" />
        </BarChart>

      </div>
    </div>
    );
  }

  export default ReBarChart;
