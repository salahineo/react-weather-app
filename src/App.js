import React from "react";
import "./App.css";
import "./assets/css/font-awesome/css/fontawesome.css";
import Form from "./Components/Form/Form";
import Weather from "./Components/Weather/Weather";
import Footer from "./Components/Footer/Footer";

// Require Countries & Cities Data

// OpenWeatherMap [Personal] API Key
const API_Key = "d2b8ce582dda5538a8f06a810447abc7";

class App extends React.Component {

  // State Data
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
  const countries = require("./Data/countries.json");
    // Temporary Array
    let tempArray = [];
    // Loop Through Countries JSON File
    for (let i = 0; i < countries.length; i++) {
      // Push Current Country To Array
      tempArray.push(countries[i]);
    }
    // Update Data State
    this.setState({
      countries: tempArray
    });
  };

  // Get List Of Data For Specific Country
  getCities = (country) => {
    const cities = require("./Data/cities.json");

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
    // Get Temperature From State
    let {weather_temperature} = this.state;
    if (weather_temperature === "") {
      // Temperature Is Empty
      document.documentElement.setAttribute("data-theme", "cold");
    } else if (weather_temperature > 18) {
      // Temperature > 18
      document.documentElement.setAttribute("data-theme", "warm");
    } else {
      // Temperature < 18
      document.documentElement.setAttribute("data-theme", "cold");
    }
  };

  // Get Weather Method
  getWeather = async (e) => {
    // Prevent Form Reloading
    e.preventDefault();
    // Get Selected City ID
    let cityID = e.target.elements.cities.value;
    // Fetch API Data For This City
    const data = await fetch(`http://api.openweathermap.org/data/2.5/weather?id=${cityID}&units=metric&appid=${API_Key}`);
    // Convert Data To JSON
    const readableData = await data.json();
    // Sunrise Convert To Readable Date
    const sunriseTime = new Date(readableData.sys.sunrise * 1000);
    const sunsetTime = new Date(readableData.sys.sunset * 1000);
    let sunrise = sunriseTime.toLocaleString("en-US").split(", ")[1];
    let sunset = sunsetTime.toLocaleString("en-US").split(", ")[1];
    //console.log(readableData.wind.deg * 100);

    // Set Weather Data To State
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
    // Toggle Color Mode Depend On Temperature
    await this.toggleColorMode();
  };

  // Render Method
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
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
