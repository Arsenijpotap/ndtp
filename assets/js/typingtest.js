`use strict`;

import commandList from './commandlist.js';
let textField = document.getElementById('textfiield');
let textFieldFirstLetter = document.getElementById('textfiield-active');
let lenguage = localStorage.getItem('setlanguage');
let keysSizeOne = Array.from(document.getElementsByClassName('keyboard__key_size-one'));
let keysSizeAuto = Array.from(document.getElementsByClassName('keyboard__key_size-auto'));
let isCapsLockOn;
let commands = commandList[lenguage];
let validCommands;
let textArray = [];
let length = 1;
let text;
let checkBoxItemOne = document.getElementsByClassName('modal__checkbox')[0];
let checkBoxItemTwo = document.getElementsByClassName('modal__checkbox')[1];
let isLockOn = false;
let resultFirst = document.getElementsByClassName('modal__results')[0];
let resultSecond = document.getElementsByClassName('modal__results')[1];
let moreInfoButton = document.getElementsByClassName('modal__link')[0];
let chart;
let modalIsOpen = false;
let modal = document.getElementsByClassName('modal')[0];
let secondsList = [];
let speedsList = [];
let mistakeList = [];
let correctSpeedsList = [];
let secondsNumber;
let isLearningModeOn = false;
let quantityСorrectAnswer = 0;
let quantityAnswer = 0;
let quantityMistakeAnswer = 0;
let quantityMistakeAnswerPerSecond = 0;
let quantityСorrectAnswerPerSecond = 0;
let quantityAnswerPerSecond = 0;
let startTime;
let endTime;
let activeKey;
var testIsWork = false;
let enterIsPress = false;
let button = document.getElementsByClassName('modal__button')[0];
const chartCvs = document.getElementById('modalchart');
const chartCtx = chartCvs.getContext('2d');
let description = document.getElementById('description');
let rows = Array.from(document.getElementsByClassName('keyboard__row'));
function generateList() {
	textArray = [];
	validCommands = [...commands];
	for (let i = 0; i < length; i++) {
		textArray.push(validCommands.splice(Math.random() * (validCommands.length - 1), 1).join());
	}
	text = textArray.join().replaceAll(',', 'ㅤ');
	// text = text.replaceAll(",", "ㅤ");

	showText(text);
}
function showText() {
	textField.textContent = text.slice(1);
	textFieldFirstLetter.textContent = text[0];
	if (text[0]) {
		activeKey = text[0].replace('ㅤ', 'space');
	}

	showActiveKey(activeKey);
}

