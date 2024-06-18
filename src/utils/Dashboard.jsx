import React, { useState } from 'react';
import DateHud from './DateHud';
import NEOS from '../space/Neos';

const Dashboard = ({astronomicalConversion}) => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };
  return (
    <>
      <DateHud date={date} onDateChange={handleDateChange} setDate={setDate}/>
      <NEOS date={date} astronomicalConversion={astronomicalConversion} />
    </>
  );
};

export default Dashboard;