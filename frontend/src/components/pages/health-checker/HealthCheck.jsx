import { useState, useEffect } from "react";

const HealthCheck = () => {
  const [status, setStatus] = useState("Checking...");

  useEffect(() => {
    // Simulate a health check
    setTimeout(() => {
      setStatus("Healthy ✅");
    }, 1000);
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Frontend Health Check</h2>
      <p>
        Status: <strong>{status}</strong>
      </p>
    </div>
  );
};

export default HealthCheck;
