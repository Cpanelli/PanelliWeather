var APIKey = "d5b3d2d5396716adf9a3dcc54205e74c";
var queryURL;
var city;

var searchInput = document.getElementById("citySearch");
var searchBtn = document.getElementById("searchBtn");
var dateEl;
var currentDateEl;
var savedCities;

function updateBackgroundImage(city) {
  const backgroundImageURL = `https://source.unsplash.com/1600x900/?${city}`;
  document.body.style.backgroundImage = `url('${backgroundImageURL}')`;
}
// Update the background image
function fiveDay(city) {
  queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?units=imperial&q=" +
    city +
    "&appid=" +
    APIKey;
  console.log("City Name: ");
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("5Day data: ");
      console.log(data);
      var fiveDayContainer = document.querySelector(".forecast-container");
      fiveDayContainer.innerHTML = "";
      fiveDayContainer.classList.add(
        "bg-primary-subtle",
        "py-3",
        "d-flex",
        "align-items-center"
      ); // center
      var forecastHeader = document.createElement("h5");
      fiveDayContainer.appendChild(forecastHeader);
      forecastHeader.textContent = "5-day Forecast:";
      forecastHeader.classList.add("text-center", "display-6");
      for (var i = 0; i < data.list.length; i++) {
        if (data.list[i].dt_txt.split(" ")[1] === "12:00:00") {
          console.log(data.list[i]); 

          var cardEl = document.createElement("div");
          cardEl.classList.add(
            "card",
            "mt-3",
            "forecast",
            "card-body",
            "ms-1",
            "me-1"
          ); // "forecast
          cardEl.style.width = "18rem";
          var dateEl = document.createElement("h5");
          dateEl.classList.add("text-center");
          var ulEl = document.createElement("ul");
          ulEl.classList.add("list-group", "list-group-flush");
          var tempEl = document.createElement("li");
          tempEl.classList.add("list-group-item");
          var windEl = document.createElement("li");
          windEl.classList.add("list-group-item");
          var humidEl = document.createElement("li");
          humidEl.classList.add("list-group-item");

          var currentIcon = document.createElement("img");
          var iconID = data.list[i].weather[0].icon;
          currentIcon.style.width = "100px";
          currentIcon.src = `https://openweathermap.org/img/w/${iconID}.png`;

          fiveDayContainer.appendChild(cardEl);
          cardEl.appendChild(dateEl);
          cardEl.appendChild(ulEl);
          ulEl.appendChild(currentIcon);
          ulEl.appendChild(tempEl);
          ulEl.appendChild(windEl);
          ulEl.appendChild(humidEl);

          tempEl.textContent = "Temperature: " + data.list[i].main.temp + " °F";
          windEl.textContent =
            "Wind Speed: " + data.list[i].wind.speed + " mph";
          humidEl.textContent = "Humidity: " + data.list[i].main.humidity + "%";
          dateEl.textContent = data.list[i].dt_txt.split(" ")[0];
        } // end function
      }
    });
}

function currentWeather(city) {   
  queryURL =
    "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=" +
    city +
    "&appid=" +
    APIKey;
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("CURRENT data: ");
      console.log(data);

      console.log("weather icon id: ");
      console.log(data.weather[0].icon);
      var currentContainer = document.querySelector(".current-container");
      currentContainer.innerHTML = "";
      var currentCardEl = document.createElement("div");
      currentCardEl.classList.add(
        "card",
        "mt-2",
        "forecast",
        "card-body",
        "bg-primary-subtle"
      );
      currentCardEl.style.width = "18rem";
      var currentDateEl = document.createElement("h5");
      currentDateEl.classList.add("text-center", "display-6");
      var currentUlEl = document.createElement("ul");
      currentUlEl.classList.add("list-group", "list-group-flush");
      var currentTempEl = document.createElement("li");
      currentTempEl.classList.add("list-group-item", "text-center");
      var currentWindEl = document.createElement("li");
      currentWindEl.classList.add("list-group-item", "text-center");
      var currentHumidEl = document.createElement("li");
      currentHumidEl.classList.add("list-group-item", "text-center");

      var currentIcon = document.createElement("img");
      currentIcon.classList.add("d-flex", "text-center", "mx-auto");
      var iconID = data.weather[0].icon;
      currentIcon.style.width = "100px";
      currentIcon.src = `https://openweathermap.org/img/w/${iconID}.png`;

      currentContainer.appendChild(currentCardEl);
      currentCardEl.appendChild(currentDateEl);
      currentCardEl.appendChild(currentUlEl);
      currentUlEl.appendChild(currentIcon);
      currentUlEl.appendChild(currentTempEl);
      currentUlEl.appendChild(currentWindEl);
      currentUlEl.appendChild(currentHumidEl);

      currentTempEl.textContent = "Temperature: " + data.main.temp + " °F";
      currentWindEl.textContent = "Wind Speed: " + data.wind.speed + " mph";
      currentHumidEl.textContent = "Humidity: " + data.main.humidity + "%";
      currentDateEl.textContent = city + " now: ";
    });
}

function createButton() {
  savedCities = JSON.parse(localStorage.getItem("City")) || [];
  var btnContainer = document.querySelector(".cityBtns");
  btnContainer.textContent = "";
  for (let i = 0; i < savedCities.length; i++) {
    var cityName = savedCities[i];
    var cityBtn = document.createElement("button");
    cityBtn.classList.add("btn", "btn-secondary", "ms-1", "me-1");
    cityBtn.textContent = cityName;
    btnContainer.appendChild(cityBtn);
    cityBtn.addEventListener("click", function () {
      console.log(this.textContent);
      var btnContent = this.textContent;
      fiveDay(btnContent);
      currentWeather(btnContent);
    });
  }
}

searchBtn.addEventListener("click", function () {
  event.preventDefault();
  city = searchInput.value.trim();
  city = city.toUpperCase();

  if (city !== "") {
    savedCities = JSON.parse(localStorage.getItem("City")) || [];

    if (!savedCities.includes(city)) {
      savedCities.push(city);
      localStorage.setItem("City", JSON.stringify(savedCities));
      createButton();
    }

    fiveDay(city);
    currentWeather(city);

    updateBackgroundImage(city);
  }
});
createButton();
// update