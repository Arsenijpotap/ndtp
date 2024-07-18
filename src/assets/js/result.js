`use strict`;
let tabButtons = document.getElementsByClassName("result__mode-button");
let sections = document.getElementsByClassName("result");
let checkBoxItemOne = document.getElementsByClassName("more-info__checkbox")[0];
let checkBoxItemTwo = document.getElementsByClassName("more-info__checkbox")[1];
let times = Array.from(document.getElementsByClassName("time"));
let speeds = Array.from(document.getElementsByClassName("speed"));
let timesM = Array.from(document.getElementsByClassName("time-m"));
let speedsM = Array.from(document.getElementsByClassName("speed-m"));
let data = Array.from(document.getElementsByClassName("myResult__data"));
let rowActive = Array.from(document.getElementsByClassName("table-row-active"));
let row = Array.from(document.querySelectorAll(".allResult__table tbody tr"));
let userName;
if (document.getElementsByClassName("result__name")[0]) {
	userName = document.getElementsByClassName("result__name")[0].textContent;
}
console.log(userName);
let accuracySr = 0;
let resultModeResult = [];
Array.from(sections).forEach((el) => {
	el.style.opacity = "0";
	el.style.dispaly = "none";
});
Object.values(accuracyList).forEach((accuracy) => {
	accuracySr += accuracy;
});
accuracySr /= Object.values(accuracyList).length;
if (Object.values(minSpeed)[0]) {
	data[0].textContent = accuracySr.toString().slice(0, 2).replace(".", "") + "%";
	data[1].textContent =
		Object.values(maxSpeed).reduce((a, b) => {
			return a > b ? a : b;
		}) + " н/с";
	data[2].textContent =
		Math.round(
			(Object.values(sumResult).reduce((a, b) => {
				return a + b;
			}) *
				100) /
				Object.values(sumResult).length,
		) /
			100 +
		" н/с";
	data[3].textContent =
		Object.values(minSpeed).reduce((a, b) => {
			return a < b ? a : b;
		}) + " н/с";
	data[4].textContent = lengthTr;
	if (timeList[0]) {
		data[5].textContent =
			Math.round(
				timeList.reduce((a, b) => {
					return a + b;
				}),
			) + " с";
	}
	document.getElementById("myResult").style.opacity = "1";
	document.getElementById("myResult").style.dispaly = "block";
	tabButtons[0].style.opacity = "1";

	myResult.classList.remove("hidden");
	myResult.style.display = "block";
} else {
	document.getElementById("allResult").style.opacity = "1";
	tabButtons[1].style.opacity = "1";

	document.getElementById("allResult").style.dispaly = "block";
	myResult.innerHTML = "<p class='myResult__error'>Нет результатов или аккаунта</p>";
	myResult.classList.remove("hidden");
	myResult.classList.add("active");
	myResult.style.display = "none";
}

Array.from(tabButtons).forEach((button) => {
	button.addEventListener("click", () => {
		if (button.style.opacity != "1") {
			Array.from(tabButtons).forEach((el) => {
				el.style.opacity = "0.5";
			});
			let id = button.getAttribute("data-tab-name");
			let sectioanActive = document.getElementById(id);
			button.style.opacity = "1";
			Array.from(sections).forEach((el) => {
				el.style.opacity = "0";
				if (el != sectioanActive) {
					setTimeout(() => {
						el.style = "display:none;";
					}, 500);
				}
				sectioanActive.style = "dispaly:block;opacity:0;";

				setTimeout(() => {
					sectioanActive.style = "opacity:1;dispaly:block;";
				}, 500);
			});
		}
	});
});
if (document.getElementById("login")) {
	document.getElementById("login").addEventListener("click", () => {
		localStorage.setItem("reg", "login");
	});
	document.getElementById("register").addEventListener("click", () => {
		localStorage.setItem("reg", "register");
	});
}

