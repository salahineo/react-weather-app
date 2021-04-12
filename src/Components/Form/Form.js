import React from "react";
import "./Form.css";

class Form extends React.Component {
  componentDidMount() {
    // Get Props
    this.props.getCountries();
  }

  render() {
    // Get Props
    let {cities, countries, getCities, getWeather} = this.props;
    return (
      <div className="form">
        <form onSubmit={getWeather}>
          <select name="countries" id="countries" onChange={(e) => {
            // Get Cities Of This Country
            getCities(e.target.value);
            // Unlock Cities Select
            e.target.nextElementSibling.removeAttribute("disabled");
            e.target.nextElementSibling.nextElementSibling.removeAttribute("disabled");
          }}>
            <option>-- Select Country --</option>
            {
              countries.map((country, index) => {

                return (
                  <option key={index} value={country.id}>{country.name}</option>
                );
              })
            }
          </select>
          <select name="cities" id="cities" disabled>
            {
              cities.map((city, index) => {
                return (
                  <option key={index} value={city.id}>{city.name}</option>
                );
              })
            }
          </select>
          <button type="submit" disabled>Get Weather</button>
        </form>
      </div>
    );
  }
}

export default Form;
