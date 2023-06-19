const info = document.querySelector("#info");
const infowrap = document.querySelector(".infowrap");
const goBackInfo = document.querySelector("#goBackInfo");

info.addEventListener("click", () => {
  wraper.classList.remove("active");
  findCity.classList.remove("active");
  infowrap.classList.add("active");
});
goBackInfo.addEventListener("click", () => {
  wraper.classList.add("active");
  infowrap.classList.remove("active");
});
