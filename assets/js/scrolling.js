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
strings = document.getElementsByClassName("preview__heading-item");
function isInViewport(el) {
	const rect = el.getBoundingClientRect();
	return rect.top <= window.innerHeight && rect.left <= window.innerWidth;
}

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

const animatedEls = document.querySelectorAll(".animate");
document.addEventListener(
	"scroll",
	() => {
		for (el of animatedEls) {
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

function showSelection() {
	delay = 0;
	Array.from(timelineItem).forEach((item) => {
		setTimeout(() => {
			item.classList.add("active");
		}, 200 * delay++);
	});
	delay = 0;
	Array.from(chapterLanguage).forEach((item) => {
		setTimeout(() => {
			item.classList.add("active");
		}, 200 * delay++);
	});
	isSeectionShow = true;
}