if (localStorage.getItem("isSecondModeOn") == "true") {
	checkBoxItemTwo.style.opacity = "";
	checkBoxItemOne.style.opacity = "1";
	times.forEach((time) => {
		time.textContent = parseFloat(time.textContent) + " с";
	});
	speeds.forEach((speed) => {
		speed.textContent = parseFloat(speed.textContent) + "н/с";
	});
} else {
	checkBoxItemOne.style.opacity = "";
	checkBoxItemTwo.style.opacity = "1";
	times.forEach((time) => {
		time.textContent = Math.round((parseFloat(time.textContent) / 60) * 10000) / 10000 + " мин";
	});
	speeds.forEach((speed) => {
		speed.textContent = Math.round(parseFloat(speed.textContent) * 6000) / 100 + " н/мин";
	});
	timesM.forEach((time, index) => {
		time.textContent = Math.round((parseFloat(time.textContent) / 60) * 100) / 100 + " мин";
	});
	speedsM.forEach((speed, index) => {
		speed.textContent = Math.round(parseFloat(speed.textContent) * 6000) / 100 + " н/мин";
	});
	redSpeedList = redSpeedList.map((speed) => {
		speed *= 60;
		return speed;
	});
	speedList = speedList.map((speed) => {
		speed *= 60;
		return speed;
	});
	setTimeout(() => {
		chartSpeedActive.options.plugins = {
			legend: {
				display: false,
			},
			title: {
				display: true,
				text: "Скорость печати с течением времени (н/мин)",
				font: {
					size: 20,
				},
			},
		};
		bestChartActive.options.plugins = {
			legend: {
				display: true,
				position: "bottom",
			},
			title: {
				display: true,
				text: "Скорости по языкам (н/мин)",
				font: {
					size: 20,
				},
			},
		};
		chartSpeedActive.data.datasets = [
			{
				type: "line",
				label: "Скорость",
				data: redSpeedList,
				hoverOffset: 5,
			},
			{
				type: "bar",
				label: "Скорость",
				data: redSpeedList,
				hoverOffset: 5,
				backgroundColor: colorsBar,
				hoverBackgroundColor: activeColorsBar,
			},
		];
	}, 500);
	setTimeout(() => {
		bestChartActive.data.datasets = [
			{
				backgroundColor: Object.values(lanColorsCut),
				label: "Максимальная скорость",
				data: Object.values(maxSpeed).map((speed) => {
					return speed * 60;
				}),
				hoverOffset: 5,
				borderWidth: 0,
				clip: 1,
			},
			{
				backgroundColor: Array.from(Object.values(lanColorsCut)).map((color) => {
					return (color += "90");
				}),
				label: "Средняя скорость",
				data: Object.values(sumResult).map((speed) => {
					return speed * 60;
				}),
				hoverOffset: 5,
				borderWidth: 0,
				clip: 1,
			},
			{
				backgroundColor: Array.from(Object.values(lanColorsCut)).map((color) => {
					return (color += "50");
				}),
				label: "Минимальная скорость",
				data: Object.values(minSpeed).map((speed) => {
					return speed * 60;
				}),
				hoverOffset: 5,
				borderWidth: 0,
				clip: 1,
			},
		];
	}, 700);

	bestChartActive.update();
	chartSpeedActive.update();
}
function modeOne() {
	drawTableResults();
	if (localStorage.getItem("isSecondModeOn") == "false") {
		localStorage.setItem("isSecondModeOn", true);
		checkBoxItemTwo.style.opacity = "";
		checkBoxItemOne.style.opacity = "1";
		times.forEach((time, index) => {
			setTimeout(() => {
				Array.from(row[index].children).forEach((child) => {
					child.style.opacity = "0";
				});
			}, index * 60);
			setTimeout(() => {
				time.textContent = Math.round(parseFloat(time.textContent) * 6000) / 100 + " c";

				Array.from(row[index].children).forEach((child) => {
					child.style.opacity = "1";
				});
			}, 500 + index * 60);
		});
		speeds.forEach((speed, index) => {
			setTimeout(() => {
				speed.textContent = Math.round((parseFloat(speed.textContent) / 60) * 100) / 100 + " н/с";
			}, 500 + index * 60);
		});
		timesM.forEach((time, index) => {
			time.style.opacity = "0";
			setTimeout(() => {
				time.textContent = Math.round(parseFloat(time.textContent) * 6000) / 100 + " c";
				time.style.opacity = "1";
			}, 300);
		});
		speedsM.forEach((speed, index) => {
			speed.style.opacity = "0";
			setTimeout(() => {
				speed.textContent = Math.round((parseFloat(speed.textContent) / 60) * 100) / 100 + " н/с";

				speed.style.opacity = "1";
			}, 300);
		});
		redSpeedList = redSpeedList.map((speed) => {
			speed /= 60;
			return speed;
		});
		speedList = speedList.map((speed) => {
			speed /= 60;
			return speed;
		});
		bestChartActive.options.plugins = {
			legend: {
				display: true,
				position: "bottom",
			},
			title: {
				display: true,
				text: "Скорости по языкам (н/с)",
				font: {
					size: 20,
				},
			},
		};
		chartSpeedActive.options.plugins = {
			legend: {
				display: false,
			},
			title: {
				display: true,
				text: "Скорость печати с течением времени (н/с)",
				font: {
					size: 20,
				},
			},
		};
		chartSpeedActive.data.datasets = [
			{
				type: "line",
				label: "Скорость",
				data: redSpeedList,
				hoverOffset: 5,
			},
			{
				type: "bar",
				label: "Скорость",
				data: redSpeedList,
				hoverOffset: 5,
				backgroundColor: colorsBar,
				hoverBackgroundColor: activeColorsBar,
			},
		];
		(bestChartActive.data.datasets = [
			{
				backgroundColor: Object.values(lanColorsCut),
				label: "Максимальная скорость",
				data: Object.values(maxSpeed),
				hoverOffset: 5,
				borderWidth: 0,
				clip: 1,
			},
			{
				backgroundColor: Array.from(Object.values(lanColorsCut)).map((color) => {
					return (color += "90");
				}),
				label: "Средняя скорость",
				data: Object.values(sumResult),
				hoverOffset: 5,
				borderWidth: 0,
				clip: 1,
			},
			{
				backgroundColor: Array.from(Object.values(lanColorsCut)).map((color) => {
					return (color += "50");
				}),
				label: "Минимальная скорость",
				data: Object.values(minSpeed),
				hoverOffset: 5,
				borderWidth: 0,
				clip: 1,
			},
		]),
			bestChartActive.update();
		chartSpeedActive.update();
	}
}
function modeTwo() {
	drawTableResults();
	if (localStorage.getItem("isSecondModeOn") == "true") {
		localStorage.setItem("isSecondModeOn", false);
		checkBoxItemOne.style.opacity = "";
		checkBoxItemTwo.style.opacity = "1";
		times.forEach((time, index) => {
			setTimeout(() => {
				Array.from(row[index].children).forEach((child) => {
					child.style.opacity = "0";
				});
			}, index * 60);
			setTimeout(() => {
				time.textContent = Math.round((parseFloat(time.textContent) / 60) * 10000) / 10000 + " мин";
				Array.from(row[index].children).forEach((child) => {
					child.style.opacity = "1";
				});
			}, 500 + index * 60);
		});
		speeds.forEach((speed, index) => {
			setTimeout(() => {
				speed.textContent = Math.round(parseFloat(speed.textContent) * 6000) / 100 + " н/мин";
			}, 500 + index * 60);
		});
		timesM.forEach((time, index) => {
			time.style.opacity = "0";
			setTimeout(() => {
				time.textContent = Math.round((parseFloat(time.textContent) / 60) * 100) / 100 + " мин";
				time.style.opacity = "1";
			}, 300);
		});
		speedsM.forEach((speed, index) => {
			speed.style.opacity = "0";
			setTimeout(() => {
				speed.textContent = Math.round(parseFloat(speed.textContent) * 6000) / 100 + " н/мин";

				speed.style.opacity = "1";
			}, 300);
		});
		redSpeedList = redSpeedList.map((speed) => {
			speed *= 60;
			return speed;
		});
		speedList = speedList.map((speed) => {
			speed *= 60;
			return speed;
		});
		bestChartActive.options.plugins = {
			legend: {
				display: true,
				position: "bottom",
			},
			title: {
				display: true,
				text: "Скорости по языкам (н/мин)",
				font: {
					size: 20,
				},
			},
		};
		chartSpeedActive.options.plugins = {
			legend: {
				display: false,
			},
			title: {
				display: true,
				text: "Скорость печати с течением времени (н/мин)",
				font: {
					size: 20,
				},
			},
		};
		chartSpeedActive.data.datasets = [
			{
				type: "line",
				label: "Скорость",
				data: redSpeedList,
				hoverOffset: 5,
			},
			{
				type: "bar",
				label: "Скорость",
				data: redSpeedList,
				hoverOffset: 5,
				backgroundColor: colorsBar,
				hoverBackgroundColor: activeColorsBar,
			},
		];
		(bestChartActive.data.datasets = [
			{
				backgroundColor: Object.values(lanColorsCut),
				label: "Максимальная скорость",
				data: Object.values(maxSpeed).map((speed) => {
					return speed * 60;
				}),
				hoverOffset: 5,
				borderWidth: 0,
				clip: 1,
			},
			{
				backgroundColor: Array.from(Object.values(lanColorsCut)).map((color) => {
					return (color += "90");
				}),
				label: "Средняя скорость",
				data: Object.values(sumResult).map((speed) => {
					return speed * 60;
				}),
				hoverOffset: 5,
				borderWidth: 0,
				clip: 1,
			},
			{
				backgroundColor: Array.from(Object.values(lanColorsCut)).map((color) => {
					return (color += "50");
				}),
				label: "Минимальная скорость",
				data: Object.values(minSpeed).map((speed) => {
					return speed * 60;
				}),
				hoverOffset: 5,
				borderWidth: 0,
				clip: 1,
			},
		]),
			bestChartActive.update();
		chartSpeedActive.update();
	}
}
checkBoxItemOne.addEventListener("click", modeOne);
checkBoxItemTwo.addEventListener("click", modeTwo);

