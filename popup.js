// popup.js
document.getElementById("getWeather").addEventListener("click", function() {
    chrome.runtime.sendMessage({ action: "getWeather" });
  });
  
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "updateWeather") {
      document.getElementById("weatherInfo").textContent = request.weatherInfo;
    }
  });
  