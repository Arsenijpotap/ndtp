`use strict`;
import commandList from "./commandlist.js";
let button = document.getElementsByClassName("modal__button")[0];
let chartCvs = document.getElementById("modalchart");
let checkBoxAnimation = document.getElementById("header-checkbox");
let checkBoxItemOne = document.getElementsByClassName("modal__checkbox")[2];
let checkBoxItemTwo = document.getElementsByClassName("modal__checkbox")[3];
let checkBoxModeOne = document.getElementsByClassName("modal__checkbox")[0];
let checkBoxModeTwo = document.getElementsByClassName("modal__checkbox")[1];
let correctSpeedsList = [];
let description = document.getElementById("description");
let enterIsPress = false;
let isCapsLockOn;
let isLearningModeOn = false;
let isLockOn = false;
let keysSizeAuto = Array.from(document.getElementsByClassName("keyboard__key_size-auto"));
let keysSizeOne = Array.from(document.getElementsByClassName("keyboard__key_size-one"));
let lastResultsList = localStorage.getItem("lastresultslist") || JSON.stringify([]);
let lenguage = localStorage.getItem("setlanguage");
let metricList = ["", "с.", "%", "н/с.", "сим."];
let mistakeList = [];
let modal = document.getElementsByClassName("modal")[0];
let modalIsOpen = false;
let modalSpeed = Array.from(document.getElementsByClassName("modal__speed"));
let modalTime = Array.from(document.getElementsByClassName("modal__time"));
let moreInfo = document.getElementsByClassName("modal__more-info")[0];
let moreInfoButton = document.getElementsByClassName("modal__link")[0];
let pastResults = document.getElementsByClassName("modal__past-results")[0];
let quantityAnswer = 0;
let quantityAnswerPerSecond = 0;
let quantityMistakeAnswer = 0;
let quantityСorrectAnswer = 0;
let quantityСorrectAnswerPerSecond = 0;
let range = document.getElementById("range");
let rangeLabel = document.getElementById("rangelabel");
let resultFirst = document.getElementsByClassName("modal__results")[0];
let resultList = {};
let resultSecond = document.getElementsByClassName("modal__results")[1];
let resetResultButton = document.getElementsByClassName("header__reset-result")[0];
let rowContent = document.getElementsByClassName("modal__tr")[0].textContent;
let rows = Array.from(document.getElementsByClassName("keyboard__row"));
let secondsList = [];
let speedsList = [];
let table = document.getElementsByClassName("modal__table")[0];
let tableRows = Array.from(document.getElementsByClassName("modal__tr"));
let tableRowsTop = Array.from(document.getElementsByClassName("modal__tr-top"));
let textArray = [];
let textField = document.getElementById("textfield");
let textFieldFirstLetter = document.getElementById("textfield-active");
let topList = {};
let topResultsList = localStorage.getItem("topresultslist") || JSON.stringify([]);
let validCommands, length, text, maxSpeed, chart, secondsNumber, accuracy, startTime, spentTime, endTime, activeKey;
var testIsWork = false;
let commands = commandList[lenguage];

range.value = localStorage.getItem("length");
length = +localStorage.getItem("length");
rangeLabel.textContent = length;
checkBoxAnimation.checked = Boolean(localStorage.getItem("animationOn") == "true");
if (!localStorage.getItem("length")) {
	localStorage.setItem("length", "7");
	length = 7;
}

if (!localStorage.getItem("lastresultslist")) {
	localStorage.setItem("lastresultslist", JSON.stringify([]));
}
if (!localStorage.getItem("isSecondModeOn")) {
	localStorage.setItem("isSecondModeOn", true);
}

if (!localStorage.getItem("topresultslist")) {
	localStorage.setItem("topresultslist", JSON.stringify([]));
}
if (localStorage.getItem("isSecondModeOn") == "true") {
	metricList = ["", "с.", "%", "н/с.", "сим."];
} else {
	metricList = ["", "мин.", "%", "н/мин.", "сим."];
}

