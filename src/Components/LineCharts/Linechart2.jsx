import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CanvasJSReact from '@canvasjs/react-charts';
import { Stack, Button, Typography } from '@mui/material';
import './linechart.css';
import ip from '../../ipaddress';


const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function LineChart2() {
  const [data, setData] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [show, setShow] = useState(false);
  const [zValues, setZValues] = useState([]);
  const ds18b20 = `http://${ip()}/ds18b20`;
  const [uniqueZValues, setUniqueZValues] = useState(new Set());

  const handleStartClick = () => {
    setShow(true);
  };

  const handleRefreshClick = async () => {
    try {
      await axios.delete(ds18b20); // Send a DELETE request to the server

      // Reset the data state to an empty array
      setData([]);
      setZValues([]);
      setUniqueZValues([]);
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

        // Extract id and currentTime arrays
        const ids = data.map((value) => value.id);
        const timestamps = data.map((value) => value.currentTime);

        // Find the minimum length of both arrays
        const minLength = Math.min(ids.length, timestamps.length);

        // Slice both arrays to the minimum length
        const truncatedIds = ids.slice(0, minLength);
        const truncatedTimestamps = timestamps.slice(0, minLength);

        const formattedData = truncatedIds.map((id, index) => ({
          x: id,
          y: data[index].temperature,
          z: truncatedTimestamps[index],
        }));

        setData(formattedData);
        setCurrentTime(new Date());

        // Extract and update the 'z' values as a Set
        const newZValues = new Set(formattedData.map((item) => item.z));
        setUniqueZValues((prevZValues) => new Set([...prevZValues, ...newZValues]));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (show) {
      fetchData(); // Fetch data initially
      intervalId = setInterval(fetchData, 10); // Fetch data every 5 seconds
    } else {
      clearInterval(intervalId); // Clear the interval if fetching is paused
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [show, ds18b20]);

  const options = {
    theme: 'light2',
    animationEnabled: true,
    title: {
      text: 'DS18B20 - Timestamp to Temperature',
      margin: 30,
    },
    axisX: {
      valueFormatString: '',
      title: '' // Adjust the date format here as needed
    },
    axisY: {
      title: 'Temperature (degrees Centigrade)' // Adjust the date format here as needed,
    },
    data: [
      {
        type: 'spline',
        xValueFormatString: '', // Match the format to axisX's valueFormatString
        yValueFormatString: '##.##',
        dataPoints: data.slice(-12),
      },
    ],
  };

  return (
    <>
      <div>
        {/* <p style={{ textAlign: 'center' }}>Current Time: {currentTime.toLocaleTimeString()}</p> */}
      </div>
      <div>
        <CanvasJSChart options={options} />
        <div className='time-show'>
          {[...uniqueZValues].map((z, index) => (
            <p key={index}>{z}</p>
          )).slice(-12)}
        </div>
        <Typography variant="h6" sx={{ color: '#828282', textAlign: 'center', fontWeight: '700' }} >Timestamp</Typography>

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

export default LineChart2;
