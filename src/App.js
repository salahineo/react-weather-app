import React from "react";
import "./App.css";
import "./assets/css/font-awesome/css/fontawesome.css";
import Form from "./Components/Form/Form";
import Weather from "./Components/Weather/Weather";

const cities = require("./Data/cities.json");
const countries = require("./Data/countries.json");

const API_Key = "d2b8ce582dda5538a8f06a810447abc7";

class App extends React.Component {

  // State For Countries & Data
  state = {
    countries: [],
    cities: [],
    weather_description: "",
    weather_temperature: "",
    weather_pressure: "",
    weather_humidity: "",
    weather_clouds: "",
    weather_wind_speed: "",
    weather_wind_degree: "",
    weather_sunrise: "",
    weather_sunset: ""
  };


  // Get List Of Countries
  getCountries = () => {
    // Temporary Array
    let tempArray = [];
    // Loop Through JSON File
    for (let i = 0; i < countries.length; i++) {
      tempArray.push(countries[i]);
    }
    // Update Data State
    this.setState({
      countries: tempArray
    });
  };

  // Get List Of Data For Specific Country
  getCities = (country) => {
    // Temporary Array
    let tempArray = [];
    // Loop Through JSON File
    for (let i = 0; i < cities.length; i++) {
      // Check Country
      if (cities[i].country === country) {
        // Push Country Data To Temporary Array As Object With Value And ID
        tempArray.push({name: cities[i].name, id: cities[i].id});
      }
    }
    // Update Data State
    this.setState({
      cities: tempArray
    });
  };

  // Toggle Color Mode
  toggleColorMode = () => {
    let {weather_temperature} = this.state;
    if (weather_temperature === "") {
      document.documentElement.setAttribute("data-theme", "cold");
    } else if (weather_temperature > 18) {
      document.documentElement.setAttribute("data-theme", "warm");
    } else {
      document.documentElement.setAttribute("data-theme", "cold");
    }
  };

  // Get Weather Method
  getWeather = async (e) => {
    // Prevent Form Reloading
    e.preventDefault();
    let cityID = e.target.elements.cities.value;
    const data = await fetch(`http://api.openweathermap.org/data/2.5/weather?id=${cityID}&units=metric&appid=${API_Key}`);
    const readableData = await data.json();
    // Sunrise Convert
    const sunriseTime = new Date(readableData.sys.sunrise * 1000);
    const sunsetTime = new Date(readableData.sys.sunset * 1000);

    let sunrise = sunriseTime.toLocaleString("en-US").split(", ")[1];
    let sunset = sunsetTime.toLocaleString("en-US").split(", ")[1];
    //console.log(readableData.wind.deg * 100);

    // Set Data To State
    this.setState({
      weather_description: readableData.weather[0].description,
      weather_temperature: Math.round(readableData.main.temp),
      weather_pressure: readableData.main.pressure,
      weather_humidity: readableData.main.humidity,
      weather_clouds: readableData.clouds.all,
      weather_wind_speed: readableData.wind.speed,
      weather_wind_degree: readableData.wind.deg,
      weather_sunrise: sunrise,
      weather_sunset: sunset
    });
    await this.toggleColorMode();
  };

  render() {
    return (
      <React.Fragment>
        <div className="App">
          <main>
            <h2>Choose Country</h2>
            <Form cities={this.state.cities}
                  countries={this.state.countries}
                  getCities={this.getCities}
                  getCountries={this.getCountries}
                  getWeather={this.getWeather} />
            <Weather weather_description={this.state.weather_description}
                     weather_temperature={this.state.weather_temperature}
                     weather_pressure={this.state.weather_pressure}
                     weather_humidity={this.state.weather_humidity}
                     weather_clouds={this.state.weather_clouds}
                     weather_wind_speed={this.state.weather_wind_speed}
                     weather_wind_degree={this.state.weather_wind_degree}
                     weather_sunrise={this.state.weather_sunrise}
                     weather_sunset={this.state.weather_sunset} />
          </main>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
