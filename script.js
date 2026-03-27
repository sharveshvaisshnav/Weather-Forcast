const citySelect = document.getElementById("city");
const currentWeather = document.getElementById("current-weather");
const forecastDiv = document.getElementById("forecast");
const timeDiv = document.getElementById("time");

const API_KEY = "8b2a4aa0baa165e54aee4087607ac7ff";

/* live time */
setInterval(()=>{
const now = new Date();
timeDiv.innerText = now.toLocaleString();
},1000);

/* dropdown */
cities.forEach(city=>{
const option = document.createElement("option");
option.value = city.city;
option.textContent = `${city.city}, ${city.country}`;
citySelect.appendChild(option);
});

/* chart */
let chart;

/* when city selected */

citySelect.addEventListener("change",()=>{

const selectedCity = citySelect.value;
const cityData = cities.find(c=>c.city===selectedCity);
if(!cityData) return;

/* current weather */

fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${cityData.lat}&lon=${cityData.lon}&appid=${API_KEY}&units=metric`)
.then(res=>res.json())
.then(data=> {

const icon = data.weather[0].icon;


currentWeather.innerHTML=`

<div class="weather-box">

<h3>${data.name}</h3>d

<img src="https://openweathermap.org/img/wn/${icon}@2x.png">

<p><strong>${data.main.temp} °C</strong></p>

<p>${data.weather[0].description}</p>

<p>Humidity: ${data.main.humidity}%</p>

<p>Wind: ${data.wind.speed} m/s</p>

</div>

`
});
////////////////////////////////////////////////////////////////////////////////////////});

/* forecast */

fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityData.lat}&lon=${cityData.lon}&appid=${API_KEY}&units=metric`)
.then(res=>res.json())
.then(data=>{

forecastDiv.innerHTML = '<div class="forecast-container"></div>';

const container = document.querySelector(".forecast-container");

let temps = [];
let labels = [];

for(let i=0;i<5;i++){

const item = data.list[i*8];

temps.push(item.main.temp);
labels.push(item.dt_txt.split(" ")[0]);

const icon = item.weather[0].icon;

const card = document.createElement("div");

card.className="forecast-card";

card.innerHTML=`

<h4>${labels[i]}</h4>

<img src="https://openweathermap.org/img/wn/${icon}.png">

<p>${item.main.temp}°C</p>

`;

container.appendChild(card);

}

/* chart */

const ctx = document.getElementById("tempChart");

if(chart) chart.destroy();

chart = new Chart(ctx,{
type:'line',
data:{
labels:labels,
datasets:[{
label:'Temperature',
data:temps
}]
}
});

});

});