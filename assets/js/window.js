`use strict`;
let button = document.getElementsByClassName("preview__button")[0];
let previewWindow = document.getElementsByClassName("preview__window")[0];
let cross = document.getElementsByClassName("preview__cross")[0];
button.addEventListener("click", showWindow);
cross.addEventListener("click", closeWindow);

function showWindow() {
	previewWindow.classList.add("active");
}
function closeWindow() {
	previewWindow.style = "opacity:0;";
	setTimeout(() => {
		previewWindow.classList.remove("active");
	}, 400);
}
