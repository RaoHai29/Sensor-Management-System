import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homehcsr04 from './Components/Homehcsr04/Homehcsr04';
import Homeky040 from './Components/Homeky040/Homeky040'
import Homeds18b20 from './Components/Homeds18b20/Homeds18b20';
import Homefsr from './Components/Homefsr/Homefsr';


function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route exact path='/' element={<Homeky040 />} />
					<Route exact path='/ds18b20' element={<Homeds18b20 />} />
					<Route exact path='/hcsr04' element={<Homehcsr04 />} />
					<Route exact path='/fsr' element={<Homefsr />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
