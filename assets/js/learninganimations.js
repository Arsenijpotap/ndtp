`use strict`;
let back = document.getElementById("back");
let next = document.getElementById("next");
let firstHintText = document.getElementById("firsthint");
let buttonsRow = document.getElementById("buttonsrow");
let secondHintText = document.getElementById("secondhint");
let thirdHintText = document.getElementById("thirdhint");
let fourthHintText = document.getElementById("fourthhint");
let handsEmptyRight = document.getElementById("hands-empty-right");
let handsEmptyLeft = document.getElementById("hands-empty-left");
let hands = document.getElementById("hands-colorful");
let rows = Array.from(document.getElementsByClassName("keyboard__row"));
let surrentStep = 1;
let isAnimationWork = false;
let firstElementText = "Удобно сядьте за компьютер, рассмотрите клавиатуру и попробуйте запомнить положение клавиш.";
let secondElementText = "Расположите руки на клавишах. Указательные пальцы должны распологаться на клавишах F и J.";
let thirdElementText = "Каждый палец должен охватывать свою зону. Потренируйтесь делать это.";
let fourtElementText = "Поздравляю! Вы прошли обучение, теперь Вы можете печатать правильно!";
let isColorModeWork = false;
setInterval(() => {
	console.log(isAnimationWork);
}, 1000);
function firstStep() {
	keyboard.style = "";
	secondHintText.style.opacity = "0";
	firstHintText.style.opacity = "1";
	handsEmptyRight.style = "top:100vw;right: 0vw;display:block;";
	handsEmptyLeft.style = "top: 100vw;left: 0vw;display:block;";
	document.getElementById("j").style.color = "";
	document.getElementById("f").style.color = "";
	typingAnimation("firsthint", firstElementText);
	back = document.getElementById("back");
	back.outerHTML = '<a class="buttons__button" role="button"  id="back" href="index.html">Назад</a>';
	isLearningModeOn = true;
}

function secondStep() {
	isColorModeWork = false;
	handsEmptyLeft.style = "display:block;";
	handsEmptyRight.style = " display:block;";
	back = document.getElementById("back");
	back.outerHTML =
		'<button class="buttons__button" id="back" onclick="if(!isAnimationWork){surrentStep--;showStep();isAnimationWork = true;};">Назад</button>';
	keyboard.style = "padding-top: 18vw;";
	firstHintText.style.opacity = "0";
	thirdHintText.style.opacity = "0";
	secondHintText.style.opacity = "1";
	hands.style = "display:block;";

	typingAnimation("secondhint", secondElementText);
	let j = 0;
	if (document.getElementById("j").style[0]) {
		rows.forEach((row) => {
			console.log(1);
			setTimeout(() => {
				for (let i = 0; i < row.children.length; i++) {
					setTimeout(() => {
						row.children[i].style = ``;
					}, i * 100);
				}
			}, j * 200);
			j++;
		});
		setTimeout(() => {
			handsEmptyRight.style = "top:22vw;right: 26.4vw;display:block;";
			handsEmptyLeft.style = "top: 21vw;left: 16.7vw;display:block;";

			document.getElementById("j").style.color = "orange";
			document.getElementById("f").style.color = "orange";
		}, 2000);
	} else {
		setTimeout(() => {
			handsEmptyRight.style = "top:22vw;right: 26.4vw;display:block;";
			handsEmptyLeft.style = "top: 21vw;left: 16.7vw;display:block;";

			document.getElementById("j").style.color = "orange";
			document.getElementById("f").style.color = "orange";
		}, 1000);
	}
}

