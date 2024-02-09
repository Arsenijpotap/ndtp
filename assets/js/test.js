`use strict`;
document.addEventListener("keypress", keydown);
let space = document.getElementById("space");

function keydown(keypress) {
	console.log(keypress.key);
	for (let i = 0; i < keysSizeAuto.length; i++) {
		if (keysSizeAuto[i].getAttribute("data-sign") == keypress.key) {
			keysSizeAuto[i].children[0].style = "color:red;";
		}
	}
	for (let i = 0; i < keysSizeOne.length; i++) {
		if (keysSizeOne[i].getAttribute("data-sign") == keypress.key) {
			keysSizeOne[i].children[0].style = "color:red;";
		}
	}
	if (keypress.key == " ") {
		space.children[0].style = "color:red;";
	}
}
