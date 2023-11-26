var searchWeather = document.querySelector('.weather-search');
var city = document.querySelector('.weather-city');
var day = document.querySelector('.weather-day');
var humidity = document.querySelector('weather-indicator-humidity>.value');
var wind = document.querySelector('.weather-indicator-wind>.value');
var pressure = document.querySelector('.weather-indicator-pressure>.value');
var image = document.querySelector('weather-img');
var temperature = document.querySelector('weather-temp>.value')
var apiKey = 'd5b3d2d5396716adf9a3dcc54205e74c';
var weatherEndPoint = 'https://api.openweathermap.org/data/2.5/forecast?&appid=' + apiKey + '&units=imperial';

var getWeatherByCityName = async (city) => {
    var endpoint = weatherEndPoint + '&q=' + city;
    var response = await fetch(endpoint);
    var weather = await response.json(); 
    return weather;
}

 searchWeather.addEventListener('keyup', async   (e) => {
     if(e.Keycode === 13) {
     var weather = await getWeatherByCityName(searchWeather.value);
     console.log(weather);
     }
 });
