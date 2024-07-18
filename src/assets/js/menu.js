`use strict`;
let burger = document.getElementsByClassName("header__burger")[0];
let opener = document.getElementsByClassName("header__opener")[0];
let menu = document.getElementsByClassName("header__menu")[0];
let preview = document.getElementsByClassName("preview")[0];

opener.addEventListener("click", () => {
	burger.classList.toggle("active");
	menu.classList.toggle("active");
});
window.addEventListener("scroll", () => {
	burger.classList.remove("active");
	menu.classList.remove("active");
});
preview.addEventListener("click", () => {
	burger.classList.remove("active");
	menu.classList.remove("active");
});
