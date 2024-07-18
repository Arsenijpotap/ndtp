`use strict`;
let body = document.querySelector("body");
let bodyHeight = body.getBoundingClientRect().height;
let screenY = window.innerHeight / 2;
let timelineItem = document.getElementsByClassName("chapter__timeline-item");
let chapterLanguage = document.getElementsByClassName("chapter__language");
let delay;

let title = document.getElementsByClassName("title")[0];
let description = document.getElementsByClassName("description")[0];
let illustration = document.getElementsByClassName("chapter__illustration")[0];
let strings = document.getElementsByClassName("preview__heading-item");
let myResult = document.getElementById("myResult");
let countLanChart = document.getElementById("countLanChart");
let exampleChart = document.getElementById("exampleChart");
let isAnimated = false;
function isInViewport(el) {
	const rect = el.getBoundingClientRect();
	return rect.top <= window.innerHeight && rect.left <= window.innerWidth;
}
if (strings[0]) {
	strings[0].style.opacity = 1;
	setTimeout(() => {
		strings[0].classList.remove("animation");
		strings[1].style.opacity = 1;
	}, 1500);
	setTimeout(() => {
		strings[2].style.opacity = 1;
		strings[1].classList.remove("animation");
	}, 2800);
	setTimeout(() => {
		strings[2].classList.remove("animation");
	}, 3800);
	function stopTyping() {}
	function textAnimation() {}
}
const animatedEls = document.querySelectorAll(".animate");
document.addEventListener(
	"scroll",
	() => {
		for (let el of animatedEls) {
			if (isInViewport(el)) {
				el.classList.add("animate__animated", el.getAttribute("data-animation"));
			}
		}

		if (illustration.classList[2]) {
			setTimeout(() => {
				showSelection();
			}, 1000);
		}
	},
	{ passive: true },
);

if (myResult) {
	myResult.addEventListener("scroll", () => {
		for (let el of animatedEls) {
			if (isInViewport(el)) {
				el.classList.add("animate__animated", el.getAttribute("data-animation"));
			}
		}
		console.log(!isAnimated);
		if (isInViewport(countLanChart) && !isAnimated) {
			setTimeout(() => {
				chartCountLanActive.data = {
					labels: Object.keys(langCount),
					datasets: [
						{
							type: "bar",
							label: "Количество тренировок",
							data: Object.values(langCount),
							hoverOffset: 5,
							backgroundColor: colors,
							hoverBackgroundColor: activeColors,
						},
					],
				};
				chartCountLanActive.update();
			}, 500);
			isAnimated = true;
		}
	});
}
function showSelection() {
	delay = 0;
	Array.from(timelineItem).forEach((item) => {
		setTimeout(() => {
			item.classList.add("active");
		}, 190 * delay++);
	});
	delay = 0;
	Array.from(chapterLanguage).forEach((item) => {
		setTimeout(() => {
			item.classList.add("active");
		}, 200 * delay++);
	});
	let isSectionShow = true;
}
