`use strict`;
let inputs = Array.from(document.getElementsByClassName("myResult__input"));
let lanText = Array.from(document.getElementsByClassName("myResult__language"));
let circles = Array.from(document.getElementsByClassName("myResult__circle"));
let numbers = Array.from(document.getElementsByClassName("myResult__number"));
const chartLan = document.getElementById("languageChart");
const chartSpeed = document.getElementById("speedChart");
const chartBestLan = document.getElementById("bestLanChart");
const chartAccuracy = document.getElementById("accuracyChart");
const chartCountLan = document.getElementById("countLanChart");
let langCount = { Java: 0, HTML: 0, C: 0, JavaScript: 0, "C#": 0, SQL: 0, "C++": 0, CSS: 0, Python: 0, PHP: 0 };
let speedList = [];
let lanList = [];
let speedLength = [];
let countList = { Java: 0, HTML: 0, C: 0, JavaScript: 0, "C#": 0, SQL: 0, "C++": 0, CSS: 0, Python: 0, PHP: 0 };
let sumResult = { Java: 0, HTML: 0, C: 0, JavaScript: 0, "C#": 0, SQL: 0, "C++": 0, CSS: 0, Python: 0, PHP: 0 };
let maxSpeed = { Java: 0, HTML: 0, C: 0, JavaScript: 0, "C#": 0, SQL: 0, "C++": 0, CSS: 0, Python: 0, PHP: 0 };
let minSpeed = { Java: 0, HTML: 0, C: 0, JavaScript: 0, "C#": 0, SQL: 0, "C++": 0, CSS: 0, Python: 0, PHP: 0 };
let errorList = { Java: 0, HTML: 0, C: 0, JavaScript: 0, "C#": 0, SQL: 0, "C++": 0, CSS: 0, Python: 0, PHP: 0 };
let accuracyList = { Java: 0, HTML: 0, C: 0, JavaScript: 0, "C#": 0, SQL: 0, "C++": 0, CSS: 0, Python: 0, PHP: 0 };
let i = 1;
//
let timeList = [];
let redLanList = [];
let redSpeedList = [];
let activeLans = ["JavaScript", "HTML", "CSS", "C", "SQL", "C++", "C#", "Java", "Python", "PHP"];
let activeLansF = ["JavaScript", "HTML", "CSS", "C", "SQL", "C++", "C#", "Java", "Python", "PHP"];
let lanColors = {
	// HTML: "#e34c2699",
	// CSS: "#008bcc95",
	// JavaScript: "#f6dd0095",
	// "C++": "#2fc7f795",
	// "C#": "#99629e95",
	// Python: "#f7c41b95",
	// C: "#f7861d95",
	// Java: "#d04e1695",
	Java: "#ad1457",
	HTML: "#f44336",
	C: "#ff9800",
	JavaScript: "#ffc107",
	"C#": "#8ac926",
	SQL: "#83e377",
	"C++": "#009688",
	CSS: "#1565c0",
	Python: "#448aff",
	PHP: "#7251b5",
};
let lanColorsCut = {
	Java: "#ad1457",
	HTML: "#f44336",
	C: "#ff9800",
	JavaScript: "#ffc107",
	"C#": "#8ac926",
	SQL: "#83e377",
	"C++": "#009688",
	CSS: "#1565c0",
	Python: "#448aff",
	PHP: "#7251b5",
};
let colors = [];
let activeColors = [];
let colorsBar = [];
let activeColorsBar = [];

