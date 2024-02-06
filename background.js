// background.js
// Replace 'YOUR_API_KEY' with your OpenWeatherMap API key
const apiKey = YOUR_API_KEY;
console.log("here 1");
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("here 2");
    if (request.action === "getWeather") {
      console.log("displaying fetchWeatherData(); if statement");
      fetchWeatherData();
    } 
    if (request.action === "getWeather" && typeof request.city == "string") {
      console.log("displaying fetchWeatherDataForCity() if statement");
      fetchWeatherDataForCity(request.city);
    }
  });
  
  function fetchWeatherData() {
    
    const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=GUELPH&appid=' + apiKey;
  
    fetch(apiUrl)
      .then(response => { return response.json() })
      .then(data => {
        const tempatureKelvin = data.main.temp;
        const temperatureCelsius = tempatureKelvin - 273.15;
        const weatherInfo = `Temperature: ${Math.round(temperatureCelsius)}°C, ${data.weather[0].description}, Humidity: ${data.main.humidity} %`;
        chrome.runtime.sendMessage({ action: "updateWeather", weatherInfo: weatherInfo });
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  }

  function fetchWeatherDataForCity(city) {
    
    const apiUrl2 = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey;

    fetch(apiUrl2) 
    .then(response => { return response.json() })
    .then(data => {
      const tempatureKelvin = data.main.temp;
      const temperatureCelsius = tempatureKelvin - 273.15;
      const weatherInfo = `Temperature: ${Math.round(temperatureCelsius)}°C, ${data.weather[0].description}, Humidity: ${data.main.humidity} %`;
      chrome.runtime.sendMessage({ action: "updateWeather", weatherInfo: weatherInfo });
    })

  
  }
  