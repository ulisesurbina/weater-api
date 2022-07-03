import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState({});
  const [temperature, setTemperature] = useState(0);
  const [isFahrenheit, setIsFahrenheit] = useState(true);

  useEffect(() => {
    const success = pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=117cf2c14ca4833f77d08efd905f65c7&units=metric`)
        .then((res) => {
          setData(res.data);
          setTemperature(res.data.main.temp);
        });
    }

    navigator.geolocation.getCurrentPosition(success);
  }, []);

  console.log(data);
  console.log(temperature);

  const convertTemperature = () => {
    if (isFahrenheit) {
      setTemperature((temperature * 1.8) + 32);
      setIsFahrenheit(false);
    } else {
      setTemperature((temperature - 32) / 1.8);
      setIsFahrenheit(true);
    }
  };
  // let date = new Date();
  // let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
  // let hour = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

  return (
    <>
      <div className="App">
        <div>
          <h1>Weater-App</h1>
          <h3>{data.name}, {data.sys?.country}</h3>
        </div>
        <div className="Container">
          <div>
            <img src={`http://openweathermap.org/img/wn/${data.weather?.[0].icon}@2x.png`} alt="imageWeather" />
          </div>
          <div>
            <h6>"{data.weather?.[0].description}"</h6>
            <h6><i className="fas fa-wind" aria-hidden="true"></i> Wind Speed: {data.wind?.speed}</h6>
            <h6><i className="fa-solid fa-cloud"></i> Clouds: {data.clouds?.all}%</h6>
            <h6><i className="fas fa-temperature-high" aria-hidden="true"></i> Pressure: {data.main?.pressure} hPa</h6>
            <h6><i className="fa-solid fa-temperature-arrow-up"></i> Temperature max: {Math.round(data.main?.temp_max)}°C</h6>
            <h6><i className="fa-solid fa-temperature-arrow-down"></i> Temperature min: {Math.round(data.main?.temp_min)}°C</h6>
          </div>
        </div>
        <div>
          <h3></h3>
          <h3>Temperature: {temperature} {isFahrenheit ? "°C" : "°F"}</h3>
        </div>
        <button type="button" className="btn btn-danger" onClick={convertTemperature}>°C / °F</button>
      </div>
    </>
  )
}

export default App
