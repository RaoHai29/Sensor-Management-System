import React, { useState, useEffect, useRef } from 'react';
import { Stack, Button, Typography } from '@mui/material';
import './speedometer.css'; // Import your CSS file
import axios from 'axios';

function Speedometer() {
    const arrowStyle = {
        transform: 'rotate(90deg)',
        width: '81px',
        height: '4px',
        backgroundColor: 'rgb(70, 52, 233)',
        position: 'absolute',
        transformOrigin: '100% 50%',
        top: '77px',
        left: '0px',
    };
    const [show, setShow] = useState(false);
    const [value, setValue] = useState(0);
    const [speed, setSpeed] = useState([]);
    const [max, setMax] = useState(0);
    const [min, setMin] = useState(0);
    const [p1, setP1] = useState(0);
    const [span1, setSpan1] = useState(0);
    const [span8, setSpan8] = useState(0);
    const [p8, setP8] = useState(0);
    const [cond, setCond] = useState();
    const [data, setData] = useState([]);
    const Rotate = useRef(0);
    let num = 0;

    const handleStartClick = () => {
        setShow(true);
    };

    const handleRefreshClick = async () => {
        try {
            await axios.delete(ky040); // Send a DELETE request to the server

            // Reset the data state to an empty array
            setData([]);
            setValue(0)

            // Other logic...
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const handlePauseClick = () => {
        setShow(false);
    };

    const ky040 = 'http://localhost:5000/ky040';

    const fetchData = async () => {
        try {
            const response = await axios.get(ky040);
            const data = response.data;
            const speed = data.map(item => item.angular_speed);
            setSpeed(speed);
            setValue(speed[speed.length - 1]);
            // Rotate.current.style.transform = `rotate(${value - 90}deg)`;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        let intervalId;
        if (show) {
            fetchData(); // Fetch data initially
            intervalId = setInterval(fetchData, 1500); // Fetch data every 5 seconds
        } else {
            clearInterval(intervalId); // Clear the interval if fetching is paused
        }// Adjust the interval as needed (5000 milliseconds = 5 seconds)
        return () => clearInterval(intervalId);
    }, [show]);

    useEffect(() => {
        if (min >= 0 && max > 0) {
            setCond(true);
            num = max - min;
            num /= 16;
            setP1(min);
            setSpan8(max);
            setSpan1(num * 8 + min);
            setP8(num * 7 + min);
        } else if (min < 0 && max >= 0) {
            setCond(false);
            num = max;
            num /= 7;
            setP1(0);
            setSpan1("-");
            setP8(max);
            setSpan8(num * -1 + min);
        } else if (min >= max || max < 0) {
            console.error("Invalid entries");
        }
    }, [min, max]);
    const arrowRotation = `rotate(${value + 90}deg)`;

    return (
        <>
            <div className="speedometer">
                <div className="center-point">
                    <span className="value">{value}</span>
                    <span className="unit">&deg;</span>
                </div>
                <div className="speedometer-center-hide"></div>
                <div className="arrow-container">
                    <div className="arrow-wrapper speed-0" id="arrow">
                        <div className="arrow" style={{ ...arrowStyle, transform: arrowRotation }}></div>
                    </div>
                </div>
                {/* ... */}
                {/* <div key={'scale-1'} className={'speedometer-scale speedometer-scale-1'}>
                    <div className="text">
                        <p className="mark">{Math.floor(p1)}</p>
                        <span className="mark-end">{Math.floor(span1)}</span>
                    </div>
                </div> */}
                <div key={'scale-1'} className={'speedometer-scale speedometer-scale-1'}>
                    <div className="text">
                        <p className="mark"></p>
                        <span className="mark-end"></span>
                    </div>
                </div>
                {/* Dialing pointers */}
                {/* {[2, 3, 4, 5, 6, 7].map((scale) => (
                    <div key={`scale-${scale}`} className={`speedometer-scale speedometer-scale-${scale}`}>
                        <div className="text">
                            <p className="mark">{cond ? (min + (scale - 1) * num) : (scale * num)}</p>
                            <span className="mark-end">{cond ? (num * (scale - 1) + span1) : (scale * -1 * num)}</span>
                        </div>
                    </div>
                ))} */}
                {[2, 3, 4, 5, 6, 7].map((scale) => {
                    let scaleValue;
                    let scaleMarkEnd;

                    if (cond) {
                        scaleValue = min + (scale - 1) * num;
                        scaleMarkEnd = num * (scale - 1) + span1;
                    } else {
                        scaleValue = scale * num;
                        scaleMarkEnd = scale * -1 * num;
                    }

                    return (
                        // <div key={`scale-${scale}`} className={`speedometer-scale speedometer-scale-${scale}`}>
                        //     <div className="text">
                        //         <p className="mark">{Math.floor(scaleValue)}</p>
                        //         <span className="mark-end">{Math.floor(scaleMarkEnd)}</span>
                        //     </div>
                        // </div>
                        <div key={`scale-${scale}`} className={`speedometer-scale speedometer-scale-${scale}`}>
                            <div className="text">
                                <p className="mark"></p>
                                <span className="mark-end"></span>
                            </div>
                        </div>
                    );
                })}

                {/* <div key={'scale-8'} className={'speedometer-scale speedometer-scale-8'}>
                    <div className="text">
                        <p className="mark">{Math.floor(p8)}</p>
                        <span className="mark-end">{Math.floor(span8)}</span>
                    </div>
                </div> */}
                <div key={'scale-8'} className={'speedometer-scale speedometer-scale-8'}>
                    <div className="text">
                        <p className="mark"></p>
                        <span className="mark-end"></span>
                    </div>
                </div>
            </div>
            {/* <div className="input-field">
                <input type="number" value={max} className='max' placeholder='Enter Max value' onChange={(e) => setMax(e.target.value)} />
                <input type="number" value={min} className='min' placeholder='Enter Min value' onChange={(e) => setMin(e.target.value)} />
            </div> */}

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
        </>
    );
}

export default Speedometer;
