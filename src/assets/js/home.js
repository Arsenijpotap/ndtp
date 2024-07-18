`use strict`;
let typeChart = ["line", "bar", "doughnut", "polarArea"];
let ChartExample = document.getElementById("exampleChart");
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
let ChartExampleActive = new Chart(ChartExample, {
	type: "bar",
	data: {
		labels: ["JavaScript", "HTML", "CSS", "C", "SQL", "C++", "C#", "Java", "Python", "PHP"],
		datasets: [
			{
				label: "",
				data: [
					Math.random() * 29 + 1,
					Math.random() * 29 + 1,
					Math.random() * 29 + 1,
					Math.random() * 29 + 1,
					Math.random() * 29 + 1,
					Math.random() * 29 + 1,
					Math.random() * 29 + 1,
					Math.random() * 29 + 1,
					Math.random() * 29 + 1,
					Math.random() * 29 + 1,
				],

				backgroundColor: Object.values(lanColors).map((color) => {
					return color + "50";
				}),
				borderColor: Object.values(lanColors),
				borderWidth: 1,
			},
		],
	},
	options: {
		plugins: {
			legend: {
				display: false,
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				max: 30,
				display: false,
			},
			x: {
				// display: false,
			},
		},
	},
});
setInterval(() => {
	ChartExampleActive.data.datasets[0].data = [
		Math.random() * 29 + 1,
		Math.random() * 29 + 1,
		Math.random() * 29 + 1,
		Math.random() * 29 + 1,
		Math.random() * 29 + 1,
		Math.random() * 29 + 1,
		Math.random() * 29 + 1,
		Math.random() * 29 + 1,
		Math.random() * 29 + 1,
		Math.random() * 29 + 1,
	];
	ChartExampleActive.update();
}, 3000);
// setInterval(() => {

// 	let newType = typeChart[Math.floor(Math.random() * typeChart.length)];
// 	ChartExampleActive.data.datasets[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
// 	ChartExampleActive.update();
// 	setTimeout(() => {
// 		ChartExampleActive.destroy();
// 		ChartExampleActive = new Chart(ChartExample, {
// 			type: newType,
// 			data: {
// 				labels: ["JavaScript", "HTML", "CSS", "C", "SQL", "C++", "C#", "Java", "Python", "PHP"],
// 				datasets: [
// 					{
// 						label: "",
// 						data: [
// 							Math.random() * 29 + 1,
// 							Math.random() * 29 + 1,
// 							Math.random() * 29 + 1,
// 							Math.random() * 29 + 1,
// 							Math.random() * 29 + 1,
// 							Math.random() * 29 + 1,
// 							Math.random() * 29 + 1,
// 							Math.random() * 29 + 1,
// 							Math.random() * 29 + 1,
// 							Math.random() * 29 + 1,
// 						],

// 						backgroundColor: Object.values(lanColors).map((color) => {
// 							return color + "50";
// 						}),
// 						borderColor: Object.values(lanColors),
// 						borderWidth: 1,
// 					},
// 				],
// 			},
// 			options: {
// 				plugins: {
// 					legend: {
// 						display: false,
// 					},
// 				},
// 				scales: {
// 					y: {
// 						beginAtZero: true,
// 						max: 30,
// 						display: false,
// 					},
// 					x: {
// 						display: false,
// 					},
// 				},
// 			},
// 		});
// 	}, 1000);
// }, 3000);
if (document.getElementById("login")) {
	document.getElementById("login").addEventListener("click", () => {
		localStorage.setItem("reg", "login");
	});
	document.getElementById("register").addEventListener("click", () => {
		localStorage.setItem("reg", "register");
	});
}
