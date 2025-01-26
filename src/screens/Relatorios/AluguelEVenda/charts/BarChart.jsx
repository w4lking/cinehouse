import React from "react";
import PropTypes from "prop-types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const BarChartComponent = ({ data }) => {
  return (
    <BarChart
      width={600}
      height={300}
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="nomeFilme" opacity={0} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="quantidade" fill="#8884d8" />
    </BarChart>
  );
};

//BarChartComponent.PropTypes = {
//data: PropTypes.number.isRequired,
//};

export default BarChartComponent;
