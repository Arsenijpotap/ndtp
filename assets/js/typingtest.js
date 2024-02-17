`use strict`;
import commandList from "./commandlist.js";
let textField = document.getElementById("textfiield");
let lenguage = localStorage.getItem("setlanguage");
let keysSizeOne = Array.from(
	document.getElementsByClassName("keyboard__key_size-one")
);
let keysSizeAuto = Array.from(
	document.getElementsByClassName("keyboard__key_size-auto")
);
let commands = commandList[lenguage];
let validCommands;
let textArray = [];
let length = 4;
let text;
let activeKey;
let testIsWork = false;
let enterIsPress = false;
let description = document.getElementById("description");
let rows = Array.from(document.getElementsByClassName("keyboard__row"));
function generateList() {
	textArray = [];
	validCommands = commands;
	for (let i = 0; i < length; i++) {
		textArray.push(
			validCommands
				.splice(Math.random() * (validCommands.length - 1), 1)
				.join()
		);
	}
	text = textArray.join().replaceAll(",", "ㅤ");
	// text = text.replaceAll(",", "ㅤ");

	console.log(text);
	showText(text);
}
function showText() {
	textField.textContent = text;
	if (text[0]) {
		activeKey = text[0].replace("ㅤ", "space");
	}

	showActiveKey(activeKey);
}

function showActiveKey(key) {
	if (document.getElementById(key)) {
		document.getElementById(key).classList.add("active");
	} else {
		keysSizeOne.forEach((key) => {
			if (key.getAttribute("data-value") == activeKey) {
				key.classList.add("active");
				document.getElementById("shift-r").classList.add("active");
				document.getElementById("shift-l").classList.add("active");
			}
		});
		keysSizeAuto.forEach((key) => {
			if (key.getAttribute("data-value") == activeKey) {
				key.classList.add("active");
				document.getElementById("shift-r").classList.add("active");
				document.getElementById("shift-l").classList.add("active");
			}
		});
	}
}

function keydown(keypress) {
	if (testIsWork) {
		console.log(keypress.key.replace(" ", "space"));
		console.log(activeKey);
		if (keypress.key.replace(" ", "space") == activeKey) {
			correctAtnswer();
		} else {
			unCorrectAtnswer(keypress.key);
		}
	}
	if (keypress.key == "Enter" && testIsWork == false && !enterIsPress) {
		startTest();
	}
}
function correctAtnswer() {
	if (document.getElementById(activeKey))
		document.getElementById(activeKey).classList.remove("active");
	else {
		console.log(activeKey);
		keysSizeOne.forEach((key) => {
			if (key.getAttribute("data-value") == activeKey) {
				key.classList.remove("active");
				document.getElementById("shift-r").classList.remove("active");
				document.getElementById("shift-l").classList.remove("active");
			}
		});
	}
	text = text.slice(1);
	if (text == "") showWinAnimation();
	activeKey = "";

	showText();
}
function unCorrectAtnswer(key) {
	key = key
		.replace(" ", "space")
		.replace(`\\`, "sl-ob")
		.replace("Enter", "enter");
	if (document.getElementById(key)) {
		document.getElementById(key).classList.add("hint");
		setTimeout(() => {
			document.getElementById(key).classList.remove("hint");
		}, 300);
	}
}

function showWinAnimation() {
	description.style = "display:block;";

	let j = 0;
	rows.forEach((row) => {
		setTimeout(() => {
			for (let i = 0; i < row.children.length; i++) {
				setTimeout(() => {
					row.children[i].style = `border: solid 0.15vw hsl(${
						i * 10
					}, 100%, 50%);box-shadow: 0 0 0.6vw hsl(${
						i * 10
					}, 100%, 50%);`;
					setTimeout(() => {
						row.children[i].style =
							"border: solid 0.15vw $keyboard-border;box-shadow: 0 0 0.6vw $keyboard-border;";
					}, 400);
				}, i * 100);
			}
		}, j * 200);
		j++;
		// console.log(row.children);
	});
	testIsWork = false;
}

function startTest() {
	enterIsPress = true;
	description.textContent = "ㅤㅤㅤㅤㅤ3";

	setTimeout(() => {
		description.textContent = "ㅤㅤㅤㅤㅤ2";
	}, 1000);
	setTimeout(() => {
		description.textContent = "ㅤㅤㅤㅤㅤ1";
	}, 2000);
	setTimeout(() => {
		testIsWork = true;
		enterIsPress = false;

		description.textContent = "Нажмите Enter чтобы начать";
		description.style = "display:none;";
		generateList();
	}, 3000);
}
document.addEventListener("keypress", keydown);
