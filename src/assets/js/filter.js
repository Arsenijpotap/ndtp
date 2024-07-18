`use strict`;
let filterButttons = Array.from(document.getElementsByClassName("topResult__mode-button")).splice(0, 2);
let isResultModeActive = true;
let isShowMode = true;
filterButttons.forEach((button) => {
	button.addEventListener("click", () => {
		filterButttons.forEach((butt) => {
			butt.style.opacity = "0.5";
		});
		button.style.opacity = "1";
		if (button == filterButttons[0] && !isResultModeActive) {
			resultMode();
		} else if (button == filterButttons[1] && isResultModeActive) {
			countMode();
		}
	});
});

filterButttons[1].style.opacity = "0.5";
let filterButtonsPos = Array.from(document.getElementsByClassName("topResult__mode-button")).splice(2, 2);
console.log(filterButtonsPos);
filterButtonsPos.forEach((button) => {
	button.addEventListener("click", () => {
		filterButtonsPos.forEach((butt) => {
			butt.style.opacity = "0.5";
		});
		button.style.opacity = "1";
		if (button == filterButtonsPos[0] && !isShowMode) {
			standartShowMode();
			drawTableResults();
		} else if (button == filterButtonsPos[1] && isShowMode) {
			filterShowMode();
			drawTableResults();
		}
	});
});
filterButtonsPos[1].style.opacity = "0.5";

function resultMode() {
	isResultModeActive = true;
	resultModeResult = sortArrayCountMode(resultModeResult);
	resultModeResult = sortArrayResultMode(resultModeResult);
	drawTableResults();
}
function countMode() {
	isResultModeActive = false;
	resultModeResult = sortArrayResultMode(resultModeResult);
	resultModeResult = sortArrayCountMode(resultModeResult);
	drawTableResults();
}
function standartShowMode() {
	isShowMode = true;
	console.log(12345);
}
function filterShowMode() {
	isShowMode = false;

	console.log(54321);
}
