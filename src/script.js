function formatDate(date){
    let hours = date.getHours();
      if (hours < 10){
          hours = `0${hours}`;
      }
    let minutes = date.getMinutes();
      if (minutes < 10){
          minutes = `0${minutes}`;
      }
    let dayIndex = date.getDay();
    let days = [
    "Sunday",
    "Monday", 
    "Tuesday", 
    "Wednesday", 
    "Thursday", 
    "Friday", 
    "Saturday"
    ];
    let day = days[dayIndex];
        return `${day}  ${hours}:${minutes}`;
    }
    
    let  dateElement = document.querySelector("#date");
    let currentTime = new Date();
    dateElement.innerHTML = formatDate(currentTime);

    function formatHours(timestamp){
        let date = new Date(timestamp);
        let hours = date.getHours();
        if (hours < 10){
            hours = `0${hours}`;
        }
      let minutes = date.getMinutes();
        if (minutes < 10){
            minutes = `0${minutes}`;
        }
        return `${hours}:${minutes}`;
    }
    


    function displayWeatherCondition(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#description").innerHTML = response.data.weather[0].main;
    
   
celsiusTemperature = response.data.main.temp;

    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`) ;
    iconElement.setAttribute("alt", response.data.weather[0].description );
}
    
function displayForecast(response){
    let forecastElement = document.querySelector("#forecast");
    let forecast = null;
    
    for (let index = 0; index <5; index++){
        forecast = response.data.list[index];
        forecastElement.innerHTML = `
<div class="col">
                <div class="day-of-the-week">
                    <div>${formatHours(forecast.dt * 1000)}</div>
                    <div><img
                    src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
                    "></img></div>
                    <div class="temp">${Math.round(forecast.main.temp_max)}° <span class="temp"> ${Math.round(forecast.main.temp_min)}°</span></div>
                </div>
`
    }


forecast = response.data.list[1];
forecastElement.innerHTML  +=  `
<div class="col">
                <div class="day-of-the-week">
                    <div>${formatHours(forecast.dt * 1000)}</div>
                    <div><img
                    src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
                    "></img></div>
                    <div class="temp">${Math.round(forecast.main.temp_max)}° <span class="temp"> ${Math.round(forecast.main.temp_min)}°</span></div>
                </div>
`
forecast = response.data.list[2];
forecastElement.innerHTML  +=  `
<div class="col">
                <div class="day-of-the-week">
                    <div>${formatHours(forecast.dt * 1000)}</div>
                    <div><img
                    src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
                    "></img></div>
                    <div class="temp">${Math.round(forecast.main.temp_max)}° <span class="temp"> ${Math.round(forecast.main.temp_min)}°</span></div>
                </div>
`
forecast = response.data.list[3];
forecastElement.innerHTML  +=  `
<div class="col">
                <div class="day-of-the-week">
                    <div>${formatHours(forecast.dt * 1000)}</div>
                    <div><img
                    src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
                    "></img></div>
                    <div class="temp">${Math.round(forecast.main.temp_max)}° <span class="temp"> ${Math.round(forecast.main.temp_min)}°</span></div>
                </div>
`
forecast = response.data.list[4];
forecastElement.innerHTML  +=  `
<div class="col">
                <div class="day-of-the-week">
                    <div>${formatHours(forecast.dt * 1000)}</div>
                    <div><img
                    src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
                    "></img></div>
                    <div class="temp">${Math.round(forecast.main.temp_max)}° <span class="temp"> ${Math.round(forecast.main.temp_min)}°</span></div>
                </div>
`
    
}

    function searchCity(city){
        let apiKey = "73f51c65cf902e402e962053834ff472";
        let  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl).then(displayWeatherCondition);

        apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl).then(displayForecast);
    }

    function searchLocation(position){
        let apiKey = "73f51c65cf902e402e962053834ff472";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
        
        axios.get(apiUrl).then(displayWeatherCondition);
        apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl).then(displayForecast);
    }

    function handleSubmit(event){
        event.preventDefault();
    let city= document.querySelector("#cityImput").value;
    searchCity(city);
    }

    function getCurrentLocation(event){
        event.preventDefault();
        navigator.geolocation.getCurrentPosition(searchLocation);
    }
    let currentLocationButton = document.querySelector("#current-location-button");
    currentLocationButton.addEventListener("click", getCurrentLocation);
    

    
    function convertToFahrenheit(event){
    event.preventDefault();
    let temperatureElement= document.querySelector("#temperature");
   
    celsiusLink.classList.remove("active");
     fahrenheitLink.classList.add("active");

   let fahrenheitElement = (celsiusTemperature *9)/5+32;
    temperatureElement.innerHTML = Math.round(fahrenheitElement);
    
    }
    let fahrenheitLink = document.querySelector("#fahrenheit-link");
    fahrenheitLink.addEventListener("click", convertToFahrenheit);
    
    function convertToCelsius(event){
        event.preventDefault();
        let temperatureElement= document.querySelector("#temperature");

        celsiusLink.classList.add("active");
        fahrenheitLink.classList.remove("active");
   

        temperatureElement.innerHTML =  Math.round(celsiusTemperature);
        }
    let celsiusLink = document.querySelector("#celsius-link");
    celsiusLink.addEventListener("click", convertToCelsius);
    
    let searchForm = document.querySelector("#search-form");
    searchForm.addEventListener("submit",  handleSubmit);

   
    searchCity("New York");

