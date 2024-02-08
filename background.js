// background.js
// Replace 'YOUR_API_KEY' with your OpenWeatherMap API key
const apiKey = YOUR_API_KEY;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

    if (request.action === "getWeather" && typeof request.city == "string") {
      
      fetchWeatherDataForCity(request.city);
    }
  });

  
  function fetchWeatherDataForCity(city) {
    
    const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey;

    fetch(apiUrl) 
    .then(response => { return response.json() })
    .then(data => {
      const kelvin = data.main.temp;
      const celsius = kelvin - 273.15;
      const windSpeedInMps = data.wind.speed;
  
    
      const tempCelsius = `Temperature: ${Math.round(celsius)}°C`;
      const weatherDescription = weatherDescriptionEmoji(data.weather[0]);
      const humidity = `Humidity: ${data.main.humidity} %`;
      const wind = `Wind: ${mpsToKph(windSpeedInMps)}km/h`;
      
      chrome.runtime.sendMessage({ action: "updateWeather", tempCelsius: tempCelsius, weatherDescription: weatherDescription, humidity: humidity, wind: wind });
    })

  
  }

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
  