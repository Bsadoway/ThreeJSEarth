import React from "react";
import { Html } from "@react-three/drei";

const DateHud = () => {
  const today = new Date().toLocaleDateString();

  const style = {
    position: 'absolute',
    padding: '10px',
    color: 'white',
    zIndex: 999,
    width: '450px',
    fontSize: '40px'
};
  return (
      <Html wrapperClass="hud-transform-unset date-label" center>
        <div style={style}>
          Today's Date: {today}
        </div>
      </Html>
  );
};

export default DateHud;