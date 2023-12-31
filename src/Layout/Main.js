import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import "./Main.css";

function Main() {
  const locationInputRef = useRef(null);
  const [weatherObj, setWeatherObj] = useState(null);
  const [searchedWeather, setSearchedWeather] = useState("Nukus");

  useEffect(() => {
    locationInputRef.current.focus();
    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=37702912e7a84bceabe100401231106&q=${searchedWeather}`
      )
      .then((response) => setWeatherObj(response.data))
      .catch(() => setWeatherObj());
  }, [searchedWeather]);

  return (
    <main className="main__container">
      <div className="container">
        <div className="weather-info">
          <div className="weather-info__header">
            <h1>Right now in </h1>
            <input
              className="location-input"
              type="text"
              ref={locationInputRef}
              onKeyDown={() => {
                setSearchedWeather(locationInputRef.current.value);
              }}
            />
          </div>
          {weatherObj && (
            <div className="weather-info__details">
              <div className="weather-info__icon">
                <img
                  src={weatherObj.current.condition.icon}
                  alt="weather info"
                />
              </div>
              <div className="weather-info__fahrenheit">
                <h3>{weatherObj.current.temp_c}° C </h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Main;
