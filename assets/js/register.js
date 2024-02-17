`use strict`;
let capsIndicator = document.getElementById("caps");
let keysSizeOne = document.getElementsByClassName("keyboard__key_size-one");
let keysSizeAuto = document.getElementsByClassName("keyboard__key_size-auto");
let keyboard = document.getElementsByClassName("keyboard")[0];
let esc = document.getElementById("esc");
let isCapsLockOn;
document.addEventListener("keydown", testRegister);
document.addEventListener("keyup", testRegister);
document.addEventListener("keydown", shiftDown);
document.addEventListener("keyup", shiftUp);
keyboard.className = "keyboard";
function testRegister(event) {
	if (event.code === "CapsLock") {
		isCapsLockOn = event.getModifierState("CapsLock");

		if (isCapsLockOn) {
			capsIndicator.classList.add("works");
			for (let i = 0; i < keysSizeOne.length; i++) {
				if (keysSizeOne[i].textContent.length == 1) {
					keysSizeOne[i].children[0].textContent =
						keysSizeOne[i].children[0].textContent.toUpperCase();
				}
			}
		} else {
			capsIndicator.classList.remove("works");
			for (let i = 0; i < keysSizeOne.length; i++) {
				if (keysSizeOne[i].textContent.length == 1) {
					keysSizeOne[i].children[0].textContent =
						keysSizeOne[i].children[0].textContent.toLowerCase();
				}
			}
		}
	}
}
function shiftDown(event) {
	if (event.code === "ShiftRight" || event.code === "ShiftLeft") {
		esc.style =
			"font-size:" + window.getComputedStyle(keysSizeOne[1]).fontSize;
		+";";

		for (let i = 0; i < keysSizeOne.length; i++) {
			if (keysSizeOne[i].getAttribute("data-value")) {
				keysSizeOne[i].children[0].textContent =
					keysSizeOne[i].getAttribute("data-value");
			}
		}
		for (let i = 0; i < keysSizeAuto.length; i++) {
			if (keysSizeAuto[i].getAttribute("data-value")) {
				keysSizeAuto[i].children[0].textContent =
					keysSizeAuto[i].getAttribute("data-value");
			}
		}
		if (isCapsLockOn) {
			capsIndicator.classList.add("works");
			for (let i = 0; i < keysSizeOne.length; i++) {
				if (keysSizeOne[i].textContent.length == 1) {
					keysSizeOne[i].children[0].textContent =
						keysSizeOne[i].children[0].textContent.toLowerCase();
				}
			}
		} else {
			capsIndicator.classList.remove("works");
			for (let i = 0; i < keysSizeOne.length; i++) {
				if (keysSizeOne[i].textContent.length == 1) {
					keysSizeOne[i].children[0].textContent =
						keysSizeOne[i].children[0].textContent.toUpperCase();
				}
			}
		}
	}
}
function shiftUp(event) {
	if (event.code === "ShiftRight" || event.code === "ShiftLeft") {
		esc.style;

		esc.style =
			"font-size:" + window.getComputedStyle(keysSizeOne[13]).fontSize;
		+";";
		for (let i = 0; i < keysSizeOne.length; i++) {
			if (keysSizeOne[i].getAttribute("data-value")) {
				keysSizeOne[i].children[0].textContent =
					keysSizeOne[i].getAttribute("data-sign");
			}
		}
		for (let i = 0; i < keysSizeAuto.length; i++) {
			if (keysSizeAuto[i].getAttribute("data-value")) {
				keysSizeAuto[i].children[0].textContent =
					keysSizeAuto[i].getAttribute("data-sign");
			}
		}
		if (isCapsLockOn) {
			capsIndicator.classList.add("works");
			for (let i = 0; i < keysSizeOne.length; i++) {
				if (keysSizeOne[i].textContent.length == 1) {
					keysSizeOne[i].children[0].textContent =
						keysSizeOne[i].children[0].textContent.toUpperCase();
				}
			}
		} else {
			capsIndicator.classList.remove("works");
			for (let i = 0; i < keysSizeOne.length; i++) {
				if (keysSizeOne[i].textContent.length == 1) {
					keysSizeOne[i].children[0].textContent =
						keysSizeOne[i].children[0].textContent.toLowerCase();
				}
			}
		}
	}
}
