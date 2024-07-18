`use strict`;
import commandlist from "./commandlist.js";
let button = document.getElementsByClassName("modal__button")[0];
let chartCvs = document.getElementById("modalchart");
let checkBoxAnimation = document.getElementById("header-checkbox-first");
let checkBoxShowPrintedText = document.getElementById("header-checkbox-second");
let checkBoxShowPrintedWrong = document.getElementById("header-checkbox-third");
let checkBoxAdvanceMode = document.getElementById("header-checkbox-fourth");
let printedTextTexfiled = document.getElementById("textfield-printed");
let printedWrongTexfiled = document.getElementById("textfield-wrong");
let isShowAdvanceModeOn = true;
let checkBoxItemOne = document.getElementsByClassName("modal__checkbox")[2];
let checkBoxItemTwo = document.getElementsByClassName("modal__checkbox")[3];
let checkBoxModeOne = document.getElementsByClassName("modal__checkbox")[0];
let checkBoxModeTwo = document.getElementsByClassName("modal__checkbox")[1];
let correctSpeedsList = [];
let printedText = "";
let printedWrong = "";
let isErrorModeActive = !true;
let description = document.getElementById("description");
let enterIsPress = false;
let isCapsLockOn;
let isLearningModeOn = false;
let isLockOn = false;
let keysSizeAuto = Array.from(document.getElementsByClassName("keyboard__key_size-auto"));
let keysSizeOne = Array.from(document.getElementsByClassName("keyboard__key_size-one"));
let lastResultsList = localStorage.getItem("lastresultslist") || JSON.stringify([]);
let language = localStorage.getItem("setlanguage");
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
let range = document.getElementById("range-first");
let rangeLabel = document.getElementById("rangelabel-first");
let rangeOpacity = document.getElementById("range-second");
console.log(rangeOpacity);
let rangeLabelOpacity = document.getElementById("rangelabel-second");
let printedTextOpacity;
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
let textFieldText = document.getElementById("textfield__text");
let topList = {};
let topResultsList = localStorage.getItem("topresultslist") || JSON.stringify([]);
let keys = {
	ru: [
		"й",
		"ц",
		"у",
		"к",
		"е",
		"н",
		"г",
		"ш",
		"щ",
		"з",
		"х",
		"ъ",
		"ф",
		"ы",
		"в",
		"а",
		"п",
		"р",
		"о",
		"л",
		"д",
		"ж",
		"э",
		"я",
		"ч",
		"с",
		"м",
		"и",
		"т",
		"ь",
		"б",
		"ю",
	],
	en: [
		"q",
		"w",
		"e",
		"r",
		"t",
		"y",
		"u",
		"i",
		"o",
		"p",
		"[",
		"]",
		"a",
		"s",
		"d",
		"f",
		"g",
		"h",
		"j",
		"k",
		"l",
		";",
		"'",
		"z",
		"x",
		"c",
		"v",
		"b",
		"n",
		"m",
		",",
		".",
	],
};
let validCommands,
	stringLength,
	text,
	maxSpeed,
	chart,
	secondsNumber,
	accuracy,
	startTime,
	spentTime,
	endTime,
	activeKey;
