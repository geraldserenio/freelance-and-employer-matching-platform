export const formatText = (text) => {
  return text
    .toLowerCase() // Convert to lowercase
    .replace(/_/g, " ") // Replace underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
};

// Example Usage:
console.log(formatText("HIGH_SCHOOL_STUDENTS")); // Output: "High School Students"
