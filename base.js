const inputLocation = document.querySelector("#cityInp");
const autoLocation = document.querySelector("#getLocation");
const wraper = document.querySelector(".wraper");
const findCity = document.querySelector(".findCity");
const back = document.querySelector(".back");
// show value

const showTemp = document.querySelector("#showTemp");
const feelsTemp = document.querySelector("#feelsTemp");
const minTemp = document.querySelector("#minTemp");
const maxTemp = document.querySelector("#maxTemp");
const degResolut = document.querySelector("#degResolut");
const speedResolut = document.querySelector("#speedResolut");
const tempNumb = document.querySelector("#tempNumb");
//icons

const weatherDesciption = document.querySelector("#weatherDesciption");
const weatherImg = document.querySelector("#weatherImg");
const arrow = document.querySelector(".arrow");

let api;

inputLocation.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && inputLocation.value != "") {
    requestApi(inputLocation.value);
  }
});

autoLocation.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert("Yor browser not support gelocation");
  }
});

const requestApi = (city) => {
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=ba3083ea48a23651d227cc88f7057fc2`;
  fetchData();
};

function onSuccess(position) {
  const { latitude, longitude } = position.coords;
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=23fb515f8a16fc88d49b53ad8ee83c66`;
  fetchData();
}

const onError = () => {
  alert("somthing went wrong");
};

const fetchData = () => {
  fetch(api)
    .then((res) => res.json())
    .then((result) => weatherDatails(result))
    .catch(() => {
      alert("somthing went wrong");
    });
};

const weatherDatails = (result) => {
  const { deg, gust, speed } = result.wind;
  const { temp, feels_like, pressure, temp_min, temp_max } = result.main;
  const { id } = result.weather[0];

  console.log(result);
  showText(temp, feels_like, temp_min, temp_max);
  showImageStatus(id);
  showWind(deg, speed);
  addAnimation(temp, deg);
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

  wraper.classList.add("active");
  findCity.classList.remove("active");
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
  degResolut.textContent = `${deg} deg`;
  speedResolut.textContent = `${speed} km/h`;
};

back.addEventListener("click", () => {
  wraper.classList.remove("active");
  findCity.classList.add("active");
});

const addAnimation = (temp, deg) => {
  const styleSheet = document.styleSheets[1];

  let math;
  if (temp <= 21) {
    console.log("mnioejsza");
    math = temp * 7.7377;
  }
  if (temp > 21) {
    console.log("wieksza");
    math = temp * 7.7377;
  }
  tempNumb.textContent = math.toString().slice(0, 3);

  let keyframesRule =
    "@keyframes animacja {" +
    "0% { stroke-dashoffset: 472 }" +
    `100% { stroke-dashoffset: ${math} }` +
    "}";

  let keyframesRuleTwo =
    "@keyframes compasDeg {" +
    "0% { transform: rotate(0deg); }" +
    `100% {   transform: rotate(${deg}deg);  }` +
    "}";

  styleSheet.insertRule(keyframesRule, styleSheet.cssRules.length);
  styleSheet.insertRule(keyframesRuleTwo, styleSheet.cssRules.length);
};
