const inputLocation = document.querySelector("#cityInp");
const autoLocation = document.querySelector("#getLocation");

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
  const { temp, feels_like, pressure } = result.main;
  console.log(result);
  console.log(deg, gust, speed);
  console.log(temp, feels_like);
  console.log(result.name);
  const tempearture = temp - 273.15;
  console.log(tempearture.toString().slice(0, 4));
};
