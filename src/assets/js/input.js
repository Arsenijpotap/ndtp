let name = document.getElementsByClassName("form-area__name")[0];
let pass = document.getElementsByClassName("form-area__password")[0];
let namelog = document.getElementsByClassName("form-area__name")[1];
let passlog = document.getElementsByClassName("form-area__password")[2];
let repPass = document.getElementsByClassName("form-area__password")[1];
let login = document.getElementsByClassName("form-area__login")[0];
let button = document.getElementsByClassName("form-area__submit")[0];
let buttonlog = document.getElementsByClassName("form-area__submit")[1];
let wrong = document.getElementsByClassName("form-area__wrong")[0];
let wronglog = document.getElementsByClassName("form-area__wrong")[1];
first = document.getElementsByClassName("form-area")[0];
second = document.getElementsByClassName("form-area")[1];
if (localStorage.getItem("reg") != "login") {
	second.style.opacity = 0;
	first.style.zIndex = 1;
	first.style.opacity = 1;
	setTimeout(() => {
		second.style.zIndex = 0;
	}, 500);
} else {
	first.style.opacity = 0;
	second.style.zIndex = 1;
	second.style.opacity = 1;
	setTimeout(() => {
		first.style.zIndex = 0;
	}, 500);
}

let errors = {
	name: true,
	login: true,
	pass: true,
	repPass: true,
};

if (!localStorage.getItem("reg")) {
	localStorage.setItem("reg", "login");
}
repPass.addEventListener("input", () => {
	if (repPass.value != pass.value) {
		repPass.style = "border:  0.1rem solid red;";
		errors.repPass = true;
		wrong.textContent = "Пароли не совпадают";
	} else {
		repPass.style = "border:  0.1rem solid green;";
		errors.repPass = false;
		wrong.textContent = "";
	}
	showButton();
});
pass.addEventListener("input", () => {
	if (String(pass.value).length < 6 || String(pass.value).length > 26) {
		pass.style = "border:  0.1rem solid red;";
		errors.pass = true;
		wrong.textContent = "Недопустимая длина пароля";
	} else {
		pass.style = "border:  0.1rem solid green;";
		errors.pass = false;
		wrong.textContent = "";
	}
	if (repPass.value != pass.value || repPass.value == "") {
		repPass.style = "border:  0.1rem solid red;";
		errors.repPass = true;
	} else {
		repPass.style = "border:  0.1rem solid green;";
		errors.repPass = false;
		wrong.textContent = "";
	}
	showButton();
});

namelog.addEventListener("input", () => {
	showButton();
	wronglog.textContent = "";
	namelog.style.border = "";
});
passlog.addEventListener("input", () => {
	showButton();
	wronglog.textContent = "";
	passlog.style.border = "";
});
login.addEventListener("input", () => {
	if (String(login.value).indexOf("@") == -1) {
		login.style = "border:  0.1rem solid red;";
		errors.login = true;
		wrong.textContent = "Неверно заполнена электронная почта";
	} else {
		login.style = "border:  0.1rem solid green;";
		errors.login = false;
		wrong.textContent = "";
	}
	showButton();
});

name.addEventListener("input", () => {
	if (String(name.value).length < 3 || String(name.value).length > 18) {
		name.style = "border:  0.1rem solid red;";
		errors.name = true;
		wrong.textContent = "Недопустимая длина имени";
	} else {
		name.style = "border:  0.1rem solid green;";
		errors.name = false;
		wrong.textContent = "";
	}
	showButton();
});

function showButton() {
	if (!errors.pass && !errors.login && !errors.repPass && !errors.name) {
		button.style.opacity = "1";
		button.disabled = false;
	} else {
		button.style.opacity = "0.1";
		button.disabled = true;
	}

	if (namelog.value != "" && passlog.value != "") {
		buttonlog.style.opacity = "1";
		buttonlog.disabled = false;
	} else {
		buttonlog.style.opacity = "0.1";
		buttonlog.disabled = true;
	}
}
showButton();

function showNext() {
	if (localStorage.getItem("reg") == "login") {
		second.style.opacity = 0;
		first.style.zIndex = 1;
		first.style.opacity = 1;
		setTimeout(() => {
			second.style.zIndex = 0;
		}, 500);
		localStorage.setItem("reg", "register");
	} else {
		first.style.opacity = 0;
		second.style.zIndex = 1;
		second.style.opacity = 1;
		setTimeout(() => {
			first.style.zIndex = 0;
		}, 500);
		localStorage.setItem("reg", "login");
	}
}

button.style.opacity = "0.1";
