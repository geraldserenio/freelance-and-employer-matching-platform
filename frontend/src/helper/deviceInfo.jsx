import { useEffect, useState } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import platform from "platform";

export const useDeviceInfo = () => {
  const [deviceInfo, setDeviceInfo] = useState(null);

  // UUID generator fallback if crypto.randomUUID is not supported
  const generateUUID = () => {
    if (typeof crypto?.randomUUID === "function") {
      return crypto.randomUUID();
    }
    // Fallback UUID generator
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      },
    );
  };

  useEffect(() => {
    const getDeviceData = async () => {
      try {
        const fp = await FingerprintJS.load();
        const result = await fp.get();

        // Get public IP
        const ipRes = await fetch("https://api64.ipify.org?format=json");
        const ipData = await ipRes.json();

        // Store unique device token in LocalStorage if not already stored
        let deviceToken = localStorage.getItem("deviceToken");
        if (!deviceToken) {
          deviceToken = generateUUID(); // Use fallback-safe UUID generator
          localStorage.setItem("deviceToken", deviceToken);
        }

        setDeviceInfo({
          deviceName: `${platform.manufacturer || "Unknown"} ${platform.product || "Device"}`,
          fingerprintId: result.visitorId,
          publicIp: ipData.ip,
          deviceToken: deviceToken,
          userAgent: navigator.userAgent,
          screenResolution: `${window.screen.width}x${window.screen.height}`,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        });
      } catch (error) {
        console.error("Failed to get device info:", error);
        setDeviceInfo(null); // optionally handle error state
      }
    };

    getDeviceData();
  }, []);

  return deviceInfo;
};
