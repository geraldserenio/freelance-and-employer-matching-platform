import { useMemo } from "react";

const useProjectStats = (data) => {
  return useMemo(() => {
    if (!data) return [];

    const colorMapping = {
      total_projects: "blue",
      completed_projects: "green",
      cancelled_projects: "red",
      completion_average: "orange",
    };

    return Object.keys(data).map((key) => ({
      name: key,
      value: isNaN(data[key]) ? data[key] : Number(data[key]), // Convert numeric values
      color: colorMapping[key] || "gray", // Default color
    }));
  }, [data]);
};

export default useProjectStats;
