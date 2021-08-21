import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Weather from './components/weather';
import { Dimmer, Loader } from 'semantic-ui-react';
import './App.css';

function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  
  const getData = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
        .then((getData) => {
            setData(getData.data);
        })
}

const getCoordinates = () => {
  navigator.geolocation.getCurrentPosition(function(position) {
    setLat(position.coords.latitude);
    setLong(position.coords.longitude);
  });
}
  useEffect(() => {
    // const fetchData = async () => {
    //   getCoordinates();
    //   await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
    //   .then(res => res.json())
    //   .then(result => {
    //     setData(result)
    //     console.log(result);
    //   });
    // }
    // fetchData();
    getCoordinates();
    getData();
  });

  return (
    <div className="App">
      {(typeof data.main != 'undefined') ? (
        <Weather weatherData={data}/>
      ): (
        <div>
          <Dimmer active>
            <Loader>Loading..</Loader>
          </Dimmer>
        </div>
      )}
   </div>
  );
}

export default App;
