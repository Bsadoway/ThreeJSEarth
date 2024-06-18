import React, { useState } from "react";
import { Html } from "@react-three/drei";

const DateHud = ({date, onDateChange ,setDate}) => {
  // const [date, setDate] = useState(new Date());

  const formatDate = (date) => {
    return date.toLocaleDateString();
  };

  const style = {
    position: 'absolute',
    padding: '10px',
    color: 'white',
    zIndex: 999,
    width: '450px',
    fontSize: '40px'
  };

  const handlePrevDay = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 1);
    console.log("new day behind " + newDate);
    setDate(newDate);
    onDateChange(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    console.log("new day ahead " + newDate);
    setDate(newDate);
    onDateChange(newDate);
  };


  return (
    <Html wrapperClass="hud-transform-unset date-label">

      <div style={style}>
        Date<br></br> {formatDate(date)}
      </div>
      <div className="date-arrows">
        <button className="ld-arrow" onClick={handlePrevDay}> <span> &lsaquo;  </span> </button>
        <button className="rd-arrow" onClick={handleNextDay}> <span> &rsaquo;  </span> </button>

      </div>

    </Html>
  );
};

export default DateHud;