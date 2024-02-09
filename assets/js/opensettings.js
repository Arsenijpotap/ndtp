`use strict`;
let settings = document.getElementsByClassName("header__settings-icon")[0];
let menu = document.getElementsByClassName("header__settings")[0];
let main = document.getElementsByClassName("main")[0];

settings.addEventListener("click", () => {
	settings.style = "opacity:0; rotate:0deg;";
	setTimeout(() => {
		settings.classList.toggle("active");
	}, 200);
	setTimeout(() => {
		settings.style = "opacity:1;";
	}, 400);

	menu.classList.toggle("active");
});
window.addEventListener("scroll", () => {
	if (settings.classList[1]) {
		settings.style = "opacity:0; rotate:0deg;";
		setTimeout(() => {
			settings.classList.remove("active");
		}, 200);
		setTimeout(() => {
			settings.style = "opacity:1;";
		}, 400);

		menu.classList.remove("active");
	}
});
main.addEventListener("click", () => {
	if (settings.classList[1]) {
		settings.style = "opacity:0; rotate:0deg;";
		setTimeout(() => {
			settings.classList.remove("active");
		}, 200);
		setTimeout(() => {
			settings.style = "opacity:1;";
		}, 400);

		menu.classList.remove("active");
	}
});
