// popup.js
document.getElementById("getWeather").addEventListener("click", function() {

    const cityInput = document.getElementById("cityInput");
    var weatherContainer = document.querySelector(".weather-container");
    const cityDisplay = document.getElementById("cityDisplay");

    if (weatherContainer.style.display === "none") weatherContainer.style.display = "block";

    const cityString = cityInput.value;

    if (cityString) {
      chrome.runtime.sendMessage({ action: "getWeather", city: cityString });
      cityDisplay.textContent = `📍 ${cityString}`;; // Update the content of the city display element
    } else {
      alert("Please enter a city name. ")
    }
  });
  
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "updateWeather") {
      document.getElementById("tempCelsius").textContent = `🌡️ ${request.tempCelsius}`;
      document.getElementById("weatherDescription").textContent = request.weatherDescription;
      //console.log(request.weatherDescription);
      document.getElementById("humidity").textContent = `💧 ${request.humidity}`;
      document.getElementById("wind").textContent = `🌬️ ${request.wind}`;
    }
  });
  