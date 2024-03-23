`use strict`;
let buttons = Array.from(document.getElementsByClassName("header__mode-button"));
let keyValues = Array.from(document.getElementsByClassName("keyboard__value"));
let keyboardSection = document.getElementById("keyboard");
let corectColor = document.getElementById("corectcolor");
let letterColor = document.getElementById("lettercolor");
let unCorectColor = document.getElementById("uncorectcolor");
let resetButton = document.getElementsByClassName("header__reset-button")[0];
let key = document.getElementsByClassName("keyboard__key_size-one")[0];

if (!localStorage.getItem("mode")) {
	localStorage.setItem("mode", "easy");
}
letterColor.value == localStorage.getItem("letterColor") ?? "#ff0000";
corectColor.value = localStorage.getItem("corectColor") ?? "#008000";
unCorectColor.value = localStorage.getItem("unCorectColor") ?? "#ff0000";

document.documentElement.style.setProperty("--hint-color", localStorage.getItem("unCorectColor"));
document.documentElement.style.setProperty("--active-color", localStorage.getItem("corectColor"));
document.getElementById("textfield-active").style.color = localStorage.getItem("letterColor");

setMode(localStorage.getItem("mode"));
buttons.forEach((element) => {
	element.addEventListener("click", setMode);
});

function setMode(element) {
	if (document.getElementsByClassName("header__mode-button active")[0] != document.getElementById(element) || this) {
		buttons.forEach((element) => {
			element.classList.remove("active");
		});
		(document.getElementById(element) || this).classList.add("active");
		keyValues.forEach((element) => {
			element.style = "opacity:0;";
		});
		setTimeout(() => {
			switch (this.id || element) {
				case "medium":
					localStorage.setItem("mode", "medium");
					keyboardSection.classList.remove("empty");
					keyboardSection.classList.add("points");
					break;
				case "easy":
					localStorage.setItem("mode", "easy");
					keyboardSection.classList.remove("points");
					keyboardSection.classList.remove("empty");
					break;
				case "hard":
					localStorage.setItem("mode", "hard");
					keyboardSection.classList.remove("points");
					keyboardSection.classList.add("empty");
					break;
			}
		}, 200);
		setTimeout(() => {
			keyValues.forEach((element) => {
				element.style = "opacity:1;";
			});
		}, 400);
	}
}
corectColor.addEventListener("change", setCorectColor);
corectColor.addEventListener("mousemove", setCorectColor);
function setCorectColor() {
	localStorage.setItem("corectColor", this.value);
	document.documentElement.style.setProperty("--active-color", this.value);
}
unCorectColor.addEventListener("change", setUnCorectColor);
unCorectColor.addEventListener("mousemove", setUnCorectColor);
function setUnCorectColor() {
	localStorage.setItem("unCorectColor", this.value);
	document.documentElement.style.setProperty("--hint-color", this.value);
}
letterColor.addEventListener("change", setLetterColor);
letterColor.addEventListener("mousemove", setLetterColor);
function setLetterColor() {
	localStorage.setItem("letterColor", this.value);
	document.getElementById("textfield-active").style.color = this.value;
}
function reset() {
	localStorage.setItem("unCorectColor", "#ff0000");
	localStorage.setItem("corectColor", "#008000");
	localStorage.setItem("letterColor", "#ff0000");

	document.documentElement.style.setProperty("--hint-color", "#ff0000");
	document.documentElement.style.setProperty("--active-color", "#008000");
	document.getElementById("textfield-active").style.color = "#ff0000";
}

resetButton.addEventListener("click", reset);
