// popup.js
document.getElementById("getWeather").addEventListener("click", function() {
    const cityInput = document.getElementById("cityInput");
    const cityString = cityInput.value;


    console.log("Displaying city.trim()");
    console.log(cityString.trim());

    if (cityString.trim()) {
      chrome.runtime.sendMessage({ action: "getWeather", city: cityString });
    } else {
      alert("Please enter a city name. ")
    }
    //chrome.runtime.sendMessage({ action: "getWeather" });
  });
  
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "updateWeather") {
      document.getElementById("weatherInfo").textContent = request.weatherInfo;
    }
  });
  