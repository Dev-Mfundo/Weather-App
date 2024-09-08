import { useEffect, useState } from "react";
const Hero = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState('');

  useEffect(() => {
    getData('johannesburg');
  }, []);

  const getData = (city) => {
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=VF4BL7LGST9AAZJ6JBPE4GHGH&contentType=json`, {
      mode: "cors"
    })
    .then(response => response.json())
    .then(data => {
      setWeatherData(data); 
      setError(null); 
    })
    .catch(err => {
      setError(err); 
      console.error(err);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    getData(location); 
  };

  return (
    <div className="hero-container">
      <form onSubmit={handleSubmit}>
          <section>
            <input 
              id="userInput" 
              placeholder="Enter city" 
              value={location} 
              onChange={(e) => setLocation(e.target.value)}
            />
            <button type="submit">Search</button>
          </section>
          {error && <p className="error">{console.log("Error: "+error.message)}</p>}
          {weatherData ? (
            <nav>
              <h2>City: {weatherData.address}</h2>
              <h4>Temperature: {weatherData.currentConditions.temp}°C</h4>
              <h5>Conditions: {weatherData.currentConditions.conditions}</h5>
            </nav>
          ) : (
            <p className="loading">Loading...</p>
          )}
      </form>
    </div>
  );
}

export default Hero;
