const inputLocation = document.querySelector("#cityInp");
const autoLocation = document.querySelector("#getLocation");
// show value

const showTemp = document.querySelector("#showTemp");
const feelsTemp = document.querySelector("#feelsTemp");
const minTemp = document.querySelector("#minTemp");
const maxTemp = document.querySelector("#maxTemp");
//icons

const weatherDesciption = document.querySelector("#weatherDesciption");
const weatherImg = document.querySelector("#weatherImg");
const arrow = document.querySelector(".arrow");

let api;

inputLocation.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && inputLocation.value != "") {
    console.log("działa");
    requestApi(inputLocation.value);
  }
});

autoLocation.addEventListener("click", () => {
  if (navigator.geolocation) {
    const nav = navigator.geolocation.getCurrentPosition(onSuccess, onError);
    console.log(nav);
  } else {
    alert("Your browser not supported");
  }
});

const requestApi = (city) => {
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ba3083ea48a23651d227cc88f7057fc2`;
  fetchData();
};

const fetchData = () => {
  console.log(api);
  fetch(api)
    .then((res) => res.json())
    .then((result) => weatherDatails(result))
    .catch(() => {
      alert("somthing went wrong");
      alert("pending", "error");
    });
};

const weatherDatails = (result) => {
  const { deg, gust, speed } = result.wind;
  const { temp, feels_like, pressure, temp_min, temp_max } = result.main;
  const { id } = result.weather[0];
  const tempearture = (temp - 273.15).toString().slice(0, 4);
  const feelsTempearture = (feels_like - 273.15).toString().slice(0, 4);
  const minTemperature = (temp_min - 273.15).toString().slice(0, 4);
  const maxTemperature = (temp_max - 273.15).toString().slice(0, 4);
  console.log(result);
  showText(tempearture, feelsTempearture, minTemperature, maxTemperature);
  showImageStatus(id);
  showWind(deg, speed);
};

const showText = (
  tempearture,
  feelsTempearture,
  minTemperature,
  maxTemperature
) => {
  showTemp.textContent = `${tempearture} °C`;
  feelsTemp.textContent = `${feelsTempearture} °C`;
  minTemp.textContent = `${minTemperature} °C`;
  maxTemp.textContent = `${maxTemperature} °C`;
};

const showImageStatus = (id) => {
  if (id >= 200 && id <= 232) {
    weatherDesciption.textContent = "storm";
    weatherImg.src = "./pictures/weather/thunder.svg";
  }
  if (id >= 300 && id <= 321) {
    weatherDesciption.textContent = "drizzle";
    weatherImg.src = "./pictures/weather/rainy-4.svg";
  }
  if (id >= 500 && id <= 531) {
    weatherDesciption.textContent = "rain";
    weatherImg.src = "./pictures/weather/rainy-6.svg";
  }
  if (id >= 600 && id <= 622) {
    weatherDesciption.textContent = "snow";
    weatherImg.src = "./pictures/weather/snowy-4.svg";
  }
  if (id >= 701 && id <= 781) {
    weatherDesciption.textContent = "atmosphere ";
    weatherImg.src = "./pictures/weather/cloudy.svg";
  }
  if (id >= 800) {
    weatherDesciption.textContent = "sun";
    weatherImg.src = "./pictures/weather/day.svg";
  }
  if (id >= 801 && id <= 804) {
    weatherDesciption.textContent = "cloudy";
    weatherImg.src = "./pictures/weather/cloudy.svg";
  }
};
const showWind = (deg, speed) => {
  arrow.style.rotate = `${deg}deg`;
};
