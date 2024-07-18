`use strict`;
import commandlist from "./commandlist.js";
let button = document.getElementsByClassName("modal__button")[0];
let chartCvs = document.getElementById("modalchart");
let checkBoxAnimation = document.getElementById("header-checkbox-first");
let checkBoxShowPrintedText = document.getElementById("header-checkbox-second");
let checkBoxShowPrintedWrong = document.getElementById("header-checkbox-third");
let checkBoxAdvanceMode = document.getElementById("header-checkbox-fourth");
let printedTextTexfiled = document.getElementById("textfield-printed");
let printedWrongTexfiled = document.getElementById("textfield-wrong");
let isShowAdvanceModeOn = true;
let checkBoxItemOne = document.getElementsByClassName("modal__checkbox")[2];
let checkBoxItemTwo = document.getElementsByClassName("modal__checkbox")[3];
let checkBoxModeOne = document.getElementsByClassName("modal__checkbox")[0];
let checkBoxModeTwo = document.getElementsByClassName("modal__checkbox")[1];
let correctSpeedsList = [];
let printedText = "";
let printedWrong = "";
let isErrorModeActive = !true;
let description = document.getElementById("description");
let enterIsPress = false;
let isCapsLockOn;
let isLearningModeOn = false;
let isLockOn = false;
let keysSizeAuto = Array.from(document.getElementsByClassName("keyboard__key_size-auto"));
let keysSizeOne = Array.from(document.getElementsByClassName("keyboard__key_size-one"));
let lastResultsList = localStorage.getItem("lastresultslist") || JSON.stringify([]);
let language = localStorage.getItem("setlanguage");
let metricList = ["", "с.", "%", "н/с.", "сим."];
let mistakeList = [];
let modal = document.getElementsByClassName("modal")[0];
let modalIsOpen = false;
let modalSpeed = Array.from(document.getElementsByClassName("modal__speed"));
let modalTime = Array.from(document.getElementsByClassName("modal__time"));
let moreInfo = document.getElementsByClassName("modal__more-info")[0];
let moreInfoButton = document.getElementsByClassName("modal__link")[0];
let pastResults = document.getElementsByClassName("modal__past-results")[0];
let quantityAnswer = 0;
let quantityAnswerPerSecond = 0;
let quantityMistakeAnswer = 0;
let quantityСorrectAnswer = 0;
let quantityСorrectAnswerPerSecond = 0;
let range = document.getElementById("range-first");
let rangeLabel = document.getElementById("rangelabel-first");
let rangeOpacity = document.getElementById("range-second");
console.log(rangeOpacity);
let rangeLabelOpacity = document.getElementById("rangelabel-second");
let printedTextOpacity;
let resultFirst = document.getElementsByClassName("modal__results")[0];
let resultList = {};
let resultSecond = document.getElementsByClassName("modal__results")[1];
let resetResultButton = document.getElementsByClassName("header__reset-result")[0];
let rowContent = document.getElementsByClassName("modal__tr")[0].textContent;
let rows = Array.from(document.getElementsByClassName("keyboard__row"));
let secondsList = [];
let speedsList = [];
let table = document.getElementsByClassName("modal__table")[0];
let tableRows = Array.from(document.getElementsByClassName("modal__tr"));
let tableRowsTop = Array.from(document.getElementsByClassName("modal__tr-top"));
let textArray = [];
let textField = document.getElementById("textfield");
let textFieldFirstLetter = document.getElementById("textfield-active");
let textFieldText = document.getElementById("textfield__text");
let topList = {};
let topResultsList = localStorage.getItem("topresultslist") || JSON.stringify([]);
let keys = {
  ru: ["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю"],
  en: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "z", "x", "c", "v", "b", "n", "m", ",", "."]
};
let validCommands, stringLength, text, maxSpeed, chart, secondsNumber, accuracy, startTime, spentTime, endTime, activeKey;
var testIsWork = false;
let commands = commandlist[language];
rangeOpacity.style = "margin-top: 0.8rem;";
if (!localStorage.getItem("stringLength")) {
  localStorage.setItem("stringLength", "7");
  stringLength = 7;
}
printedTextTexfiled.classList.add("hidden");
if (!localStorage.getItem("printedTextOpacity")) {
  localStorage.setItem("printedTextOpacity", "60");
  printedTextOpacity = 60;
}
range.value = localStorage.getItem("stringLength");
stringLength = +localStorage.getItem("stringLength");
rangeLabel.textContent = stringLength;
rangeOpacity.value = localStorage.getItem("printedTextOpacity");
printedTextOpacity = +localStorage.getItem("printedTextOpacity");
rangeLabelOpacity.textContent = printedTextOpacity + "%";
printedTextTexfiled.style.opacity = 100 - rangeOpacity.value + "%";
printedWrongTexfiled.style.opacity = 100 - rangeOpacity.value + "%";
checkBoxAnimation.checked = Boolean(localStorage.getItem("animationOn") == "true");
checkBoxShowPrintedText.checked = Boolean(localStorage.getItem("showPrintedText") == "true");
checkBoxShowPrintedWrong.checked = Boolean(localStorage.getItem("showPrintedWrong") == "true");
checkBoxAdvanceMode.checked = Boolean(localStorage.getItem("isShowAdvanceModeOn") == "true");
if (checkBoxShowPrintedText.checked) {
  printedTextTexfiled.classList.remove("hidden");
} else {
  printedTextTexfiled.classList.add("hidden");
}
if (checkBoxShowPrintedWrong.checked) {
  isErrorModeActive = true;
} else {
  isErrorModeActive = false;
  document.getElementById("bcsp").classList.remove("active");
  printedWrongTexfiled.textContent = "";
}
if (checkBoxAdvanceMode.checked) {
  isShowAdvanceModeOn = true;
} else {
  isShowAdvanceModeOn = false;
}
if (!localStorage.getItem("lastresultslist")) {
  localStorage.setItem("lastresultslist", JSON.stringify([]));
}
if (!localStorage.getItem("isSecondModeOn")) {
  localStorage.setItem("isSecondModeOn", true);
}
if (!localStorage.getItem("topresultslist")) {
  localStorage.setItem("topresultslist", JSON.stringify([]));
}
if (localStorage.getItem("isSecondModeOn") == "true") {
  metricList = ["", "с.", "%", "н/с.", "сим."];
} else {
  metricList = ["", "мин.", "%", "н/мин.", "сим."];
}
switch (localStorage.getItem("setlanguage")) {
  case "java":
    resultList.language = "Java";
    break;
  case "cpp":
    resultList.language = "C++";
    break;
  case "ch":
    resultList.language = "C#";
    break;
  case "c":
    resultList.language = "C";
    break;
  case "python":
    resultList.language = "Python";
    break;
  case "css":
    resultList.language = "CSS";
    break;
  case "js":
    resultList.language = "JavaScript";
    break;
  case "html":
    resultList.language = "HTML";
    break;
  case "php":
    resultList.language = "PHP";
    break;
  case "sql":
    resultList.language = "SQL";
    break;
}
function generateList() {
  textArray = [];
  validCommands = Array.from(commands);
  for (let i = 0; i < stringLength; i++) {
    textArray.push(validCommands.splice(Math.random() * (validCommands.length - 1), 1).join());
  }
  text = textArray.join().replaceAll(",", "ㅤ");
  // text = text.replaceAll(",", "ㅤ");

  showText(text);
}
function showText() {
  textField.textContent = text.slice(1);
  textFieldFirstLetter.textContent = text[0];
  if (text[0]) {
    activeKey = text[0].replace("ㅤ", "space");
  }
  showActiveKey(activeKey);
}
function showActiveKey(key) {
  combineCapslockWithShift(activeKey, activeKey);
  if (document.getElementById(key)) {
    document.getElementById(key).classList.add("active");
  } else {
    keysSizeOne.forEach(key => {
      if (key.getAttribute("data-value") == activeKey) {
        key.classList.add("active");
        // document.getElementById("shift-r").classList.add("active");
        // document.getElementById("shift-l").classList.add("active");
      }
    });
    keysSizeAuto.forEach(key => {
      if (key.getAttribute("data-value") == activeKey) {
        key.classList.add("active");
        // document.getElementById("shift-r").classList.add("active");
        // document.getElementById("shift-l").classList.add("active");
      }
    });
  }
  if (printedWrongTexfiled.textContent != "") {
    keysSizeAuto.forEach(key => {
      if (key.id != "bcsp") key.classList.remove("active");
    });
    keysSizeOne.forEach(key => {
      key.classList.remove("active");
    });
  }
  // if (document.getElementById("shift-r").classList[1]) {
  // 	document.getElementById("shift-r").classList.remove("active");
  // 	document.getElementById("shift-l").classList.remove("active");
  // }
}
function keydown(keypress) {
  console.log(13123, activeKey);
  isCapsLockOn = keypress.getModifierState("CapsLock");
  let copyObject = {};
  Object.keys(keypress).forEach(key => {
    copyObject.key = keydown.key;
  });
  copyObject.key = replaceKey(keypress.key);
  keypress = copyObject;
  combineCapslockWithShift(activeKey, keypress.key);
  if (printedWrongTexfiled.textContent != "") {
    showActiveKey("bcsp");
  }
  if (document.getElementById("shift-r").classList[1] && keypress.key == "Shift" || document.getElementById("shift-l").classList[1] && keypress.key == "Shift" || keypress.key == "CapsLock") {
    return;
  }
  if (testIsWork && keypress.key != "Backspace" || testIsWork && !isErrorModeActive) {
    quantityAnswer++;
    quantityAnswerPerSecond++;
  }
  if (testIsWork) {
    if (keypress.key.replace(" ", "space") == activeKey) {
      correctAnswer();
    } else {
      unCorrectAnswer(keypress.key);
    }
  }
  if ((keypress.key == "Enter" || keypress.key == " ") && modalIsOpen) {
    closeModal();
  } else if (keypress.key == "Enter" && !testIsWork && !enterIsPress && !isLockOn) {
    startTest();
  }
}
function correctAnswer() {
  if (printedWrongTexfiled.textContent == "") {
    quantityСorrectAnswer++;
    quantityСorrectAnswerPerSecond++;
    if (document.getElementById(activeKey)) document.getElementById(activeKey).classList.remove("active");else {
      keysSizeOne.forEach(key => {
        if (key.getAttribute("data-value") == activeKey) {
          key.classList.remove("active");
        }
        document.getElementById("shift-r").classList.remove("active");
        document.getElementById("shift-l").classList.remove("active");
      });
      keysSizeAuto.forEach(key => {
        if (key.getAttribute("data-value") == activeKey) {
          key.classList.remove("active");
        }
        document.getElementById("shift-r").classList.remove("active");
        document.getElementById("shift-l").classList.remove("active");
      });
    }
    printedTextTexfiled.textContent += activeKey.replace("space", "ㅤ");
    text = text.slice(1);
    if (text == "") {
      showWinAnimation();
      document.getElementById("shift-r").classList.remove("active");
      document.getElementById("shift-l").classList.remove("active");
      isShowAdvanceModeOn = Boolean(localStorage.getItem("isShowAdvanceModeOn") == "true");
      printedTextTexfiled.textContent = "";
      printedWrongTexfiled.textContent = "";
    }
    activeKey = "";
    showText();
  } else {
    if (activeKey.length == 1 || activeKey == "space") {
      printedWrongTexfiled.textContent += activeKey.replace("space", "ㅤ");
    }
  }
}
function unCorrectAnswer(key) {
  console.log(key);
  let firstText = printedWrongTexfiled.textContent;
  if (isErrorModeActive) {
    if (key == "Backspace") {
      printedWrongTexfiled.textContent = printedWrongTexfiled.textContent.slice(0, -1);
    }
    console.log(key, 123456);
    if (key.length == 1) printedWrongTexfiled.textContent += key.replace(" ", "ㅤ");
    if (printedWrongTexfiled.textContent != "") {
      showActiveKey("bcsp");
    } else {
      document.getElementById("bcsp").classList.remove("active");
      showActiveKey(activeKey);
    }
  }
  if (isErrorModeActive && key != "Backspase") {
    quantityMistakeAnswer++;
    if (key == "Backspace" && firstText != "") {
      return;
    } else if (key == "Backspace" && firstText == "") {
      quantityAnswer++;
      quantityAnswerPerSecond++;
    }
  }
  key = key.replace(" ", "space").replace(`\\`, "sl-ob").replace("Enter", "enter");
  switch (key) {
    case "Shift":
      key = "shift-r";
      unCorrectAnswer("shift-l");
      break;
    case "Alt":
      key = "alt-r";
      unCorrectAnswer("alt-l");
      break;
    case "Control":
      key = "ctrl-r";
      unCorrectAnswer("ctrl-l");
      break;
    case "PageUp":
      key = "pgup";
      break;
    case "PageDown":
      key = "pgdn";
      break;
    case "Home":
      key = "home";
      break;
    case "End":
      key = "end";
      break;
    case "Escape":
      key = "esc";
      break;
    case "Tab":
      key = "tab";
      break;
    case "Backspace":
      key = "bcsp";
      break;
    case "Tab":
      key = "tab";
      break;
  }
  console.log(key);
  keysSizeOne.forEach(elem => {
    if (elem.getAttribute("data-value") == key) {
      elem.classList.add("hint");
      setTimeout(() => {
        elem.classList.remove("hint");
      }, 300);
    }
  });
  keysSizeAuto.forEach(elem => {
    if (elem.getAttribute("data-value") == key) {
      elem.classList.add("hint");
      setTimeout(() => {
        elem.classList.remove("hint");
      }, 300);
    }
  });
  console.log(key);
  if (document.getElementById(key)) {
    document.getElementById(key).classList.add("hint");
    setTimeout(() => {
      document.getElementById(key).classList.remove("hint");
    }, 300);
  }
}
function showWinAnimation() {
  endTime = new Date();
  resultCounting();
  description.style = "display:block;";
  if (checkBoxAnimation.checked) {
    let j = 0;
    rows.forEach(row => {
      setTimeout(() => {
        for (let i = 0; i < row.children.length; i++) {
          setTimeout(() => {
            row.children[i].style = `border: solid 0.15vw hsl(${i * 10}, 100%, 50%);box-shadow: 0 0 0.6vw hsl(${i * 10}, 100%, 50%);`;
            setTimeout(() => {
              row.children[i].style = "border: solid 0.15vw $keyboard-border;box-shadow: 0 0 0.6vw $keyboard-border;";
            }, 400);
          }, i * 100);
        }
      }, j * 200);
      j++;
    });
  }
  testIsWork = false;
}
function startTest() {
  printedTextTexfiled.textContent = "";
  printedWrongTexfiled.textContent = "";
  lastResultsList = JSON.parse(localStorage.getItem("lastresultslist") || "[]");
  topResultsList = JSON.parse(localStorage.getItem("topresultslist") || "[]");
  secondsNumber = 0;
  speedsList = [];
  mistakeList = [];
  secondsList = [];
  correctSpeedsList = [];
  startTime = new Date();
  quantityСorrectAnswerPerSecond = 0;
  quantityAnswerPerSecond = 0;
  quantityСorrectAnswer = 0;
  quantityAnswer = 0;
  quantityMistakeAnswer = 0;
  enterIsPress = true;
  description.textContent = "3";
  if (isShowAdvanceModeOn) {
    textFieldFirstLetter.style = "opacity:0.5;transition:0s";
    textField.style = "opacity:0.5;transition:0s";
    description.classList.add("active");
    generateList();
    if (document.getElementById(activeKey)) document.getElementById(activeKey).classList.remove("active");else {
      keysSizeOne.forEach(key => {
        if (key.getAttribute("data-value") == activeKey) {
          key.classList.remove("active");
        }
        document.getElementById("shift-r").classList.remove("active");
        document.getElementById("shift-l").classList.remove("active");
      });
      keysSizeAuto.forEach(key => {
        if (key.getAttribute("data-value") == activeKey) {
          key.classList.remove("active");
        }
        document.getElementById("shift-r").classList.remove("active");
        document.getElementById("shift-l").classList.remove("active");
      });
    }
  }
  setTimeout(() => {
    description.textContent = "2";
  }, 1000);
  setTimeout(() => {
    description.textContent = "1";
  }, 2000);
  setTimeout(() => {
    if (!isShowAdvanceModeOn) {
      generateList();
    } else {
      showActiveKey(activeKey);
    }
    description.classList.remove("active");
    testIsWork = true;
    enterIsPress = false;
    textFieldFirstLetter.style = "opacity:1";
    textField.style = "opacity:1";
    description.textContent = "Нажмите Enter чтобы начать";
    description.style = "display:none;";
  }, 3000);
}
function combineCapslockWithShift(key, pressKey) {
  if (!key || key == " ") return;
  let register = getRegister(key);
  if (isCapsLockOn) {
    console.log(getRegister(key), isCapsLockOn);
    switch (register) {
      case "Спец":
        console.log(1);
        document.getElementById("shift-r").classList.add("active");
        document.getElementById("shift-l").classList.add("active");
        break;
      case "Нижний":
        console.log(2);
        document.getElementById("shift-r").classList.add("active");
        document.getElementById("shift-l").classList.add("active");
        break;
      case "Верхний":
        console.log(3);
        document.getElementById("shift-r").classList.remove("active");
        document.getElementById("shift-l").classList.remove("active");
        break;
      default:
        document.getElementById("shift-r").classList.remove("active");
        document.getElementById("shift-l").classList.remove("active");
        break;
    }
  } else {
    let register = getRegister(key);
    console.log(getRegister(key));
    switch (register) {
      case "Спец":
        document.getElementById("shift-r").classList.add("active");
        document.getElementById("shift-l").classList.add("active");
        break;
      case "Верхний":
        document.getElementById("shift-r").classList.add("active");
        document.getElementById("shift-l").classList.add("active");
        break;
      case "Нижний":
        document.getElementById("shift-r").classList.remove("active");
        document.getElementById("shift-l").classList.remove("active");
        break;
      default:
        document.getElementById("shift-r").classList.remove("active");
        document.getElementById("shift-l").classList.remove("active");
        break;
    }
    if (!key) {
      document.getElementById("shift-r").classList.remove("active");
      document.getElementById("shift-l").classList.remove("active");
    }
  }
}
function resultCounting() {
  if (localStorage.getItem("isSecondModeOn") == "true") {
    checkBoxItemOne.style.opacity = "1";
    checkBoxItemTwo.style.opacity = "";
    modeOne();
  } else {
    checkBoxItemOne.style.opacity = "";
    checkBoxItemTwo.style.opacity = "1";
    modeTwo();
  }
  if (localStorage.getItem("isChartVisible") == "true") {
    checkBoxModeOne.style.opacity = "1";
    checkBoxModeTwo.style.opacity = "";
    visibleModeOne();
  } else {
    checkBoxModeOne.style.opacity = "";
    checkBoxModeTwo.style.opacity = "1";
    visibleModeTwo();
  }
  accuracy = quantityСorrectAnswer / quantityAnswer * 100;
  spentTime = (endTime - startTime) / 1000 - 3;
  spentTime = Math.round(spentTime * 100) / 100;
  secondsNumber++;
  secondsList.push(secondsNumber);
  mistakeList.push(quantityAnswerPerSecond - quantityСorrectAnswerPerSecond);
  speedsList.push(quantityAnswerPerSecond);
  correctSpeedsList.push(quantityСorrectAnswerPerSecond);
  quantityСorrectAnswerPerSecond = 0;
  quantityAnswerPerSecond = 0;
  resultList.time = spentTime;
  resultList.accuracy = Math.round(quantityСorrectAnswer / quantityAnswer * 100);
  resultList.speed = Math.round(quantityСorrectAnswer / spentTime * 100) / 100;
  resultList.length = quantityСorrectAnswer;
  maxSpeed = [...correctSpeedsList].sort()[correctSpeedsList.length - 1];
  postResult(language, Math.round(accuracy), spentTime, Math.round(quantityСorrectAnswer / spentTime * 100) / 100, maxSpeed, quantityAnswer, quantityСorrectAnswer, quantityMistakeAnswer);
  if (localStorage.getItem("isSecondModeOn") == "true") {
    resultFirst.textContent = `Время: ${spentTime} с.
Точность: ${Math.round(accuracy)} %
Средняя скорость: ${Math.round(quantityСorrectAnswer / spentTime * 100) / 100} н/c.`;
  } else {
    resultFirst.textContent = `Время: ${Math.round(spentTime / 6 * 100) / 1000} мин.
Точность: ${Math.round(accuracy)} %
Средняя скорость: ${Math.round(quantityСorrectAnswer / spentTime * 100) * 60 / 100} н/мин.`;
  }
  resultSecond.textContent = `Количество попаданий: ${quantityСorrectAnswer}
Количество ошибок: ${quantityAnswer - quantityСorrectAnswer}
Количество нажатий: ${quantityAnswer}`;
  openModal();
  topResultsList.push(resultList);
  lastResultsList.push(resultList);
  topResultsList = sortArray(topResultsList);
  if (lastResultsList.length > 5) {
    lastResultsList.shift();
  }
  if (topResultsList.length > 3) {
    topResultsList.pop();
  }
  lastResultsList = JSON.stringify(lastResultsList);
  localStorage.setItem("lastresultslist", lastResultsList);
  localStorage.setItem("topresultslist", JSON.stringify(topResultsList));
  if (localStorage.getItem("isSecondModeOn") == "false") {
    modalTime.forEach(element => {
      element.textContent = Math.round(parseFloat(element.textContent) / 6 * 100) / 1000 + " мин.";
    });
    modalSpeed.forEach(element => {
      element.textContent = Math.round(parseFloat(element.textContent) * 100) * 60 / 100 + " н/мин.";
    });
  } else {
    modalTime.forEach(element => {
      element.textContent;
    });
    modalSpeed.forEach(element => {
      element.textContent;
    });
  }
  fillLastTable();
}
setInterval(() => {
  if (testIsWork) {
    secondsNumber++;
    secondsList.push(secondsNumber);
    speedsList.push(quantityAnswerPerSecond);
    correctSpeedsList.push(quantityСorrectAnswerPerSecond);
    mistakeList.push(quantityAnswerPerSecond - quantityСorrectAnswerPerSecond);
    quantityСorrectAnswerPerSecond = 0;
    quantityAnswerPerSecond = 0;
  }
}, 1000);
function showChart() {
  chart = new Chart(chartCvs, {
    type: "line",
    data: {
      labels: secondsList.map(num => num - 1),
      datasets: [{
        data: correctSpeedsList,
        label: "Попадания",
        borderColor: "green",
        backgroundColor: "green",
        fill: false,
        tension: 0.4
      }, {
        data: speedsList,
        label: "Нажатия",
        borderColor: "royalblue",
        backgroundColor: "royalblue",
        fill: false,
        tension: 0.4
      }, {
        data: mistakeList,
        label: "Ошибки",
        borderColor: "red",
        backgroundColor: "red",
        fill: false,
        tension: 0.4
      }]
    },
    options: {
      scales: {
        x: {
          title: {
            display: true,
            align: "start",
            text: "Время (c)",
            font: {
              size: 14
            }
          }
        }
      },
      elements: {
        point: {
          radius: 4,
          hoverRadius: 5,
          hoverBorderWidth: 2
        },
        line: {
          hoverBorderWidth: 2
        }
      },
      plugins: {
        legend: {
          display: "false",
          position: "bottom"
        }
      },
      responsive: true,
      interaction: {
        mode: "index",
        intersect: false
      },
      title: {
        display: true,
        text: "World population per region (in millions)"
      }
    }
  });
  // setTimeout(() => {
  // 	chart.destroy();
  // }, 4000);
}
function closeModal() {
  if (modalIsOpen) {
    moreInfo.style.opacity = "0";
    isLockOn = false;
    modalIsOpen = false;
    setTimeout(() => {
      if (chart) {
        chart.destroy();
      }
      moreInfo.style.display = "none";
    }, 2000);
    modal.style = "";
  }
}
function openModal() {
  isLockOn = true;
  moreInfoButton.style = "";
  moreInfoButton.style.display = "block";
  if (checkBoxAnimation.checked) {
    setTimeout(() => {
      modal.style = "	top: 10.5vh;";
    }, 1500);
  } else {
    modal.style = "	top: 10.5vh;";
  }
  if (checkBoxAnimation.checked) {
    setTimeout(() => {
      modalIsOpen = true;
      showChart();
    }, 1700);
  } else {
    setTimeout(() => {
      modalIsOpen = true;
      showChart();
    }, 200);
  }
}
function showMoreInfo() {
  moreInfo.style.display = "flex";
  maxSpeed = [...correctSpeedsList].sort()[correctSpeedsList.length - 1];
  modal.style.height = "77vh";
  resultFirst.style.opacity = "0";
  resultSecond.style.opacity = "0";
  moreInfoButton.style.opacity = "0";
  setTimeout(() => {
    resultFirst.style.opacity = "1";
    resultSecond.style.opacity = "1";
    moreInfoButton.style.display = "none";
    if (localStorage.getItem("isSecondModeOn") == "true") {
      resultFirst.textContent = resultFirst.textContent + `
Максимальная скорость: ${maxSpeed} н/с.`;
    } else {
      resultFirst.textContent = resultFirst.textContent + `
Максимальная скорость: ${maxSpeed * 60} н/мин.`;
    }
    moreInfo.style.opacity = "1";
  }, 400);
}
function modeOne() {
  table.style.opacity = 0;
  setTimeout(() => {
    fillLastTable();
    table.style.opacity = 1;
    modalTime.forEach(element => {
      element.textContent;
      modalSpeed.forEach(element => {
        element.textContent;
      });
    });
  }, 500);
  if (localStorage.getItem("isSecondModeOn") == "false") {
    localStorage.setItem("isSecondModeOn", true);
    metricList = ["", "с.", "%", "н/с.", "сим."];
    checkBoxItemTwo.style.opacity = "";
    checkBoxItemOne.style.opacity = "1";
    resultFirst.style.opacity = "0";
    resultSecond.style.opacity = "0";
    setTimeout(() => {
      resultFirst.style.opacity = "";
      resultSecond.style.opacity = "";
      resultFirst.textContent = `Время: ${spentTime} c.
Точность: ${Math.round(accuracy)} %
Средняя скорость: ${Math.round(quantityСorrectAnswer / spentTime * 100) / 100} н/c.
Максимальная скорость: ${maxSpeed} н/c.`;
    }, 400);
  }
}
function modeTwo() {
  table.style.opacity = 0;
  setTimeout(() => {
    fillLastTable();
    table.style.opacity = 1;
    modalTime.forEach(element => {
      if (parseFloat(element.textContent)) {
        element.textContent = Math.round(parseFloat(element.textContent) / 6 * 100) / 1000 + " мин.";
      }
    });
    modalSpeed.forEach(element => {
      if (parseFloat(element.textContent)) {
        element.textContent = Math.round(parseFloat(element.textContent) * 100) * 60 / 100 + " н/мин.";
      }
    });
  }, 500);
  if (localStorage.getItem("isSecondModeOn") == "true") {
    metricList = ["", "мин.", "%", "н/мин.", "сим."];
    localStorage.setItem("isSecondModeOn", false);
    checkBoxItemOne.style.opacity = "";
    checkBoxItemTwo.style.opacity = "1";
    resultFirst.style.opacity = "0";
    resultSecond.style.opacity = "0";
    setTimeout(() => {
      resultFirst.style.opacity = "";
      resultSecond.style.opacity = "";
      resultFirst.textContent = `Время: ${Math.round(spentTime / 6 * 100) / 1000} мин.
Точность: ${Math.round(accuracy)} %
Средняя скорость: ${Math.round(quantityСorrectAnswer / spentTime * 100) * 60 / 100} н/мин.
Максимальная скорость: ${maxSpeed * 60} н/мин.`;
    }, 400);
  }
}
function visibleModeOne() {
  localStorage.setItem("isChartVisible", true);
  checkBoxModeTwo.style.opacity = "";
  checkBoxModeOne.style.opacity = "1";
  pastResults.style.opacity = "0";
  chartCvs.style.display = "block";
  setTimeout(() => {
    pastResults.style.display = "none";
    chartCvs.style.opacity = "1";
  }, 500);
}
function setAnimationWork() {
  if (this.checked) {
    localStorage.setItem("animationOn", true);
  } else {
    localStorage.setItem("animationOn", false);
  }
}
function setShowPrintedText() {
  if (this.checked) {
    localStorage.setItem("showPrintedText", true);
  } else {
    localStorage.setItem("showPrintedText", false);
  }
}
function setShowPrintedWrong() {
  if (this.checked) {
    localStorage.setItem("showPrintedWrong", true);
  } else {
    localStorage.setItem("showPrintedWrong", false);
  }
}
function visibleModeTwo() {
  localStorage.setItem("isChartVisible", false);
  chartCvs.style.opacity = 0;
  pastResults.style.display = "block";
  setTimeout(() => {
    chartCvs.style.display = "none";
    pastResults.style.opacity = "1";
  }, 500);
  checkBoxModeTwo.style.opacity = "1";
  checkBoxModeOne.style.opacity = "";
}
function fillLastTable() {
  let countRow = 4;
  let elementContent;
  lastResultsList = JSON.parse(localStorage.getItem("lastresultslist"));
  tableRows.forEach(row => {
    let countElement = 0;
    Array.from(row.children).forEach(element => {
      elementContent = lastResultsList[countRow];
      if (elementContent) {
        if (Object.values(elementContent)[countElement]) {
          element.textContent = Object.values(elementContent)[countElement] + " " + metricList[countElement];
          countElement++;
        }
      } else {
        element.textContent = "";
      }
    });
    countRow--;
  });
  countRow = 0;
  elementContent;
  topResultsList = JSON.parse(localStorage.getItem("topresultslist"));
  tableRowsTop.forEach(row => {
    let countElement = 0;
    Array.from(row.children).forEach(element => {
      elementContent = topResultsList[countRow];
      if (elementContent) {
        element.style.color = "";
        if (elementContent["speed"] * elementContent["accuracy"] * elementContent["time"] == resultList["speed"] * resultList["accuracy"] * resultList["time"]) {
          element.style.color = "green";
        }
        element.textContent = Object.values(elementContent)[countElement] + " " + metricList[countElement];
        if (countElement == 0) {
          element.textContent = countRow + 1 + ". " + element.textContent;
        }
      } else {
        element.textContent = "";
      }
      countElement++;
    });
    countRow++;
  });
}
function sortArray(array) {
  return array.sort((elementOne, elementTwo) => {
    let firstResult = elementOne["speed"] * elementOne["accuracy"];
    let secondResult = elementTwo["speed"] * elementTwo["accuracy"];
    return firstResult > secondResult ? -1 : firstResult < secondResult ? 1 : 0;
  });
}
function setLength() {
  localStorage.setItem("stringLength", range.value);
  range.value = localStorage.getItem("stringLength");
  stringLength = +localStorage.getItem("stringLength");
  rangeLabel.textContent = stringLength;
  isShowAdvanceModeOn;
}
function setOpacity() {
  printedTextTexfiled.style.opacity = 100 - rangeOpacity.value + "%";
  printedWrongTexfiled.style.opacity = 100 - rangeOpacity.value + "%";
  localStorage.setItem("printedTextOpacity", rangeOpacity.value);
  rangeOpacity.value = localStorage.getItem("printedTextOpacity");
  rangeLabelOpacity.textContent = +localStorage.getItem("printedTextOpacity") + "%";
}
function setAdvanceMode() {
  if (testIsWork) {
    if (this.checked) {
      localStorage.setItem("isShowAdvanceModeOn", true);
    } else {
      localStorage.setItem("isShowAdvanceModeOn", false);
    }
  } else {
    if (this.checked) {
      isShowAdvanceModeOn = true;
      localStorage.setItem("isShowAdvanceModeOn", true);
    } else {
      isShowAdvanceModeOn = false;
      localStorage.setItem("isShowAdvanceModeOn", false);
    }
  }
}
function resetResult() {
  localStorage.setItem("lastresultslist", JSON.stringify([]));
  localStorage.setItem("topresultslist", JSON.stringify([]));
  fillLastTable();
}
document.addEventListener("keydown", keydown);
button.addEventListener("click", closeModal);
resetResultButton.addEventListener("click", resetResult);
moreInfoButton.addEventListener("click", showMoreInfo);
Array.from(document.getElementsByTagName("section")).forEach(section => {
  section.addEventListener("click", closeModal);
});
document.getElementsByTagName("header")[0].addEventListener("click", closeModal);
checkBoxItemOne.addEventListener("click", modeOne);
checkBoxItemTwo.addEventListener("click", modeTwo);
checkBoxAnimation.addEventListener("change", setAnimationWork);
checkBoxShowPrintedText.addEventListener("change", setShowPrintedText);
checkBoxShowPrintedWrong.addEventListener("change", setShowPrintedWrong);
checkBoxAdvanceMode.addEventListener("change", setAdvanceMode);
checkBoxShowPrintedText.addEventListener("change", () => {
  if (checkBoxShowPrintedText.checked) {
    printedTextTexfiled.classList.remove("hidden");
    // printedWrongTexfiled.style.opacity = "1";
  } else {
    printedTextTexfiled.classList.add("hidden");
    // printedWrongTexfiled.style.opacity = "0";
  }
});
checkBoxShowPrintedWrong.addEventListener("change", () => {
  if (checkBoxShowPrintedWrong.checked) {
    isErrorModeActive = true;
  } else {
    isErrorModeActive = false;
    document.getElementById("bcsp").classList.remove("active");
    printedWrongTexfiled.textContent = "";
    if (activeKey) showActiveKey(activeKey);
  }
});
checkBoxModeOne.addEventListener("click", visibleModeOne);
checkBoxModeTwo.addEventListener("click", visibleModeTwo);
range.addEventListener("change", setLength);
range.addEventListener("mousemove", setLength);
setLength();
rangeOpacity.addEventListener("change", setOpacity);
rangeOpacity.addEventListener("mousemove", setOpacity);
setOpacity();
function getRegister(sumbol) {
  if (sumbol == sumbol.toLowerCase() && sumbol == sumbol.toUpperCase() && sumbol != " " && sumbol != "." && sumbol != "/" && sumbol != "[" && sumbol != "]" && sumbol != "=" && sumbol != "-") {
    return "Спец";
  } else if (sumbol != sumbol.toLowerCase() && sumbol == sumbol.toUpperCase()) {
    return "Верхний";
  } else if (sumbol == sumbol.toLowerCase() && sumbol != sumbol.toUpperCase()) {
    return "Нижний";
  }
}
function replaceKey(keyPr) {
  keys.ru.forEach((key, index) => {
    if (keyPr.length == 1) keyPr = keyPr.replace(key, keys.en[index]).replace(key.toUpperCase(), keys.en[index].toUpperCase());
  });
  return keyPr;
}//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwaW5ndGVzdC5qcyIsIm5hbWVzIjpbImNvbW1hbmRsaXN0IiwiYnV0dG9uIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiY2hhcnRDdnMiLCJnZXRFbGVtZW50QnlJZCIsImNoZWNrQm94QW5pbWF0aW9uIiwiY2hlY2tCb3hTaG93UHJpbnRlZFRleHQiLCJjaGVja0JveFNob3dQcmludGVkV3JvbmciLCJjaGVja0JveEFkdmFuY2VNb2RlIiwicHJpbnRlZFRleHRUZXhmaWxlZCIsInByaW50ZWRXcm9uZ1RleGZpbGVkIiwiaXNTaG93QWR2YW5jZU1vZGVPbiIsImNoZWNrQm94SXRlbU9uZSIsImNoZWNrQm94SXRlbVR3byIsImNoZWNrQm94TW9kZU9uZSIsImNoZWNrQm94TW9kZVR3byIsImNvcnJlY3RTcGVlZHNMaXN0IiwicHJpbnRlZFRleHQiLCJwcmludGVkV3JvbmciLCJpc0Vycm9yTW9kZUFjdGl2ZSIsImRlc2NyaXB0aW9uIiwiZW50ZXJJc1ByZXNzIiwiaXNDYXBzTG9ja09uIiwiaXNMZWFybmluZ01vZGVPbiIsImlzTG9ja09uIiwia2V5c1NpemVBdXRvIiwiQXJyYXkiLCJmcm9tIiwia2V5c1NpemVPbmUiLCJsYXN0UmVzdWx0c0xpc3QiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwiSlNPTiIsInN0cmluZ2lmeSIsImxhbmd1YWdlIiwibWV0cmljTGlzdCIsIm1pc3Rha2VMaXN0IiwibW9kYWwiLCJtb2RhbElzT3BlbiIsIm1vZGFsU3BlZWQiLCJtb2RhbFRpbWUiLCJtb3JlSW5mbyIsIm1vcmVJbmZvQnV0dG9uIiwicGFzdFJlc3VsdHMiLCJxdWFudGl0eUFuc3dlciIsInF1YW50aXR5QW5zd2VyUGVyU2Vjb25kIiwicXVhbnRpdHlNaXN0YWtlQW5zd2VyIiwicXVhbnRpdHnQoW9ycmVjdEFuc3dlciIsInF1YW50aXR50KFvcnJlY3RBbnN3ZXJQZXJTZWNvbmQiLCJyYW5nZSIsInJhbmdlTGFiZWwiLCJyYW5nZU9wYWNpdHkiLCJjb25zb2xlIiwibG9nIiwicmFuZ2VMYWJlbE9wYWNpdHkiLCJwcmludGVkVGV4dE9wYWNpdHkiLCJyZXN1bHRGaXJzdCIsInJlc3VsdExpc3QiLCJyZXN1bHRTZWNvbmQiLCJyZXNldFJlc3VsdEJ1dHRvbiIsInJvd0NvbnRlbnQiLCJ0ZXh0Q29udGVudCIsInJvd3MiLCJzZWNvbmRzTGlzdCIsInNwZWVkc0xpc3QiLCJ0YWJsZSIsInRhYmxlUm93cyIsInRhYmxlUm93c1RvcCIsInRleHRBcnJheSIsInRleHRGaWVsZCIsInRleHRGaWVsZEZpcnN0TGV0dGVyIiwidGV4dEZpZWxkVGV4dCIsInRvcExpc3QiLCJ0b3BSZXN1bHRzTGlzdCIsImtleXMiLCJydSIsImVuIiwidmFsaWRDb21tYW5kcyIsInN0cmluZ0xlbmd0aCIsInRleHQiLCJtYXhTcGVlZCIsImNoYXJ0Iiwic2Vjb25kc051bWJlciIsImFjY3VyYWN5Iiwic3RhcnRUaW1lIiwic3BlbnRUaW1lIiwiZW5kVGltZSIsImFjdGl2ZUtleSIsInRlc3RJc1dvcmsiLCJjb21tYW5kcyIsInN0eWxlIiwic2V0SXRlbSIsImNsYXNzTGlzdCIsImFkZCIsInZhbHVlIiwib3BhY2l0eSIsImNoZWNrZWQiLCJCb29sZWFuIiwicmVtb3ZlIiwiZ2VuZXJhdGVMaXN0IiwiaSIsInB1c2giLCJzcGxpY2UiLCJNYXRoIiwicmFuZG9tIiwibGVuZ3RoIiwiam9pbiIsInJlcGxhY2VBbGwiLCJzaG93VGV4dCIsInNsaWNlIiwicmVwbGFjZSIsInNob3dBY3RpdmVLZXkiLCJrZXkiLCJjb21iaW5lQ2Fwc2xvY2tXaXRoU2hpZnQiLCJmb3JFYWNoIiwiZ2V0QXR0cmlidXRlIiwiaWQiLCJrZXlkb3duIiwia2V5cHJlc3MiLCJnZXRNb2RpZmllclN0YXRlIiwiY29weU9iamVjdCIsIk9iamVjdCIsInJlcGxhY2VLZXkiLCJjb3JyZWN0QW5zd2VyIiwidW5Db3JyZWN0QW5zd2VyIiwiY2xvc2VNb2RhbCIsInN0YXJ0VGVzdCIsInNob3dXaW5BbmltYXRpb24iLCJmaXJzdFRleHQiLCJlbGVtIiwic2V0VGltZW91dCIsIkRhdGUiLCJyZXN1bHRDb3VudGluZyIsImoiLCJyb3ciLCJjaGlsZHJlbiIsInBhcnNlIiwicHJlc3NLZXkiLCJyZWdpc3RlciIsImdldFJlZ2lzdGVyIiwibW9kZU9uZSIsIm1vZGVUd28iLCJ2aXNpYmxlTW9kZU9uZSIsInZpc2libGVNb2RlVHdvIiwicm91bmQiLCJ0aW1lIiwic3BlZWQiLCJzb3J0IiwicG9zdFJlc3VsdCIsIm9wZW5Nb2RhbCIsInNvcnRBcnJheSIsInNoaWZ0IiwicG9wIiwiZWxlbWVudCIsInBhcnNlRmxvYXQiLCJmaWxsTGFzdFRhYmxlIiwic2V0SW50ZXJ2YWwiLCJzaG93Q2hhcnQiLCJDaGFydCIsInR5cGUiLCJkYXRhIiwibGFiZWxzIiwibWFwIiwibnVtIiwiZGF0YXNldHMiLCJsYWJlbCIsImJvcmRlckNvbG9yIiwiYmFja2dyb3VuZENvbG9yIiwiZmlsbCIsInRlbnNpb24iLCJvcHRpb25zIiwic2NhbGVzIiwieCIsInRpdGxlIiwiZGlzcGxheSIsImFsaWduIiwiZm9udCIsInNpemUiLCJlbGVtZW50cyIsInBvaW50IiwicmFkaXVzIiwiaG92ZXJSYWRpdXMiLCJob3ZlckJvcmRlcldpZHRoIiwibGluZSIsInBsdWdpbnMiLCJsZWdlbmQiLCJwb3NpdGlvbiIsInJlc3BvbnNpdmUiLCJpbnRlcmFjdGlvbiIsIm1vZGUiLCJpbnRlcnNlY3QiLCJkZXN0cm95Iiwic2hvd01vcmVJbmZvIiwiaGVpZ2h0Iiwic2V0QW5pbWF0aW9uV29yayIsInNldFNob3dQcmludGVkVGV4dCIsInNldFNob3dQcmludGVkV3JvbmciLCJjb3VudFJvdyIsImVsZW1lbnRDb250ZW50IiwiY291bnRFbGVtZW50IiwidmFsdWVzIiwiY29sb3IiLCJhcnJheSIsImVsZW1lbnRPbmUiLCJlbGVtZW50VHdvIiwiZmlyc3RSZXN1bHQiLCJzZWNvbmRSZXN1bHQiLCJzZXRMZW5ndGgiLCJzZXRPcGFjaXR5Iiwic2V0QWR2YW5jZU1vZGUiLCJyZXNldFJlc3VsdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInNlY3Rpb24iLCJzdW1ib2wiLCJ0b0xvd2VyQ2FzZSIsInRvVXBwZXJDYXNlIiwia2V5UHIiLCJpbmRleCJdLCJzb3VyY2VzIjpbInR5cGluZ3Rlc3QuanMiXSwic291cmNlc0NvbnRlbnQiOlsiYHVzZSBzdHJpY3RgO1xyXG5pbXBvcnQgY29tbWFuZGxpc3QgZnJvbSBcIi4vY29tbWFuZGxpc3QuanNcIjtcclxubGV0IGJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJtb2RhbF9fYnV0dG9uXCIpWzBdO1xyXG5sZXQgY2hhcnRDdnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vZGFsY2hhcnRcIik7XHJcbmxldCBjaGVja0JveEFuaW1hdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGVhZGVyLWNoZWNrYm94LWZpcnN0XCIpO1xyXG5sZXQgY2hlY2tCb3hTaG93UHJpbnRlZFRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhlYWRlci1jaGVja2JveC1zZWNvbmRcIik7XHJcbmxldCBjaGVja0JveFNob3dQcmludGVkV3JvbmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhlYWRlci1jaGVja2JveC10aGlyZFwiKTtcclxubGV0IGNoZWNrQm94QWR2YW5jZU1vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhlYWRlci1jaGVja2JveC1mb3VydGhcIik7XHJcbmxldCBwcmludGVkVGV4dFRleGZpbGVkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0ZXh0ZmllbGQtcHJpbnRlZFwiKTtcclxubGV0IHByaW50ZWRXcm9uZ1RleGZpbGVkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0ZXh0ZmllbGQtd3JvbmdcIik7XHJcbmxldCBpc1Nob3dBZHZhbmNlTW9kZU9uID0gdHJ1ZTtcclxubGV0IGNoZWNrQm94SXRlbU9uZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJtb2RhbF9fY2hlY2tib3hcIilbMl07XHJcbmxldCBjaGVja0JveEl0ZW1Ud28gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibW9kYWxfX2NoZWNrYm94XCIpWzNdO1xyXG5sZXQgY2hlY2tCb3hNb2RlT25lID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm1vZGFsX19jaGVja2JveFwiKVswXTtcclxubGV0IGNoZWNrQm94TW9kZVR3byA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJtb2RhbF9fY2hlY2tib3hcIilbMV07XHJcbmxldCBjb3JyZWN0U3BlZWRzTGlzdCA9IFtdO1xyXG5sZXQgcHJpbnRlZFRleHQgPSBcIlwiO1xyXG5sZXQgcHJpbnRlZFdyb25nID0gXCJcIjtcclxubGV0IGlzRXJyb3JNb2RlQWN0aXZlID0gIXRydWU7XHJcbmxldCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVzY3JpcHRpb25cIik7XHJcbmxldCBlbnRlcklzUHJlc3MgPSBmYWxzZTtcclxubGV0IGlzQ2Fwc0xvY2tPbjtcclxubGV0IGlzTGVhcm5pbmdNb2RlT24gPSBmYWxzZTtcclxubGV0IGlzTG9ja09uID0gZmFsc2U7XHJcbmxldCBrZXlzU2l6ZUF1dG8gPSBBcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJrZXlib2FyZF9fa2V5X3NpemUtYXV0b1wiKSk7XHJcbmxldCBrZXlzU2l6ZU9uZSA9IEFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImtleWJvYXJkX19rZXlfc2l6ZS1vbmVcIikpO1xyXG5sZXQgbGFzdFJlc3VsdHNMaXN0ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJsYXN0cmVzdWx0c2xpc3RcIikgfHwgSlNPTi5zdHJpbmdpZnkoW10pO1xyXG5sZXQgbGFuZ3VhZ2UgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInNldGxhbmd1YWdlXCIpO1xyXG5sZXQgbWV0cmljTGlzdCA9IFtcIlwiLCBcItGBLlwiLCBcIiVcIiwgXCLQvS/RgS5cIiwgXCLRgdC40LwuXCJdO1xyXG5sZXQgbWlzdGFrZUxpc3QgPSBbXTtcclxubGV0IG1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm1vZGFsXCIpWzBdO1xyXG5sZXQgbW9kYWxJc09wZW4gPSBmYWxzZTtcclxubGV0IG1vZGFsU3BlZWQgPSBBcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJtb2RhbF9fc3BlZWRcIikpO1xyXG5sZXQgbW9kYWxUaW1lID0gQXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibW9kYWxfX3RpbWVcIikpO1xyXG5sZXQgbW9yZUluZm8gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibW9kYWxfX21vcmUtaW5mb1wiKVswXTtcclxubGV0IG1vcmVJbmZvQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm1vZGFsX19saW5rXCIpWzBdO1xyXG5sZXQgcGFzdFJlc3VsdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibW9kYWxfX3Bhc3QtcmVzdWx0c1wiKVswXTtcclxubGV0IHF1YW50aXR5QW5zd2VyID0gMDtcclxubGV0IHF1YW50aXR5QW5zd2VyUGVyU2Vjb25kID0gMDtcclxubGV0IHF1YW50aXR5TWlzdGFrZUFuc3dlciA9IDA7XHJcbmxldCBxdWFudGl0edChb3JyZWN0QW5zd2VyID0gMDtcclxubGV0IHF1YW50aXR50KFvcnJlY3RBbnN3ZXJQZXJTZWNvbmQgPSAwO1xyXG5sZXQgcmFuZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJhbmdlLWZpcnN0XCIpO1xyXG5sZXQgcmFuZ2VMYWJlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmFuZ2VsYWJlbC1maXJzdFwiKTtcclxubGV0IHJhbmdlT3BhY2l0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmFuZ2Utc2Vjb25kXCIpO1xyXG5jb25zb2xlLmxvZyhyYW5nZU9wYWNpdHkpO1xyXG5sZXQgcmFuZ2VMYWJlbE9wYWNpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJhbmdlbGFiZWwtc2Vjb25kXCIpO1xyXG5sZXQgcHJpbnRlZFRleHRPcGFjaXR5O1xyXG5sZXQgcmVzdWx0Rmlyc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibW9kYWxfX3Jlc3VsdHNcIilbMF07XHJcbmxldCByZXN1bHRMaXN0ID0ge307XHJcbmxldCByZXN1bHRTZWNvbmQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibW9kYWxfX3Jlc3VsdHNcIilbMV07XHJcbmxldCByZXNldFJlc3VsdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJoZWFkZXJfX3Jlc2V0LXJlc3VsdFwiKVswXTtcclxubGV0IHJvd0NvbnRlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibW9kYWxfX3RyXCIpWzBdLnRleHRDb250ZW50O1xyXG5sZXQgcm93cyA9IEFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImtleWJvYXJkX19yb3dcIikpO1xyXG5sZXQgc2Vjb25kc0xpc3QgPSBbXTtcclxubGV0IHNwZWVkc0xpc3QgPSBbXTtcclxubGV0IHRhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm1vZGFsX190YWJsZVwiKVswXTtcclxubGV0IHRhYmxlUm93cyA9IEFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm1vZGFsX190clwiKSk7XHJcbmxldCB0YWJsZVJvd3NUb3AgPSBBcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJtb2RhbF9fdHItdG9wXCIpKTtcclxubGV0IHRleHRBcnJheSA9IFtdO1xyXG5sZXQgdGV4dEZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0ZXh0ZmllbGRcIik7XHJcbmxldCB0ZXh0RmllbGRGaXJzdExldHRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGV4dGZpZWxkLWFjdGl2ZVwiKTtcclxubGV0IHRleHRGaWVsZFRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRleHRmaWVsZF9fdGV4dFwiKTtcclxubGV0IHRvcExpc3QgPSB7fTtcclxubGV0IHRvcFJlc3VsdHNMaXN0ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0b3ByZXN1bHRzbGlzdFwiKSB8fCBKU09OLnN0cmluZ2lmeShbXSk7XHJcbmxldCBrZXlzID0ge1xyXG5cdHJ1OiBbXHJcblx0XHRcItC5XCIsXHJcblx0XHRcItGGXCIsXHJcblx0XHRcItGDXCIsXHJcblx0XHRcItC6XCIsXHJcblx0XHRcItC1XCIsXHJcblx0XHRcItC9XCIsXHJcblx0XHRcItCzXCIsXHJcblx0XHRcItGIXCIsXHJcblx0XHRcItGJXCIsXHJcblx0XHRcItC3XCIsXHJcblx0XHRcItGFXCIsXHJcblx0XHRcItGKXCIsXHJcblx0XHRcItGEXCIsXHJcblx0XHRcItGLXCIsXHJcblx0XHRcItCyXCIsXHJcblx0XHRcItCwXCIsXHJcblx0XHRcItC/XCIsXHJcblx0XHRcItGAXCIsXHJcblx0XHRcItC+XCIsXHJcblx0XHRcItC7XCIsXHJcblx0XHRcItC0XCIsXHJcblx0XHRcItC2XCIsXHJcblx0XHRcItGNXCIsXHJcblx0XHRcItGPXCIsXHJcblx0XHRcItGHXCIsXHJcblx0XHRcItGBXCIsXHJcblx0XHRcItC8XCIsXHJcblx0XHRcItC4XCIsXHJcblx0XHRcItGCXCIsXHJcblx0XHRcItGMXCIsXHJcblx0XHRcItCxXCIsXHJcblx0XHRcItGOXCIsXHJcblx0XSxcclxuXHRlbjogW1xyXG5cdFx0XCJxXCIsXHJcblx0XHRcIndcIixcclxuXHRcdFwiZVwiLFxyXG5cdFx0XCJyXCIsXHJcblx0XHRcInRcIixcclxuXHRcdFwieVwiLFxyXG5cdFx0XCJ1XCIsXHJcblx0XHRcImlcIixcclxuXHRcdFwib1wiLFxyXG5cdFx0XCJwXCIsXHJcblx0XHRcIltcIixcclxuXHRcdFwiXVwiLFxyXG5cdFx0XCJhXCIsXHJcblx0XHRcInNcIixcclxuXHRcdFwiZFwiLFxyXG5cdFx0XCJmXCIsXHJcblx0XHRcImdcIixcclxuXHRcdFwiaFwiLFxyXG5cdFx0XCJqXCIsXHJcblx0XHRcImtcIixcclxuXHRcdFwibFwiLFxyXG5cdFx0XCI7XCIsXHJcblx0XHRcIidcIixcclxuXHRcdFwielwiLFxyXG5cdFx0XCJ4XCIsXHJcblx0XHRcImNcIixcclxuXHRcdFwidlwiLFxyXG5cdFx0XCJiXCIsXHJcblx0XHRcIm5cIixcclxuXHRcdFwibVwiLFxyXG5cdFx0XCIsXCIsXHJcblx0XHRcIi5cIixcclxuXHRdLFxyXG59O1xyXG5sZXQgdmFsaWRDb21tYW5kcyxcclxuXHRzdHJpbmdMZW5ndGgsXHJcblx0dGV4dCxcclxuXHRtYXhTcGVlZCxcclxuXHRjaGFydCxcclxuXHRzZWNvbmRzTnVtYmVyLFxyXG5cdGFjY3VyYWN5LFxyXG5cdHN0YXJ0VGltZSxcclxuXHRzcGVudFRpbWUsXHJcblx0ZW5kVGltZSxcclxuXHRhY3RpdmVLZXk7XHJcbnZhciB0ZXN0SXNXb3JrID0gZmFsc2U7XHJcbmxldCBjb21tYW5kcyA9IGNvbW1hbmRsaXN0W2xhbmd1YWdlXTtcclxucmFuZ2VPcGFjaXR5LnN0eWxlID0gXCJtYXJnaW4tdG9wOiAwLjhyZW07XCI7XHJcbmlmICghbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJzdHJpbmdMZW5ndGhcIikpIHtcclxuXHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInN0cmluZ0xlbmd0aFwiLCBcIjdcIik7XHJcblx0c3RyaW5nTGVuZ3RoID0gNztcclxufVxyXG5wcmludGVkVGV4dFRleGZpbGVkLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcbmlmICghbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwcmludGVkVGV4dE9wYWNpdHlcIikpIHtcclxuXHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByaW50ZWRUZXh0T3BhY2l0eVwiLCBcIjYwXCIpO1xyXG5cdHByaW50ZWRUZXh0T3BhY2l0eSA9IDYwO1xyXG59XHJcbnJhbmdlLnZhbHVlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJzdHJpbmdMZW5ndGhcIik7XHJcbnN0cmluZ0xlbmd0aCA9ICtsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInN0cmluZ0xlbmd0aFwiKTtcclxucmFuZ2VMYWJlbC50ZXh0Q29udGVudCA9IHN0cmluZ0xlbmd0aDtcclxucmFuZ2VPcGFjaXR5LnZhbHVlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwcmludGVkVGV4dE9wYWNpdHlcIik7XHJcbnByaW50ZWRUZXh0T3BhY2l0eSA9ICtsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByaW50ZWRUZXh0T3BhY2l0eVwiKTtcclxucmFuZ2VMYWJlbE9wYWNpdHkudGV4dENvbnRlbnQgPSBwcmludGVkVGV4dE9wYWNpdHkgKyBcIiVcIjtcclxucHJpbnRlZFRleHRUZXhmaWxlZC5zdHlsZS5vcGFjaXR5ID0gMTAwIC0gcmFuZ2VPcGFjaXR5LnZhbHVlICsgXCIlXCI7XHJcbnByaW50ZWRXcm9uZ1RleGZpbGVkLnN0eWxlLm9wYWNpdHkgPSAxMDAgLSByYW5nZU9wYWNpdHkudmFsdWUgKyBcIiVcIjtcclxuY2hlY2tCb3hBbmltYXRpb24uY2hlY2tlZCA9IEJvb2xlYW4obG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJhbmltYXRpb25PblwiKSA9PSBcInRydWVcIik7XHJcbmNoZWNrQm94U2hvd1ByaW50ZWRUZXh0LmNoZWNrZWQgPSBCb29sZWFuKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwic2hvd1ByaW50ZWRUZXh0XCIpID09IFwidHJ1ZVwiKTtcclxuY2hlY2tCb3hTaG93UHJpbnRlZFdyb25nLmNoZWNrZWQgPSBCb29sZWFuKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwic2hvd1ByaW50ZWRXcm9uZ1wiKSA9PSBcInRydWVcIik7XHJcbmNoZWNrQm94QWR2YW5jZU1vZGUuY2hlY2tlZCA9IEJvb2xlYW4obG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJpc1Nob3dBZHZhbmNlTW9kZU9uXCIpID09IFwidHJ1ZVwiKTtcclxuaWYgKGNoZWNrQm94U2hvd1ByaW50ZWRUZXh0LmNoZWNrZWQpIHtcclxuXHRwcmludGVkVGV4dFRleGZpbGVkLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbn0gZWxzZSB7XHJcblx0cHJpbnRlZFRleHRUZXhmaWxlZC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xyXG59XHJcbmlmIChjaGVja0JveFNob3dQcmludGVkV3JvbmcuY2hlY2tlZCkge1xyXG5cdGlzRXJyb3JNb2RlQWN0aXZlID0gdHJ1ZTtcclxufSBlbHNlIHtcclxuXHRpc0Vycm9yTW9kZUFjdGl2ZSA9IGZhbHNlO1xyXG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmNzcFwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG5cdHByaW50ZWRXcm9uZ1RleGZpbGVkLnRleHRDb250ZW50ID0gXCJcIjtcclxufVxyXG5pZiAoY2hlY2tCb3hBZHZhbmNlTW9kZS5jaGVja2VkKSB7XHJcblx0aXNTaG93QWR2YW5jZU1vZGVPbiA9IHRydWU7XHJcbn0gZWxzZSB7XHJcblx0aXNTaG93QWR2YW5jZU1vZGVPbiA9IGZhbHNlO1xyXG59XHJcbmlmICghbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJsYXN0cmVzdWx0c2xpc3RcIikpIHtcclxuXHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImxhc3RyZXN1bHRzbGlzdFwiLCBKU09OLnN0cmluZ2lmeShbXSkpO1xyXG59XHJcbmlmICghbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJpc1NlY29uZE1vZGVPblwiKSkge1xyXG5cdGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiaXNTZWNvbmRNb2RlT25cIiwgdHJ1ZSk7XHJcbn1cclxuXHJcbmlmICghbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ0b3ByZXN1bHRzbGlzdFwiKSkge1xyXG5cdGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidG9wcmVzdWx0c2xpc3RcIiwgSlNPTi5zdHJpbmdpZnkoW10pKTtcclxufVxyXG5pZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJpc1NlY29uZE1vZGVPblwiKSA9PSBcInRydWVcIikge1xyXG5cdG1ldHJpY0xpc3QgPSBbXCJcIiwgXCLRgS5cIiwgXCIlXCIsIFwi0L0v0YEuXCIsIFwi0YHQuNC8LlwiXTtcclxufSBlbHNlIHtcclxuXHRtZXRyaWNMaXN0ID0gW1wiXCIsIFwi0LzQuNC9LlwiLCBcIiVcIiwgXCLQvS/QvNC40L0uXCIsIFwi0YHQuNC8LlwiXTtcclxufVxyXG5cclxuc3dpdGNoIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInNldGxhbmd1YWdlXCIpKSB7XHJcblx0Y2FzZSBcImphdmFcIjpcclxuXHRcdHJlc3VsdExpc3QubGFuZ3VhZ2UgPSBcIkphdmFcIjtcclxuXHRcdGJyZWFrO1xyXG5cdGNhc2UgXCJjcHBcIjpcclxuXHRcdHJlc3VsdExpc3QubGFuZ3VhZ2UgPSBcIkMrK1wiO1xyXG5cdFx0YnJlYWs7XHJcblx0Y2FzZSBcImNoXCI6XHJcblx0XHRyZXN1bHRMaXN0Lmxhbmd1YWdlID0gXCJDI1wiO1xyXG5cdFx0YnJlYWs7XHJcblx0Y2FzZSBcImNcIjpcclxuXHRcdHJlc3VsdExpc3QubGFuZ3VhZ2UgPSBcIkNcIjtcclxuXHRcdGJyZWFrO1xyXG5cdGNhc2UgXCJweXRob25cIjpcclxuXHRcdHJlc3VsdExpc3QubGFuZ3VhZ2UgPSBcIlB5dGhvblwiO1xyXG5cdFx0YnJlYWs7XHJcblx0Y2FzZSBcImNzc1wiOlxyXG5cdFx0cmVzdWx0TGlzdC5sYW5ndWFnZSA9IFwiQ1NTXCI7XHJcblx0XHRicmVhaztcclxuXHRjYXNlIFwianNcIjpcclxuXHRcdHJlc3VsdExpc3QubGFuZ3VhZ2UgPSBcIkphdmFTY3JpcHRcIjtcclxuXHRcdGJyZWFrO1xyXG5cdGNhc2UgXCJodG1sXCI6XHJcblx0XHRyZXN1bHRMaXN0Lmxhbmd1YWdlID0gXCJIVE1MXCI7XHJcblx0XHRicmVhaztcclxuXHRjYXNlIFwicGhwXCI6XHJcblx0XHRyZXN1bHRMaXN0Lmxhbmd1YWdlID0gXCJQSFBcIjtcclxuXHRcdGJyZWFrO1xyXG5cdGNhc2UgXCJzcWxcIjpcclxuXHRcdHJlc3VsdExpc3QubGFuZ3VhZ2UgPSBcIlNRTFwiO1xyXG5cdFx0YnJlYWs7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdlbmVyYXRlTGlzdCgpIHtcclxuXHR0ZXh0QXJyYXkgPSBbXTtcclxuXHR2YWxpZENvbW1hbmRzID0gQXJyYXkuZnJvbShjb21tYW5kcyk7XHJcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBzdHJpbmdMZW5ndGg7IGkrKykge1xyXG5cdFx0dGV4dEFycmF5LnB1c2godmFsaWRDb21tYW5kcy5zcGxpY2UoTWF0aC5yYW5kb20oKSAqICh2YWxpZENvbW1hbmRzLmxlbmd0aCAtIDEpLCAxKS5qb2luKCkpO1xyXG5cdH1cclxuXHR0ZXh0ID0gdGV4dEFycmF5LmpvaW4oKS5yZXBsYWNlQWxsKFwiLFwiLCBcIuOFpFwiKTtcclxuXHQvLyB0ZXh0ID0gdGV4dC5yZXBsYWNlQWxsKFwiLFwiLCBcIuOFpFwiKTtcclxuXHJcblx0c2hvd1RleHQodGV4dCk7XHJcbn1cclxuZnVuY3Rpb24gc2hvd1RleHQoKSB7XHJcblx0dGV4dEZpZWxkLnRleHRDb250ZW50ID0gdGV4dC5zbGljZSgxKTtcclxuXHR0ZXh0RmllbGRGaXJzdExldHRlci50ZXh0Q29udGVudCA9IHRleHRbMF07XHJcblx0aWYgKHRleHRbMF0pIHtcclxuXHRcdGFjdGl2ZUtleSA9IHRleHRbMF0ucmVwbGFjZShcIuOFpFwiLCBcInNwYWNlXCIpO1xyXG5cdH1cclxuXHRzaG93QWN0aXZlS2V5KGFjdGl2ZUtleSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dBY3RpdmVLZXkoa2V5KSB7XHJcblx0Y29tYmluZUNhcHNsb2NrV2l0aFNoaWZ0KGFjdGl2ZUtleSwgYWN0aXZlS2V5KTtcclxuXHRpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoa2V5KSkge1xyXG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoa2V5KS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRrZXlzU2l6ZU9uZS5mb3JFYWNoKChrZXkpID0+IHtcclxuXHRcdFx0aWYgKGtleS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXZhbHVlXCIpID09IGFjdGl2ZUtleSkge1xyXG5cdFx0XHRcdGtleS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG5cdFx0XHRcdC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2hpZnQtclwiKS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG5cdFx0XHRcdC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2hpZnQtbFwiKS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdGtleXNTaXplQXV0by5mb3JFYWNoKChrZXkpID0+IHtcclxuXHRcdFx0aWYgKGtleS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXZhbHVlXCIpID09IGFjdGl2ZUtleSkge1xyXG5cdFx0XHRcdGtleS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG5cdFx0XHRcdC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2hpZnQtclwiKS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG5cdFx0XHRcdC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2hpZnQtbFwiKS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGlmIChwcmludGVkV3JvbmdUZXhmaWxlZC50ZXh0Q29udGVudCAhPSBcIlwiKSB7XHJcblx0XHRrZXlzU2l6ZUF1dG8uZm9yRWFjaCgoa2V5KSA9PiB7XHJcblx0XHRcdGlmIChrZXkuaWQgIT0gXCJiY3NwXCIpIGtleS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG5cdFx0fSk7XHJcblx0XHRrZXlzU2l6ZU9uZS5mb3JFYWNoKChrZXkpID0+IHtcclxuXHRcdFx0a2V5LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcblx0XHR9KTtcclxuXHR9XHJcblx0Ly8gaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2hpZnQtclwiKS5jbGFzc0xpc3RbMV0pIHtcclxuXHQvLyBcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2hpZnQtclwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG5cdC8vIFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaGlmdC1sXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcblx0Ly8gfVxyXG59XHJcblxyXG5mdW5jdGlvbiBrZXlkb3duKGtleXByZXNzKSB7XHJcblx0Y29uc29sZS5sb2coMTMxMjMsIGFjdGl2ZUtleSk7XHJcblx0aXNDYXBzTG9ja09uID0ga2V5cHJlc3MuZ2V0TW9kaWZpZXJTdGF0ZShcIkNhcHNMb2NrXCIpO1xyXG5cdGxldCBjb3B5T2JqZWN0ID0ge307XHJcblx0T2JqZWN0LmtleXMoa2V5cHJlc3MpLmZvckVhY2goKGtleSkgPT4ge1xyXG5cdFx0Y29weU9iamVjdC5rZXkgPSBrZXlkb3duLmtleTtcclxuXHR9KTtcclxuXHRjb3B5T2JqZWN0LmtleSA9IHJlcGxhY2VLZXkoa2V5cHJlc3Mua2V5KTtcclxuXHRrZXlwcmVzcyA9IGNvcHlPYmplY3Q7XHJcblx0Y29tYmluZUNhcHNsb2NrV2l0aFNoaWZ0KGFjdGl2ZUtleSwga2V5cHJlc3Mua2V5KTtcclxuXHJcblx0aWYgKHByaW50ZWRXcm9uZ1RleGZpbGVkLnRleHRDb250ZW50ICE9IFwiXCIpIHtcclxuXHRcdHNob3dBY3RpdmVLZXkoXCJiY3NwXCIpO1xyXG5cdH1cclxuXHRpZiAoXHJcblx0XHQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaGlmdC1yXCIpLmNsYXNzTGlzdFsxXSAmJiBrZXlwcmVzcy5rZXkgPT0gXCJTaGlmdFwiKSB8fFxyXG5cdFx0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2hpZnQtbFwiKS5jbGFzc0xpc3RbMV0gJiYga2V5cHJlc3Mua2V5ID09IFwiU2hpZnRcIikgfHxcclxuXHRcdGtleXByZXNzLmtleSA9PSBcIkNhcHNMb2NrXCJcclxuXHQpIHtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0aWYgKCh0ZXN0SXNXb3JrICYmIGtleXByZXNzLmtleSAhPSBcIkJhY2tzcGFjZVwiKSB8fCAodGVzdElzV29yayAmJiAhaXNFcnJvck1vZGVBY3RpdmUpKSB7XHJcblx0XHRxdWFudGl0eUFuc3dlcisrO1xyXG5cdFx0cXVhbnRpdHlBbnN3ZXJQZXJTZWNvbmQrKztcclxuXHR9XHJcblx0aWYgKHRlc3RJc1dvcmspIHtcclxuXHRcdGlmIChrZXlwcmVzcy5rZXkucmVwbGFjZShcIiBcIiwgXCJzcGFjZVwiKSA9PSBhY3RpdmVLZXkpIHtcclxuXHRcdFx0Y29ycmVjdEFuc3dlcigpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dW5Db3JyZWN0QW5zd2VyKGtleXByZXNzLmtleSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdGlmICgoa2V5cHJlc3Mua2V5ID09IFwiRW50ZXJcIiB8fCBrZXlwcmVzcy5rZXkgPT0gXCIgXCIpICYmIG1vZGFsSXNPcGVuKSB7XHJcblx0XHRjbG9zZU1vZGFsKCk7XHJcblx0fSBlbHNlIGlmIChrZXlwcmVzcy5rZXkgPT0gXCJFbnRlclwiICYmICF0ZXN0SXNXb3JrICYmICFlbnRlcklzUHJlc3MgJiYgIWlzTG9ja09uKSB7XHJcblx0XHRzdGFydFRlc3QoKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvcnJlY3RBbnN3ZXIoKSB7XHJcblx0aWYgKHByaW50ZWRXcm9uZ1RleGZpbGVkLnRleHRDb250ZW50ID09IFwiXCIpIHtcclxuXHRcdHF1YW50aXR50KFvcnJlY3RBbnN3ZXIrKztcclxuXHRcdHF1YW50aXR50KFvcnJlY3RBbnN3ZXJQZXJTZWNvbmQrKztcclxuXHRcdGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChhY3RpdmVLZXkpKSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChhY3RpdmVLZXkpLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0a2V5c1NpemVPbmUuZm9yRWFjaCgoa2V5KSA9PiB7XHJcblx0XHRcdFx0aWYgKGtleS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXZhbHVlXCIpID09IGFjdGl2ZUtleSkge1xyXG5cdFx0XHRcdFx0a2V5LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2hpZnQtclwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG5cdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2hpZnQtbFwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0a2V5c1NpemVBdXRvLmZvckVhY2goKGtleSkgPT4ge1xyXG5cdFx0XHRcdGlmIChrZXkuZ2V0QXR0cmlidXRlKFwiZGF0YS12YWx1ZVwiKSA9PSBhY3RpdmVLZXkpIHtcclxuXHRcdFx0XHRcdGtleS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNoaWZ0LXJcIikuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuXHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNoaWZ0LWxcIikuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0XHRwcmludGVkVGV4dFRleGZpbGVkLnRleHRDb250ZW50ICs9IGFjdGl2ZUtleS5yZXBsYWNlKFwic3BhY2VcIiwgXCLjhaRcIik7XHJcblx0XHR0ZXh0ID0gdGV4dC5zbGljZSgxKTtcclxuXHRcdGlmICh0ZXh0ID09IFwiXCIpIHtcclxuXHRcdFx0c2hvd1dpbkFuaW1hdGlvbigpO1xyXG5cdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNoaWZ0LXJcIikuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuXHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaGlmdC1sXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcblx0XHRcdGlzU2hvd0FkdmFuY2VNb2RlT24gPSBCb29sZWFuKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiaXNTaG93QWR2YW5jZU1vZGVPblwiKSA9PSBcInRydWVcIik7XHJcblx0XHRcdHByaW50ZWRUZXh0VGV4ZmlsZWQudGV4dENvbnRlbnQgPSBcIlwiO1xyXG5cdFx0XHRwcmludGVkV3JvbmdUZXhmaWxlZC50ZXh0Q29udGVudCA9IFwiXCI7XHJcblx0XHR9XHJcblx0XHRhY3RpdmVLZXkgPSBcIlwiO1xyXG5cclxuXHRcdHNob3dUZXh0KCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdGlmIChhY3RpdmVLZXkubGVuZ3RoID09IDEgfHwgYWN0aXZlS2V5ID09IFwic3BhY2VcIikge1xyXG5cdFx0XHRwcmludGVkV3JvbmdUZXhmaWxlZC50ZXh0Q29udGVudCArPSBhY3RpdmVLZXkucmVwbGFjZShcInNwYWNlXCIsIFwi44WkXCIpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5mdW5jdGlvbiB1bkNvcnJlY3RBbnN3ZXIoa2V5KSB7XHJcblx0Y29uc29sZS5sb2coa2V5KTtcclxuXHRsZXQgZmlyc3RUZXh0ID0gcHJpbnRlZFdyb25nVGV4ZmlsZWQudGV4dENvbnRlbnQ7XHJcblx0aWYgKGlzRXJyb3JNb2RlQWN0aXZlKSB7XHJcblx0XHRpZiAoa2V5ID09IFwiQmFja3NwYWNlXCIpIHtcclxuXHRcdFx0cHJpbnRlZFdyb25nVGV4ZmlsZWQudGV4dENvbnRlbnQgPSBwcmludGVkV3JvbmdUZXhmaWxlZC50ZXh0Q29udGVudC5zbGljZSgwLCAtMSk7XHJcblx0XHR9XHJcblx0XHRjb25zb2xlLmxvZyhrZXksIDEyMzQ1Nik7XHJcblx0XHRpZiAoa2V5Lmxlbmd0aCA9PSAxKSBwcmludGVkV3JvbmdUZXhmaWxlZC50ZXh0Q29udGVudCArPSBrZXkucmVwbGFjZShcIiBcIiwgXCLjhaRcIik7XHJcblx0XHRpZiAocHJpbnRlZFdyb25nVGV4ZmlsZWQudGV4dENvbnRlbnQgIT0gXCJcIikge1xyXG5cdFx0XHRzaG93QWN0aXZlS2V5KFwiYmNzcFwiKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmNzcFwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG5cdFx0XHRzaG93QWN0aXZlS2V5KGFjdGl2ZUtleSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdGlmIChpc0Vycm9yTW9kZUFjdGl2ZSAmJiBrZXkgIT0gXCJCYWNrc3Bhc2VcIikge1xyXG5cdFx0cXVhbnRpdHlNaXN0YWtlQW5zd2VyKys7XHJcblx0XHRpZiAoa2V5ID09IFwiQmFja3NwYWNlXCIgJiYgZmlyc3RUZXh0ICE9IFwiXCIpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fSBlbHNlIGlmIChrZXkgPT0gXCJCYWNrc3BhY2VcIiAmJiBmaXJzdFRleHQgPT0gXCJcIikge1xyXG5cdFx0XHRxdWFudGl0eUFuc3dlcisrO1xyXG5cdFx0XHRxdWFudGl0eUFuc3dlclBlclNlY29uZCsrO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRrZXkgPSBrZXkucmVwbGFjZShcIiBcIiwgXCJzcGFjZVwiKS5yZXBsYWNlKGBcXFxcYCwgXCJzbC1vYlwiKS5yZXBsYWNlKFwiRW50ZXJcIiwgXCJlbnRlclwiKTtcclxuXHRzd2l0Y2ggKGtleSkge1xyXG5cdFx0Y2FzZSBcIlNoaWZ0XCI6XHJcblx0XHRcdGtleSA9IFwic2hpZnQtclwiO1xyXG5cdFx0XHR1bkNvcnJlY3RBbnN3ZXIoXCJzaGlmdC1sXCIpO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdGNhc2UgXCJBbHRcIjpcclxuXHRcdFx0a2V5ID0gXCJhbHQtclwiO1xyXG5cdFx0XHR1bkNvcnJlY3RBbnN3ZXIoXCJhbHQtbFwiKTtcclxuXHRcdFx0YnJlYWs7XHJcblx0XHRjYXNlIFwiQ29udHJvbFwiOlxyXG5cdFx0XHRrZXkgPSBcImN0cmwtclwiO1xyXG5cdFx0XHR1bkNvcnJlY3RBbnN3ZXIoXCJjdHJsLWxcIik7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0Y2FzZSBcIlBhZ2VVcFwiOlxyXG5cdFx0XHRrZXkgPSBcInBndXBcIjtcclxuXHRcdFx0YnJlYWs7XHJcblx0XHRjYXNlIFwiUGFnZURvd25cIjpcclxuXHRcdFx0a2V5ID0gXCJwZ2RuXCI7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0Y2FzZSBcIkhvbWVcIjpcclxuXHRcdFx0a2V5ID0gXCJob21lXCI7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0Y2FzZSBcIkVuZFwiOlxyXG5cdFx0XHRrZXkgPSBcImVuZFwiO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdGNhc2UgXCJFc2NhcGVcIjpcclxuXHRcdFx0a2V5ID0gXCJlc2NcIjtcclxuXHRcdFx0YnJlYWs7XHJcblx0XHRjYXNlIFwiVGFiXCI6XHJcblx0XHRcdGtleSA9IFwidGFiXCI7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0Y2FzZSBcIkJhY2tzcGFjZVwiOlxyXG5cdFx0XHRrZXkgPSBcImJjc3BcIjtcclxuXHRcdFx0YnJlYWs7XHJcblx0XHRjYXNlIFwiVGFiXCI6XHJcblx0XHRcdGtleSA9IFwidGFiXCI7XHJcblx0XHRcdGJyZWFrO1xyXG5cdH1cclxuXHRjb25zb2xlLmxvZyhrZXkpO1xyXG5cdGtleXNTaXplT25lLmZvckVhY2goKGVsZW0pID0+IHtcclxuXHRcdGlmIChlbGVtLmdldEF0dHJpYnV0ZShcImRhdGEtdmFsdWVcIikgPT0ga2V5KSB7XHJcblx0XHRcdGVsZW0uY2xhc3NMaXN0LmFkZChcImhpbnRcIik7XHJcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdGVsZW0uY2xhc3NMaXN0LnJlbW92ZShcImhpbnRcIik7XHJcblx0XHRcdH0sIDMwMCk7XHJcblx0XHR9XHJcblx0fSk7XHJcblx0a2V5c1NpemVBdXRvLmZvckVhY2goKGVsZW0pID0+IHtcclxuXHRcdGlmIChlbGVtLmdldEF0dHJpYnV0ZShcImRhdGEtdmFsdWVcIikgPT0ga2V5KSB7XHJcblx0XHRcdGVsZW0uY2xhc3NMaXN0LmFkZChcImhpbnRcIik7XHJcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdGVsZW0uY2xhc3NMaXN0LnJlbW92ZShcImhpbnRcIik7XHJcblx0XHRcdH0sIDMwMCk7XHJcblx0XHR9XHJcblx0fSk7XHJcblx0Y29uc29sZS5sb2coa2V5KTtcclxuXHRpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoa2V5KSkge1xyXG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoa2V5KS5jbGFzc0xpc3QuYWRkKFwiaGludFwiKTtcclxuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChrZXkpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaW50XCIpO1xyXG5cdFx0fSwgMzAwKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dXaW5BbmltYXRpb24oKSB7XHJcblx0ZW5kVGltZSA9IG5ldyBEYXRlKCk7XHJcblx0cmVzdWx0Q291bnRpbmcoKTtcclxuXHRkZXNjcmlwdGlvbi5zdHlsZSA9IFwiZGlzcGxheTpibG9jaztcIjtcclxuXHRpZiAoY2hlY2tCb3hBbmltYXRpb24uY2hlY2tlZCkge1xyXG5cdFx0bGV0IGogPSAwO1xyXG5cdFx0cm93cy5mb3JFYWNoKChyb3cpID0+IHtcclxuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCByb3cuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRyb3cuY2hpbGRyZW5baV0uc3R5bGUgPSBgYm9yZGVyOiBzb2xpZCAwLjE1dncgaHNsKCR7XHJcblx0XHRcdFx0XHRcdFx0aSAqIDEwXHJcblx0XHRcdFx0XHRcdH0sIDEwMCUsIDUwJSk7Ym94LXNoYWRvdzogMCAwIDAuNnZ3IGhzbCgke2kgKiAxMH0sIDEwMCUsIDUwJSk7YDtcclxuXHRcdFx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0cm93LmNoaWxkcmVuW2ldLnN0eWxlID1cclxuXHRcdFx0XHRcdFx0XHRcdFwiYm9yZGVyOiBzb2xpZCAwLjE1dncgJGtleWJvYXJkLWJvcmRlcjtib3gtc2hhZG93OiAwIDAgMC42dncgJGtleWJvYXJkLWJvcmRlcjtcIjtcclxuXHRcdFx0XHRcdFx0fSwgNDAwKTtcclxuXHRcdFx0XHRcdH0sIGkgKiAxMDApO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSwgaiAqIDIwMCk7XHJcblx0XHRcdGorKztcclxuXHRcdH0pO1xyXG5cdH1cclxuXHR0ZXN0SXNXb3JrID0gZmFsc2U7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN0YXJ0VGVzdCgpIHtcclxuXHRwcmludGVkVGV4dFRleGZpbGVkLnRleHRDb250ZW50ID0gXCJcIjtcclxuXHRwcmludGVkV3JvbmdUZXhmaWxlZC50ZXh0Q29udGVudCA9IFwiXCI7XHJcblx0bGFzdFJlc3VsdHNMaXN0ID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImxhc3RyZXN1bHRzbGlzdFwiKSB8fCBcIltdXCIpO1xyXG5cdHRvcFJlc3VsdHNMaXN0ID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInRvcHJlc3VsdHNsaXN0XCIpIHx8IFwiW11cIik7XHJcblx0c2Vjb25kc051bWJlciA9IDA7XHJcblx0c3BlZWRzTGlzdCA9IFtdO1xyXG5cdG1pc3Rha2VMaXN0ID0gW107XHJcblx0c2Vjb25kc0xpc3QgPSBbXTtcclxuXHRjb3JyZWN0U3BlZWRzTGlzdCA9IFtdO1xyXG5cdHN0YXJ0VGltZSA9IG5ldyBEYXRlKCk7XHJcblx0cXVhbnRpdHnQoW9ycmVjdEFuc3dlclBlclNlY29uZCA9IDA7XHJcblx0cXVhbnRpdHlBbnN3ZXJQZXJTZWNvbmQgPSAwO1xyXG5cdHF1YW50aXR50KFvcnJlY3RBbnN3ZXIgPSAwO1xyXG5cdHF1YW50aXR5QW5zd2VyID0gMDtcclxuXHRxdWFudGl0eU1pc3Rha2VBbnN3ZXIgPSAwO1xyXG5cdGVudGVySXNQcmVzcyA9IHRydWU7XHJcblx0ZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBcIjNcIjtcclxuXHRpZiAoaXNTaG93QWR2YW5jZU1vZGVPbikge1xyXG5cdFx0dGV4dEZpZWxkRmlyc3RMZXR0ZXIuc3R5bGUgPSBcIm9wYWNpdHk6MC41O3RyYW5zaXRpb246MHNcIjtcclxuXHRcdHRleHRGaWVsZC5zdHlsZSA9IFwib3BhY2l0eTowLjU7dHJhbnNpdGlvbjowc1wiO1xyXG5cdFx0ZGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuXHRcdGdlbmVyYXRlTGlzdCgpO1xyXG5cdFx0aWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGFjdGl2ZUtleSkpIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGFjdGl2ZUtleSkuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRrZXlzU2l6ZU9uZS5mb3JFYWNoKChrZXkpID0+IHtcclxuXHRcdFx0XHRpZiAoa2V5LmdldEF0dHJpYnV0ZShcImRhdGEtdmFsdWVcIikgPT0gYWN0aXZlS2V5KSB7XHJcblx0XHRcdFx0XHRrZXkuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaGlmdC1yXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcblx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaGlmdC1sXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRrZXlzU2l6ZUF1dG8uZm9yRWFjaCgoa2V5KSA9PiB7XHJcblx0XHRcdFx0aWYgKGtleS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXZhbHVlXCIpID09IGFjdGl2ZUtleSkge1xyXG5cdFx0XHRcdFx0a2V5LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2hpZnQtclwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG5cdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2hpZnQtbFwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0ZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBcIjJcIjtcclxuXHR9LCAxMDAwKTtcclxuXHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gXCIxXCI7XHJcblx0fSwgMjAwMCk7XHJcblx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRpZiAoIWlzU2hvd0FkdmFuY2VNb2RlT24pIHtcclxuXHRcdFx0Z2VuZXJhdGVMaXN0KCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRzaG93QWN0aXZlS2V5KGFjdGl2ZUtleSk7XHJcblx0XHR9XHJcblx0XHRkZXNjcmlwdGlvbi5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG5cdFx0dGVzdElzV29yayA9IHRydWU7XHJcblx0XHRlbnRlcklzUHJlc3MgPSBmYWxzZTtcclxuXHRcdHRleHRGaWVsZEZpcnN0TGV0dGVyLnN0eWxlID0gXCJvcGFjaXR5OjFcIjtcclxuXHRcdHRleHRGaWVsZC5zdHlsZSA9IFwib3BhY2l0eToxXCI7XHJcblxyXG5cdFx0ZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBcItCd0LDQttC80LjRgtC1IEVudGVyINGH0YLQvtCx0Ysg0L3QsNGH0LDRgtGMXCI7XHJcblx0XHRkZXNjcmlwdGlvbi5zdHlsZSA9IFwiZGlzcGxheTpub25lO1wiO1xyXG5cdH0sIDMwMDApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjb21iaW5lQ2Fwc2xvY2tXaXRoU2hpZnQoa2V5LCBwcmVzc0tleSkge1xyXG5cdGlmICgha2V5IHx8IGtleSA9PSBcIiBcIikgcmV0dXJuO1xyXG5cdGxldCByZWdpc3RlciA9IGdldFJlZ2lzdGVyKGtleSk7XHJcblx0aWYgKGlzQ2Fwc0xvY2tPbikge1xyXG5cdFx0Y29uc29sZS5sb2coZ2V0UmVnaXN0ZXIoa2V5KSwgaXNDYXBzTG9ja09uKTtcclxuXHRcdHN3aXRjaCAocmVnaXN0ZXIpIHtcclxuXHRcdFx0Y2FzZSBcItCh0L/QtdGGXCI6XHJcblx0XHRcdFx0Y29uc29sZS5sb2coMSk7XHJcblx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaGlmdC1yXCIpLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcblx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaGlmdC1sXCIpLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgXCLQndC40LbQvdC40LlcIjpcclxuXHRcdFx0XHRjb25zb2xlLmxvZygyKTtcclxuXHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNoaWZ0LXJcIikuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuXHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNoaWZ0LWxcIikuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBcItCS0LXRgNGF0L3QuNC5XCI6XHJcblx0XHRcdFx0Y29uc29sZS5sb2coMyk7XHJcblx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaGlmdC1yXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcblx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaGlmdC1sXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2hpZnQtclwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG5cdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2hpZnQtbFwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdH0gZWxzZSB7XHJcblx0XHRsZXQgcmVnaXN0ZXIgPSBnZXRSZWdpc3RlcihrZXkpO1xyXG5cdFx0Y29uc29sZS5sb2coZ2V0UmVnaXN0ZXIoa2V5KSk7XHJcblx0XHRzd2l0Y2ggKHJlZ2lzdGVyKSB7XHJcblx0XHRcdGNhc2UgXCLQodC/0LXRhlwiOlxyXG5cdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2hpZnQtclwiKS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG5cdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2hpZnQtbFwiKS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlIFwi0JLQtdGA0YXQvdC40LlcIjpcclxuXHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNoaWZ0LXJcIikuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuXHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNoaWZ0LWxcIikuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSBcItCd0LjQttC90LjQuVwiOlxyXG5cdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2hpZnQtclwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG5cdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2hpZnQtbFwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNoaWZ0LXJcIikuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuXHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNoaWZ0LWxcIikuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHRcdGlmICgha2V5KSB7XHJcblx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2hpZnQtclwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG5cdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNoaWZ0LWxcIikuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlc3VsdENvdW50aW5nKCkge1xyXG5cdGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImlzU2Vjb25kTW9kZU9uXCIpID09IFwidHJ1ZVwiKSB7XHJcblx0XHRjaGVja0JveEl0ZW1PbmUuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xyXG5cdFx0Y2hlY2tCb3hJdGVtVHdvLnN0eWxlLm9wYWNpdHkgPSBcIlwiO1xyXG5cdFx0bW9kZU9uZSgpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRjaGVja0JveEl0ZW1PbmUuc3R5bGUub3BhY2l0eSA9IFwiXCI7XHJcblx0XHRjaGVja0JveEl0ZW1Ud28uc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xyXG5cdFx0bW9kZVR3bygpO1xyXG5cdH1cclxuXHRpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJpc0NoYXJ0VmlzaWJsZVwiKSA9PSBcInRydWVcIikge1xyXG5cdFx0Y2hlY2tCb3hNb2RlT25lLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcclxuXHRcdGNoZWNrQm94TW9kZVR3by5zdHlsZS5vcGFjaXR5ID0gXCJcIjtcclxuXHRcdHZpc2libGVNb2RlT25lKCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdGNoZWNrQm94TW9kZU9uZS5zdHlsZS5vcGFjaXR5ID0gXCJcIjtcclxuXHRcdGNoZWNrQm94TW9kZVR3by5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XHJcblx0XHR2aXNpYmxlTW9kZVR3bygpO1xyXG5cdH1cclxuXHRhY2N1cmFjeSA9IChxdWFudGl0edChb3JyZWN0QW5zd2VyIC8gcXVhbnRpdHlBbnN3ZXIpICogMTAwO1xyXG5cdHNwZW50VGltZSA9IChlbmRUaW1lIC0gc3RhcnRUaW1lKSAvIDEwMDAgLSAzO1xyXG5cdHNwZW50VGltZSA9IE1hdGgucm91bmQoc3BlbnRUaW1lICogMTAwKSAvIDEwMDtcclxuXHRzZWNvbmRzTnVtYmVyKys7XHJcblx0c2Vjb25kc0xpc3QucHVzaChzZWNvbmRzTnVtYmVyKTtcclxuXHRtaXN0YWtlTGlzdC5wdXNoKHF1YW50aXR5QW5zd2VyUGVyU2Vjb25kIC0gcXVhbnRpdHnQoW9ycmVjdEFuc3dlclBlclNlY29uZCk7XHJcblx0c3BlZWRzTGlzdC5wdXNoKHF1YW50aXR5QW5zd2VyUGVyU2Vjb25kKTtcclxuXHRjb3JyZWN0U3BlZWRzTGlzdC5wdXNoKHF1YW50aXR50KFvcnJlY3RBbnN3ZXJQZXJTZWNvbmQpO1xyXG5cdHF1YW50aXR50KFvcnJlY3RBbnN3ZXJQZXJTZWNvbmQgPSAwO1xyXG5cdHF1YW50aXR5QW5zd2VyUGVyU2Vjb25kID0gMDtcclxuXHRyZXN1bHRMaXN0LnRpbWUgPSBzcGVudFRpbWU7XHJcblx0cmVzdWx0TGlzdC5hY2N1cmFjeSA9IE1hdGgucm91bmQoKHF1YW50aXR50KFvcnJlY3RBbnN3ZXIgLyBxdWFudGl0eUFuc3dlcikgKiAxMDApO1xyXG5cdHJlc3VsdExpc3Quc3BlZWQgPSBNYXRoLnJvdW5kKChxdWFudGl0edChb3JyZWN0QW5zd2VyIC8gc3BlbnRUaW1lKSAqIDEwMCkgLyAxMDA7XHJcblx0cmVzdWx0TGlzdC5sZW5ndGggPSBxdWFudGl0edChb3JyZWN0QW5zd2VyO1xyXG5cdG1heFNwZWVkID0gWy4uLmNvcnJlY3RTcGVlZHNMaXN0XS5zb3J0KClbY29ycmVjdFNwZWVkc0xpc3QubGVuZ3RoIC0gMV07XHJcblxyXG5cdHBvc3RSZXN1bHQoXHJcblx0XHRsYW5ndWFnZSxcclxuXHRcdE1hdGgucm91bmQoYWNjdXJhY3kpLFxyXG5cdFx0c3BlbnRUaW1lLFxyXG5cdFx0TWF0aC5yb3VuZCgocXVhbnRpdHnQoW9ycmVjdEFuc3dlciAvIHNwZW50VGltZSkgKiAxMDApIC8gMTAwLFxyXG5cdFx0bWF4U3BlZWQsXHJcblx0XHRxdWFudGl0eUFuc3dlcixcclxuXHRcdHF1YW50aXR50KFvcnJlY3RBbnN3ZXIsXHJcblx0XHRxdWFudGl0eU1pc3Rha2VBbnN3ZXIsXHJcblx0KTtcclxuXHRpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJpc1NlY29uZE1vZGVPblwiKSA9PSBcInRydWVcIikge1xyXG5cdFx0cmVzdWx0Rmlyc3QudGV4dENvbnRlbnQgPSBg0JLRgNC10LzRjzogJHtzcGVudFRpbWV9INGBLlxyXG7QotC+0YfQvdC+0YHRgtGMOiAke01hdGgucm91bmQoYWNjdXJhY3kpfSAlXHJcbtCh0YDQtdC00L3Rj9GPINGB0LrQvtGA0L7RgdGC0Yw6ICR7TWF0aC5yb3VuZCgocXVhbnRpdHnQoW9ycmVjdEFuc3dlciAvIHNwZW50VGltZSkgKiAxMDApIC8gMTAwfSDQvS9jLmA7XHJcblx0fSBlbHNlIHtcclxuXHRcdHJlc3VsdEZpcnN0LnRleHRDb250ZW50ID0gYNCS0YDQtdC80Y86ICR7TWF0aC5yb3VuZCgoc3BlbnRUaW1lIC8gNikgKiAxMDApIC8gMTAwMH0g0LzQuNC9LlxyXG7QotC+0YfQvdC+0YHRgtGMOiAke01hdGgucm91bmQoYWNjdXJhY3kpfSAlXHJcbtCh0YDQtdC00L3Rj9GPINGB0LrQvtGA0L7RgdGC0Yw6ICR7KE1hdGgucm91bmQoKHF1YW50aXR50KFvcnJlY3RBbnN3ZXIgLyBzcGVudFRpbWUpICogMTAwKSAqIDYwKSAvIDEwMH0g0L0v0LzQuNC9LmA7XHJcblx0fVxyXG5cdHJlc3VsdFNlY29uZC50ZXh0Q29udGVudCA9IGDQmtC+0LvQuNGH0LXRgdGC0LLQviDQv9C+0L/QsNC00LDQvdC40Lk6ICR7cXVhbnRpdHnQoW9ycmVjdEFuc3dlcn1cclxu0JrQvtC70LjRh9C10YHRgtCy0L4g0L7RiNC40LHQvtC6OiAke3F1YW50aXR5QW5zd2VyIC0gcXVhbnRpdHnQoW9ycmVjdEFuc3dlcn1cclxu0JrQvtC70LjRh9C10YHRgtCy0L4g0L3QsNC20LDRgtC40Lk6ICR7cXVhbnRpdHlBbnN3ZXJ9YDtcclxuXHRvcGVuTW9kYWwoKTtcclxuXHJcblx0dG9wUmVzdWx0c0xpc3QucHVzaChyZXN1bHRMaXN0KTtcclxuXHRsYXN0UmVzdWx0c0xpc3QucHVzaChyZXN1bHRMaXN0KTtcclxuXHR0b3BSZXN1bHRzTGlzdCA9IHNvcnRBcnJheSh0b3BSZXN1bHRzTGlzdCk7XHJcblxyXG5cdGlmIChsYXN0UmVzdWx0c0xpc3QubGVuZ3RoID4gNSkge1xyXG5cdFx0bGFzdFJlc3VsdHNMaXN0LnNoaWZ0KCk7XHJcblx0fVxyXG5cdGlmICh0b3BSZXN1bHRzTGlzdC5sZW5ndGggPiAzKSB7XHJcblx0XHR0b3BSZXN1bHRzTGlzdC5wb3AoKTtcclxuXHR9XHJcblx0bGFzdFJlc3VsdHNMaXN0ID0gSlNPTi5zdHJpbmdpZnkobGFzdFJlc3VsdHNMaXN0KTtcclxuXHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImxhc3RyZXN1bHRzbGlzdFwiLCBsYXN0UmVzdWx0c0xpc3QpO1xyXG5cdGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidG9wcmVzdWx0c2xpc3RcIiwgSlNPTi5zdHJpbmdpZnkodG9wUmVzdWx0c0xpc3QpKTtcclxuXHJcblx0aWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiaXNTZWNvbmRNb2RlT25cIikgPT0gXCJmYWxzZVwiKSB7XHJcblx0XHRtb2RhbFRpbWUuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xyXG5cdFx0XHRlbGVtZW50LnRleHRDb250ZW50ID0gTWF0aC5yb3VuZCgocGFyc2VGbG9hdChlbGVtZW50LnRleHRDb250ZW50KSAvIDYpICogMTAwKSAvIDEwMDAgKyBcIiDQvNC40L0uXCI7XHJcblx0XHR9KTtcclxuXHRcdG1vZGFsU3BlZWQuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xyXG5cdFx0XHRlbGVtZW50LnRleHRDb250ZW50ID0gKE1hdGgucm91bmQocGFyc2VGbG9hdChlbGVtZW50LnRleHRDb250ZW50KSAqIDEwMCkgKiA2MCkgLyAxMDAgKyBcIiDQvS/QvNC40L0uXCI7XHJcblx0XHR9KTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0bW9kYWxUaW1lLmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuXHRcdFx0ZWxlbWVudC50ZXh0Q29udGVudDtcclxuXHRcdH0pO1xyXG5cdFx0bW9kYWxTcGVlZC5mb3JFYWNoKChlbGVtZW50KSA9PiB7XHJcblx0XHRcdGVsZW1lbnQudGV4dENvbnRlbnQ7XHJcblx0XHR9KTtcclxuXHR9XHJcblx0ZmlsbExhc3RUYWJsZSgpO1xyXG59XHJcblxyXG5zZXRJbnRlcnZhbCgoKSA9PiB7XHJcblx0aWYgKHRlc3RJc1dvcmspIHtcclxuXHRcdHNlY29uZHNOdW1iZXIrKztcclxuXHRcdHNlY29uZHNMaXN0LnB1c2goc2Vjb25kc051bWJlcik7XHJcblx0XHRzcGVlZHNMaXN0LnB1c2gocXVhbnRpdHlBbnN3ZXJQZXJTZWNvbmQpO1xyXG5cdFx0Y29ycmVjdFNwZWVkc0xpc3QucHVzaChxdWFudGl0edChb3JyZWN0QW5zd2VyUGVyU2Vjb25kKTtcclxuXHRcdG1pc3Rha2VMaXN0LnB1c2gocXVhbnRpdHlBbnN3ZXJQZXJTZWNvbmQgLSBxdWFudGl0edChb3JyZWN0QW5zd2VyUGVyU2Vjb25kKTtcclxuXHRcdHF1YW50aXR50KFvcnJlY3RBbnN3ZXJQZXJTZWNvbmQgPSAwO1xyXG5cdFx0cXVhbnRpdHlBbnN3ZXJQZXJTZWNvbmQgPSAwO1xyXG5cdH1cclxufSwgMTAwMCk7XHJcblxyXG5mdW5jdGlvbiBzaG93Q2hhcnQoKSB7XHJcblx0Y2hhcnQgPSBuZXcgQ2hhcnQoY2hhcnRDdnMsIHtcclxuXHRcdHR5cGU6IFwibGluZVwiLFxyXG5cdFx0ZGF0YToge1xyXG5cdFx0XHRsYWJlbHM6IHNlY29uZHNMaXN0Lm1hcCgobnVtKSA9PiBudW0gLSAxKSxcclxuXHRcdFx0ZGF0YXNldHM6IFtcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRkYXRhOiBjb3JyZWN0U3BlZWRzTGlzdCxcclxuXHRcdFx0XHRcdGxhYmVsOiBcItCf0L7Qv9Cw0LTQsNC90LjRj1wiLFxyXG5cdFx0XHRcdFx0Ym9yZGVyQ29sb3I6IFwiZ3JlZW5cIixcclxuXHRcdFx0XHRcdGJhY2tncm91bmRDb2xvcjogXCJncmVlblwiLFxyXG5cdFx0XHRcdFx0ZmlsbDogZmFsc2UsXHJcblx0XHRcdFx0XHR0ZW5zaW9uOiAwLjQsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRkYXRhOiBzcGVlZHNMaXN0LFxyXG5cdFx0XHRcdFx0bGFiZWw6IFwi0J3QsNC20LDRgtC40Y9cIixcclxuXHRcdFx0XHRcdGJvcmRlckNvbG9yOiBcInJveWFsYmx1ZVwiLFxyXG5cdFx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBcInJveWFsYmx1ZVwiLFxyXG5cdFx0XHRcdFx0ZmlsbDogZmFsc2UsXHJcblx0XHRcdFx0XHR0ZW5zaW9uOiAwLjQsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHRkYXRhOiBtaXN0YWtlTGlzdCxcclxuXHRcdFx0XHRcdGxhYmVsOiBcItCe0YjQuNCx0LrQuFwiLFxyXG5cdFx0XHRcdFx0Ym9yZGVyQ29sb3I6IFwicmVkXCIsXHJcblx0XHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IFwicmVkXCIsXHJcblx0XHRcdFx0XHRmaWxsOiBmYWxzZSxcclxuXHRcdFx0XHRcdHRlbnNpb246IDAuNCxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRdLFxyXG5cdFx0fSxcclxuXHJcblx0XHRvcHRpb25zOiB7XHJcblx0XHRcdHNjYWxlczoge1xyXG5cdFx0XHRcdHg6IHtcclxuXHRcdFx0XHRcdHRpdGxlOiB7XHJcblx0XHRcdFx0XHRcdGRpc3BsYXk6IHRydWUsXHJcblx0XHRcdFx0XHRcdGFsaWduOiBcInN0YXJ0XCIsXHJcblx0XHRcdFx0XHRcdHRleHQ6IFwi0JLRgNC10LzRjyAoYylcIixcclxuXHRcdFx0XHRcdFx0Zm9udDogeyBzaXplOiAxNCB9LFxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRlbGVtZW50czoge1xyXG5cdFx0XHRcdHBvaW50OiB7XHJcblx0XHRcdFx0XHRyYWRpdXM6IDQsXHJcblx0XHRcdFx0XHRob3ZlclJhZGl1czogNSxcclxuXHRcdFx0XHRcdGhvdmVyQm9yZGVyV2lkdGg6IDIsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRsaW5lOiB7XHJcblx0XHRcdFx0XHRob3ZlckJvcmRlcldpZHRoOiAyLFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0sXHJcblx0XHRcdHBsdWdpbnM6IHtcclxuXHRcdFx0XHRsZWdlbmQ6IHsgZGlzcGxheTogXCJmYWxzZVwiLCBwb3NpdGlvbjogXCJib3R0b21cIiB9LFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRyZXNwb25zaXZlOiB0cnVlLFxyXG5cdFx0XHRpbnRlcmFjdGlvbjoge1xyXG5cdFx0XHRcdG1vZGU6IFwiaW5kZXhcIixcclxuXHRcdFx0XHRpbnRlcnNlY3Q6IGZhbHNlLFxyXG5cdFx0XHR9LFxyXG5cdFx0XHR0aXRsZToge1xyXG5cdFx0XHRcdGRpc3BsYXk6IHRydWUsXHJcblx0XHRcdFx0dGV4dDogXCJXb3JsZCBwb3B1bGF0aW9uIHBlciByZWdpb24gKGluIG1pbGxpb25zKVwiLFxyXG5cdFx0XHR9LFxyXG5cdFx0fSxcclxuXHR9KTtcclxuXHQvLyBzZXRUaW1lb3V0KCgpID0+IHtcclxuXHQvLyBcdGNoYXJ0LmRlc3Ryb3koKTtcclxuXHQvLyB9LCA0MDAwKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2xvc2VNb2RhbCgpIHtcclxuXHRpZiAobW9kYWxJc09wZW4pIHtcclxuXHRcdG1vcmVJbmZvLnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcclxuXHRcdGlzTG9ja09uID0gZmFsc2U7XHJcblx0XHRtb2RhbElzT3BlbiA9IGZhbHNlO1xyXG5cclxuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRpZiAoY2hhcnQpIHtcclxuXHRcdFx0XHRjaGFydC5kZXN0cm95KCk7XHJcblx0XHRcdH1cclxuXHRcdFx0bW9yZUluZm8uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG5cdFx0fSwgMjAwMCk7XHJcblx0XHRtb2RhbC5zdHlsZSA9IFwiXCI7XHJcblx0fVxyXG59XHJcbmZ1bmN0aW9uIG9wZW5Nb2RhbCgpIHtcclxuXHRpc0xvY2tPbiA9IHRydWU7XHJcblx0bW9yZUluZm9CdXR0b24uc3R5bGUgPSBcIlwiO1xyXG5cdG1vcmVJbmZvQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcblx0aWYgKGNoZWNrQm94QW5pbWF0aW9uLmNoZWNrZWQpIHtcclxuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRtb2RhbC5zdHlsZSA9IFwiXHR0b3A6IDEwLjV2aDtcIjtcclxuXHRcdH0sIDE1MDApO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRtb2RhbC5zdHlsZSA9IFwiXHR0b3A6IDEwLjV2aDtcIjtcclxuXHR9XHJcblx0aWYgKGNoZWNrQm94QW5pbWF0aW9uLmNoZWNrZWQpIHtcclxuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRtb2RhbElzT3BlbiA9IHRydWU7XHJcblx0XHRcdHNob3dDaGFydCgpO1xyXG5cdFx0fSwgMTcwMCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRtb2RhbElzT3BlbiA9IHRydWU7XHJcblx0XHRcdHNob3dDaGFydCgpO1xyXG5cdFx0fSwgMjAwKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dNb3JlSW5mbygpIHtcclxuXHRtb3JlSW5mby5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcblx0bWF4U3BlZWQgPSBbLi4uY29ycmVjdFNwZWVkc0xpc3RdLnNvcnQoKVtjb3JyZWN0U3BlZWRzTGlzdC5sZW5ndGggLSAxXTtcclxuXHRtb2RhbC5zdHlsZS5oZWlnaHQgPSBcIjc3dmhcIjtcclxuXHRyZXN1bHRGaXJzdC5zdHlsZS5vcGFjaXR5ID0gXCIwXCI7XHJcblx0cmVzdWx0U2Vjb25kLnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcclxuXHRtb3JlSW5mb0J1dHRvbi5zdHlsZS5vcGFjaXR5ID0gXCIwXCI7XHJcblx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRyZXN1bHRGaXJzdC5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XHJcblx0XHRyZXN1bHRTZWNvbmQuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xyXG5cdFx0bW9yZUluZm9CdXR0b24uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG5cdFx0aWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiaXNTZWNvbmRNb2RlT25cIikgPT0gXCJ0cnVlXCIpIHtcclxuXHRcdFx0cmVzdWx0Rmlyc3QudGV4dENvbnRlbnQgPVxyXG5cdFx0XHRcdHJlc3VsdEZpcnN0LnRleHRDb250ZW50ICtcclxuXHRcdFx0XHRgXHJcbtCc0LDQutGB0LjQvNCw0LvRjNC90LDRjyDRgdC60L7RgNC+0YHRgtGMOiAke21heFNwZWVkfSDQvS/RgS5gO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmVzdWx0Rmlyc3QudGV4dENvbnRlbnQgPVxyXG5cdFx0XHRcdHJlc3VsdEZpcnN0LnRleHRDb250ZW50ICtcclxuXHRcdFx0XHRgXHJcbtCc0LDQutGB0LjQvNCw0LvRjNC90LDRjyDRgdC60L7RgNC+0YHRgtGMOiAke21heFNwZWVkICogNjB9INC9L9C80LjQvS5gO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1vcmVJbmZvLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcclxuXHR9LCA0MDApO1xyXG59XHJcbmZ1bmN0aW9uIG1vZGVPbmUoKSB7XHJcblx0dGFibGUuc3R5bGUub3BhY2l0eSA9IDA7XHJcblx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRmaWxsTGFzdFRhYmxlKCk7XHJcblx0XHR0YWJsZS5zdHlsZS5vcGFjaXR5ID0gMTtcclxuXHRcdG1vZGFsVGltZS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XHJcblx0XHRcdGVsZW1lbnQudGV4dENvbnRlbnQ7XHJcblx0XHRcdG1vZGFsU3BlZWQuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xyXG5cdFx0XHRcdGVsZW1lbnQudGV4dENvbnRlbnQ7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fSwgNTAwKTtcclxuXHRpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJpc1NlY29uZE1vZGVPblwiKSA9PSBcImZhbHNlXCIpIHtcclxuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiaXNTZWNvbmRNb2RlT25cIiwgdHJ1ZSk7XHJcblx0XHRtZXRyaWNMaXN0ID0gW1wiXCIsIFwi0YEuXCIsIFwiJVwiLCBcItC9L9GBLlwiLCBcItGB0LjQvC5cIl07XHJcblx0XHRjaGVja0JveEl0ZW1Ud28uc3R5bGUub3BhY2l0eSA9IFwiXCI7XHJcblx0XHRjaGVja0JveEl0ZW1PbmUuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xyXG5cdFx0cmVzdWx0Rmlyc3Quc3R5bGUub3BhY2l0eSA9IFwiMFwiO1xyXG5cdFx0cmVzdWx0U2Vjb25kLnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcclxuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRyZXN1bHRGaXJzdC5zdHlsZS5vcGFjaXR5ID0gXCJcIjtcclxuXHRcdFx0cmVzdWx0U2Vjb25kLnN0eWxlLm9wYWNpdHkgPSBcIlwiO1xyXG5cdFx0XHRyZXN1bHRGaXJzdC50ZXh0Q29udGVudCA9IGDQktGA0LXQvNGPOiAke3NwZW50VGltZX0gYy5cclxu0KLQvtGH0L3QvtGB0YLRjDogJHtNYXRoLnJvdW5kKGFjY3VyYWN5KX0gJVxyXG7QodGA0LXQtNC90Y/RjyDRgdC60L7RgNC+0YHRgtGMOiAke01hdGgucm91bmQoKHF1YW50aXR50KFvcnJlY3RBbnN3ZXIgLyBzcGVudFRpbWUpICogMTAwKSAvIDEwMH0g0L0vYy5cclxu0JzQsNC60YHQuNC80LDQu9GM0L3QsNGPINGB0LrQvtGA0L7RgdGC0Yw6ICR7bWF4U3BlZWR9INC9L2MuYDtcclxuXHRcdH0sIDQwMCk7XHJcblx0fVxyXG59XHJcbmZ1bmN0aW9uIG1vZGVUd28oKSB7XHJcblx0dGFibGUuc3R5bGUub3BhY2l0eSA9IDA7XHJcblx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRmaWxsTGFzdFRhYmxlKCk7XHJcblx0XHR0YWJsZS5zdHlsZS5vcGFjaXR5ID0gMTtcclxuXHRcdG1vZGFsVGltZS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XHJcblx0XHRcdGlmIChwYXJzZUZsb2F0KGVsZW1lbnQudGV4dENvbnRlbnQpKSB7XHJcblx0XHRcdFx0ZWxlbWVudC50ZXh0Q29udGVudCA9IE1hdGgucm91bmQoKHBhcnNlRmxvYXQoZWxlbWVudC50ZXh0Q29udGVudCkgLyA2KSAqIDEwMCkgLyAxMDAwICsgXCIg0LzQuNC9LlwiO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHRtb2RhbFNwZWVkLmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuXHRcdFx0aWYgKHBhcnNlRmxvYXQoZWxlbWVudC50ZXh0Q29udGVudCkpIHtcclxuXHRcdFx0XHRlbGVtZW50LnRleHRDb250ZW50ID0gKE1hdGgucm91bmQocGFyc2VGbG9hdChlbGVtZW50LnRleHRDb250ZW50KSAqIDEwMCkgKiA2MCkgLyAxMDAgKyBcIiDQvS/QvNC40L0uXCI7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH0sIDUwMCk7XHJcblxyXG5cdGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImlzU2Vjb25kTW9kZU9uXCIpID09IFwidHJ1ZVwiKSB7XHJcblx0XHRtZXRyaWNMaXN0ID0gW1wiXCIsIFwi0LzQuNC9LlwiLCBcIiVcIiwgXCLQvS/QvNC40L0uXCIsIFwi0YHQuNC8LlwiXTtcclxuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiaXNTZWNvbmRNb2RlT25cIiwgZmFsc2UpO1xyXG5cdFx0Y2hlY2tCb3hJdGVtT25lLnN0eWxlLm9wYWNpdHkgPSBcIlwiO1xyXG5cdFx0Y2hlY2tCb3hJdGVtVHdvLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcclxuXHRcdHJlc3VsdEZpcnN0LnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcclxuXHRcdHJlc3VsdFNlY29uZC5zdHlsZS5vcGFjaXR5ID0gXCIwXCI7XHJcblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0cmVzdWx0Rmlyc3Quc3R5bGUub3BhY2l0eSA9IFwiXCI7XHJcblx0XHRcdHJlc3VsdFNlY29uZC5zdHlsZS5vcGFjaXR5ID0gXCJcIjtcclxuXHRcdFx0cmVzdWx0Rmlyc3QudGV4dENvbnRlbnQgPSBg0JLRgNC10LzRjzogJHtNYXRoLnJvdW5kKChzcGVudFRpbWUgLyA2KSAqIDEwMCkgLyAxMDAwfSDQvNC40L0uXHJcbtCi0L7Rh9C90L7RgdGC0Yw6ICR7TWF0aC5yb3VuZChhY2N1cmFjeSl9ICVcclxu0KHRgNC10LTQvdGP0Y8g0YHQutC+0YDQvtGB0YLRjDogJHsoTWF0aC5yb3VuZCgocXVhbnRpdHnQoW9ycmVjdEFuc3dlciAvIHNwZW50VGltZSkgKiAxMDApICogNjApIC8gMTAwfSDQvS/QvNC40L0uXHJcbtCc0LDQutGB0LjQvNCw0LvRjNC90LDRjyDRgdC60L7RgNC+0YHRgtGMOiAke21heFNwZWVkICogNjB9INC9L9C80LjQvS5gO1xyXG5cdFx0fSwgNDAwKTtcclxuXHR9XHJcbn1cclxuZnVuY3Rpb24gdmlzaWJsZU1vZGVPbmUoKSB7XHJcblx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJpc0NoYXJ0VmlzaWJsZVwiLCB0cnVlKTtcclxuXHRjaGVja0JveE1vZGVUd28uc3R5bGUub3BhY2l0eSA9IFwiXCI7XHJcblx0Y2hlY2tCb3hNb2RlT25lLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcclxuXHRwYXN0UmVzdWx0cy5zdHlsZS5vcGFjaXR5ID0gXCIwXCI7XHJcblx0Y2hhcnRDdnMuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuXHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdHBhc3RSZXN1bHRzLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuXHRcdGNoYXJ0Q3ZzLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcclxuXHR9LCA1MDApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRBbmltYXRpb25Xb3JrKCkge1xyXG5cdGlmICh0aGlzLmNoZWNrZWQpIHtcclxuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiYW5pbWF0aW9uT25cIiwgdHJ1ZSk7XHJcblx0fSBlbHNlIHtcclxuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiYW5pbWF0aW9uT25cIiwgZmFsc2UpO1xyXG5cdH1cclxufVxyXG5mdW5jdGlvbiBzZXRTaG93UHJpbnRlZFRleHQoKSB7XHJcblx0aWYgKHRoaXMuY2hlY2tlZCkge1xyXG5cdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJzaG93UHJpbnRlZFRleHRcIiwgdHJ1ZSk7XHJcblx0fSBlbHNlIHtcclxuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwic2hvd1ByaW50ZWRUZXh0XCIsIGZhbHNlKTtcclxuXHR9XHJcbn1cclxuZnVuY3Rpb24gc2V0U2hvd1ByaW50ZWRXcm9uZygpIHtcclxuXHRpZiAodGhpcy5jaGVja2VkKSB7XHJcblx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInNob3dQcmludGVkV3JvbmdcIiwgdHJ1ZSk7XHJcblx0fSBlbHNlIHtcclxuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwic2hvd1ByaW50ZWRXcm9uZ1wiLCBmYWxzZSk7XHJcblx0fVxyXG59XHJcbmZ1bmN0aW9uIHZpc2libGVNb2RlVHdvKCkge1xyXG5cdGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiaXNDaGFydFZpc2libGVcIiwgZmFsc2UpO1xyXG5cdGNoYXJ0Q3ZzLnN0eWxlLm9wYWNpdHkgPSAwO1xyXG5cdHBhc3RSZXN1bHRzLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XHJcblx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRjaGFydEN2cy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcblx0XHRwYXN0UmVzdWx0cy5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XHJcblx0fSwgNTAwKTtcclxuXHRjaGVja0JveE1vZGVUd28uc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xyXG5cdGNoZWNrQm94TW9kZU9uZS5zdHlsZS5vcGFjaXR5ID0gXCJcIjtcclxufVxyXG5cclxuZnVuY3Rpb24gZmlsbExhc3RUYWJsZSgpIHtcclxuXHRsZXQgY291bnRSb3cgPSA0O1xyXG5cdGxldCBlbGVtZW50Q29udGVudDtcclxuXHRsYXN0UmVzdWx0c0xpc3QgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwibGFzdHJlc3VsdHNsaXN0XCIpKTtcclxuXHR0YWJsZVJvd3MuZm9yRWFjaCgocm93KSA9PiB7XHJcblx0XHRsZXQgY291bnRFbGVtZW50ID0gMDtcclxuXHRcdEFycmF5LmZyb20ocm93LmNoaWxkcmVuKS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XHJcblx0XHRcdGVsZW1lbnRDb250ZW50ID0gbGFzdFJlc3VsdHNMaXN0W2NvdW50Um93XTtcclxuXHRcdFx0aWYgKGVsZW1lbnRDb250ZW50KSB7XHJcblx0XHRcdFx0aWYgKE9iamVjdC52YWx1ZXMoZWxlbWVudENvbnRlbnQpW2NvdW50RWxlbWVudF0pIHtcclxuXHRcdFx0XHRcdGVsZW1lbnQudGV4dENvbnRlbnQgPSBPYmplY3QudmFsdWVzKGVsZW1lbnRDb250ZW50KVtjb3VudEVsZW1lbnRdICsgXCIgXCIgKyBtZXRyaWNMaXN0W2NvdW50RWxlbWVudF07XHJcblx0XHRcdFx0XHRjb3VudEVsZW1lbnQrKztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0ZWxlbWVudC50ZXh0Q29udGVudCA9IFwiXCI7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0Y291bnRSb3ctLTtcclxuXHR9KTtcclxuXHRjb3VudFJvdyA9IDA7XHJcblx0ZWxlbWVudENvbnRlbnQ7XHJcblx0dG9wUmVzdWx0c0xpc3QgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidG9wcmVzdWx0c2xpc3RcIikpO1xyXG5cdHRhYmxlUm93c1RvcC5mb3JFYWNoKChyb3cpID0+IHtcclxuXHRcdGxldCBjb3VudEVsZW1lbnQgPSAwO1xyXG5cdFx0QXJyYXkuZnJvbShyb3cuY2hpbGRyZW4pLmZvckVhY2goKGVsZW1lbnQpID0+IHtcclxuXHRcdFx0ZWxlbWVudENvbnRlbnQgPSB0b3BSZXN1bHRzTGlzdFtjb3VudFJvd107XHJcblxyXG5cdFx0XHRpZiAoZWxlbWVudENvbnRlbnQpIHtcclxuXHRcdFx0XHRlbGVtZW50LnN0eWxlLmNvbG9yID0gXCJcIjtcclxuXHRcdFx0XHRpZiAoXHJcblx0XHRcdFx0XHRlbGVtZW50Q29udGVudFtcInNwZWVkXCJdICogZWxlbWVudENvbnRlbnRbXCJhY2N1cmFjeVwiXSAqIGVsZW1lbnRDb250ZW50W1widGltZVwiXSA9PVxyXG5cdFx0XHRcdFx0cmVzdWx0TGlzdFtcInNwZWVkXCJdICogcmVzdWx0TGlzdFtcImFjY3VyYWN5XCJdICogcmVzdWx0TGlzdFtcInRpbWVcIl1cclxuXHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdGVsZW1lbnQuc3R5bGUuY29sb3IgPSBcImdyZWVuXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGVsZW1lbnQudGV4dENvbnRlbnQgPSBPYmplY3QudmFsdWVzKGVsZW1lbnRDb250ZW50KVtjb3VudEVsZW1lbnRdICsgXCIgXCIgKyBtZXRyaWNMaXN0W2NvdW50RWxlbWVudF07XHJcblx0XHRcdFx0aWYgKGNvdW50RWxlbWVudCA9PSAwKSB7XHJcblx0XHRcdFx0XHRlbGVtZW50LnRleHRDb250ZW50ID0gY291bnRSb3cgKyAxICsgXCIuwqBcIiArIGVsZW1lbnQudGV4dENvbnRlbnQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGVsZW1lbnQudGV4dENvbnRlbnQgPSBcIlwiO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNvdW50RWxlbWVudCsrO1xyXG5cdFx0fSk7XHJcblx0XHRjb3VudFJvdysrO1xyXG5cdH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzb3J0QXJyYXkoYXJyYXkpIHtcclxuXHRyZXR1cm4gYXJyYXkuc29ydCgoZWxlbWVudE9uZSwgZWxlbWVudFR3bykgPT4ge1xyXG5cdFx0bGV0IGZpcnN0UmVzdWx0ID0gZWxlbWVudE9uZVtcInNwZWVkXCJdICogZWxlbWVudE9uZVtcImFjY3VyYWN5XCJdO1xyXG5cdFx0bGV0IHNlY29uZFJlc3VsdCA9IGVsZW1lbnRUd29bXCJzcGVlZFwiXSAqIGVsZW1lbnRUd29bXCJhY2N1cmFjeVwiXTtcclxuXHRcdHJldHVybiBmaXJzdFJlc3VsdCA+IHNlY29uZFJlc3VsdCA/IC0xIDogZmlyc3RSZXN1bHQgPCBzZWNvbmRSZXN1bHQgPyAxIDogMDtcclxuXHR9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0TGVuZ3RoKCkge1xyXG5cdGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwic3RyaW5nTGVuZ3RoXCIsIHJhbmdlLnZhbHVlKTtcclxuXHRyYW5nZS52YWx1ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwic3RyaW5nTGVuZ3RoXCIpO1xyXG5cdHN0cmluZ0xlbmd0aCA9ICtsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInN0cmluZ0xlbmd0aFwiKTtcclxuXHRyYW5nZUxhYmVsLnRleHRDb250ZW50ID0gc3RyaW5nTGVuZ3RoO1xyXG5cdGlzU2hvd0FkdmFuY2VNb2RlT247XHJcbn1cclxuZnVuY3Rpb24gc2V0T3BhY2l0eSgpIHtcclxuXHRwcmludGVkVGV4dFRleGZpbGVkLnN0eWxlLm9wYWNpdHkgPSAxMDAgLSByYW5nZU9wYWNpdHkudmFsdWUgKyBcIiVcIjtcclxuXHRwcmludGVkV3JvbmdUZXhmaWxlZC5zdHlsZS5vcGFjaXR5ID0gMTAwIC0gcmFuZ2VPcGFjaXR5LnZhbHVlICsgXCIlXCI7XHJcblx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcmludGVkVGV4dE9wYWNpdHlcIiwgcmFuZ2VPcGFjaXR5LnZhbHVlKTtcclxuXHRyYW5nZU9wYWNpdHkudmFsdWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByaW50ZWRUZXh0T3BhY2l0eVwiKTtcclxuXHRyYW5nZUxhYmVsT3BhY2l0eS50ZXh0Q29udGVudCA9ICtsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByaW50ZWRUZXh0T3BhY2l0eVwiKSArIFwiJVwiO1xyXG59XHJcbmZ1bmN0aW9uIHNldEFkdmFuY2VNb2RlKCkge1xyXG5cdGlmICh0ZXN0SXNXb3JrKSB7XHJcblx0XHRpZiAodGhpcy5jaGVja2VkKSB7XHJcblx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiaXNTaG93QWR2YW5jZU1vZGVPblwiLCB0cnVlKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiaXNTaG93QWR2YW5jZU1vZGVPblwiLCBmYWxzZSk7XHJcblx0XHR9XHJcblx0fSBlbHNlIHtcclxuXHRcdGlmICh0aGlzLmNoZWNrZWQpIHtcclxuXHRcdFx0aXNTaG93QWR2YW5jZU1vZGVPbiA9IHRydWU7XHJcblxyXG5cdFx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImlzU2hvd0FkdmFuY2VNb2RlT25cIiwgdHJ1ZSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpc1Nob3dBZHZhbmNlTW9kZU9uID0gZmFsc2U7XHJcblxyXG5cdFx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImlzU2hvd0FkdmFuY2VNb2RlT25cIiwgZmFsc2UpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5mdW5jdGlvbiByZXNldFJlc3VsdCgpIHtcclxuXHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImxhc3RyZXN1bHRzbGlzdFwiLCBKU09OLnN0cmluZ2lmeShbXSkpO1xyXG5cdGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidG9wcmVzdWx0c2xpc3RcIiwgSlNPTi5zdHJpbmdpZnkoW10pKTtcclxuXHRmaWxsTGFzdFRhYmxlKCk7XHJcbn1cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwga2V5ZG93bik7XHJcbmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xvc2VNb2RhbCk7XHJcbnJlc2V0UmVzdWx0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCByZXNldFJlc3VsdCk7XHJcbm1vcmVJbmZvQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzaG93TW9yZUluZm8pO1xyXG5BcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2VjdGlvblwiKSkuZm9yRWFjaCgoc2VjdGlvbikgPT4ge1xyXG5cdHNlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsb3NlTW9kYWwpO1xyXG59KTtcclxuZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkZXJcIilbMF0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsb3NlTW9kYWwpO1xyXG5jaGVja0JveEl0ZW1PbmUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG1vZGVPbmUpO1xyXG5jaGVja0JveEl0ZW1Ud28uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG1vZGVUd28pO1xyXG5jaGVja0JveEFuaW1hdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIHNldEFuaW1hdGlvbldvcmspO1xyXG5jaGVja0JveFNob3dQcmludGVkVGV4dC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIHNldFNob3dQcmludGVkVGV4dCk7XHJcbmNoZWNrQm94U2hvd1ByaW50ZWRXcm9uZy5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIHNldFNob3dQcmludGVkV3JvbmcpO1xyXG5jaGVja0JveEFkdmFuY2VNb2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgc2V0QWR2YW5jZU1vZGUpO1xyXG5jaGVja0JveFNob3dQcmludGVkVGV4dC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsICgpID0+IHtcclxuXHRpZiAoY2hlY2tCb3hTaG93UHJpbnRlZFRleHQuY2hlY2tlZCkge1xyXG5cdFx0cHJpbnRlZFRleHRUZXhmaWxlZC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG5cdFx0Ly8gcHJpbnRlZFdyb25nVGV4ZmlsZWQuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRwcmludGVkVGV4dFRleGZpbGVkLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XHJcblx0XHQvLyBwcmludGVkV3JvbmdUZXhmaWxlZC5zdHlsZS5vcGFjaXR5ID0gXCIwXCI7XHJcblx0fVxyXG59KTtcclxuY2hlY2tCb3hTaG93UHJpbnRlZFdyb25nLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xyXG5cdGlmIChjaGVja0JveFNob3dQcmludGVkV3JvbmcuY2hlY2tlZCkge1xyXG5cdFx0aXNFcnJvck1vZGVBY3RpdmUgPSB0cnVlO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRpc0Vycm9yTW9kZUFjdGl2ZSA9IGZhbHNlO1xyXG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiY3NwXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcblx0XHRwcmludGVkV3JvbmdUZXhmaWxlZC50ZXh0Q29udGVudCA9IFwiXCI7XHJcblx0XHRpZiAoYWN0aXZlS2V5KSBzaG93QWN0aXZlS2V5KGFjdGl2ZUtleSk7XHJcblx0fVxyXG59KTtcclxuY2hlY2tCb3hNb2RlT25lLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB2aXNpYmxlTW9kZU9uZSk7XHJcbmNoZWNrQm94TW9kZVR3by5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdmlzaWJsZU1vZGVUd28pO1xyXG5yYW5nZS5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIHNldExlbmd0aCk7XHJcbnJhbmdlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgc2V0TGVuZ3RoKTtcclxuc2V0TGVuZ3RoKCk7XHJcbnJhbmdlT3BhY2l0eS5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIHNldE9wYWNpdHkpO1xyXG5yYW5nZU9wYWNpdHkuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBzZXRPcGFjaXR5KTtcclxuc2V0T3BhY2l0eSgpO1xyXG5cclxuZnVuY3Rpb24gZ2V0UmVnaXN0ZXIoc3VtYm9sKSB7XHJcblx0aWYgKFxyXG5cdFx0c3VtYm9sID09IHN1bWJvbC50b0xvd2VyQ2FzZSgpICYmXHJcblx0XHRzdW1ib2wgPT0gc3VtYm9sLnRvVXBwZXJDYXNlKCkgJiZcclxuXHRcdHN1bWJvbCAhPSBcIiBcIiAmJlxyXG5cdFx0c3VtYm9sICE9IFwiLlwiICYmXHJcblx0XHRzdW1ib2wgIT0gXCIvXCIgJiZcclxuXHRcdHN1bWJvbCAhPSBcIltcIiAmJlxyXG5cdFx0c3VtYm9sICE9IFwiXVwiICYmXHJcblx0XHRzdW1ib2wgIT0gXCI9XCIgJiZcclxuXHRcdHN1bWJvbCAhPSBcIi1cIlxyXG5cdCkge1xyXG5cdFx0cmV0dXJuIFwi0KHQv9C10YZcIjtcclxuXHR9IGVsc2UgaWYgKHN1bWJvbCAhPSBzdW1ib2wudG9Mb3dlckNhc2UoKSAmJiBzdW1ib2wgPT0gc3VtYm9sLnRvVXBwZXJDYXNlKCkpIHtcclxuXHRcdHJldHVybiBcItCS0LXRgNGF0L3QuNC5XCI7XHJcblx0fSBlbHNlIGlmIChzdW1ib2wgPT0gc3VtYm9sLnRvTG93ZXJDYXNlKCkgJiYgc3VtYm9sICE9IHN1bWJvbC50b1VwcGVyQ2FzZSgpKSB7XHJcblx0XHRyZXR1cm4gXCLQndC40LbQvdC40LlcIjtcclxuXHR9XHJcbn1cclxuZnVuY3Rpb24gcmVwbGFjZUtleShrZXlQcikge1xyXG5cdGtleXMucnUuZm9yRWFjaCgoa2V5LCBpbmRleCkgPT4ge1xyXG5cdFx0aWYgKGtleVByLmxlbmd0aCA9PSAxKVxyXG5cdFx0XHRrZXlQciA9IGtleVByLnJlcGxhY2Uoa2V5LCBrZXlzLmVuW2luZGV4XSkucmVwbGFjZShrZXkudG9VcHBlckNhc2UoKSwga2V5cy5lbltpbmRleF0udG9VcHBlckNhc2UoKSk7XHJcblx0fSk7XHJcblx0cmV0dXJuIGtleVByO1xyXG59XHJcbiJdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWTtBQUNaLE9BQU9BLFdBQVcsTUFBTSxrQkFBa0I7QUFDMUMsSUFBSUMsTUFBTSxHQUFHQyxRQUFRLENBQUNDLHNCQUFzQixDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoRSxJQUFJQyxRQUFRLEdBQUdGLFFBQVEsQ0FBQ0csY0FBYyxDQUFDLFlBQVksQ0FBQztBQUNwRCxJQUFJQyxpQkFBaUIsR0FBR0osUUFBUSxDQUFDRyxjQUFjLENB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
