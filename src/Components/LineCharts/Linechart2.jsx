import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CanvasJSReact from '@canvasjs/react-charts';
import { Stack, Button } from '@mui/material';
import './linechart.css'
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function LineChart() {
  const [data, setData] = useState([]);
  // const [currentTime, setCurrentTime] = useState(new Date());
  const [show, setShow] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const ds18b20 = 'http://localhost:5000/ds18b20';

  const handleStartClick = () => {
    setShow(true);

  };

  const handleRefreshClick = async () => {
    try {
        await axios.delete(ds18b20); // Send a DELETE request to the server

        // Reset the data state to an empty array
        setData([]);

        // Reset the currentTime state (optional)
        setCurrentTime(new Date());

        // Other logic...
    } catch (error) {
        console.error('Error deleting data:', error);
    }
};


  const handlePauseClick = () => {
    setShow(false);
   
  };

  useEffect(() => {
    let intervalId;

    const fetchData = async () => {
      try {
        const response = await axios.get(ds18b20);
        const data = response.data;
        console.log(data)
        const formattedData = data.map((value) => ({
          x: value.id,
          y: value.temperature,
        }));
        setData(formattedData);
        setCurrentTime(new Date());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (show) {
      fetchData(); // Fetch data initially
      intervalId = setInterval(fetchData, 5000); // Fetch data every 5 seconds
    } else {
      clearInterval(intervalId); // Clear the interval if fetching is paused
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [show]);


  const options = {
    theme: 'light2',
    animationEnabled: true,
    title: {
      text: 'DS18B20 - Timestamp to Temperature',
    },
    axisX: {
      valueFormatString: '', 
      title: 'id'// Adjust the date format here as needed
    },
    axisY: {
      title: 'Temperature (degrees Centigrade)'// Adjust the date format here as needed,
    },
    data: [
      {
        type: 'spline',
        xValueFormatString: '', // Match the format to axisX's valueFormatString
        yValueFormatString: '##.##',
        dataPoints: data,
      },
    ],
  };

  return (
    <>
      {/* <div>
        <p style={{ textAlign: 'center' }}>Current Time: {currentTime.toLocaleTimeString()}</p>
      </div> */}
      <div>
        <CanvasJSChart options={options} />
        <Stack direction='row' spacing={10} justifyContent="center" sx={{ marginTop: '100px' }}>
        <Stack direction='row' spacing={10} justifyContent="center" sx={{ marginTop: '100px' }}>
          <Button variant='contained' onClick={handleStartClick} id='bt1' className={show ? 'btn-green' : ''}>
            Start
          </Button>
          <Button variant='contained' onClick={handleRefreshClick} >
            Refresh
          </Button>
          <Button variant='contained' onClick={handlePauseClick} id='bt' className={!show ? 'btn-1-active' : ''} >
            Pause
          </Button>
        </Stack>
        </Stack> 
      </div>
    </>
  );
}

export default LineChart;
