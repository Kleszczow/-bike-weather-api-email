const inputLocation = document.querySelector("#cityInp");
const autoLocation = document.querySelector("#getLocation");
const wraper = document.querySelector(".wraper");
const findCity = document.querySelector(".findCity");
const back = document.querySelector("#goBack");
// show value

const showTemp = document.querySelector("#showTemp");
const feelsTemp = document.querySelector("#feelsTemp");
const minTemp = document.querySelector("#minTemp");
const maxTemp = document.querySelector("#maxTemp");
const degResolut = document.querySelector("#degResolut");
const speedResolut = document.querySelector("#speedResolut");
const tempNumb = document.querySelector("#tempNumb");
const presure = document.querySelector("#presure");
const wet = document.querySelector("#wet");
const main = document.querySelector("main");
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
  apiForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=ba3083ea48a23651d227cc88f7057fc2`;
  fetchData();
};

function onSuccess(position) {
  const { latitude, longitude } = position.coords;
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=23fb515f8a16fc88d49b53ad8ee83c66`;
  apiForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=23fb515f8a16fc88d49b53ad8ee83c66`;

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
      onError();
    });
  fetch(apiForecast)
    .then((res) => res.json())
    .then((resultTwo) => weatherForecast(resultTwo))
    .catch(() => {
      onError();
    });
};

const weatherDatails = (result) => {
  const { rain, sys } = result;
  const { deg, speed } = result.wind;
  const { id } = result.weather[0];
  const { temp, feels_like, pressure, temp_min, temp_max, humidity } =
    result.main;

  let ifRains;
  if (rain !== undefined) {
    ifRains = "1h" in rain ? rain["1h"] : "No Data";
  }
  let message;
  if (temp > 27 && temp < 5) {
    message = "bad cycling weather";
  } else {
    message = "good cycling weather";
  }
  const { dayNightImg, dayNightMessage } = forecastTime(sys);
  showText(temp, feels_like, temp_min, temp_max, pressure, humidity);
  showImageStatus(id, ifRains, message, dayNightImg, dayNightMessage);
  showWind(deg, speed);
  diagramValues(temp, deg, temp_min, temp_max);
};

const forecastTime = (sys) => {
  const currentDate = new Date();
  const currentTime = currentDate.getTime();
  const sunriseTime = new Date(sys.sunrise * 1000);
  const sunsetTime = new Date(sys.sunset * 1000);

  if (currentTime > sunriseTime && currentTime < sunsetTime) {
    dayNightImg = "./pictures/weather/day.svg";
    dayNightMessage = "sun";
  } else {
    dayNightImg = "./pictures/weather/night.svg";
    dayNightMessage = "moon";
  }
  return { dayNightImg, dayNightMessage };
};

const weatherForecast = (resultTwo) => {
  const ids = [
    "weatherDesciptionOne",
    "weatherDesciptionTwo",
    "weatherDesciptionThree",
    "weatherDesciptionFour",
  ];
  const idi = [
    "weatherImgOne",
    "weatherImgTwo",
    "weatherImgThree",
    "weatherImgFour",
  ];
  const dtTxt = resultTwo.list[0].dt_txt;
  const currentDate = new Date();
  const currentTimestamp = currentDate.getTime();
  const targetDate = new Date(dtTxt);
  const targetTimestamp = targetDate.getTime();
  const startIndex = targetTimestamp > currentTimestamp ? 0 : 1;
  const lenghtIndex = startIndex > 0 ? 5 : 4;

  for (let i = startIndex; i < lenghtIndex; i++) {
    const { main, weather, rain, sys } = resultTwo.list[i];
    const { id } = weather[0];
    const { temp } = main;
    const { pod } = sys;

    switch (pod) {
      case "n":
        dayOrNight = "night";
        dayNightImg = "./pictures/weather/night.svg";
        break;
      case "d":
        dayOrNight = "day";
        dayNightImg = "./pictures/weather/day.svg";
        break;
    }

    let ifRains = "";

    if (rain !== undefined) {
      ifRains = "3h" in rain ? rain["3h"] : "No Data";
    }

    const textElement = document.getElementById(ids[i - startIndex]);
    const imgElement = document.getElementById(idi[i - startIndex]);

    if (textElement) {
      var dateHoverValue = "";

      if (id >= 200 && id <= 232) {
        textElement.textContent = "storm";
        dateHoverValue = `${ifRains}mm of rain, ${temp}°C`;
      } else if (id >= 300 && id <= 321) {
        textElement.textContent = "drizzle";
        dateHoverValue = `${ifRains}mm of drizzle`;
      } else if (id >= 500 && id <= 531) {
        textElement.textContent = "rain";
        dateHoverValue = `${ifRains}mm of rain, ${temp}°C`;
      } else if (id >= 600 && id <= 622) {
        textElement.textContent = "snow";
        dateHoverValue = `${ifRains}mm of rain, ${temp}°C`;
      } else if (id >= 701 && id <= 781) {
        textElement.textContent = "atmosphere";
        dateHoverValue = `${temp}°C`;
      } else if (id >= 800) {
        textElement.textContent = dayOrNight;
        dateHoverValue = `${temp}°C`;
      } else if (id >= 801 && id <= 804) {
        textElement.textContent = "cloudy";
        dateHoverValue = `${temp}°C`;
      }

      textElement.parentElement.setAttribute("date-hover", dateHoverValue);
    }

    if (imgElement) {
      if (id >= 200 && id <= 232) {
        imgElement.src = "./pictures/weather/thunder.svg";
      } else if (id >= 300 && id <= 321) {
        imgElement.src = "./pictures/weather/rainy-4.svg";
      } else if (id >= 500 && id <= 531) {
        imgElement.src = "./pictures/weather/rainy-6.svg";
      } else if (id >= 600 && id <= 622) {
        imgElement.src = "./pictures/weather/snowy-4.svg";
      } else if (id >= 701 && id <= 781) {
        imgElement.src = "./pictures/weather/cloudy.svg";
      } else if (id >= 800) {
        imgElement.src = dayNightImg;
      } else if (id >= 801 && id <= 804) {
        imgElement.src = "./pictures/weather/cloudy.svg";
      }
    }
  }
};

const showText = (
  tempearture,
  feelsTempearture,
  minTemperature,
  maxTemperature,
  pressure,
  humidity
) => {
  showTemp.textContent = `${tempearture} °C`;
  feelsTemp.textContent = `${feelsTempearture} °C`;
  minTemp.textContent = `${minTemperature} °C`;
  maxTemp.textContent = `${maxTemperature} °C`;
  presure.textContent = `${pressure}hPa`;
  wet.textContent = `${humidity}%`;
  wraper.classList.add("active");
  findCity.classList.remove("active");
};
let dateHoverValue;
const showImageStatus = (
  id,
  ifRains,
  message,
  dayNightImg,
  dayNightMessage
) => {
  let dateHoverValue;
  if (id >= 200 && id <= 232) {
    weatherDesciption.textContent = "storm";
    weatherImg.src = "./pictures/weather/thunder.svg";
    dateHoverValue = `${ifRains}mm of rain`;
  }
  if (id >= 300 && id <= 321) {
    weatherDesciption.textContent = "drizzle";
    weatherImg.src = "./pictures/weather/rainy-4.svg";
    dateHoverValue = `${ifRains}mm of rain`;
  }
  if (id >= 500 && id <= 531) {
    weatherDesciption.textContent = "rain";
    weatherImg.src = "./pictures/weather/rainy-6.svg";
    dateHoverValue = `${ifRains}mm of rain`;
  }
  if (id >= 600 && id <= 622) {
    weatherDesciption.textContent = "snow";
    weatherImg.src = "./pictures/weather/snowy-4.svg";
    dateHoverValue = `${ifRains}mm of rain`;
  }
  if (id >= 701 && id <= 781) {
    weatherDesciption.textContent = "atmosphere ";
    weatherImg.src = "./pictures/weather/cloudy.svg";
    dateHoverValue = message;
  }
  if (id >= 800) {
    weatherDesciption.textContent = dayNightMessage;
    weatherImg.src = dayNightImg;
    dateHoverValue = message;
  }
  if (id >= 801 && id <= 804) {
    weatherDesciption.textContent = "cloudy";
    weatherImg.src = "./pictures/weather/cloudy.svg";
    dateHoverValue = message;
  }
  weatherDesciption.parentElement.setAttribute("date-hover", dateHoverValue);
};

const showWind = (deg, speed) => {
  degResolut.textContent = `${deg} deg`;
  speedResolut.textContent = `${speed} km/h`;
};

const diagramValues = (temp, deg, temp_min, temp_max) => {
  let math;
  if (temp <= 21) {
    math = 100 - (21 - temp) * 3.2258;
    test = 472 - 472 * (math / 100);
  }
  if (temp > 21) {
    math = 100 - (temp - 21) * 5.88235;
    //5.88235 dla 38C
    //4.7619 dla 42C
    test = 472 - 472 * (math / 100);
  }

  let dis = 472 - 472 * ((temp_max - temp) / (temp_max - temp_min));

  tempNumb.textContent = `${math.toString().slice(0, 2)}%`;
  addAnimation(test, deg, dis);
};

const addAnimation = (test, deg, dis) => {
  const styleSheet = document.styleSheets[1];

  let keyframesRule =
    "@keyframes animacja {" +
    "0% { stroke-dashoffset: 472 }" +
    `100% { stroke-dashoffset: ${test} }` +
    "}";

  let keyframesRuleTwo =
    "@keyframes compasDeg {" +
    "0% { transform: rotate(0deg); }" +
    `100% {   transform: rotate(${deg}deg);  }` +
    "}";

  let keyframesRuleThree =
    "@keyframes minMaxDiagram {" +
    "0% { stroke-dashoffset: 472 }" +
    `100% { stroke-dashoffset: ${dis} }` +
    "}";
  styleSheet.insertRule(keyframesRule, styleSheet.cssRules.length);
  styleSheet.insertRule(keyframesRuleTwo, styleSheet.cssRules.length);
  styleSheet.insertRule(keyframesRuleThree, styleSheet.cssRules.length);
};

back.addEventListener("click", () => {
  wraper.classList.remove("active");
  findCity.classList.add("active");
});
