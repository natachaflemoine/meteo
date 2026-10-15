function refreshWeather(response){
    let temperatureElement=document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let description = document.querySelector("#description");
    let humidity = document.querySelector("#humidity");
    let windSpeed = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);

  
   
   cityElement.innerHTML = response.data.city;
   timeElement.innerHTML = formatDate(date);
   description.innerHTML = response.data.condition.description;
   humidity.innerHTML = `${response.data.temperature.humidity}%`;
   windSpeed.innerHTML = `${response.data.wind.speed} km/h`;
   temperatureElement.innerHTML=Math.round(temperature);    
} 

function formatDate(date){
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let day = days[date.getDay()];
        
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    
    return `${day} ${hours}:${minutes}`;
}


function searchCity(city){
    let apiKey = "d05245ff0939e3211o0dfebb19ae585t";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event){
    event.preventDefault();
    let searchInput=document.querySelector("#search-form-input");
   
    searchCity(searchInput.value);
}

let searchFormElement=document.querySelector("#search-form");
searchFormElement.addEventListener("submit",handleSearchSubmit);

searchCity("Port-au-Prince");