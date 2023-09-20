import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CanvasJSReact from '@canvasjs/react-charts';
import { Stack, Button } from '@mui/material';
import './linechart.css'

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function LineChart() {
  const [data, setData] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [show, setShow] = useState(false);


  const handleStartClick = () => {
    setShow(true);
 
  };

  const handleRefreshClick = async () => {
    try {
        await axios.delete('http://localhost:5000/hcsr04'); // Send a DELETE request to the server

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
        const response = await axios.get('http://localhost:5000/hcsr04');
        const data = response.data;
        const formattedData = data.map((value) => ({
          x: value.timestamp,
          y: value.distance,
        }));
        setData(formattedData);
        setCurrentTime(new Date());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (show) {
      fetchData(); // Fetch data initially
      intervalId = setInterval(fetchData, 20); // Fetch data every 5 seconds
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
      text: 'HCSR04 - Timestamp to distance',
    },
    axisX: {
      title: 'Timestamp', // Set an appropriate x-axis title
      // valueFormatString: '#,##0.00', // Format for humidity values
    },
    axisY: {
      title: 'distance',
    },
    data: [
      {
        type: 'spline',
        xValueFormatString: '#', // Format for humidity values
        yValueFormatString: '#,##0.00',
        dataPoints: data,
      },
    ],
  };

  return (
    <>
      <div>
        <p style={{ textAlign: 'center' }}>Current Time: {currentTime.toLocaleTimeString()}</p>
      </div>
      <div>
        <CanvasJSChart options={options} />
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
      </div>
    </>
  );
}

export default LineChart;
