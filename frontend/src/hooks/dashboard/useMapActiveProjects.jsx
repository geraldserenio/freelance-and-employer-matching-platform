import { useMemo } from "react";

const useMappedProjects = (activeProjects) => {
  return useMemo(() => {
    if (!activeProjects) return [];

    return activeProjects.map((item) => ({
      id: item.id,
      project: item.project?.project_name || "N/A",
      client: item.project?.businessUser?.last_name || "N/A",
      deadline: item.deadline || "N/A",
      tags: item.project?.tags || "N/A",
      paymentTerms: item.project?.payment_terms || "N/A",
      status: item.status || "N/A",
    }));
  }, [activeProjects]);
};

export default useMappedProjects;
