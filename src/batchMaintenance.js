import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MaintenanceMessage = ({ children }) => {
  const [isMaintenanceTime, setIsMaintenanceTime] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkMaintenanceTime = () => {
      const now = new Date();
      const day = now.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
      const hours = now.getHours();
      const minutes = now.getMinutes();

      // Check if it's a weekday (Monday to Friday)
      if (day >= 1 && day <= 5) {
        // Check for 09:00-09:03
        if (hours === 9 && minutes <= 3) {
          setIsMaintenanceTime(true);
          setMessage(
            "평일 09시 ~ 09시 03분까지 서비스 점검 시간입니다. <br/>장 시작에 따라 현재가를 가져오고 있으니 조금만 기다려주세요!",
          );
          return;
        }

        // Check for 15:20-15:35
        if (hours === 20 && minutes >= 0 && minutes <= 1) {
          setIsMaintenanceTime(true);
          setMessage(
            "평일 15시 20분 ~ 15시 35분까지 서비스 점검 시간입니다. <br/>장 마감에 따라 종가를 업데이트하고 있으니 조금만 기다려주세요!",
          );
          return;
        }
      }

      setIsMaintenanceTime(false);
      setMessage("");
    };

    // Check immediately and then every minute
    checkMaintenanceTime();
    const interval = setInterval(checkMaintenanceTime, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isMaintenanceTime) {
      navigate("/maintenance");
    }
  }, [isMaintenanceTime, navigate]);

  return <>{children}</>;
};

export default MaintenanceMessage;
