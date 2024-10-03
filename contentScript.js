console.log("Content script is running!");

let previousElement = null;

function addRedBorder(event) {
  const element = event.target;
  console.log("Hovered element:", element.tagName, element);
  if (previousElement) {
    previousElement.style.outline = "";
  }
  element.style.outline = "2px solid greenyellow";
  previousElement = element;
}

function removeBorder() {
  if (previousElement) {
    previousElement.style.outline = "";
    previousElement = null;
  }
}

document.addEventListener("mouseover", addRedBorder);
document.addEventListener("mouseout", removeBorder);