setTimeout(() => {
	chartSpeedActive.data = {
		labels: redLanList,
		datasets: [
			{
				type: "line",
				label: "Скорость",
				data: redSpeedList,
				hoverOffset: 5,
			},
			{
				type: "bar",
				label: "Скорость",
				data: redSpeedList,
				hoverOffset: 5,
				backgroundColor: colorsBar,
				hoverBackgroundColor: activeColorsBar,
			},
		],
	};

	chartSpeedActive.update();
}, 500);
setTimeout(() => {
	chartLanActive.data = {
		labels: Object.keys(langCount),
		datasets: [
			{
				label: "Процент тренировок",
				data: Object.values(langCount).map((value) => Math.round((value / lengthTr) * 100)),
				hoverOffset: 10,
				borderWidth: 0,
				clip: 1,
				backgroundColor: colors,
				// hoverBackgroundColor: activeColors,
			},
		],
	};

	chartLanActive.update();
}, 900);
setTimeout(() => {
	(bestChartActive.data = {
		labels: Object.keys(sumResult),
		datasets: [
			{
				backgroundColor: Object.values(lanColorsCut),
				label: "Максимальная скорость",
				data: Object.values(maxSpeed),
				hoverOffset: 5,
				borderWidth: 0,
				clip: 1,
			},
			{
				backgroundColor: Array.from(Object.values(lanColorsCut)).map((color) => {
					return (color += "90");
				}),
				label: "Средняя скорость",
				data: Object.values(sumResult),
				hoverOffset: 5,
				borderWidth: 0,
				clip: 1,
			},
			{
				backgroundColor: Array.from(Object.values(lanColorsCut)).map((color) => {
					return (color += "50");
				}),
				label: "Минимальная скорость",
				data: Object.values(minSpeed),
				hoverOffset: 5,
				borderWidth: 0,
				clip: 1,
			},
		],
	}),
		bestChartActive.update();
}, 700);

