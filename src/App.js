import './App.css';
import React,{useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  const api = {
    key : "d0c4ea76926c0692d5a5490265698c56",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  const [weather, setWeather] = useState([]);
  const [query, setQuery] = useState('');
  
  const search = event =>{
    if (event.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(response=>response.json())
      .then(result=>{
        setWeather(result);
        console.log(result);
      });
    }
  }
  
  const dateBuilder =(d)=>{
    let months=["January","February","March","April","May","June","July","Auguest","September","October","November","December"]
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main !="undefined") ? ((weather.main.temp > 20) ? 'App warm' : 'App') : "App"}>
      <div className='main'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12 my-5'>
            <h1 className='title'>Weather Application</h1>
          </div>
          <div className='col-lg-12'>
            <div className='search-box'>
              <input type='text' className='search-bar w-100' placeholder='Search...'
              onChange={event => setQuery(event.target.value)}
              value={query}
              onKeyPress={search}/>
            </div>
          </div>
        </div>
      </div>

        {(typeof weather.main !="undefined") ? (
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-lg-6 mt-3'>
            <div className='location'>
              {weather.name} {weather.sys.country}
            </div>

            <div className='date'>
              {dateBuilder(new Date())}
            </div>

            <div className='weatherbox'>
              <div className='temp'>
                {Math.round(weather.main.temp)}°C
                <div className='speed'>
               Wind Speed {weather.wind.speed}</div>
                </div>
              </div>
              
            <div className='weather'>
              {weather.weather[0].main}
            </div>
          </div>
        </div>
      </div>
      ) : (<h2 className='getstarted'>Get Started By Searching a City</h2>)}
      </div>
    </div>
  );
}

export default App;
