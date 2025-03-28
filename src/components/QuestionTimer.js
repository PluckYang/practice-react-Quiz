import { useEffect, useState } from "react";

export default function QuestionTimer({ timeOut, onTimeOut }) {
  const [remainingTime, setRemainingTime] = useState(timeOut);

  useEffect(() => {
    console.log("SETTING TIMEOUT");
    setTimeout(() => {
      onTimeOut();
    }, timeOut);
  }, [timeOut, onTimeOut]);

  useEffect(() => {
    console.log("SETTING INTERVAL");
    setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);
  }, []);

  return <progress id="question-time" max={timeOut} value={remainingTime} />;
}
