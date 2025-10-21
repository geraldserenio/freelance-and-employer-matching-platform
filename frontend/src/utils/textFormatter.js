export const formatKey = (key) => {
  if (!key) return "";
  return key.replace(/_/g, " ").replace(/\b\w/, (char) => char.toUpperCase());
};

// Example usage:
// samnple text: "total_projects"
// Output: "Total projects"
