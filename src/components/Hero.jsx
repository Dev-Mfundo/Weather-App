import {useEffect, useState} from 'react';
const Hero =()=>{

  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

useEffect(()=>{
    const getData=()=>{
      fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/johannesburg?unitGroup=metric&key=VF4BL7LGST9AAZJ6JBPE4GHGH&contentType=json",{
        mode: "cors"
      })
      .then(response=>response.json())
      .then(data=>{
        setWeatherData(data);
      })
      .then(error=>{
        setError(error);
        console.log(error)
      });
    }
    getData();
},[])
  
  return(
    <div>
        {error && <p>Error: {error.message}</p>}
        {
        weatherData?(
          <nav>
          <h2>City: {weatherData.address}</h2>
          <h4>Temperature: {weatherData.currentConditions.temp}°C</h4>
          <h5>Conditions: {weatherData.currentConditions.conditions}</h5>
          </nav>
          ) : (
            <p>Loading</p>
          )
        }
    </div>
    
  )
}

export default Hero;