function showActiveKey(key) {
	if (document.getElementById(key)) {
		document.getElementById(key).classList.add('active');
	} else {
		keysSizeOne.forEach((key) => {
			if (key.getAttribute('data-value') == activeKey) {
				key.classList.add('active');
				document.getElementById('shift-r').classList.add('active');
				document.getElementById('shift-l').classList.add('active');
			}
		});
		keysSizeAuto.forEach((key) => {
			if (key.getAttribute('data-value') == activeKey) {
				key.classList.add('active');
				document.getElementById('shift-r').classList.add('active');
				document.getElementById('shift-l').classList.add('active');
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
	isCapsLockOn = keypress.getModifierState('CapsLock');
	if (testIsWork) {
		if (keypress.key.replace(' ', 'space') == activeKey) {
			correctAnswer();
		} else {
			unCorrectAnswer(keypress.key);
		}
	}
	if ((keypress.key == 'Enter' || keypress.key == ' ') && modalIsOpen) {
		closeModal();
	} else if (keypress.key == 'Enter' && !testIsWork && !enterIsPress && !isLockOn) {
		startTest();
	}
	combineCapslockWithShift(activeKey, keypress.key);
}

function correctAnswer() {
	quantityСorrectAnswer++;
	quantityСorrectAnswerPerSecond++;
	if (document.getElementById(activeKey)) document.getElementById(activeKey).classList.remove('active');
	else {
		keysSizeOne.forEach((key) => {
			if (key.getAttribute('data-value') == activeKey) {
				key.classList.remove('active');
			}
			document.getElementById('shift-r').classList.remove('active');
			document.getElementById('shift-l').classList.remove('active');
		});
		keysSizeAuto.forEach((key) => {
			if (key.getAttribute('data-value') == activeKey) {
				key.classList.remove('active');
			}
			document.getElementById('shift-r').classList.remove('active');
			document.getElementById('shift-l').classList.remove('active');
		});
	}
	text = text.slice(1);
	if (text == '') showWinAnimation();
	activeKey = '';

	showText();
}
function unCorrectAnswer(key) {
	quantityMistakeAnswer++;
	quantityMistakeAnswerPerSecond++;
	key = key.replace(' ', 'space').replace(`\\`, 'sl-ob').replace('Enter', 'enter');
	if (document.getElementById('shift-r').classList[1] != 'active') {
		switch (key) {
			case 'Shift':
				key = 'shift-r';
				unCorrectAnswer('shift-l');
				break;
			case 'Alt':
				key = 'alt-r';
				unCorrectAnswer('alt-l');
				break;
			case 'Control':
				key = 'ctrl-r';
				unCorrectAnswer('ctrl-l');
				break;
			case 'PageUp':
				key = 'pgup';
				break;
			case 'PageDown':
				key = 'pgdn';
				break;
			case 'Home':
				key = 'home';
				break;
			case 'End':
				key = 'end';
				break;
			case 'Escape':
				key = 'esc';
				break;
			case 'Tab':
				key = 'tab';
				break;
			case 'Backspace':
				key = 'bcsp';
				break;
			case 'Tab':
				key = 'tab';
				break;
		}
	}
	keysSizeOne.forEach((elem) => {
		if (elem.getAttribute('data-value') == key) {
			elem.classList.add('hint');
			setTimeout(() => {
				elem.classList.remove('hint');
			}, 300);
		}
	});
	keysSizeAuto.forEach((elem) => {
		if (elem.getAttribute('data-value') == key) {
			elem.classList.add('hint');
			setTimeout(() => {
				elem.classList.remove('hint');
			}, 300);
		}
	});
	if (document.getElementById(key)) {
		document.getElementById(key).classList.add('hint');
		setTimeout(() => {
			document.getElementById(key).classList.remove('hint');
		}, 300);
	}
}

function showWinAnimation() {
	endTime = new Date();
	resultCounting();
	description.style = 'display:block;';

	let j = 0;
	rows.forEach((row) => {
		setTimeout(() => {
			for (let i = 0; i < row.children.length; i++) {
				setTimeout(() => {
					row.children[i].style = `border: solid 0.15vw hsl(${i * 10}, 100%, 50%);box-shadow: 0 0 0.6vw hsl(${
						i * 10
					}, 100%, 50%);`;
					setTimeout(() => {
						row.children[i].style =
							'border: solid 0.15vw $keyboard-border;box-shadow: 0 0 0.6vw $keyboard-border;';
					}, 400);
				}, i * 100);
			}
		}, j * 200);
		j++;
	});
	testIsWork = false;
}

function startTest() {
	secondsNumber = 0;
	speedsList = [];
	secondsList = [];
	correctSpeedsList = [];
	startTime = new Date();
	quantityСorrectAnswerPerSecond = 0;
	quantityAnswerPerSecond = 0;
	quantityСorrectAnswer = 0;
	quantityAnswer = 0;
	quantityMistakeAnswer = 0;
	quantityMistakeAnswerPerSecond = 0;
	enterIsPress = true;
	description.textContent = 'ㅤㅤㅤㅤㅤ3';

	setTimeout(() => {
		description.textContent = 'ㅤㅤㅤㅤㅤ2';
	}, 1000);
	setTimeout(() => {
		description.textContent = 'ㅤㅤㅤㅤㅤ1';
	}, 2000);
	setTimeout(() => {
		testIsWork = true;
		enterIsPress = false;

		description.textContent = 'Нажмите Enter чтобы начать';
		description.style = 'display:none;';
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
			key != 'space' &&
			key != key.getAttribute('id')
		) {
			document.getElementById('shift-r').classList.add('active');
			document.getElementById('shift-l').classList.add('active');
		} else if (key != key.toUpperCase() && key == key.toLowerCase() && key != 'space') {
			document.getElementById('shift-r').classList.add('active');
			document.getElementById('shift-l').classList.add('active');
		} else {
			document.getElementById('shift-r').classList.remove('active');
			document.getElementById('shift-l').classList.remove('active');
		}
		if (key == key.id) {
			document.getElementById('shift-r').classList.remove('active');
			document.getElementById('shift-l').classList.remove('active');
		}
		if (key == key.toUpperCase() && key == key.toLowerCase()) {
			document.getElementById('shift-r').classList.remove('active');
			document.getElementById('shift-l').classList.remove('active');
		}
	} else {
		if (key != key.toUpperCase() && key == key.toLowerCase()) {
			document.getElementById('shift-r').classList.remove('active');
			document.getElementById('shift-l').classList.remove('active');
		}
		if (key == key.toUpperCase() && key != key.toLowerCase()) {
			document.getElementById('shift-r').classList.add('active');
			document.getElementById('shift-l').classList.add('active');
		}
	}
	if (!key) {
		document.getElementById('shift-r').classList.remove('active');
		document.getElementById('shift-l').classList.remove('active');
	}
}

function resultCounting() {
	let accuracy = (quantityСorrectAnswer / quantityAnswer) * 100;
	let spentTime = (endTime - startTime) / 1000 - 3;
	spentTime = Math.round(spentTime * 100) / 100;
	secondsNumber++;
	secondsList.push(secondsNumber);
	mistakeList.push(quantityMistakeAnswerPerSecond);
	speedsList.push(quantityAnswerPerSecond);
	correctSpeedsList.push(quantityСorrectAnswerPerSecond);
	quantityСorrectAnswerPerSecond = 0;
	quantityAnswerPerSecond = 0;
	quantityMistakeAnswerPerSecond = 0;
	resultFirst.textContent = `Время: ${spentTime} с.
Точность: ${Math.round(accuracy)} %
Средняя скорость: ${Math.round((quantityСorrectAnswer / spentTime) * 100) / 100} н/c`;
	resultSecond.textContent = `Количество попаданий: ${quantityСorrectAnswer}
Количество ошибок: ${quantityMistakeAnswer}
Количество нажатий: ${quantityAnswer}`;
	openModal();
}
document.addEventListener('keydown', keydown);

setInterval(() => {
	if (testIsWork) {
		secondsNumber++;
		secondsList.push(secondsNumber);
		mistakeList.push(quantityMistakeAnswerPerSecond);
		speedsList.push(quantityAnswerPerSecond);
		correctSpeedsList.push(quantityСorrectAnswerPerSecond);
		quantityСorrectAnswerPerSecond = 0;
		quantityAnswerPerSecond = 0;
		quantityMistakeAnswerPerSecond = 0;
	}
}, 1000);

function showChart() {
	chart = new Chart(chartCvs, {
		type: 'line',
		data: {
			labels: secondsList.map((num) => num - 1),
			datasets: [
				{
					data: correctSpeedsList,
					label: 'Попадания',
					borderColor: 'green',
					backgroundColor: 'green',
					fill: false,
					tension: 0.4,
				},
				{
					data: speedsList,
					label: 'Нажатия',
					borderColor: 'royalblue',
					backgroundColor: 'royalblue',
					fill: false,
					tension: 0.4,
				},
				{
					data: mistakeList,
					label: 'Ошибки',
					borderColor: 'red',
					backgroundColor: 'red',
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
						align: 'start',
						text: 'Время (c)',
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
				legend: { display: 'false', position: 'bottom' },
			},
			responsive: true,
			interaction: {
				mode: 'index',
				intersect: false,
			},
			title: {
				display: true,
				text: 'World population per region (in millions)',
			},
		},
	});
	// setTimeout(() => {
	// 	chart.destroy();
	// }, 4000);
}
function closeModal() {
	if (modalIsOpen) {
		isLockOn = false;
		modalIsOpen = false;

		setTimeout(() => {
			if (chart) {
				chart.destroy();
			}
		}, 2000);
		modal.style = '';
	}
}
function openModal() {
	isLockOn = true;
	moreInfoButton.style = '';
	moreInfoButton.style.display = 'block';

	setTimeout(() => {
		modal.style = '	top: 10.5vh;';
	}, 1500);

	setTimeout(() => {
		modalIsOpen = true;
		showChart();
	}, 1700);
}

function showMoreInfo() {
	let maxSpeed = correctSpeedsList.sort()[correctSpeedsList.length - 1];
	modal.style.height = '45vw';
	resultFirst.style.opacity = '0';
	resultSecond.style.opacity = '0';
	moreInfoButton.style.opacity = '0';
	setTimeout(() => {
		resultFirst.style.opacity = '1';
		resultSecond.style.opacity = '1';
		moreInfoButton.style.display = 'none';
		resultFirst.textContent =
			resultFirst.textContent +
			`
Максимальная скорость: ${maxSpeed} н/с`;
		resultSecond.textContent =
			resultSecond.textContent +
			`
			`;
	}, 400);
}

// showChart();
button.addEventListener('click', closeModal);
moreInfoButton.addEventListener('click', showMoreInfo);
Array.from(document.getElementsByTagName('section')).forEach((section) => {
	section.addEventListener('click', closeModal);
});
document.getElementsByTagName('header')[0].addEventListener('click', closeModal);
