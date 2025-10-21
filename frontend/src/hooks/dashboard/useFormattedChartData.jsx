import { useMemo } from "react";

const useFormattedChartData = (rawData) => {
  const formattedData = useMemo(
    () =>
      rawData.map((week) => ({
        week: week.week,
        ...Object.fromEntries(
          Object.entries(week).filter(
            ([key, value]) => key !== "week" && value !== undefined,
          ),
        ),
      })),
    [rawData],
  );

  const allProjects = useMemo(
    () =>
      Array.from(
        new Set(
          rawData.flatMap((item) =>
            Object.keys(item).filter((key) => key !== "week"),
          ),
        ),
      ),
    [rawData],
  );

  return { formattedData, allProjects };
};

export default useFormattedChartData;
