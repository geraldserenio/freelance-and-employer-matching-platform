import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useFormattedChartData from "../../../../hooks/dashboard/useFormattedChartData";
import { colors } from "../../../../utils/colorMapping";

const BarChartComponent = ({ EarningsGraphData }) => {
  const { allProjects, formattedData } =
    useFormattedChartData(EarningsGraphData);
  const [barGap, setBarGap] = useState(15);
  const [barCategoryGap, setBarCategoryGap] = useState("30%");

  useEffect(() => {
    const updateGap = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setBarGap(5);
        setBarCategoryGap("10%");
      } else if (width >= 768 && width <= 1024) {
        setBarGap(10);
        setBarCategoryGap("20%");
      } else {
        setBarGap(15);
        setBarCategoryGap("30%");
      }
    };

    updateGap();
    window.addEventListener("resize", updateGap);
    return () => window.removeEventListener("resize", updateGap);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={formattedData}
        barCategoryGap={barCategoryGap}
        barGap={barGap}
      >
        <CartesianGrid
          strokeDasharray="0"
          horizontal={false}
          vertical={false}
        />{" "}
        {/* Hides grid lines */}
        <XAxis dataKey="week" />
        <YAxis hide />
        <Tooltip />
        <Legend />
        {allProjects.map((project, index) => (
          <Bar
            key={project}
            dataKey={project}
            fill={colors[index % colors.length]}
            radius={[5, 5, 0, 0]} // Top-left & Top-right rounded, bottom flat
            activeBar={<Rectangle stroke="none" />}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
