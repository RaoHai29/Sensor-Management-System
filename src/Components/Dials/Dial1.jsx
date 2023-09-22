import React from 'react';
import axios from 'axios';
import dial from '../../images/dial.png';
import { useEffect, useState } from 'react';
import { Stack, Button } from '@mui/material';

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '50vh',
  position: 'relative',
  caretColor: 'transparent',
};

const arrowCircleStyle = {
  borderRadius: '50%',
  position: 'absolute',
  backgroundColor: 'white',
  width: '280px',
  aspectRatio: '1',
};

const arrowStyle = {
  position: 'absolute',
  top: '70%',
  left: 'calc(47% + 18px)',
  width: '100px',
  height: '4px',
  zIndex: '-1',
  backgroundColor: 'red',
  transition: 'alls 0.02s',
  transform: 'rotate(90deg)',
  transformOrigin: '0% 50%',
  borderTopLeftRadius: '30px',
  borderTopRightRadius: '30px',
  borderBottomLeftRadius: '30px',
  borderBottomRightRadius: '30px',
};

const imgStyle = {
  width: '350px',
  height: '350px',
  display: 'block',
  marginTop: '100px',
};

const arrowBaseStyle = {
  borderRadius: '50%',
  position: 'absolute',
  backgroundColor: 'rgb(99, 98, 98)',
  width: '25px',
  aspectRatio: '1',
  zIndex: '3',
};

function Speedometer() {
  const [speed, setSpeed] = useState([]);
  const [value, setValue] = useState(0);
  const [show, setShow] = useState(false);
  const ky040 = 'http://localhost:5000/ky040';

  const fetchData = async () => {
    try {
      const response = await axios.get(ky040);
      const data = response.data;
      const speed = data.map(item => item.angular_speed);
      setSpeed(speed);
      setValue(speed[speed.length - 1]);
      console.log(speed[speed.length - 1])
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 50); // Adjust the interval as needed (5000 milliseconds = 5 seconds)
    return () => clearInterval(interval);

  }, []);

  const arrowRotation = `rotate(${value - 90}deg)`;

  return (
    <div style={containerStyle}>
      {/* <div style={arrowCircleStyle}></div> */}
      {/* <div style={arrowBaseStyle}></div> */}
      <div style={{ ...arrowStyle, transform: arrowRotation }}></div>
      <img src={dial} alt="" style={imgStyle} />
    </div>
  );
}

export default Speedometer;