function thirdStep() {
	keyboard.style = "padding-top: 7vw;scale:1;";
	secondHintText.style.opacity = "0";
	thirdHintText.style.opacity = "1";
	fourthHintText.style.opacity = "0";

	hands.style = " display:block;";

	setTimeout(() => {
		isColorModeWork = true;
		hands.style = "top:30vw;display:block;";
	}, 1000);
	handsEmptyRight.style = "top:100vw;right: 0vw;display:block;";
	handsEmptyLeft.style = "top: 100vw;left: 0vw;display:block;";
	document.getElementById("j").style.color = "";
	document.getElementById("f").style.color = "";
	typingAnimation("thirdhint", thirdElementText);
	buttonsRow.style.opacity = 0;
	setTimeout(() => {
		buttonsRow.style.opacity = 1;

		buttonsRow.innerHTML = `<button class="buttons__button" id="back" onclick="if(!isAnimationWork){surrentStep--;showStep();isAnimationWork = true;};">Назад</button>					
						<button class="buttons__button"
                onclick="if(!isAnimationWork){surrentStep++;showStep();isAnimationWork = true;}"
                id="next">Вперед</button>
					`;
	}, 500);
	showAllColors();
}
function fourthStep() {
	fourthHintText.style.opacity = "1";
	thirdHintText.style.opacity = "0";
	buttonsRow.style.opacity = 0;
	setTimeout(() => {
		buttonsRow.style.opacity = 1;

		buttonsRow.innerHTML = `<button class="buttons__button" id="back" onclick="if(!isAnimationWork){surrentStep--;showStep();isAnimationWork = true;};">Назад</button>					
						<a class="buttons__button" role="button"  href='index.html' " id="next">На главную</a>
					`;
	}, 500);
	// next.style.opacity = 0;
	// next.style.cursor = "default";
	isColorModeWork = false;
	keyboard.style = "padding-top: 18vw;";
	hands.style = "top:100vw;display:block;";
	thirdHintText.style.opacity = "0";

	typingAnimation("fourthhint", fourtElementText);
	let j = 0;
	if (document.getElementById("j").style[0]) {
		rows.forEach((row) => {
			console.log(1);
			setTimeout(() => {
				for (let i = 0; i < row.children.length; i++) {
					setTimeout(() => {
						row.children[i].style = ``;
					}, i * 100);
				}
			}, j * 200);
			j++;
		});
	}
}
document.addEventListener("DOMContentLoaded", firstStep);

function typingAnimation(id, text) {
	let element = document.getElementById(id);
	let delayAnimation;
	element.textContent = "";
	for (let i = 0; i < text.length; i++) {
		setTimeout(() => {
			element.textContent += text[i];
		}, i * 30);
		delayAnimation = i * 30;
	}
	setTimeout(() => {
		isAnimationWork = false;
	}, delayAnimation);
}

function showStep() {
	if (surrentStep > 4) {
		surrentStep = 4;
	} else {
		switch (surrentStep) {
			case 1:
				firstStep();
				break;
			case 2:
				secondStep();
				break;
			case 3:
				thirdStep();
				break;
			case 4:
				fourthStep();
				break;
		}
	}
}
function showAllColors() {
	let delay = 0;
	["esc", "tab", "caps", "shift-l", "ctrl-l", "z", "fn", "q", "a", "1", "win"].forEach((id) => {
		setTimeout(() => {
			showColor(id, "#19086c");
		}, 50 * delay);
		delay++;
	});
	["2", "w", "s", "alt-l", "x"].forEach((id) => {
		setTimeout(() => {
			showColor(id, "#0437af");
		}, 50 * delay);
		delay++;
	});
	["3", "4", "e", "d", "c"].forEach((id) => {
		setTimeout(() => {
			showColor(id, "#3caacc");
		}, 50 * delay);
		delay++;
	});

	["5", "r", "f", "v", "6", "t", "g", "b"].forEach((id) => {
		setTimeout(() => {
			showColor(id, "#08bfb2");
		}, 50 * delay);
		delay++;
	});
	["8", "y", "u", "h", "7", "j", "n", "m"].forEach((id) => {
		setTimeout(() => {
			showColor(id, "#02cc0c");
		}, 50 * delay);
		delay++;
	});
	["9", "i", "k", ","].forEach((id) => {
		setTimeout(() => {
			showColor(id, "#c42311");
		}, 50 * delay);
		delay++;
	});
	["0", "o", "l", "."].forEach((id) => {
		setTimeout(() => {
			showColor(id, "#c45500");
		}, 50 * delay);
		delay++;
	});
	["-", "=", "p", "[", "]", ";", "'", "/", "bcsp", "sl-ob", "enter", "shift-r", "alt-r", "ctrl-r"].forEach((id) => {
		setTimeout(() => {
			showColor(id, "#b41077");
		}, 50 * delay);
		delay++;
	});
	["pgup", "pgdn", "home", "end", "ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"].forEach((id) => {
		setTimeout(() => {
			showColor(id, "#a501f0");
		}, 50 * delay);
		delay++;
	});
	setTimeout(() => {
		showColor("space", "yellowgreen");
	}, 2000);
}
function showColor(id, color) {
	let element = document.getElementById(id);
	element.style = `box-shadow: 0 0 1vw ${color};border: solid 0.15vw ${color};color:${color};`;
}