var testIsWork = false;
let commands = commandlist[language];
rangeOpacity.style = "margin-top: 0.8rem;";
if (!localStorage.getItem("stringLength")) {
	localStorage.setItem("stringLength", "7");
	stringLength = 7;
}
printedTextTexfiled.classList.add("hidden");
if (!localStorage.getItem("printedTextOpacity")) {
	localStorage.setItem("printedTextOpacity", "60");
	printedTextOpacity = 60;
}
range.value = localStorage.getItem("stringLength");
stringLength = +localStorage.getItem("stringLength");
rangeLabel.textContent = stringLength;
rangeOpacity.value = localStorage.getItem("printedTextOpacity");
printedTextOpacity = +localStorage.getItem("printedTextOpacity");
rangeLabelOpacity.textContent = printedTextOpacity + "%";
printedTextTexfiled.style.opacity = 100 - rangeOpacity.value + "%";
printedWrongTexfiled.style.opacity = 100 - rangeOpacity.value + "%";
checkBoxAnimation.checked = Boolean(localStorage.getItem("animationOn") == "true");
checkBoxShowPrintedText.checked = Boolean(localStorage.getItem("showPrintedText") == "true");
checkBoxShowPrintedWrong.checked = Boolean(localStorage.getItem("showPrintedWrong") == "true");
checkBoxAdvanceMode.checked = Boolean(localStorage.getItem("isShowAdvanceModeOn") == "true");
if (checkBoxShowPrintedText.checked) {
	printedTextTexfiled.classList.remove("hidden");
} else {
	printedTextTexfiled.classList.add("hidden");
}
if (checkBoxShowPrintedWrong.checked) {
	isErrorModeActive = true;
} else {
	isErrorModeActive = false;
	document.getElementById("bcsp").classList.remove("active");
	printedWrongTexfiled.textContent = "";
}
if (checkBoxAdvanceMode.checked) {
	isShowAdvanceModeOn = true;
} else {
	isShowAdvanceModeOn = false;
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
		resultList.language = "Java";
		break;
	case "cpp":
		resultList.language = "C++";
		break;
	case "ch":
		resultList.language = "C#";
		break;
	case "c":
		resultList.language = "C";
		break;
	case "python":
		resultList.language = "Python";
		break;
	case "css":
		resultList.language = "CSS";
		break;
	case "js":
		resultList.language = "JavaScript";
		break;
	case "html":
		resultList.language = "HTML";
		break;
	case "php":
		resultList.language = "PHP";
		break;
	case "sql":
		resultList.language = "SQL";
		break;
}

