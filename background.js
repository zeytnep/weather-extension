// background.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "getWeather") {
      fetchWeatherData();
    }
  });
  
  function fetchWeatherData() {
    // Replace 'YOUR_API_KEY' with your OpenWeatherMap API key
    const apiKey = '65892d7ba089035d1bfe7fe7a045ae4b';
    const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=GUELPH&appid=' + apiKey;
  
    fetch(apiUrl)
      .then(response => {
        
        //log the raw API response 
        console.log('API Response: ', response);
        return response.json()
      })
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
  