switch (localStorage.getItem("setlanguage")) {
	case "java":
		resultList.lenguage = "Java";
		break;
	case "cpp":
		resultList.lenguage = "C++";
		break;
	case "ch":
		resultList.lenguage = "C#";
		break;
	case "c":
		resultList.lenguage = "C";
		break;
	case "python":
		resultList.lenguage = "Python";
		break;
	case "css":
		resultList.lenguage = "CSS";
		break;
	case "js":
		resultList.lenguage = "JavaScript";
		break;
	case "html":
		resultList.lenguage = "HTML";
		break;
}

function generateList() {
	textArray = [];
	console.log(length);
	validCommands = Array.from(commands);
	for (let i = 0; i < length; i++) {
		textArray.push(validCommands.splice(Math.random() * (validCommands.length - 1), 1).join());
	}
	text = textArray.join().replaceAll(",", "ㅤ");
	// text = text.replaceAll(",", "ㅤ");

	showText(text);
}
function showText() {
	textField.textContent = text.slice(1);
	textFieldFirstLetter.textContent = text[0];
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
	// if (document.getElementById("shift-r").classList[1]) {
	// 	document.getElementById("shift-r").classList.remove("active");
	// 	document.getElementById("shift-l").classList.remove("active");
	// }
}

function keydown(keypress) {
	if (testIsWork) {
		quantityAnswer++;
		quantityAnswerPerSecond++;
	}
	isCapsLockOn = keypress.getModifierState("CapsLock");
	if (testIsWork) {
		if (keypress.key.replace(" ", "space") == activeKey) {
			correctAnswer();
		} else {
			unCorrectAnswer(keypress.key);
		}
	}
	if ((keypress.key == "Enter" || keypress.key == " ") && modalIsOpen) {
		closeModal();
	} else if (keypress.key == "Enter" && !testIsWork && !enterIsPress && !isLockOn) {
		startTest();
	}
	combineCapslockWithShift(activeKey, keypress.key);
}

function correctAnswer() {
	quantityСorrectAnswer++;
	quantityСorrectAnswerPerSecond++;
	if (document.getElementById(activeKey)) document.getElementById(activeKey).classList.remove("active");
	else {
		keysSizeOne.forEach((key) => {
			if (key.getAttribute("data-value") == activeKey) {
				key.classList.remove("active");
			}
			document.getElementById("shift-r").classList.remove("active");
			document.getElementById("shift-l").classList.remove("active");
		});
		keysSizeAuto.forEach((key) => {
			if (key.getAttribute("data-value") == activeKey) {
				key.classList.remove("active");
			}
			document.getElementById("shift-r").classList.remove("active");
			document.getElementById("shift-l").classList.remove("active");
		});
	}
	text = text.slice(1);
	if (text == "") showWinAnimation();
	activeKey = "";

	showText();
}
function unCorrectAnswer(key) {
	quantityMistakeAnswer++;
	key = key.replace(" ", "space").replace(`\\`, "sl-ob").replace("Enter", "enter");
	if (document.getElementById("shift-r").classList[1] != "active") {
		switch (key) {
			case "Shift":
				key = "shift-r";
				unCorrectAnswer("shift-l");
				break;
			case "Alt":
				key = "alt-r";
				unCorrectAnswer("alt-l");
				break;
			case "Control":
				key = "ctrl-r";
				unCorrectAnswer("ctrl-l");
				break;
			case "PageUp":
				key = "pgup";
				break;
			case "PageDown":
				key = "pgdn";
				break;
			case "Home":
				key = "home";
				break;
			case "End":
				key = "end";
				break;
			case "Escape":
				key = "esc";
				break;
			case "Tab":
				key = "tab";
				break;
			case "Backspace":
				key = "bcsp";
				break;
			case "Tab":
				key = "tab";
				break;
		}
	}
	keysSizeOne.forEach((elem) => {
		if (elem.getAttribute("data-value") == key) {
			elem.classList.add("hint");
			setTimeout(() => {
				elem.classList.remove("hint");
			}, 300);
		}
	});
	keysSizeAuto.forEach((elem) => {
		if (elem.getAttribute("data-value") == key) {
			elem.classList.add("hint");
			setTimeout(() => {
				elem.classList.remove("hint");
			}, 300);
		}
	});
	if (document.getElementById(key)) {
		document.getElementById(key).classList.add("hint");
		setTimeout(() => {
			document.getElementById(key).classList.remove("hint");
		}, 300);
	}
}