function generateList() {
	textArray = [];
	validCommands = Array.from(commands);
	for (let i = 0; i < stringLength; i++) {
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
	combineCapslockWithShift(activeKey, activeKey);
	if (document.getElementById(key)) {
		document.getElementById(key).classList.add("active");
	} else {
		keysSizeOne.forEach((key) => {
			if (key.getAttribute("data-value") == activeKey) {
				key.classList.add("active");
				// document.getElementById("shift-r").classList.add("active");
				// document.getElementById("shift-l").classList.add("active");
			}
		});
		keysSizeAuto.forEach((key) => {
			if (key.getAttribute("data-value") == activeKey) {
				key.classList.add("active");
				// document.getElementById("shift-r").classList.add("active");
				// document.getElementById("shift-l").classList.add("active");
			}
		});
	}

	if (printedWrongTexfiled.textContent != "") {
		keysSizeAuto.forEach((key) => {
			if (key.id != "bcsp") key.classList.remove("active");
		});
		keysSizeOne.forEach((key) => {
			key.classList.remove("active");
		});
	}
	// if (document.getElementById("shift-r").classList[1]) {
	// 	document.getElementById("shift-r").classList.remove("active");
	// 	document.getElementById("shift-l").classList.remove("active");
	// }
}

function keydown(keypress) {
	console.log(13123, activeKey);
	isCapsLockOn = keypress.getModifierState("CapsLock");
	let copyObject = {};
	Object.keys(keypress).forEach((key) => {
		copyObject.key = keydown.key;
	});
	copyObject.key = replaceKey(keypress.key);
	keypress = copyObject;
	combineCapslockWithShift(activeKey, keypress.key);

	if (printedWrongTexfiled.textContent != "") {
		showActiveKey("bcsp");
	}
	if (
		(document.getElementById("shift-r").classList[1] && keypress.key == "Shift") ||
		(document.getElementById("shift-l").classList[1] && keypress.key == "Shift") ||
		keypress.key == "CapsLock"
	) {
		return;
	}
	if ((testIsWork && keypress.key != "Backspace") || (testIsWork && !isErrorModeActive)) {
		quantityAnswer++;
		quantityAnswerPerSecond++;
	}
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
}

function correctAnswer() {
	if (printedWrongTexfiled.textContent == "") {
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
		printedTextTexfiled.textContent += activeKey.replace("space", "ㅤ");
		text = text.slice(1);
		if (text == "") {
			showWinAnimation();
			document.getElementById("shift-r").classList.remove("active");
			document.getElementById("shift-l").classList.remove("active");
			isShowAdvanceModeOn = Boolean(localStorage.getItem("isShowAdvanceModeOn") == "true");
			printedTextTexfiled.textContent = "";
			printedWrongTexfiled.textContent = "";
		}
		activeKey = "";

		showText();
	} else {
		if (activeKey.length == 1 || activeKey == "space") {
			printedWrongTexfiled.textContent += activeKey.replace("space", "ㅤ");
		}
	}
}
function unCorrectAnswer(key) {
	console.log(key);
	let firstText = printedWrongTexfiled.textContent;
	if (isErrorModeActive) {
		if (key == "Backspace") {
			printedWrongTexfiled.textContent = printedWrongTexfiled.textContent.slice(0, -1);
		}
		console.log(key, 123456);
		if (key.length == 1) printedWrongTexfiled.textContent += key.replace(" ", "ㅤ");
		if (printedWrongTexfiled.textContent != "") {
			showActiveKey("bcsp");
		} else {
			document.getElementById("bcsp").classList.remove("active");
			showActiveKey(activeKey);
		}
	}
	if (isErrorModeActive && key != "Backspase") {
		quantityMistakeAnswer++;
		if (key == "Backspace" && firstText != "") {
			return;
		} else if (key == "Backspace" && firstText == "") {
			quantityAnswer++;
			quantityAnswerPerSecond++;
		}
	}
	key = key.replace(" ", "space").replace(`\\`, "sl-ob").replace("Enter", "enter");
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
	console.log(key);
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
	console.log(key);
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
	printedTextTexfiled.textContent = "";
	printedWrongTexfiled.textContent = "";
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
	description.textContent = "3";
	if (isShowAdvanceModeOn) {
		textFieldFirstLetter.style = "opacity:0.5;transition:0s";
		textField.style = "opacity:0.5;transition:0s";
		description.classList.add("active");
		generateList();
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
	}

	setTimeout(() => {
		description.textContent = "2";
	}, 1000);
	setTimeout(() => {
		description.textContent = "1";
	}, 2000);
	setTimeout(() => {
		if (!isShowAdvanceModeOn) {
			generateList();
		} else {
			showActiveKey(activeKey);
		}
		description.classList.remove("active");
		testIsWork = true;
		enterIsPress = false;
		textFieldFirstLetter.style = "opacity:1";
		textField.style = "opacity:1";

		description.textContent = "Нажмите Enter чтобы начать";
		description.style = "display:none;";
	}, 3000);
}

function combineCapslockWithShift(key, pressKey) {
	if (!key || key == " ") return;
	let register = getRegister(key);
	if (isCapsLockOn) {
		console.log(getRegister(key), isCapsLockOn);
		switch (register) {
			case "Спец":
				console.log(1);
				document.getElementById("shift-r").classList.add("active");
				document.getElementById("shift-l").classList.add("active");
				break;
			case "Нижний":
				console.log(2);
				document.getElementById("shift-r").classList.add("active");
				document.getElementById("shift-l").classList.add("active");
				break;
			case "Верхний":
				console.log(3);
				document.getElementById("shift-r").classList.remove("active");
				document.getElementById("shift-l").classList.remove("active");
				break;

			default:
				document.getElementById("shift-r").classList.remove("active");
				document.getElementById("shift-l").classList.remove("active");
				break;
		}
	} else {
		let register = getRegister(key);
		console.log(getRegister(key));
		switch (register) {
			case "Спец":
				document.getElementById("shift-r").classList.add("active");
				document.getElementById("shift-l").classList.add("active");
				break;
			case "Верхний":
				document.getElementById("shift-r").classList.add("active");
				document.getElementById("shift-l").classList.add("active");
				break;
			case "Нижний":
				document.getElementById("shift-r").classList.remove("active");
				document.getElementById("shift-l").classList.remove("active");
				break;

			default:
				document.getElementById("shift-r").classList.remove("active");
				document.getElementById("shift-l").classList.remove("active");
				break;
		}
		if (!key) {
			document.getElementById("shift-r").classList.remove("active");
			document.getElementById("shift-l").classList.remove("active");
		}
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
	maxSpeed = [...correctSpeedsList].sort()[correctSpeedsList.length - 1];

	postResult(
		language,
		Math.round(accuracy),
		spentTime,
		Math.round((quantityСorrectAnswer / spentTime) * 100) / 100,
		maxSpeed,
		quantityAnswer,
		quantityСorrectAnswer,
		quantityMistakeAnswer,
	);
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
Количество ошибок: ${quantityAnswer - quantityСorrectAnswer}
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
function setShowPrintedText() {
	if (this.checked) {
		localStorage.setItem("showPrintedText", true);
	} else {
		localStorage.setItem("showPrintedText", false);
	}
}
function setShowPrintedWrong() {
	if (this.checked) {
		localStorage.setItem("showPrintedWrong", true);
	} else {
		localStorage.setItem("showPrintedWrong", false);
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
			if (elementContent) {
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
	localStorage.setItem("stringLength", range.value);
	range.value = localStorage.getItem("stringLength");
	stringLength = +localStorage.getItem("stringLength");
	rangeLabel.textContent = stringLength;
	isShowAdvanceModeOn;
}
function setOpacity() {
	printedTextTexfiled.style.opacity = 100 - rangeOpacity.value + "%";
	printedWrongTexfiled.style.opacity = 100 - rangeOpacity.value + "%";
	localStorage.setItem("printedTextOpacity", rangeOpacity.value);
	rangeOpacity.value = localStorage.getItem("printedTextOpacity");
	rangeLabelOpacity.textContent = +localStorage.getItem("printedTextOpacity") + "%";
}
function setAdvanceMode() {
	if (testIsWork) {
		if (this.checked) {
			localStorage.setItem("isShowAdvanceModeOn", true);
		} else {
			localStorage.setItem("isShowAdvanceModeOn", false);
		}
	} else {
		if (this.checked) {
			isShowAdvanceModeOn = true;

			localStorage.setItem("isShowAdvanceModeOn", true);
		} else {
			isShowAdvanceModeOn = false;

			localStorage.setItem("isShowAdvanceModeOn", false);
		}
	}
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
checkBoxShowPrintedText.addEventListener("change", setShowPrintedText);
checkBoxShowPrintedWrong.addEventListener("change", setShowPrintedWrong);
checkBoxAdvanceMode.addEventListener("change", setAdvanceMode);
checkBoxShowPrintedText.addEventListener("change", () => {
	if (checkBoxShowPrintedText.checked) {
		printedTextTexfiled.classList.remove("hidden");
		// printedWrongTexfiled.style.opacity = "1";
	} else {
		printedTextTexfiled.classList.add("hidden");
		// printedWrongTexfiled.style.opacity = "0";
	}
});
checkBoxShowPrintedWrong.addEventListener("change", () => {
	if (checkBoxShowPrintedWrong.checked) {
		isErrorModeActive = true;
	} else {
		isErrorModeActive = false;
		document.getElementById("bcsp").classList.remove("active");
		printedWrongTexfiled.textContent = "";
		if (activeKey) showActiveKey(activeKey);
	}
});
checkBoxModeOne.addEventListener("click", visibleModeOne);
checkBoxModeTwo.addEventListener("click", visibleModeTwo);
range.addEventListener("change", setLength);
range.addEventListener("mousemove", setLength);
setLength();
rangeOpacity.addEventListener("change", setOpacity);
rangeOpacity.addEventListener("mousemove", setOpacity);
setOpacity();

function getRegister(sumbol) {
	if (
		sumbol == sumbol.toLowerCase() &&
		sumbol == sumbol.toUpperCase() &&
		sumbol != " " &&
		sumbol != "." &&
		sumbol != "/" &&
		sumbol != "[" &&
		sumbol != "]" &&
		sumbol != "=" &&
		sumbol != "-"
	) {
		return "Спец";
	} else if (sumbol != sumbol.toLowerCase() && sumbol == sumbol.toUpperCase()) {
		return "Верхний";
	} else if (sumbol == sumbol.toLowerCase() && sumbol != sumbol.toUpperCase()) {
		return "Нижний";
	}
}
function replaceKey(keyPr) {
	keys.ru.forEach((key, index) => {
		if (keyPr.length == 1)
			keyPr = keyPr.replace(key, keys.en[index]).replace(key.toUpperCase(), keys.en[index].toUpperCase());
	});
	return keyPr;
}
