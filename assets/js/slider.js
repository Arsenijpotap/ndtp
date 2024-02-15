`use strict`;
let slides = document.getElementsByClassName("choice__slide");
let nextButton = document.getElementById("next-button");
let backButton = document.getElementById("back-button");
let icons = document.getElementsByClassName("choice__logo-item");
let idList = [];
let active;
let index;
Array.from(slides).forEach((slide) => {
	idList.push(slide.getAttribute("id"));
});

nextButton.addEventListener("click", nextSlide);
backButton.addEventListener("click", backSlide);
showSlide(localStorage.getItem("setlanguage"));

document.onkeydown = keydown;
function keydown(keypress) {
	switch (keypress.key) {
		case "ArrowRight":
			nextSlide();
			break;
		case "ArrowLeft":
			backSlide();
			break;
	}
}

Array.from(icons).forEach((icon) => {
	icon.addEventListener("click", () => {
		if (
			icon.getAttribute("data-name") !=
			document
				.getElementsByClassName("choice__slide active")[0]
				.getAttribute("id")
		) {
			showSlide(icon.getAttribute("data-name"));
		}
	});
});

function showSlide(name) {
	Array.from(icons).forEach((icon) => {
		icon.classList.remove("active");
		if (icon.getAttribute("data-name") == name) {
			icon.classList.add("active");
		}
	});
	Array.from(slides).forEach((slide) => {
		slide.classList.remove("active");
		slide.style = "opacity:0;";
	});
	document.getElementById(name).classList.add("active");
	Array.from(slides).forEach((slide) => {
		slide.style = "opacity:0;";
	});
	document.getElementById(name).style = "opacity:1;";
}

function nextSlide() {
	if (document.getElementsByClassName("choice__slide active")[0]) {
		active = document
			.getElementsByClassName("choice__slide active")[0]
			.getAttribute("id");
	}
	index = idList.indexOf(active);
	if (index == idList.length - 1) index = -1;
	showSlide(idList[index + 1]);
}

function backSlide() {
	if (document.getElementsByClassName("choice__slide active")[0]) {
		active = document
			.getElementsByClassName("choice__slide active")[0]
			.getAttribute("id");
	}
	index = idList.indexOf(active);
	console.log(index);
	if (index == 0) index = idList.length;
	showSlide(idList[index - 1]);
}
