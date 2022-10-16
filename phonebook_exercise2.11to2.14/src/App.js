import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [searchName, setSearchName] = useState('');
  const [countries, setCountries] = useState([]);
  const [weatherData, setWeatherData] = useState([]);

  const handleSearch = (event) => {
    setSearchName(event.target.value);

  };

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then((response) => {
        setCountries(response.data)
      })
  }, []);

  const searchedResults = countries.filter((country) => country.name.common.toUpperCase().includes(searchName.toUpperCase())).map((country) => country.name.common);

  const detailedSearch = countries.filter((country) => country.name.common.toUpperCase().includes(searchName.toUpperCase())).map((country) => <li key={country.name.common}>{country.name.common} <a href={country.maps.googleMaps}>Show Map</a></li>);

  if (searchedResults.length > 10) {
    return (
      <div>
        <div>
          Search Name here: <input type='text' value={searchName} onChange={handleSearch} />
        </div>
        <div>
          <h4>Too many matches, specify another filter</h4>
        </div>
      </div>
    )
  } else if (1 < searchedResults.length && searchedResults.length <= 10) {
    return (
      <div>
        <div>
          Search Name here: <input type='text' value={searchName} onChange={handleSearch} />
        </div>
        <div>
          {detailedSearch}
        </div>
      </div>
    )
  } else if (searchedResults.length === 1) {
    const languages = countries.filter((country) => country.name.common === searchedResults[0])[0].languages;
    const [lat, lon] = countries.filter((country) => country.name.common === searchedResults[0])[0].capitalInfo.latlng;
    const key = process.env.REACT_APP_apiKey;

    const getWeather = () => {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`)
        .then((response) => {
          setWeatherData(response.data);
          console.log(weatherData)
        })
    };

    getWeather();

    return (
      <div>
        <div>
          Search Name here: <input type='text' value={searchName} onChange={handleSearch} />
        </div>
        <div>
          <h1>{searchedResults}</h1>
          <p>capital: {countries.filter((country) => country.name.common === searchedResults[0])[0].capital} </p>
          <p>area: {countries.filter((country) => country.name.common === searchedResults[0])[0].area}</p>
        </div>
        <div>
          <h4>languages</h4>
          <ul>
            {Object.values(languages).map((lan, index) => <li key={index}>{lan}</li>)}
          </ul>
        </div>
        <div>
          <img alt='national flag' src={countries.filter((country) => country.name.common === searchedResults[0])[0].flags.png} />
        </div>
        <div>
          <h4>Weather: {weatherData.main.temp}</h4>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <div>
          Search Name here: <input type='text' value={searchName} onChange={handleSearch} />
        </div>
        <div>
          <h4>Sorry, no match found</h4>
        </div>
      </div>
    )
  }
};

export default App