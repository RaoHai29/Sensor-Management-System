import React, { useState, useEffect, useRef } from 'react';
import { Stack, Button, Typography } from '@mui/material';
import './speedometer.css'; // Import your CSS file
import axios from 'axios';
import { MinorCrashOutlined } from '@mui/icons-material';

function Speedometer() {

    const arrowStyle = {
        transform: 'rotate(90deg)',
        width: '110px',
        height: '4px',
        backgroundColor: 'rgb(235, 42, 8)',
        position: 'absolute',
        transformOrigin: '100% 50%',
        top: '122px',
        left: '19px',
    };

    const [show, setShow] = useState(false);
    const [value, setValue] = useState(0);
    const [speed, setSpeed] = useState([]);
    const [max, setMax] = useState(400);
    const [min, setMin] = useState(0);
    const [gap, setGap] = useState(max / 16);
    const [data, setData] = useState([]);
    const maxRef = useRef();
    const minRef = useRef();


    const handleStartClick = () => {
        setShow(true);
    };

    const handleRefreshClick = async () => {
        try {
            await axios.delete(hcsr04); // Send a DELETE request to the server
            // Reset the data state to an empty array
            setData([]);
            setValue(0);
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const handlePauseClick = () => {
        setShow(false);
    };

    const hcsr04 = 'http://localhost:5000/hcsr04';

    const fetchData = async () => {
        try {
            const response = await axios.get(hcsr04);
            const data = response.data;
            const speed = data.map(item => item.distance);
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

    const handleChange = () => {
        console.log("maxRef.current:", maxRef.current.value);
        console.log("minRef.current:", minRef.current.value);
        if (maxRef.current.value > minRef.current.value) {
            setMax(maxRef.current.value);
            setMin(minRef.current.value);
            setGap(maxRef.current.value / 16);
        }
    }

    const arrowRotation = `rotate(${((value) * 360/max) + 90}deg)`;
    // const arrowRotation = `rotate(${((300) * 360/max) + 90}deg)`;

    return (
        <>
            <div>
                <h4>Showing distance values of HCSR04 Sensor</h4>
                <p style={{ margin: "-1px 0" }}>Max value: {max}cm</p>
                <p style={{ margin: "0px 0px 9px" }}>Min value: {min}cm</p>
            </div>

            {/* <!-- Button trigger modal --> */}
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Change Max/Min values
            </button>

            <div className='d-block mt-3'>
                <p>Note: The negative values are shown in anti-clockwise rotation of needle</p>
            </div>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content" style={{ margin: "100px", caretColor: "transparent" }}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Change Values</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-field">
                                <input type="number" className='max m-2 d-block' placeholder='Enter Max value' ref={maxRef} style={{ caretColor: "gray" }} />
                                <input type="number" className='min m-2' placeholder='Enter Min value' ref={minRef} style={{ caretColor: "gray" }} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleChange}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="speedometer">
                <div className="center-point">
                    <span className="value">{value}</span>
                    <span className="unit" style={{fontSize: "15px"}}>cm</span>
                </div>
                <div className="speedometer-center-hide"></div>
                <div className="arrow-container">
                    <div className="arrow-wrapper speed-0" id="arrow">
                        <div className="arrow" style={{ ...arrowStyle, transform: arrowRotation }}></div>
                    </div>
                </div>
                <div key={'scale-1'} className={'speedometer-scale speedometer-scale-1'}>
                    <div className="text">
                        <p className="mark" style={{ padding: "0px 7px", top: "18px" }}>0</p>
                        <span className="mark-end" style={{ top: "335px" }}>{Math.floor((gap * 8))}</span>
                    </div>
                </div>
                <div className="speedometer-scale speedometer-scale-2">
                    <div className="text">
                        <p className="mark">{Math.floor(gap)}</p>
                        <span className="mark-end">{Math.floor((gap * 9))}</span>
                    </div>
                </div>
                <div className="speedometer-scale speedometer-scale-3">
                    <div className="text">
                        <p className="mark">{Math.floor((gap * 2))}</p>
                        <span className="mark-end">{Math.floor((gap * 10))}</span>
                    </div>
                </div>
                <div className="speedometer-scale speedometer-scale-4">
                    <div className="text">
                        <p className="mark">{Math.floor((gap * 3))}</p>
                        <span className="mark-end">{Math.floor((gap * 11))}</span>
                    </div>
                </div>
                <div className="speedometer-scale speedometer-scale-5">
                    <div className="text">
                        <p className="mark">{Math.floor((gap * 4))}</p>
                        <span className="mark-end">{Math.floor((gap * 12))}</span>
                    </div>
                </div>
                <div className="speedometer-scale speedometer-scale-6">
                    <div className="text">
                        <p className="mark">{Math.floor((gap * 5))}</p>
                        <span className="mark-end">{Math.floor((gap * 13))}</span>
                    </div>
                </div>
                <div className="speedometer-scale speedometer-scale-7">
                    <div className="text">
                        <p className="mark">{Math.floor((gap * 6))}</p>
                        <span className="mark-end">{Math.floor((gap * 14))}</span>
                    </div>
                </div>
                <div className="speedometer-scale speedometer-scale-8">
                    <div className="text">
                        <p className="mark" style={{ top: "14px", marginTop: "1px" }}>{Math.floor((gap * 7))}</p>
                        <span className="mark-end">{Math.floor((gap * 15))}</span>
                    </div>
                </div>
            </div>


            <Stack direction='row' spacing={10} justifyContent="center" sx={{ marginTop: '70px' }}>
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