function showWinAnimation() {
	endTime = new Date();
	resultCounting();
	description.style = "display:block;";
	if (checkBoxAnimation.checked) {
		let j = 0;
		rows.forEach((row) => {
			setTimeout(() => {
				for (let i = 0; i < row.children.length; i++) {
					setTimeout(() => {
						row.children[i].style = `border: solid 0.15vw hsl(${
							i * 10
						}, 100%, 50%);box-shadow: 0 0 0.6vw hsl(${i * 10}, 100%, 50%);`;
						setTimeout(() => {
							row.children[i].style =
								"border: solid 0.15vw $keyboard-border;box-shadow: 0 0 0.6vw $keyboard-border;";
						}, 400);
					}, i * 100);
				}
			}, j * 200);
			j++;
		});
	}
	testIsWork = false;
}

function startTest() {
	lastResultsList = JSON.parse(localStorage.getItem("lastresultslist") || "[]");
	topResultsList = JSON.parse(localStorage.getItem("topresultslist") || "[]");
	secondsNumber = 0;
	speedsList = [];
	mistakeList = [];
	secondsList = [];
	correctSpeedsList = [];
	startTime = new Date();
	quantityСorrectAnswerPerSecond = 0;
	quantityAnswerPerSecond = 0;
	quantityСorrectAnswer = 0;
	quantityAnswer = 0;
	quantityMistakeAnswer = 0;
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

function combineCapslockWithShift(key, pressKey) {
	if (!key) return;
	if (isCapsLockOn) {
		if (
			key == key.toUpperCase() &&
			key == key.toLowerCase() &&
			!+key &&
			key != "space" &&
			key != key.getAttribute("id")
		) {
			document.getElementById("shift-r").classList.add("active");
			document.getElementById("shift-l").classList.add("active");
		} else if (key != key.toUpperCase() && key == key.toLowerCase() && key != "space") {
			document.getElementById("shift-r").classList.add("active");
			document.getElementById("shift-l").classList.add("active");
		} else {
			document.getElementById("shift-r").classList.remove("active");
			document.getElementById("shift-l").classList.remove("active");
		}
		if (key == key.id) {
			document.getElementById("shift-r").classList.remove("active");
			document.getElementById("shift-l").classList.remove("active");
		}
		if (key == key.toUpperCase() && key == key.toLowerCase()) {
			document.getElementById("shift-r").classList.remove("active");
			document.getElementById("shift-l").classList.remove("active");
		}
	} else {
		if (key != key.toUpperCase() && key == key.toLowerCase()) {
			document.getElementById("shift-r").classList.remove("active");
			document.getElementById("shift-l").classList.remove("active");
		}
		if (key == key.toUpperCase() && key != key.toLowerCase()) {
			document.getElementById("shift-r").classList.add("active");
			document.getElementById("shift-l").classList.add("active");
		}
	}
	if (!key) {
		document.getElementById("shift-r").classList.remove("active");
		document.getElementById("shift-l").classList.remove("active");
	}
}

function resultCounting() {
	if (localStorage.getItem("isSecondModeOn") == "true") {
		checkBoxItemOne.style.opacity = "1";
		checkBoxItemTwo.style.opacity = "";
		modeOne();
	} else {
		checkBoxItemOne.style.opacity = "";
		checkBoxItemTwo.style.opacity = "1";
		modeTwo();
	}
	if (localStorage.getItem("isChartVisible") == "true") {
		checkBoxModeOne.style.opacity = "1";
		checkBoxModeTwo.style.opacity = "";
		visibleModeOne();
	} else {
		checkBoxModeOne.style.opacity = "";
		checkBoxModeTwo.style.opacity = "1";
		visibleModeTwo();
	}
	accuracy = (quantityСorrectAnswer / quantityAnswer) * 100;
	spentTime = (endTime - startTime) / 1000 - 3;
	spentTime = Math.round(spentTime * 100) / 100;
	secondsNumber++;
	secondsList.push(secondsNumber);
	mistakeList.push(quantityAnswerPerSecond - quantityСorrectAnswerPerSecond);
	speedsList.push(quantityAnswerPerSecond);
	correctSpeedsList.push(quantityСorrectAnswerPerSecond);
	quantityСorrectAnswerPerSecond = 0;
	quantityAnswerPerSecond = 0;
	resultList.time = spentTime;
	resultList.accuracy = Math.round((quantityСorrectAnswer / quantityAnswer) * 100);
	resultList.speed = Math.round((quantityСorrectAnswer / spentTime) * 100) / 100;
	resultList.length = quantityСorrectAnswer;

	if (localStorage.getItem("isSecondModeOn") == "true") {
		resultFirst.textContent = `Время: ${spentTime} с.
Точность: ${Math.round(accuracy)} %
Средняя скорость: ${Math.round((quantityСorrectAnswer / spentTime) * 100) / 100} н/c.`;
	} else {
		resultFirst.textContent = `Время: ${Math.round((spentTime / 6) * 100) / 1000} мин.
Точность: ${Math.round(accuracy)} %
Средняя скорость: ${(Math.round((quantityСorrectAnswer / spentTime) * 100) * 60) / 100} н/мин.`;
	}
	resultSecond.textContent = `Количество попаданий: ${quantityСorrectAnswer}
Количество ошибок: ${quantityMistakeAnswer}
Количество нажатий: ${quantityAnswer}`;
	openModal();

	topResultsList.push(resultList);
	lastResultsList.push(resultList);
	topResultsList = sortArray(topResultsList);

	if (lastResultsList.length > 5) {
		lastResultsList.shift();
	}
	if (topResultsList.length > 3) {
		topResultsList.pop();
	}
	console.log(topResultsList);
	lastResultsList = JSON.stringify(lastResultsList);
	localStorage.setItem("lastresultslist", lastResultsList);
	localStorage.setItem("topresultslist", JSON.stringify(topResultsList));

	if (localStorage.getItem("isSecondModeOn") == "false") {
		modalTime.forEach((element) => {
			element.textContent = Math.round((parseFloat(element.textContent) / 6) * 100) / 1000 + " мин.";
		});
		modalSpeed.forEach((element) => {
			element.textContent = (Math.round(parseFloat(element.textContent) * 100) * 60) / 100 + " н/мин.";
		});
	} else {
		modalTime.forEach((element) => {
			element.textContent;
		});
		modalSpeed.forEach((element) => {
			element.textContent;
		});
	}
	fillLastTable();
}

setInterval(() => {
	if (testIsWork) {
		secondsNumber++;
		secondsList.push(secondsNumber);
		speedsList.push(quantityAnswerPerSecond);
		correctSpeedsList.push(quantityСorrectAnswerPerSecond);
		mistakeList.push(quantityAnswerPerSecond - quantityСorrectAnswerPerSecond);
		quantityСorrectAnswerPerSecond = 0;
		quantityAnswerPerSecond = 0;
	}
}, 1000);

function showChart() {
	chart = new Chart(chartCvs, {
		type: "line",
		data: {
			labels: secondsList.map((num) => num - 1),
			datasets: [
				{
					data: correctSpeedsList,
					label: "Попадания",
					borderColor: "green",
					backgroundColor: "green",
					fill: false,
					tension: 0.4,
				},
				{
					data: speedsList,
					label: "Нажатия",
					borderColor: "royalblue",
					backgroundColor: "royalblue",
					fill: false,
					tension: 0.4,
				},
				{
					data: mistakeList,
					label: "Ошибки",
					borderColor: "red",
					backgroundColor: "red",
					fill: false,
					tension: 0.4,
				},
			],
		},

		options: {
			scales: {
				x: {
					title: {
						display: true,
						align: "start",
						text: "Время (c)",
						font: { size: 14 },
					},
				},
			},
			elements: {
				point: {
					radius: 4,
					hoverRadius: 5,
					hoverBorderWidth: 2,
				},
				line: {
					hoverBorderWidth: 2,
				},
			},
			plugins: {
				legend: { display: "false", position: "bottom" },
			},
			responsive: true,
			interaction: {
				mode: "index",
				intersect: false,
			},
			title: {
				display: true,
				text: "World population per region (in millions)",
			},
		},
	});
	// setTimeout(() => {
	// 	chart.destroy();
	// }, 4000);
}

function closeModal() {
	if (modalIsOpen) {
		moreInfo.style.opacity = "0";
		isLockOn = false;
		modalIsOpen = false;

		setTimeout(() => {
			if (chart) {
				chart.destroy();
			}
			moreInfo.style.display = "none";
		}, 2000);
		modal.style = "";
	}
}
function openModal() {
	isLockOn = true;
	moreInfoButton.style = "";
	moreInfoButton.style.display = "block";
	if (checkBoxAnimation.checked) {
		setTimeout(() => {
			modal.style = "	top: 10.5vh;";
		}, 1500);
	} else {
		modal.style = "	top: 10.5vh;";
	}
	if (checkBoxAnimation.checked) {
		setTimeout(() => {
			modalIsOpen = true;
			showChart();
		}, 1700);
	} else {
		setTimeout(() => {
			modalIsOpen = true;
			showChart();
		}, 200);
	}
}

function showMoreInfo() {
	moreInfo.style.display = "flex";
	maxSpeed = [...correctSpeedsList].sort()[correctSpeedsList.length - 1];
	modal.style.height = "77vh";
	resultFirst.style.opacity = "0";
	resultSecond.style.opacity = "0";
	moreInfoButton.style.opacity = "0";
	setTimeout(() => {
		resultFirst.style.opacity = "1";
		resultSecond.style.opacity = "1";
		moreInfoButton.style.display = "none";
		if (localStorage.getItem("isSecondModeOn") == "true") {
			resultFirst.textContent =
				resultFirst.textContent +
				`
Максимальная скорость: ${maxSpeed} н/с.`;
		} else {
			resultFirst.textContent =
				resultFirst.textContent +
				`
Максимальная скорость: ${maxSpeed * 60} н/мин.`;
		}

		moreInfo.style.opacity = "1";
	}, 400);
}
function modeOne() {
	table.style.opacity = 0;
	setTimeout(() => {
		fillLastTable();
		table.style.opacity = 1;
		modalTime.forEach((element) => {
			element.textContent;
			modalSpeed.forEach((element) => {
				element.textContent;
			});
		});
	}, 500);
	if (localStorage.getItem("isSecondModeOn") == "false") {
		localStorage.setItem("isSecondModeOn", true);
		metricList = ["", "с.", "%", "н/с.", "сим."];
		checkBoxItemTwo.style.opacity = "";
		checkBoxItemOne.style.opacity = "1";
		resultFirst.style.opacity = "0";
		resultSecond.style.opacity = "0";
		setTimeout(() => {
			resultFirst.style.opacity = "";
			resultSecond.style.opacity = "";
			resultFirst.textContent = `Время: ${spentTime} c.
Точность: ${Math.round(accuracy)} %
Средняя скорость: ${Math.round((quantityСorrectAnswer / spentTime) * 100) / 100} н/c.
Максимальная скорость: ${maxSpeed} н/c.`;
		}, 400);
	}
}
function modeTwo() {
	table.style.opacity = 0;
	setTimeout(() => {
		fillLastTable();
		table.style.opacity = 1;
		modalTime.forEach((element) => {
			console.log(parseFloat(element.textContent));
			if (parseFloat(element.textContent)) {
				element.textContent = Math.round((parseFloat(element.textContent) / 6) * 100) / 1000 + " мин.";
			}
		});

		modalSpeed.forEach((element) => {
			if (parseFloat(element.textContent)) {
				element.textContent = (Math.round(parseFloat(element.textContent) * 100) * 60) / 100 + " н/мин.";
			}
		});
	}, 500);

	if (localStorage.getItem("isSecondModeOn") == "true") {
		metricList = ["", "мин.", "%", "н/мин.", "сим."];
		localStorage.setItem("isSecondModeOn", false);
		checkBoxItemOne.style.opacity = "";
		checkBoxItemTwo.style.opacity = "1";
		resultFirst.style.opacity = "0";
		resultSecond.style.opacity = "0";
		setTimeout(() => {
			resultFirst.style.opacity = "";
			resultSecond.style.opacity = "";
			resultFirst.textContent = `Время: ${Math.round((spentTime / 6) * 100) / 1000} мин.
Точность: ${Math.round(accuracy)} %
Средняя скорость: ${(Math.round((quantityСorrectAnswer / spentTime) * 100) * 60) / 100} н/мин.
Максимальная скорость: ${maxSpeed * 60} н/мин.`;
		}, 400);
	}
}
function visibleModeOne() {
	localStorage.setItem("isChartVisible", true);
	checkBoxModeTwo.style.opacity = "";
	checkBoxModeOne.style.opacity = "1";
	pastResults.style.opacity = "0";
	chartCvs.style.display = "block";
	setTimeout(() => {
		pastResults.style.display = "none";
		chartCvs.style.opacity = "1";
	}, 500);
}
function setAnimationWork() {
	if (this.checked) {
		localStorage.setItem("animationOn", true);
	} else {
		localStorage.setItem("animationOn", false);
	}
}
function visibleModeTwo() {
	localStorage.setItem("isChartVisible", false);
	chartCvs.style.opacity = 0;
	pastResults.style.display = "block";
	setTimeout(() => {
		chartCvs.style.display = "none";
		pastResults.style.opacity = "1";
	}, 500);
	checkBoxModeTwo.style.opacity = "1";
	checkBoxModeOne.style.opacity = "";
}

function fillLastTable() {
	let countRow = 4;
	let elementContent;
	lastResultsList = JSON.parse(localStorage.getItem("lastresultslist"));
	tableRows.forEach((row) => {
		let countElement = 0;
		Array.from(row.children).forEach((element) => {
			elementContent = lastResultsList[countRow];
			console.log(lastResultsList);
			if (elementContent) {
				console.log(Object.values(elementContent)[countElement]);
				if (Object.values(elementContent)[countElement]) {
					element.textContent = Object.values(elementContent)[countElement] + " " + metricList[countElement];
					countElement++;
				}
			} else {
				element.textContent = "";
			}
		});
		countRow--;
	});
	countRow = 0;
	elementContent;
	topResultsList = JSON.parse(localStorage.getItem("topresultslist"));
	console.log(topResultsList);
	tableRowsTop.forEach((row) => {
		let countElement = 0;
		Array.from(row.children).forEach((element) => {
			elementContent = topResultsList[countRow];

			if (elementContent) {
				element.style.color = "";
				if (
					elementContent["speed"] * elementContent["accuracy"] * elementContent["time"] ==
					resultList["speed"] * resultList["accuracy"] * resultList["time"]
				) {
					element.style.color = "green";
				}
				element.textContent = Object.values(elementContent)[countElement] + " " + metricList[countElement];
				if (countElement == 0) {
					element.textContent = countRow + 1 + ". " + element.textContent;
				}
			} else {
				element.textContent = "";
			}
			countElement++;
		});
		countRow++;
	});
}

function sortArray(array) {
	return array.sort((elementOne, elementTwo) => {
		let firstResult = elementOne["speed"] * elementOne["accuracy"];
		let secondResult = elementTwo["speed"] * elementTwo["accuracy"];
		return firstResult > secondResult ? -1 : firstResult < secondResult ? 1 : 0;
	});
}

function setLength() {
	localStorage.setItem("length", range.value);
	console.log(range.value);
	range.value = localStorage.getItem("length");
	length = +localStorage.getItem("length");
	rangeLabel.textContent = length;
}
function resetResult() {
	localStorage.setItem("lastresultslist", JSON.stringify([]));
	localStorage.setItem("topresultslist", JSON.stringify([]));
	fillLastTable();
}
document.addEventListener("keydown", keydown);
button.addEventListener("click", closeModal);
resetResultButton.addEventListener("click", resetResult);
moreInfoButton.addEventListener("click", showMoreInfo);
Array.from(document.getElementsByTagName("section")).forEach((section) => {
	section.addEventListener("click", closeModal);
});
document.getElementsByTagName("header")[0].addEventListener("click", closeModal);
checkBoxItemOne.addEventListener("click", modeOne);
checkBoxItemTwo.addEventListener("click", modeTwo);
checkBoxAnimation.addEventListener("change", setAnimationWork);
checkBoxModeOne.addEventListener("click", visibleModeOne);
checkBoxModeTwo.addEventListener("click", visibleModeTwo);
range.addEventListener("change", setLength);
range.addEventListener("mousemove", setLength);