setTimeout(() => {
	chartAccuracyActive.data = {
		labels: Object.keys(accuracyList),
		datasets: [
			{
				label: "Точность",
				data: Object.values(accuracyList),
				// hoverBorderWidth: 3,
				// borderColor: "black",
				borderWidth: 0,
				hoverBorderColor: "black",
				borderColor: "black",
				clip: 1,
				backgroundColor: colors,
				hoverBackgroundColor: activeColors,
			},
		],
	};
	chartAccuracyActive.update();
}, 1100);

//Myresult

let step = 100 / rowActive.length;
rowActive.forEach((rowEl, index) => {
	rowEl.addEventListener("mouseover", () => {
		let colorSetting = "hsl(" + (100 - step * index) + ",100%,50%)";
		Array.from(rowEl.children).forEach((child) => {
			child.style.backgroundColor = colorSetting;
		});
	});
});
rowActive.forEach((rowEl, index) => {
	rowEl.addEventListener("mouseout", () => {
		Array.from(rowEl.children).forEach((child) => {
			child.style.backgroundColor = "";
		});
	});
});
let lan;
let inputsF = Array.from(document.getElementsByClassName("topResult__input"));
inputsF.forEach((input) => {
	input.addEventListener("input", () => {
		lan = document.getElementById(input.id.slice(0, -2) + "-label-f").textContent;
		if (input.checked) {
			activeLansF.push(lan);
		} else {
			if (activeLansF.indexOf(lan) > -1) {
				activeLansF.splice(activeLansF.indexOf(lan), 1);
			}
		}
		filterResults();
		if (isResultModeActive) {
			countMode();
			resultMode();
			sortArrayResultMode(resultModeResult);
			drawTableResults();
		} else {
			resultMode();
			countMode();
			sortArrayCountMode(resultModeResult);
			drawTableResults();
		}
		drawTableResults();
	});
});
//

//Top

