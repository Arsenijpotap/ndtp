`use strict`;
let settings = document.querySelectorAll("picture")[1];
let menu = document.getElementsByClassName("header__settings")[0];
let main = document.getElementsByClassName("main")[0];
settings.addEventListener("click", () => {
	settings.style = "opacity:0; rotate:0deg;";
	setTimeout(() => {
		settings.classList.toggle("active");
		console.log(settings.classList[0] == "active");
		if (settings.classList[0] != "active") {
			settings.innerHTML =
				'<source srcset="assets/icons/training/header/settings.webp" type="image/webp"><img alt="" src="assets/icons/training/header/settings.png" class="header__settings-icon">';
		} else {
			settings.innerHTML =
				'<source srcset="assets/icons/training/header/cross.webp" type="image/webp"><img alt="" src="assets/icons/training/header/cross.png" class="header__settings-icon">';
		}
	}, 200);
	setTimeout(() => {
		settings.style = "opacity:1;";
	}, 400);

	menu.classList.toggle("active");
});
window.addEventListener("scroll", () => {
	if (settings.classList[0]) {
		console.log(123);
		settings.style = "opacity:0; rotate:0deg;";

		setTimeout(() => {
			settings.classList.remove("active");
			if (settings.classList[0] != "active") {
				settings.innerHTML =
					'<source srcset="assets/icons/training/header/settings.webp" type="image/webp"><img alt="" src="assets/icons/training/header/settings.png" class="header__settings-icon">';
			} else {
				settings.innerHTML =
					'<source srcset="assets/icons/training/header/cross.webp" type="image/webp"><img alt="" src="assets/icons/training/header/cross.png" class="header__settings-icon">';
			}
		}, 200);
		setTimeout(() => {
			settings.style = "opacity:1;";
		}, 400);

		menu.classList.remove("active");
	}
});
main.addEventListener("click", () => {
	console.log(132);
	if (settings.classList[0]) {
		settings.style = "opacity:0; rotate:0deg;";
		setTimeout(() => {
			settings.classList.remove("active");
			if (settings.classList[0] != "active") {
				settings.innerHTML =
					'<source srcset="assets/icons/training/header/settings.webp" type="image/webp"><img alt="" src="assets/icons/training/header/settings.png" class="header__settings-icon">';
			} else {
				settings.innerHTML =
					'<source srcset="assets/icons/training/header/cross.webp" type="image/webp"><img alt="" src="assets/icons/training/header/cross.png" class="header__settings-icon">';
			}
		}, 200);
		setTimeout(() => {
			settings.style = "opacity:1;";
		}, 400);

		menu.classList.remove("active");
	}
});
document.addEventListener("keydown", () => {
	console.log(settings.classList[0]);
	if (settings.classList[0]) {
		menu.classList.remove("active");
		settings.style = "opacity:0; rotate:0deg;";

		setTimeout(() => {
			settings.classList.remove("active");
			if (settings.classList[0] != "active") {
				settings.innerHTML =
					'<source srcset="assets/icons/training/header/settings.webp" type="image/webp"><img alt="" src="assets/icons/training/header/settings.png" class="header__settings-icon">';
			} else {
				settings.innerHTML =
					'<source srcset="assets/icons/training/header/cross.webp" type="image/webp"><img alt="" src="assets/icons/training/header/cross.png" class="header__settings-icon">';
			}
		}, 200);
		setTimeout(() => {
			settings.style = "opacity:1;";
		}, 400);
	}
});
