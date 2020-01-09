import React, {Component} from 'react';
import Weatherhourly from './Weatherhourly'
import NearbyWeather from './Nearbyweather'

class CitySearch extends Component {
    
    state = {
        temp: '',
        show: false,
        value: '',
    }

    handleValueChange = (e) => {
      this.setState({
        value: e.target.value
      });
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const url = `http://localhost:5000/weather/search/${this.state.value}`
        fetch(url, {
          method: 'GET',
        })
        .then(res => res.json())
        .then(temp => {          
          this.setState({
          temp: temp.main.temp,
          show: true
        })
      }
      )
        .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
    }

    render() {
       const { value } = this.state;
        return (
          <div>
          <h1>Weather Updates</h1>
          <form onSubmit={this.handleSubmit}>
            <input className= "city-weather-input"
                type="text"
                
                onChange={this.handleValueChange}
                placeholder="Enter a city name" />
            <input className= "city-weather-input"
                type="submit"
                value="Search"
            />
            <span className= {this.state.show ? "temp-span" : "hidden"}>{ `${this.state.temp} °C` }</span>
        </form>
        </div>

        );
    }
}
export default CitySearch