let topResults = Object.groupBy(allResults, ({ name }) => name);
function filterResults() {
	resultModeResult = [];
	Object.keys(topResults).forEach((person, index) => {
		let result = topResults[person];
		let accuracyRow = 0;
		let speedRow = 0;
		let countRow = 0;
		result.forEach((resultRow) => {
			if (activeLansF.indexOf(resultRow.language) > -1) {
				accuracyRow += resultRow.accuracy;
				speedRow += resultRow.speed;
				countRow++;
			}
		});
		accuracyRow /= countRow;
		speedRow /= countRow;
		resultModeResult.push({
			name: person,
			accuracy: Math.round(accuracyRow),
			speed: Math.round(speedRow * 100) / 100,
			count: countRow,
		});
	});
	console.log(...resultModeResult);
}

function sortArrayResultMode(array) {
	return array.sort((elementOne, elementTwo) => {
		let firstResult = elementOne["speed"] * elementOne["accuracy"];
		let secondResult = elementTwo["speed"] * elementTwo["accuracy"];
		return firstResult > secondResult ? -1 : firstResult < secondResult ? 1 : 0;
	});
}
function sortArrayCountMode(array) {
	return array.sort((elementOne, elementTwo) => {
		let firstResult = elementOne["count"];
		let secondResult = elementTwo["count"];
		return firstResult > secondResult ? -1 : firstResult < secondResult ? 1 : 0;
	});
}
Object.keys(topResults).forEach((person, index) => {
	let result = topResults[person];
	let accuracyRow = 0;
	let speedRow = 0;
	let countRow = 0;
	result.forEach((resultRow) => {
		if (activeLansF.indexOf(resultRow.language) > -1) {
			accuracyRow += resultRow.accuracy;
			speedRow += resultRow.speed;
			countRow++;
		}
	});
	accuracyRow /= countRow;
	speedRow /= countRow;
	resultModeResult.push({
		name: person,
		accuracy: Math.round(accuracyRow),
		speed: Math.round(speedRow * 100) / 100,
		count: countRow,
	});
});
sortArrayCountMode(resultModeResult);

sortArrayResultMode(resultModeResult);

filterResults();

let topTable = document.getElementsByClassName("topResult__table")[0];
topTable.innerHTML =
	`<thead>
		<tr>
			<th>№</th>
			<th>Имя</th>
			<th>Точность</th>
			<th>Скорость</th>
			<th>Количество тренировок</th>
		</tr>
	</thead>
						` +
	`<tr>
		<th></th>
		<th></th>
		<th></th>
		<th></th>
		<th></th>
	</tr>`.repeat(resultModeResult.length);
let topTableRow = Array.from(document.querySelectorAll(".topResult__table tr")).splice(1);
function drawTableResults() {
	resultModeResult.forEach((results, index) => {
		setTimeout(() => {
			topTableRow[index].style.opacity = "0";
		}, 50 * index);
		setTimeout(() => {
			Array.from(topTableRow[index].children).forEach((th) => {
				th.style.opacity = "1";
				th.style.backgroundColor = "";
			});
			topTableRow[index].style = "";
			if (userName == results.name) {
				Array.from(topTableRow[index].children).forEach((th) => {
					th.style.backgroundColor = "#cccccd90";
				});
			}
			topTableRow[index].children[0].textContent = index + 1;
			topTableRow[index].children[1].textContent = results.name;
			topTableRow[index].children[2].textContent = results.accuracy ? results.accuracy + "%" : "-";
			if (localStorage.getItem("isSecondModeOn") == "true") {
				topTableRow[index].children[3].textContent = results.speed ? results.speed + " н/с" : "-";
			} else {
				topTableRow[index].children[3].textContent = results.speed
					? Math.round(results.speed * 6000) / 100 + " н/мин"
					: "-";
			}
			topTableRow[index].children[4].textContent = results.count;
			topTableRow[index].style.opacity = "1";
			if (!results.accuracy) {
				Array.from(topTableRow[index].children).forEach((th) => {
					th.style.opacity = "0.5";
				});
				if (!isShowMode) {
					topTableRow[index].style = "display:none;";
				}
			}
		}, 250 + 50 * index);
	});
	// if (
	// 	document.getElementsByClassName("topResult__table")[0].offsetHeight <
	// 	document.getElementsByClassName("topResult")[0].offsetHeight
	// ) {
	// 	document.getElementsByClassName("topResult")[0].style.height =
	// 		document.getElementsByClassName("topResult__table")[0].offsetHeight;
	// 	console.log(123456 + "qwerty");
	// }
}
sortArrayCountMode(resultModeResult);
resultModeResult.forEach((results, index) => {
	if (userName == results.name) {
		data[7].textContent = index + 1;
	}
});
sortArrayResultMode(resultModeResult);
resultModeResult.forEach((results, index) => {
	if (userName == results.name) {
		data[6].textContent = index + 1;
	}
});
drawTableResults();

//
