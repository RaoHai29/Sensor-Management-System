import React, {useEffect, useState} from 'react';
import axios from 'axios';

function App () {
  const [data, setData] = useState ([]);

  useEffect (() => {
    setInterval (() => {
      axios
        .get ('http://localhost:5000/data') // Replace with your API endpoint
        .then (response => {
          console.log (response.data);
          setData(response.data);
        })
        .catch (error => {
          console.error ('Error fetching data:', error);
        });
    }, 10000);
  }, []);

  return (
    <div className="App">
      {/* Your chart rendering code */}
      {data.map(item=><>
        <p style={{textAlign:'center'}}>id :{item.id}</p>
      <p style={{textAlign:'center'}}>timestamp :{item.timestamp}</p>
      </>
      )}
    </div>
  );
}

export default App;
