//import { weatherDescriptionEmoji } from './weatherUtils.js';

// Replace 'YOUR_API_KEY' with your OpenWeatherMap API key
const apiKey = 'YOUR_API_KEY';

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

    if (request.action === "getWeather" && typeof request.city == "string") {
      
      fetchWeatherDataForCity(request.city);
    }
  });

  
  function fetchWeatherDataForCity(city) {
    
    const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey;

    fetch(apiUrl) 
    .then(response => { 
      //Catch any errors that may occur during the fetch request
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {

      const { main, weather, wind } = data;

      const celsius = main.temp - 273.15;
      const tempCelsius = `Temperature: ${Math.round(celsius)}°C`;
      const weatherDescription = weatherDescriptionEmoji(weather[0]);
      const humidity = `Humidity: ${main.humidity} %`;
      const windSpeedInMps = wind.speed;
      const windKph = `Wind: ${mpsToKph(windSpeedInMps)} km/h`;
      const minCelsius = `Minimum: ${Math.floor(main.temp_min - 273.15)}°C`;
      const maxCelsius = `Maximum: ${Math.ceil(main.temp_max - 273.15)}°C`;

      chrome.runtime.sendMessage({ 
        action: "updateWeather",
        tempCelsius,
        weatherDescription,
        humidity,
        wind: windKph,
        tempMax: maxCelsius,
        tempMin: minCelsius
      });
    })

  
  }


//https://openweathermap.org/weather-conditions

function mpsToKph(mps) {
  return (mps * 3.6).toFixed(2);
}

//https://openweathermap.org/weather-conditions
function weatherDescriptionEmoji(weatherData) {

  const str = weatherData.description;
  const id =  weatherData.id;
  if (str.toLowerCase().includes("thunderstorm")) {
    if (id === 212) return "⛈️⚡️ " + str + " ";
    return "⛈️ " + str + " ";
  }
  if (str.toLowerCase().includes("drizzle")) {
    return "🌧️ " + str + " ";
  }
  if (str.toLowerCase().includes("rain")) {
    if (id === 503 || id === 504) return "🌧️☔️ " + str + " ";
    return "🌧️" + str + " "; 
  }
  if (str.toLowerCase().includes("snow")) {
    if (id === 621 || id === 622) return "☃️❄️ " + str + " ";
    return "🌨️ " + str + " "; 
  }
  if (str.toLowerCase().includes("clear")) {
    return "🌞 " + str + " "; 
  }
  if (str.toLowerCase().includes("clouds")) {
    if (id === 801 || id === 802) return "⛅️ " + str + " ";
    return "☁️ " + str + " "; 
  }
  if (str.toLowerCase().includes("tornado")) {
    return "🌪️ " + str + " "; 
  }
  else {
    return "🌫️ " + str + " "; 
  }

}