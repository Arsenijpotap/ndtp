`use strict`;

function showActiveKey(pressKey) {
	if (pressKey.key) {
		pressKey = pressKey.key;
	}
	switch (pressKey) {
		case "Shift":
			pressKey = "shift-r";
			showActiveKey("shift-l");
			break;
		case " ":
			pressKey = "space";
			break;
		case "Alt":
			pressKey = "alt-r";
			showActiveKey("alt-l");
			break;
		case "Control":
			pressKey = "ctrl-r";
			showActiveKey("ctrl-l");
			break;
		case "PageUp":
			pressKey = "pgup";
			break;
		case "PageDown":
			pressKey = "pgdn";
			break;
		case "Home":
			pressKey = "home";
			break;
		case "End":
			pressKey = "end";
			break;
		case "Escape":
			pressKey = "esc";
			break;
		case "Tab":
			pressKey = "tab";
			break;
		case "Backspace":
			pressKey = "bcsp";
			break;
		case "Tab":
			pressKey = "tab";
			break;
		case "Enter":
			pressKey = "enter";
			break;
		case "\\":
			pressKey = "sl-ob";
			break;
	}
	if (!isColorModeWork) {
		if (document.getElementById(pressKey)) {
			document.getElementById(pressKey).classList.add("active");
		} else {
			[...keysSizeOne].forEach((key) => {
				if (key.getAttribute("data-value") == pressKey) {
					key.classList.add("active");
				}
			});
			[...keysSizeAuto].forEach((key) => {
				if (key.getAttribute("data-value") == pressKey) {
					key.classList.add("active");
				}
			});
		}
		setTimeout(() => {
			if (document.getElementById(pressKey)) {
				document.getElementById(pressKey).classList.remove("active");
			}
			[...keysSizeOne].forEach((key) => {
				if (key.getAttribute("data-value") == pressKey) {
					key.classList.remove("active");
				}
			});
			[...keysSizeAuto].forEach((key) => {
				if (key.getAttribute("data-value") == pressKey) {
					key.classList.remove("active");
				}
			});
		}, 400);
	} else {
		if (document.getElementById(pressKey)) {
			if (document.getElementById(pressKey).style.borderColor != "rgb(31, 31, 31)") {
				document.getElementById(pressKey).style.backgroundColor =
					document.getElementById(pressKey).style.borderColor;
			}
			document.getElementById(pressKey).style.color = "#101010";
			document.getElementById(pressKey).style.borderColor = "#1f1f1f";
		} else {
			[...keysSizeOne].forEach((key) => {
				if (key.getAttribute("data-value") == pressKey) {
					key.style.color = "#101010";
					if (key.style.borderColor != "rgb(31, 31, 31)") {
						key.style.backgroundColor = key.style.borderColor;
					}
					key.style.color = "#101010";
					key.style.borderColor = "#1f1f1f";
				}
			});
			[...keysSizeAuto].forEach((key) => {
				if (key.getAttribute("data-value") == pressKey) {
					if (key.getAttribute("data-value") == pressKey) {
						key.style.color = "#101010";
						if (key.style.borderColor != "rgb(31, 31, 31)") {
							key.style.backgroundColor = key.style.borderColor;
						}
						key.style.color = "#101010";
						key.style.borderColor = "#1f1f1f";
					}
				}
			});
		}
		setTimeout(() => {
			if (document.getElementById(pressKey)) {
				document.getElementById(pressKey).style.backgroundColor = "";
				returnColor(pressKey);
			}
			[...keysSizeOne].forEach((key) => {
				if (key.getAttribute("data-value") == pressKey) {
					key.style.backgroundColor = "";
					returnColor(key.id);
				}
			});
			[...keysSizeAuto].forEach((key) => {
				if (key.getAttribute("data-value") == pressKey) {
					key.style.backgroundColor = "";
					returnColor(key.id);
				}
			});
		}, 400);
	}
}
document.addEventListener("keydown", showActiveKey);
function returnColor(pressKey) {
	["esc", "tab", "caps", "shift-l", "ctrl-l", "z", "fn", "q", "a", "1", "win"].forEach((id) => {
		if (id == pressKey) {
			showColor(id, "#19086c");
		}
	});
	["2", "w", "s", "alt-l", "x"].forEach((id) => {
		if (id == pressKey) {
			showColor(id, "#0437af");
		}
	});
	["3", "4", "e", "d", "c"].forEach((id) => {
		if (id == pressKey) {
			showColor(id, "#3caacc");
		}
	});

	["5", "r", "f", "v", "6", "t", "g", "b"].forEach((id) => {
		if (id == pressKey) {
			showColor(id, "#08bfb2");
		}
	});
	["8", "y", "u", "h", "7", "j", "n", "m"].forEach((id) => {
		if (id == pressKey) {
			showColor(id, "#02cc0c");
		}
	});
	["9", "i", "k", ","].forEach((id) => {
		if (id == pressKey) {
			showColor(id, "#c42311");
		}
	});
	["0", "o", "l", "."].forEach((id) => {
		if (id == pressKey) {
			showColor(id, "#c45500");
		}
	});
	["-", "=", "p", "[", "]", ";", "'", "/", "bcsp", "sl-ob", "enter", "shift-r", "alt-r", "ctrl-r"].forEach((id) => {
		if (id == pressKey) {
			showColor(id, "#b41077");
		}
	});
	["pgup", "pgdn", "home", "end", "ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"].forEach((id) => {
		if (id == pressKey) {
			showColor(id, "#a501f0");
		}
	});
	if (pressKey == "space") {
		showColor("space", "yellowgreen");
	}
}
