const text = document.querySelector("#MoreInfoTitle");

const spliText = text.textContent.split("");
const index = [];

const jumping = () => {
  let jump = Math.floor(Math.random() * spliText.length);
  text.textContent = "";

  for (let i = 0; i < spliText.length; i++) {
    text.innerHTML += "<span>" + spliText[i] + "</span>";
  }

  index.push(jump);
  if (index.length > 3) {
    index.shift();
  }

  const span = text.querySelectorAll("span")[jump];
  const spanValue = span.innerHTML;
  if (
    spanValue === "," ||
    spanValue === " " ||
    spanValue === ":" ||
    spanValue === ";" ||
    index[0] === index[1] ||
    index[0] === index[2] ||
    index[1] === index[2]
  ) {
    span.classList.add("none");
  } else {
    span.classList.add("up");
  }
};

addEventListener("load", jumping);
text.addEventListener("animationend", jumping);
