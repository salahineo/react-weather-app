import React from "react";
import "./Weather.css";

const Weather = (props) => {
  return (
    <div className="weather">
      <div className="temperature">
        {props.weather_temperature && <span>{props.weather_temperature}° C</span>}
      </div>
      <div className="description">
        {props.weather_description && <span>{props.weather_description}</span>}
      </div>
      <div className="additional-info">
        <span className="humidity">
          {props.weather_humidity &&
          <span className="info"><i className="fas fa-tint" /> <span className="name">Humidity</span> <span className="value">{props.weather_humidity}%</span></span>}
        </span>
        <span className="clouds">
          {props.weather_clouds !== "" &&
          <span className="info"><i className="fas fa-cloud" /> <span className="name">Clouds</span> <span className="value">{props.weather_clouds}%</span></span>}
        </span>
        <span className="wind">
          {props.weather_wind_speed &&
          <span className="info"><i className="fas fa-wind" /> <span className="name">Wind</span> <span className="value">{props.weather_wind_speed}
            <i className="fas fa-long-arrow-alt-up fa-rotate-90"
               style={{transform: `rotate(${props.weather_wind_speed * 100}deg)`}} /></span></span>}
        </span>
        <span className="sunrise">
          {props.weather_sunrise &&
          <span className="info"><i className="fas fa-sun" /> <span className="name">Sunrise</span> <span className="value">{props.weather_sunrise}</span></span>}
        </span>
        <span className="sunset">
          {props.weather_sunset &&
          <span className="info"><i className="fas fa-moon" /> <span className="name">Sunset</span> <span className="value">{props.weather_sunset}</span></span>}
        </span>
      </div>
    </div>
  );
};

export default Weather;