inputs.forEach((input) => {
	input.addEventListener("input", () => {
		let lan = document.getElementById(input.id + "-label").textContent;
		if (input.checked) {
			activeLans.push(lan);
		} else {
			if (activeLans.indexOf(lan) > -1) {
				activeLans.splice(activeLans.indexOf(lan), 1);
			}
		}
		redLanList = [];
		redSpeedList = [];
		lanList.forEach((lan, index) => {
			if (activeLans.indexOf(lan) > -1) {
				redLanList.push(lan);
				redSpeedList.push(speedList[index]);
			}
		});
		colorsBar = [];
		activeColorsBar = [];
		redLanList.forEach((lan) => {
			colorsBar.push(lanColors[lan] + "50");
			activeColorsBar.push(lanColors[lan]);
		});
		chartSpeedActive.data.labels = redLanList;
		(chartSpeedActive.data.datasets = [
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
		]),
			chartSpeedActive.update();
	});
});
Array.from(Object.keys(countList)).forEach((lan) => {
	if (countList[lan] == 0) {
		countList[lan];
		delete countList[lan];
	}
});
userResults.forEach((json) => {
	if (Object.keys(langCount).indexOf(json.language) == -1) {
		langCount[json.language] = 1;
	} else {
		langCount[json.language] += 1;
	}
	sumResult[json.language] += json.speed;
	if (!accuracyList[json.language]) {
		accuracyList[json.language] = 0;
	}
	timeList.push(json.time);
	accuracyList[json.language] += parseFloat(json.accuracy);
	if (json.speed > maxSpeed[json.language]) {
		maxSpeed[json.language] = json.speed;
	}
	if (json.speed > minSpeed[json.language]) {
		minSpeed[json.language] = json.speed;
	}
	speedList.push(json.speed);
	lanList.push(json.language);
	errorList[json.language] += parseFloat(json.mistake);

	speedLength.push(i);
	countList[json.language]++;
	i++;
});
console.log(timeList);
let lengthTr = i - 1;
userResults.forEach((json) => {
	if (json.speed < minSpeed[json.language]) {
		minSpeed[json.language] = json.speed;
	}
});
lanList.forEach((lan, index) => {
	if (activeLans.indexOf(lan) > -1) {
		redLanList.push(lan);
		redSpeedList.push(speedList[index]);
	}
});
Object.keys(langCount).forEach((lang) => {
	sumResult[lang] /= langCount[lang];

	errorList[lang] /= langCount[lang];
	accuracyList[lang] /= langCount[lang];
	if (langCount[lang] == 0) {
		delete langCount[lang];
		delete accuracyList[lang];
		delete maxSpeed[lang];
		delete minSpeed[lang];
		delete sumResult[lang];
		delete lanColorsCut[lang];
	}
});

if (
	accuracyList.Java ||
	accuracyList.HTML ||
	accuracyList.C ||
	accuracyList["C++"] ||
	accuracyList["C#"] ||
	accuracyList.Python ||
	accuracyList.CSS ||
	accuracyList.JavaScript
) {
	Object.keys(lanColors).forEach((lan, i) => {
		lanText[i].textContent = lan;
		circles[i].style.stroke = lanColors[lan];
		if (accuracyList[lan]) {
			circles[i].setAttribute("stroke-dasharray", accuracyList[lan] + " 100");
		} else {
			circles[i].style = "opacity:0;transition: 0s;";
		}
		numbers[i].textContent = (Math.round(accuracyList[lan]) + "%").replace("NaN", "0");
	});
}
redLanList.forEach((lan) => {
	colorsBar.push(lanColors[lan] + "50");
	activeColorsBar.push(lanColors[lan]);
});
Object.keys(langCount).forEach((lan) => {
	colors.push(lanColors[lan]);
	activeColors.push(lanColors[lan] + "b3");
});

