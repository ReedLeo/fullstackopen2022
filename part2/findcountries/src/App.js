import axios from 'axios'
import { useEffect, useState } from 'react';

const ShowWeather = (props) => {
  const [weather, setWeather] = useState([])
  // const ApiKey = "593826ca7a899fc52912f33f3a2ce281"
  const ApiKey = process.env.REACT_APP_API_KEY
  const reqUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${props.lat}&lon=${props.lon}&appid=${ApiKey}`
  
  let weatherIconUrl = 'http://openweathermap.org/img/wn/10d@2x.png'
  let weatherIconId = ''
  let temp = 0
  let windSpeed = 0

  const hook = () => {
    axios.get(reqUrl).then(response => {
      console.log('Effect of weather');
      setWeather(response.data)
    })
  }
  useEffect(hook, [])

  if (Object.values(weather).length > 0) {
    console.log('axios got weather successfully: ', weather);
    
    temp = weather.main.temp;
    weatherIconId = weather.weather[0].icon
    console.log('Weahter Icon Id is ', weatherIconId);
    
    weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIconId}@2x.png`
    console.log('Weather icon url is ', weatherIconUrl);
    
    windSpeed = weather.wind.speed
    console.log('Wind speed is ', windSpeed, ' m/s');
  }

  const kelvinToCelcius = (temp) => {
    return temp - 273.15
  }

  return (
    <div>
      <h1>Weather in {props.capital}</h1>
      temperature {kelvinToCelcius(temp).toFixed(2)} Celcius<br/>
      <img src={weatherIconUrl} alt="weather icon"/> <br/>
      wind {windSpeed.toFixed(2)} m/s
    </div>
  )
}

const ShowACountry = ({country}) => {
  console.log('The current country is ', country);
  
  const flagUrl = Object.values(country.flags)
  console.log('The flags\' URL are ', flagUrl)

  const langs = Object.values(country.languages)
  console.log(country.name.common, ' languages:', langs);
  
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>
        capital {country.capital} <br/>
        area {country.area} <br/>
      </div>
      <h3>languages:</h3>
      <ul>
        {langs.map((l, i) => <li key={i}>{l}</li>)}
      </ul>
      <img src={flagUrl[0]} alt="The flag cannot be loaded"></img>
      <ShowWeather capital={country.capital} lat={country.latlng[0]} lon={country.latlng[1]} />
    </div>
  )
}


const DisplayCountires = ({countries}) => {
  const [hasRender, setRender] = useState({})

  if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (countries.length > 1) {
    return (
      countries.map(country => 
        <div key={country.name.common}>
          {country.name.common}
          <button name={country.name.common} onClick={(event) => {
            console.log('button clicked :', event.target.name);
            var obj = {}
            obj[event.target.name] = true
            setRender(obj)
          }}>
            show
          </button>
          {(hasRender[country.name.common] === true) && <ShowACountry country={country} />}
        </div>)
    )
  } else if (countries.length === 1) {
    return (
      <ShowACountry country={countries[0]} />
    )
  }
}

function App() {
  const [allCountries, setAllCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])

  const hook = () => {
    console.log('effect');
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('fulfilled all countries');
        setAllCountries(response.data)
      })
  }
  useEffect(hook, [])
  console.log('get ', allCountries.length, 'countires info.');
  
  const countriesFilter = (event) => {
    event.preventDefault()
    const pattern = event.target.value.toLowerCase()
    console.log('In filtering countries by ', pattern);
    setCountriesToShow(allCountries.filter((c) => {
      return c.name.common.toLowerCase().search(pattern) !== -1;
    }))
  }

  return (
    <div>
        find countries <input onChange={countriesFilter}></input>
        <div>
          <DisplayCountires countries={countriesToShow} />
        </div>
    </div>
  );
}

export default App;
