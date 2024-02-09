`use strict`;
let buttons = Array.from(
	document.getElementsByClassName("header__mode-button")
);
let keyValues = Array.from(document.getElementsByClassName("keyboard__value"));

let keyboardSection = document.getElementById("keyboard");

buttons.forEach((element) => {
	element.addEventListener("click", () => {
		buttons.forEach((element) => {
			element.classList.remove("active");
		});
		element.classList.add("active");
		keyValues.forEach((element) => {
			element.style = "opacity:0;";
		});
		setTimeout(() => {
			switch (element.id) {
				case "medium":
					keyboardSection.classList.remove("empty");
					keyboardSection.classList.add("points");
					break;
				case "easy":
					keyboardSection.classList.remove("points");
					keyboardSection.classList.remove("empty");
					break;
				case "hard":
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
	});
});