let chartSpeedActive = new Chart(chartSpeed, {
	data: {
		labels: redLanList,
		datasets: [
			{
				type: "line",
				label: "Скорость",
				data: "0,".repeat(lengthTr).split(",", lengthTr),
				hoverOffset: 5,
			},
			{
				type: "bar",
				label: "Скорость",
				data: [],
				hoverOffset: 5,
				backgroundColor: colorsBar,
				hoverBackgroundColor: activeColorsBar,
			},
		],
	},
	options: {
		responsive: true,
		elements: {
			point: {
				radius: 4,
				hoverRadius: 5,
				hoverBorderWidth: 2,
				pointBackgroundColor: "#8ac926",
				pointHoverBackgroundColor: "#000000",
				fill: true,
				pointHoverBorderColor: "#8ac926",
			},
			line: {
				borderWidth: 4,
				tension: 0.4,
				borderColor: "#8ac926",
			},
		},
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: true,
				text:
					localStorage.getItem("isSecondModeOn") == "true"
						? "Скорость печати с течением времени (н/с)"
						: "Скорость печати с течением времени (н/мин)",
				font: {
					size: 20,
				},
			},
		},
		interaction: {
			intersect: false,
		},
		scales: {
			y: {
				beginAtZero: true,
			},

			x: {
				display: true,
				title: {
					display: true,
				},
			},
		},
	},
});
let chartLanActive = new Chart(chartLan, {
	type: "doughnut",
	data: {
		labels: Object.keys(langCount),
		datasets: [
			{
				label: "Процент тренировок",
				data: [0, 0, 0, 0, 0, 0, 0, 0],
				hoverOffset: 10,
				borderWidth: 0,
				clip: 1,
				backgroundColor: colors,
				// hoverBackgroundColor: activeColors,
			},
		],
	},
	options: {
		cutout: 0,
		layout: {
			padding: 5,
		},
		responsive: true,
		plugins: {
			legend: {
				position: "right",
			},
			title: {
				display: true,
				text: "Языки тренировок (%)",
				font: {
					size: 20,
				},
			},
		},
	},
});
let bestChartActive = new Chart(chartBestLan, {
	type: "bar",
	data: {
		labels: Object.keys(sumResult),
		datasets: [
			{
				backgroundColor: Object.values(lanColors),
				label: "Максимальная скорость",
				data: [0, 0, 0, 0, 0, 0, 0, 0],
				hoverOffset: 5,
				borderWidth: 0,
				clip: 1,
			},
			{
				backgroundColor: Array.from(Object.values(lanColors)).map((color) => {
					return (color += "90");
				}),
				label: "Средняя скорость",
				data: [0, 0, 0, 0, 0, 0, 0, 0],
				hoverOffset: 5,
				borderWidth: 0,
				clip: 1,
			},
			{
				backgroundColor: Array.from(Object.values(lanColors)).map((color) => {
					return (color += "50");
				}),
				label: "Минимальная скорость",
				// data: [0,0,0,0,0,0,0,0],
				hoverOffset: 5,
				borderWidth: 0,
				clip: 1,
			},
		],
	},
	options: {
		responsive: true,
		plugins: {
			legend: {
				position: "bottom",
			},
			title: {
				display: true,
				text:
					localStorage.getItem("isSecondModeOn") == "true"
						? "Скорости по языкам (н/с)"
						: "Скорости по языкам (н/мин)",
				font: {
					size: 20,
				},
			},
		},
	},
});
let chartAccuracyActive = new Chart(chartAccuracy, {
	type: "polarArea",
	data: {
		labels: Object.keys(accuracyList),
		datasets: [
			{
				label: "Точность",
				data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
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
	},
	options: {
		responsive: true,
		scales: {
			r: { display: false },
		},
		plugins: {
			legend: {
				position: "right",
			},
			title: {
				display: true,
				text: "Точность в сравнении (%)",
				font: {
					size: 20,
				},
			},
		},
	},
});

let chartCountLanActive = new Chart(chartCountLan, {
	data: {
		labels: Object.keys(langCount),
		datasets: [
			{
				type: "bar",
				label: "Количество тренировок",
				data: [0, 0, 0, 0, 0, 0, 0, 0],
				hoverOffset: 5,
				backgroundColor: Object.values(lanColors),
				hoverBackgroundColor: Object.values(lanColors).map((color) => {
					return color + "90";
				}),
			},
		],
	},
	options: {
		indexAxis: "y",
		responsive: true,
		plugins: {
			legend: {
				display: false,
			},
			title: {
				display: true,
				text: "Количество тренировок по языкам",
				font: {
					size: 20,
				},
			},
		},
		interaction: {
			intersect: false,
		},
		scales: {
			y: {
				beginAtZero: true,
			},

			x: {
				display: false,
				title: {
					display: true,
				},
			},
		},
	},
});

//
