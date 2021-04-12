import React from "react";
import "./Form.css";

class Form extends React.Component {

  // Component Did Mount Method
  componentDidMount() {
    // Load Countries After Component Load
    this.props.getCountries();
  }

  // Render Method
  render() {
    // Get Props
    let {countries, getWeather} = this.props;
    return (
      <div className="form">
        <form onSubmit={getWeather}>
          <select name="countries" id="countries" onChange={(e) => {
            // Unlock City Input
            e.target.nextElementSibling.removeAttribute("disabled");
          }}>
            <option>-- Select Country --</option>
            {
              countries.map((country, index) => {
                return (
                  <option key={index} value={country.name}>{country.name}</option>
                );
              })
            }
          </select>
          <input type="text" name='city' id='city' placeholder='Enter City' disabled onChange={(e) => e.target.nextElementSibling.removeAttribute("disabled")} />
          <button type="submit" disabled>Get Weather</button>
        </form>
      </div>
    );
  }
}

export default Form;
