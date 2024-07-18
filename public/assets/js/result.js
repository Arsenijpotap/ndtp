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
Array.from(sections).forEach(el => {
  el.style.opacity = "0";
  el.style.dispaly = "none";
});
Object.values(accuracyList).forEach(accuracy => {
  accuracySr += accuracy;
});
accuracySr /= Object.values(accuracyList).length;
if (Object.values(minSpeed)[0]) {
  data[0].textContent = accuracySr.toString().slice(0, 2).replace(".", "") + "%";
  data[1].textContent = Object.values(maxSpeed).reduce((a, b) => {
    return a > b ? a : b;
  }) + " н/с";
  data[2].textContent = Math.round(Object.values(sumResult).reduce((a, b) => {
    return a + b;
  }) * 100 / Object.values(sumResult).length) / 100 + " н/с";
  data[3].textContent = Object.values(minSpeed).reduce((a, b) => {
    return a < b ? a : b;
  }) + " н/с";
  data[4].textContent = lengthTr;
  if (timeList[0]) {
    data[5].textContent = Math.round(timeList.reduce((a, b) => {
      return a + b;
    })) + " с";
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
Array.from(tabButtons).forEach(button => {
  button.addEventListener("click", () => {
    if (button.style.opacity != "1") {
      Array.from(tabButtons).forEach(el => {
        el.style.opacity = "0.5";
      });
      let id = button.getAttribute("data-tab-name");
      let sectioanActive = document.getElementById(id);
      button.style.opacity = "1";
      Array.from(sections).forEach(el => {
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
  times.forEach(time => {
    time.textContent = parseFloat(time.textContent) + " с";
  });
  speeds.forEach(speed => {
    speed.textContent = parseFloat(speed.textContent) + "н/с";
  });
} else {
  checkBoxItemOne.style.opacity = "";
  checkBoxItemTwo.style.opacity = "1";
  times.forEach(time => {
    time.textContent = Math.round(parseFloat(time.textContent) / 60 * 10000) / 10000 + " мин";
  });
  speeds.forEach(speed => {
    speed.textContent = Math.round(parseFloat(speed.textContent) * 6000) / 100 + " н/мин";
  });
  timesM.forEach((time, index) => {
    time.textContent = Math.round(parseFloat(time.textContent) / 60 * 100) / 100 + " мин";
  });
  speedsM.forEach((speed, index) => {
    speed.textContent = Math.round(parseFloat(speed.textContent) * 6000) / 100 + " н/мин";
  });
  redSpeedList = redSpeedList.map(speed => {
    speed *= 60;
    return speed;
  });
  speedList = speedList.map(speed => {
    speed *= 60;
    return speed;
  });
  setTimeout(() => {
    chartSpeedActive.options.plugins = {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: "Скорость печати с течением времени (н/мин)",
        font: {
          size: 20
        }
      }
    };
    bestChartActive.options.plugins = {
      legend: {
        display: true,
        position: "bottom"
      },
      title: {
        display: true,
        text: "Скорости по языкам (н/мин)",
        font: {
          size: 20
        }
      }
    };
    chartSpeedActive.data.datasets = [{
      type: "line",
      label: "Скорость",
      data: redSpeedList,
      hoverOffset: 5
    }, {
      type: "bar",
      label: "Скорость",
      data: redSpeedList,
      hoverOffset: 5,
      backgroundColor: colorsBar,
      hoverBackgroundColor: activeColorsBar
    }];
  }, 500);
  setTimeout(() => {
    bestChartActive.data.datasets = [{
      backgroundColor: Object.values(lanColorsCut),
      label: "Максимальная скорость",
      data: Object.values(maxSpeed).map(speed => {
        return speed * 60;
      }),
      hoverOffset: 5,
      borderWidth: 0,
      clip: 1
    }, {
      backgroundColor: Array.from(Object.values(lanColorsCut)).map(color => {
        return color += "90";
      }),
      label: "Средняя скорость",
      data: Object.values(sumResult).map(speed => {
        return speed * 60;
      }),
      hoverOffset: 5,
      borderWidth: 0,
      clip: 1
    }, {
      backgroundColor: Array.from(Object.values(lanColorsCut)).map(color => {
        return color += "50";
      }),
      label: "Минимальная скорость",
      data: Object.values(minSpeed).map(speed => {
        return speed * 60;
      }),
      hoverOffset: 5,
      borderWidth: 0,
      clip: 1
    }];
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
        Array.from(row[index].children).forEach(child => {
          child.style.opacity = "0";
        });
      }, index * 60);
      setTimeout(() => {
        time.textContent = Math.round(parseFloat(time.textContent) * 6000) / 100 + " c";
        Array.from(row[index].children).forEach(child => {
          child.style.opacity = "1";
        });
      }, 500 + index * 60);
    });
    speeds.forEach((speed, index) => {
      setTimeout(() => {
        speed.textContent = Math.round(parseFloat(speed.textContent) / 60 * 100) / 100 + " н/с";
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
        speed.textContent = Math.round(parseFloat(speed.textContent) / 60 * 100) / 100 + " н/с";
        speed.style.opacity = "1";
      }, 300);
    });
    redSpeedList = redSpeedList.map(speed => {
      speed /= 60;
      return speed;
    });
    speedList = speedList.map(speed => {
      speed /= 60;
      return speed;
    });
    bestChartActive.options.plugins = {
      legend: {
        display: true,
        position: "bottom"
      },
      title: {
        display: true,
        text: "Скорости по языкам (н/с)",
        font: {
          size: 20
        }
      }
    };
    chartSpeedActive.options.plugins = {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: "Скорость печати с течением времени (н/с)",
        font: {
          size: 20
        }
      }
    };
    chartSpeedActive.data.datasets = [{
      type: "line",
      label: "Скорость",
      data: redSpeedList,
      hoverOffset: 5
    }, {
      type: "bar",
      label: "Скорость",
      data: redSpeedList,
      hoverOffset: 5,
      backgroundColor: colorsBar,
      hoverBackgroundColor: activeColorsBar
    }];
    bestChartActive.data.datasets = [{
      backgroundColor: Object.values(lanColorsCut),
      label: "Максимальная скорость",
      data: Object.values(maxSpeed),
      hoverOffset: 5,
      borderWidth: 0,
      clip: 1
    }, {
      backgroundColor: Array.from(Object.values(lanColorsCut)).map(color => {
        return color += "90";
      }),
      label: "Средняя скорость",
      data: Object.values(sumResult),
      hoverOffset: 5,
      borderWidth: 0,
      clip: 1
    }, {
      backgroundColor: Array.from(Object.values(lanColorsCut)).map(color => {
        return color += "50";
      }),
      label: "Минимальная скорость",
      data: Object.values(minSpeed),
      hoverOffset: 5,
      borderWidth: 0,
      clip: 1
    }], bestChartActive.update();
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
        Array.from(row[index].children).forEach(child => {
          child.style.opacity = "0";
        });
      }, index * 60);
      setTimeout(() => {
        time.textContent = Math.round(parseFloat(time.textContent) / 60 * 10000) / 10000 + " мин";
        Array.from(row[index].children).forEach(child => {
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
        time.textContent = Math.round(parseFloat(time.textContent) / 60 * 100) / 100 + " мин";
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
    redSpeedList = redSpeedList.map(speed => {
      speed *= 60;
      return speed;
    });
    speedList = speedList.map(speed => {
      speed *= 60;
      return speed;
    });
    bestChartActive.options.plugins = {
      legend: {
        display: true,
        position: "bottom"
      },
      title: {
        display: true,
        text: "Скорости по языкам (н/мин)",
        font: {
          size: 20
        }
      }
    };
    chartSpeedActive.options.plugins = {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: "Скорость печати с течением времени (н/мин)",
        font: {
          size: 20
        }
      }
    };
    chartSpeedActive.data.datasets = [{
      type: "line",
      label: "Скорость",
      data: redSpeedList,
      hoverOffset: 5
    }, {
      type: "bar",
      label: "Скорость",
      data: redSpeedList,
      hoverOffset: 5,
      backgroundColor: colorsBar,
      hoverBackgroundColor: activeColorsBar
    }];
    bestChartActive.data.datasets = [{
      backgroundColor: Object.values(lanColorsCut),
      label: "Максимальная скорость",
      data: Object.values(maxSpeed).map(speed => {
        return speed * 60;
      }),
      hoverOffset: 5,
      borderWidth: 0,
      clip: 1
    }, {
      backgroundColor: Array.from(Object.values(lanColorsCut)).map(color => {
        return color += "90";
      }),
      label: "Средняя скорость",
      data: Object.values(sumResult).map(speed => {
        return speed * 60;
      }),
      hoverOffset: 5,
      borderWidth: 0,
      clip: 1
    }, {
      backgroundColor: Array.from(Object.values(lanColorsCut)).map(color => {
        return color += "50";
      }),
      label: "Минимальная скорость",
      data: Object.values(minSpeed).map(speed => {
        return speed * 60;
      }),
      hoverOffset: 5,
      borderWidth: 0,
      clip: 1
    }], bestChartActive.update();
    chartSpeedActive.update();
  }
}
checkBoxItemOne.addEventListener("click", modeOne);
checkBoxItemTwo.addEventListener("click", modeTwo);
setTimeout(() => {
  chartSpeedActive.data = {
    labels: redLanList,
    datasets: [{
      type: "line",
      label: "Скорость",
      data: redSpeedList,
      hoverOffset: 5
    }, {
      type: "bar",
      label: "Скорость",
      data: redSpeedList,
      hoverOffset: 5,
      backgroundColor: colorsBar,
      hoverBackgroundColor: activeColorsBar
    }]
  };
  chartSpeedActive.update();
}, 500);
setTimeout(() => {
  chartLanActive.data = {
    labels: Object.keys(langCount),
    datasets: [{
      label: "Процент тренировок",
      data: Object.values(langCount).map(value => Math.round(value / lengthTr * 100)),
      hoverOffset: 10,
      borderWidth: 0,
      clip: 1,
      backgroundColor: colors
      // hoverBackgroundColor: activeColors,
    }]
  };
  chartLanActive.update();
}, 900);
setTimeout(() => {
  bestChartActive.data = {
    labels: Object.keys(sumResult),
    datasets: [{
      backgroundColor: Object.values(lanColorsCut),
      label: "Максимальная скорость",
      data: Object.values(maxSpeed),
      hoverOffset: 5,
      borderWidth: 0,
      clip: 1
    }, {
      backgroundColor: Array.from(Object.values(lanColorsCut)).map(color => {
        return color += "90";
      }),
      label: "Средняя скорость",
      data: Object.values(sumResult),
      hoverOffset: 5,
      borderWidth: 0,
      clip: 1
    }, {
      backgroundColor: Array.from(Object.values(lanColorsCut)).map(color => {
        return color += "50";
      }),
      label: "Минимальная скорость",
      data: Object.values(minSpeed),
      hoverOffset: 5,
      borderWidth: 0,
      clip: 1
    }]
  }, bestChartActive.update();
}, 700);
setTimeout(() => {
  chartAccuracyActive.data = {
    labels: Object.keys(accuracyList),
    datasets: [{
      label: "Точность",
      data: Object.values(accuracyList),
      // hoverBorderWidth: 3,
      // borderColor: "black",
      borderWidth: 0,
      hoverBorderColor: "black",
      borderColor: "black",
      clip: 1,
      backgroundColor: colors,
      hoverBackgroundColor: activeColors
    }]
  };
  chartAccuracyActive.update();
}, 1100);

//Myresult

let step = 100 / rowActive.length;
rowActive.forEach((rowEl, index) => {
  rowEl.addEventListener("mouseover", () => {
    let colorSetting = "hsl(" + (100 - step * index) + ",100%,50%)";
    Array.from(rowEl.children).forEach(child => {
      child.style.backgroundColor = colorSetting;
    });
  });
});
rowActive.forEach((rowEl, index) => {
  rowEl.addEventListener("mouseout", () => {
    Array.from(rowEl.children).forEach(child => {
      child.style.backgroundColor = "";
    });
  });
});
let lan;
let inputsF = Array.from(document.getElementsByClassName("topResult__input"));
inputsF.forEach(input => {
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

let topResults = Object.groupBy(allResults, ({
  name
}) => name);
function filterResults() {
  resultModeResult = [];
  Object.keys(topResults).forEach((person, index) => {
    let result = topResults[person];
    let accuracyRow = 0;
    let speedRow = 0;
    let countRow = 0;
    result.forEach(resultRow => {
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
      count: countRow
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
  result.forEach(resultRow => {
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
    count: countRow
  });
});
sortArrayCountMode(resultModeResult);
sortArrayResultMode(resultModeResult);
filterResults();
let topTable = document.getElementsByClassName("topResult__table")[0];
topTable.innerHTML = `<thead>
		<tr>
			<th>№</th>
			<th>Имя</th>
			<th>Точность</th>
			<th>Скорость</th>
			<th>Количество тренировок</th>
		</tr>
	</thead>
						` + `<tr>
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
      Array.from(topTableRow[index].children).forEach(th => {
        th.style.opacity = "1";
        th.style.backgroundColor = "";
      });
      topTableRow[index].style = "";
      if (userName == results.name) {
        Array.from(topTableRow[index].children).forEach(th => {
          th.style.backgroundColor = "#cccccd90";
        });
      }
      topTableRow[index].children[0].textContent = index + 1;
      topTableRow[index].children[1].textContent = results.name;
      topTableRow[index].children[2].textContent = results.accuracy ? results.accuracy + "%" : "-";
      if (localStorage.getItem("isSecondModeOn") == "true") {
        topTableRow[index].children[3].textContent = results.speed ? results.speed + " н/с" : "-";
      } else {
        topTableRow[index].children[3].textContent = results.speed ? Math.round(results.speed * 6000) / 100 + " н/мин" : "-";
      }
      topTableRow[index].children[4].textContent = results.count;
      topTableRow[index].style.opacity = "1";
      if (!results.accuracy) {
        Array.from(topTableRow[index].children).forEach(th => {
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

////# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdWx0LmpzIiwibmFtZXMiOlsidGFiQnV0dG9ucyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsInNlY3Rpb25zIiwiY2hlY2tCb3hJdGVtT25lIiwiY2hlY2tCb3hJdGVtVHdvIiwidGltZXMiLCJBcnJheSIsImZyb20iLCJzcGVlZHMiLCJ0aW1lc00iLCJzcGVlZHNNIiwiZGF0YSIsInJvd0FjdGl2ZSIsInJvdyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJ1c2VyTmFtZSIsInRleHRDb250ZW50IiwiY29uc29sZSIsImxvZyIsImFjY3VyYWN5U3IiLCJyZXN1bHRNb2RlUmVzdWx0IiwiZm9yRWFjaCIsImVsIiwic3R5bGUiLCJvcGFjaXR5IiwiZGlzcGFseSIsIk9iamVjdCIsInZhbHVlcyIsImFjY3VyYWN5TGlzdCIsImFjY3VyYWN5IiwibGVuZ3RoIiwibWluU3BlZWQiLCJ0b1N0cmluZyIsInNsaWNlIiwicmVwbGFjZSIsIm1heFNwZWVkIiwicmVkdWNlIiwiYSIsImIiLCJNYXRoIiwicm91bmQiLCJzdW1SZXN1bHQiLCJsZW5ndGhUciIsInRpbWVMaXN0IiwiZ2V0RWxlbWVudEJ5SWQiLCJteVJlc3VsdCIsImNsYXNzTGlzdCIsInJlbW92ZSIsImRpc3BsYXkiLCJpbm5lckhUTUwiLCJhZGQiLCJidXR0b24iLCJhZGRFdmVudExpc3RlbmVyIiwiaWQiLCJnZXRBdHRyaWJ1dGUiLCJzZWN0aW9hbkFjdGl2ZSIsInNldFRpbWVvdXQiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwiZ2V0SXRlbSIsInRpbWUiLCJwYXJzZUZsb2F0Iiwic3BlZWQiLCJpbmRleCIsInJlZFNwZWVkTGlzdCIsIm1hcCIsInNwZWVkTGlzdCIsImNoYXJ0U3BlZWRBY3RpdmUiLCJvcHRpb25zIiwicGx1Z2lucyIsImxlZ2VuZCIsInRpdGxlIiwidGV4dCIsImZvbnQiLCJzaXplIiwiYmVzdENoYXJ0QWN0aXZlIiwicG9zaXRpb24iLCJkYXRhc2V0cyIsInR5cGUiLCJsYWJlbCIsImhvdmVyT2Zmc2V0IiwiYmFja2dyb3VuZENvbG9yIiwiY29sb3JzQmFyIiwiaG92ZXJCYWNrZ3JvdW5kQ29sb3IiLCJhY3RpdmVDb2xvcnNCYXIiLCJsYW5Db2xvcnNDdXQiLCJib3JkZXJXaWR0aCIsImNsaXAiLCJjb2xvciIsInVwZGF0ZSIsIm1vZGVPbmUiLCJkcmF3VGFibGVSZXN1bHRzIiwiY2hpbGRyZW4iLCJjaGlsZCIsIm1vZGVUd28iLCJsYWJlbHMiLCJyZWRMYW5MaXN0IiwiY2hhcnRMYW5BY3RpdmUiLCJrZXlzIiwibGFuZ0NvdW50IiwidmFsdWUiLCJjb2xvcnMiLCJjaGFydEFjY3VyYWN5QWN0aXZlIiwiaG92ZXJCb3JkZXJDb2xvciIsImJvcmRlckNvbG9yIiwiYWN0aXZlQ29sb3JzIiwic3RlcCIsInJvd0VsIiwiY29sb3JTZXR0aW5nIiwibGFuIiwiaW5wdXRzRiIsImlucHV0IiwiY2hlY2tlZCIsImFjdGl2ZUxhbnNGIiwicHVzaCIsImluZGV4T2YiLCJzcGxpY2UiLCJmaWx0ZXJSZXN1bHRzIiwiaXNSZXN1bHRNb2RlQWN0aXZlIiwiY291bnRNb2RlIiwicmVzdWx0TW9kZSIsInNvcnRBcnJheVJlc3VsdE1vZGUiLCJzb3J0QXJyYXlDb3VudE1vZGUiLCJ0b3BSZXN1bHRzIiwiZ3JvdXBCeSIsImFsbFJlc3VsdHMiLCJuYW1lIiwicGVyc29uIiwicmVzdWx0IiwiYWNjdXJhY3lSb3ciLCJzcGVlZFJvdyIsImNvdW50Um93IiwicmVzdWx0Um93IiwibGFuZ3VhZ2UiLCJjb3VudCIsImFycmF5Iiwic29ydCIsImVsZW1lbnRPbmUiLCJlbGVtZW50VHdvIiwiZmlyc3RSZXN1bHQiLCJzZWNvbmRSZXN1bHQiLCJ0b3BUYWJsZSIsInJlcGVhdCIsInRvcFRhYmxlUm93IiwicmVzdWx0cyIsInRoIiwiaXNTaG93TW9kZSJdLCJzb3VyY2VzIjpbInJlc3VsdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJgdXNlIHN0cmljdGA7XHJcbmxldCB0YWJCdXR0b25zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInJlc3VsdF9fbW9kZS1idXR0b25cIik7XHJcbmxldCBzZWN0aW9ucyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJyZXN1bHRcIik7XHJcbmxldCBjaGVja0JveEl0ZW1PbmUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibW9yZS1pbmZvX19jaGVja2JveFwiKVswXTtcclxubGV0IGNoZWNrQm94SXRlbVR3byA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJtb3JlLWluZm9fX2NoZWNrYm94XCIpWzFdO1xyXG5sZXQgdGltZXMgPSBBcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ0aW1lXCIpKTtcclxubGV0IHNwZWVkcyA9IEFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNwZWVkXCIpKTtcclxubGV0IHRpbWVzTSA9IEFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInRpbWUtbVwiKSk7XHJcbmxldCBzcGVlZHNNID0gQXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic3BlZWQtbVwiKSk7XHJcbmxldCBkYXRhID0gQXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibXlSZXN1bHRfX2RhdGFcIikpO1xyXG5sZXQgcm93QWN0aXZlID0gQXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwidGFibGUtcm93LWFjdGl2ZVwiKSk7XHJcbmxldCByb3cgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYWxsUmVzdWx0X190YWJsZSB0Ym9keSB0clwiKSk7XHJcbmxldCB1c2VyTmFtZTtcclxuaWYgKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJyZXN1bHRfX25hbWVcIilbMF0pIHtcclxuXHR1c2VyTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJyZXN1bHRfX25hbWVcIilbMF0udGV4dENvbnRlbnQ7XHJcbn1cclxuY29uc29sZS5sb2codXNlck5hbWUpO1xyXG5sZXQgYWNjdXJhY3lTciA9IDA7XHJcbmxldCByZXN1bHRNb2RlUmVzdWx0ID0gW107XHJcbkFycmF5LmZyb20oc2VjdGlvbnMpLmZvckVhY2goKGVsKSA9PiB7XHJcblx0ZWwuc3R5bGUub3BhY2l0eSA9IFwiMFwiO1xyXG5cdGVsLnN0eWxlLmRpc3BhbHkgPSBcIm5vbmVcIjtcclxufSk7XHJcbk9iamVjdC52YWx1ZXMoYWNjdXJhY3lMaXN0KS5mb3JFYWNoKChhY2N1cmFjeSkgPT4ge1xyXG5cdGFjY3VyYWN5U3IgKz0gYWNjdXJhY3k7XHJcbn0pO1xyXG5hY2N1cmFjeVNyIC89IE9iamVjdC52YWx1ZXMoYWNjdXJhY3lMaXN0KS5sZW5ndGg7XHJcbmlmIChPYmplY3QudmFsdWVzKG1pblNwZWVkKVswXSkge1xyXG5cdGRhdGFbMF0udGV4dENvbnRlbnQgPSBhY2N1cmFjeVNyLnRvU3RyaW5nKCkuc2xpY2UoMCwgMikucmVwbGFjZShcIi5cIiwgXCJcIikgKyBcIiVcIjtcclxuXHRkYXRhWzFdLnRleHRDb250ZW50ID1cclxuXHRcdE9iamVjdC52YWx1ZXMobWF4U3BlZWQpLnJlZHVjZSgoYSwgYikgPT4ge1xyXG5cdFx0XHRyZXR1cm4gYSA+IGIgPyBhIDogYjtcclxuXHRcdH0pICsgXCIg0L0v0YFcIjtcclxuXHRkYXRhWzJdLnRleHRDb250ZW50ID1cclxuXHRcdE1hdGgucm91bmQoXHJcblx0XHRcdChPYmplY3QudmFsdWVzKHN1bVJlc3VsdCkucmVkdWNlKChhLCBiKSA9PiB7XHJcblx0XHRcdFx0cmV0dXJuIGEgKyBiO1xyXG5cdFx0XHR9KSAqXHJcblx0XHRcdFx0MTAwKSAvXHJcblx0XHRcdFx0T2JqZWN0LnZhbHVlcyhzdW1SZXN1bHQpLmxlbmd0aCxcclxuXHRcdCkgL1xyXG5cdFx0XHQxMDAgK1xyXG5cdFx0XCIg0L0v0YFcIjtcclxuXHRkYXRhWzNdLnRleHRDb250ZW50ID1cclxuXHRcdE9iamVjdC52YWx1ZXMobWluU3BlZWQpLnJlZHVjZSgoYSwgYikgPT4ge1xyXG5cdFx0XHRyZXR1cm4gYSA8IGIgPyBhIDogYjtcclxuXHRcdH0pICsgXCIg0L0v0YFcIjtcclxuXHRkYXRhWzRdLnRleHRDb250ZW50ID0gbGVuZ3RoVHI7XHJcblx0aWYgKHRpbWVMaXN0WzBdKSB7XHJcblx0XHRkYXRhWzVdLnRleHRDb250ZW50ID1cclxuXHRcdFx0TWF0aC5yb3VuZChcclxuXHRcdFx0XHR0aW1lTGlzdC5yZWR1Y2UoKGEsIGIpID0+IHtcclxuXHRcdFx0XHRcdHJldHVybiBhICsgYjtcclxuXHRcdFx0XHR9KSxcclxuXHRcdFx0KSArIFwiINGBXCI7XHJcblx0fVxyXG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlSZXN1bHRcIikuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xyXG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlSZXN1bHRcIikuc3R5bGUuZGlzcGFseSA9IFwiYmxvY2tcIjtcclxuXHR0YWJCdXR0b25zWzBdLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcclxuXHJcblx0bXlSZXN1bHQuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcclxuXHRteVJlc3VsdC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG59IGVsc2Uge1xyXG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWxsUmVzdWx0XCIpLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcclxuXHR0YWJCdXR0b25zWzFdLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcclxuXHJcblx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhbGxSZXN1bHRcIikuc3R5bGUuZGlzcGFseSA9IFwiYmxvY2tcIjtcclxuXHRteVJlc3VsdC5pbm5lckhUTUwgPSBcIjxwIGNsYXNzPSdteVJlc3VsdF9fZXJyb3InPtCd0LXRgiDRgNC10LfRg9C70YzRgtCw0YLQvtCyINC40LvQuCDQsNC60LrQsNGD0L3RgtCwPC9wPlwiO1xyXG5cdG15UmVzdWx0LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcblx0bXlSZXN1bHQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuXHRteVJlc3VsdC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbn1cclxuXHJcbkFycmF5LmZyb20odGFiQnV0dG9ucykuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XHJcblx0YnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcblx0XHRpZiAoYnV0dG9uLnN0eWxlLm9wYWNpdHkgIT0gXCIxXCIpIHtcclxuXHRcdFx0QXJyYXkuZnJvbSh0YWJCdXR0b25zKS5mb3JFYWNoKChlbCkgPT4ge1xyXG5cdFx0XHRcdGVsLnN0eWxlLm9wYWNpdHkgPSBcIjAuNVwiO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0bGV0IGlkID0gYnV0dG9uLmdldEF0dHJpYnV0ZShcImRhdGEtdGFiLW5hbWVcIik7XHJcblx0XHRcdGxldCBzZWN0aW9hbkFjdGl2ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuXHRcdFx0YnV0dG9uLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcclxuXHRcdFx0QXJyYXkuZnJvbShzZWN0aW9ucykuZm9yRWFjaCgoZWwpID0+IHtcclxuXHRcdFx0XHRlbC5zdHlsZS5vcGFjaXR5ID0gXCIwXCI7XHJcblx0XHRcdFx0aWYgKGVsICE9IHNlY3Rpb2FuQWN0aXZlKSB7XHJcblx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRcdFx0ZWwuc3R5bGUgPSBcImRpc3BsYXk6bm9uZTtcIjtcclxuXHRcdFx0XHRcdH0sIDUwMCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHNlY3Rpb2FuQWN0aXZlLnN0eWxlID0gXCJkaXNwYWx5OmJsb2NrO29wYWNpdHk6MDtcIjtcclxuXHJcblx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0XHRzZWN0aW9hbkFjdGl2ZS5zdHlsZSA9IFwib3BhY2l0eToxO2Rpc3BhbHk6YmxvY2s7XCI7XHJcblx0XHRcdFx0fSwgNTAwKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn0pO1xyXG5pZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dpblwiKSkge1xyXG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9naW5cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicmVnXCIsIFwibG9naW5cIik7XHJcblx0fSk7XHJcblx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZWdpc3RlclwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG5cdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJyZWdcIiwgXCJyZWdpc3RlclwiKTtcclxuXHR9KTtcclxufVxyXG5cclxuaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiaXNTZWNvbmRNb2RlT25cIikgPT0gXCJ0cnVlXCIpIHtcclxuXHRjaGVja0JveEl0ZW1Ud28uc3R5bGUub3BhY2l0eSA9IFwiXCI7XHJcblx0Y2hlY2tCb3hJdGVtT25lLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcclxuXHR0aW1lcy5mb3JFYWNoKCh0aW1lKSA9PiB7XHJcblx0XHR0aW1lLnRleHRDb250ZW50ID0gcGFyc2VGbG9hdCh0aW1lLnRleHRDb250ZW50KSArIFwiINGBXCI7XHJcblx0fSk7XHJcblx0c3BlZWRzLmZvckVhY2goKHNwZWVkKSA9PiB7XHJcblx0XHRzcGVlZC50ZXh0Q29udGVudCA9IHBhcnNlRmxvYXQoc3BlZWQudGV4dENvbnRlbnQpICsgXCLQvS/RgVwiO1xyXG5cdH0pO1xyXG59IGVsc2Uge1xyXG5cdGNoZWNrQm94SXRlbU9uZS5zdHlsZS5vcGFjaXR5ID0gXCJcIjtcclxuXHRjaGVja0JveEl0ZW1Ud28uc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xyXG5cdHRpbWVzLmZvckVhY2goKHRpbWUpID0+IHtcclxuXHRcdHRpbWUudGV4dENvbnRlbnQgPSBNYXRoLnJvdW5kKChwYXJzZUZsb2F0KHRpbWUudGV4dENvbnRlbnQpIC8gNjApICogMTAwMDApIC8gMTAwMDAgKyBcIiDQvNC40L1cIjtcclxuXHR9KTtcclxuXHRzcGVlZHMuZm9yRWFjaCgoc3BlZWQpID0+IHtcclxuXHRcdHNwZWVkLnRleHRDb250ZW50ID0gTWF0aC5yb3VuZChwYXJzZUZsb2F0KHNwZWVkLnRleHRDb250ZW50KSAqIDYwMDApIC8gMTAwICsgXCIg0L0v0LzQuNC9XCI7XHJcblx0fSk7XHJcblx0dGltZXNNLmZvckVhY2goKHRpbWUsIGluZGV4KSA9PiB7XHJcblx0XHR0aW1lLnRleHRDb250ZW50ID0gTWF0aC5yb3VuZCgocGFyc2VGbG9hdCh0aW1lLnRleHRDb250ZW50KSAvIDYwKSAqIDEwMCkgLyAxMDAgKyBcIiDQvNC40L1cIjtcclxuXHR9KTtcclxuXHRzcGVlZHNNLmZvckVhY2goKHNwZWVkLCBpbmRleCkgPT4ge1xyXG5cdFx0c3BlZWQudGV4dENvbnRlbnQgPSBNYXRoLnJvdW5kKHBhcnNlRmxvYXQoc3BlZWQudGV4dENvbnRlbnQpICogNjAwMCkgLyAxMDAgKyBcIiDQvS/QvNC40L1cIjtcclxuXHR9KTtcclxuXHRyZWRTcGVlZExpc3QgPSByZWRTcGVlZExpc3QubWFwKChzcGVlZCkgPT4ge1xyXG5cdFx0c3BlZWQgKj0gNjA7XHJcblx0XHRyZXR1cm4gc3BlZWQ7XHJcblx0fSk7XHJcblx0c3BlZWRMaXN0ID0gc3BlZWRMaXN0Lm1hcCgoc3BlZWQpID0+IHtcclxuXHRcdHNwZWVkICo9IDYwO1xyXG5cdFx0cmV0dXJuIHNwZWVkO1xyXG5cdH0pO1xyXG5cdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0Y2hhcnRTcGVlZEFjdGl2ZS5vcHRpb25zLnBsdWdpbnMgPSB7XHJcblx0XHRcdGxlZ2VuZDoge1xyXG5cdFx0XHRcdGRpc3BsYXk6IGZhbHNlLFxyXG5cdFx0XHR9LFxyXG5cdFx0XHR0aXRsZToge1xyXG5cdFx0XHRcdGRpc3BsYXk6IHRydWUsXHJcblx0XHRcdFx0dGV4dDogXCLQodC60L7RgNC+0YHRgtGMINC/0LXRh9Cw0YLQuCDRgSDRgtC10YfQtdC90LjQtdC8INCy0YDQtdC80LXQvdC4ICjQvS/QvNC40L0pXCIsXHJcblx0XHRcdFx0Zm9udDoge1xyXG5cdFx0XHRcdFx0c2l6ZTogMjAsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSxcclxuXHRcdH07XHJcblx0XHRiZXN0Q2hhcnRBY3RpdmUub3B0aW9ucy5wbHVnaW5zID0ge1xyXG5cdFx0XHRsZWdlbmQ6IHtcclxuXHRcdFx0XHRkaXNwbGF5OiB0cnVlLFxyXG5cdFx0XHRcdHBvc2l0aW9uOiBcImJvdHRvbVwiLFxyXG5cdFx0XHR9LFxyXG5cdFx0XHR0aXRsZToge1xyXG5cdFx0XHRcdGRpc3BsYXk6IHRydWUsXHJcblx0XHRcdFx0dGV4dDogXCLQodC60L7RgNC+0YHRgtC4INC/0L4g0Y/Qt9GL0LrQsNC8ICjQvS/QvNC40L0pXCIsXHJcblx0XHRcdFx0Zm9udDoge1xyXG5cdFx0XHRcdFx0c2l6ZTogMjAsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSxcclxuXHRcdH07XHJcblx0XHRjaGFydFNwZWVkQWN0aXZlLmRhdGEuZGF0YXNldHMgPSBbXHJcblx0XHRcdHtcclxuXHRcdFx0XHR0eXBlOiBcImxpbmVcIixcclxuXHRcdFx0XHRsYWJlbDogXCLQodC60L7RgNC+0YHRgtGMXCIsXHJcblx0XHRcdFx0ZGF0YTogcmVkU3BlZWRMaXN0LFxyXG5cdFx0XHRcdGhvdmVyT2Zmc2V0OiA1LFxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0dHlwZTogXCJiYXJcIixcclxuXHRcdFx0XHRsYWJlbDogXCLQodC60L7RgNC+0YHRgtGMXCIsXHJcblx0XHRcdFx0ZGF0YTogcmVkU3BlZWRMaXN0LFxyXG5cdFx0XHRcdGhvdmVyT2Zmc2V0OiA1LFxyXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogY29sb3JzQmFyLFxyXG5cdFx0XHRcdGhvdmVyQmFja2dyb3VuZENvbG9yOiBhY3RpdmVDb2xvcnNCYXIsXHJcblx0XHRcdH0sXHJcblx0XHRdO1xyXG5cdH0sIDUwMCk7XHJcblx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRiZXN0Q2hhcnRBY3RpdmUuZGF0YS5kYXRhc2V0cyA9IFtcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogT2JqZWN0LnZhbHVlcyhsYW5Db2xvcnNDdXQpLFxyXG5cdFx0XHRcdGxhYmVsOiBcItCc0LDQutGB0LjQvNCw0LvRjNC90LDRjyDRgdC60L7RgNC+0YHRgtGMXCIsXHJcblx0XHRcdFx0ZGF0YTogT2JqZWN0LnZhbHVlcyhtYXhTcGVlZCkubWFwKChzcGVlZCkgPT4ge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHNwZWVkICogNjA7XHJcblx0XHRcdFx0fSksXHJcblx0XHRcdFx0aG92ZXJPZmZzZXQ6IDUsXHJcblx0XHRcdFx0Ym9yZGVyV2lkdGg6IDAsXHJcblx0XHRcdFx0Y2xpcDogMSxcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogQXJyYXkuZnJvbShPYmplY3QudmFsdWVzKGxhbkNvbG9yc0N1dCkpLm1hcCgoY29sb3IpID0+IHtcclxuXHRcdFx0XHRcdHJldHVybiAoY29sb3IgKz0gXCI5MFwiKTtcclxuXHRcdFx0XHR9KSxcclxuXHRcdFx0XHRsYWJlbDogXCLQodGA0LXQtNC90Y/RjyDRgdC60L7RgNC+0YHRgtGMXCIsXHJcblx0XHRcdFx0ZGF0YTogT2JqZWN0LnZhbHVlcyhzdW1SZXN1bHQpLm1hcCgoc3BlZWQpID0+IHtcclxuXHRcdFx0XHRcdHJldHVybiBzcGVlZCAqIDYwO1xyXG5cdFx0XHRcdH0pLFxyXG5cdFx0XHRcdGhvdmVyT2Zmc2V0OiA1LFxyXG5cdFx0XHRcdGJvcmRlcldpZHRoOiAwLFxyXG5cdFx0XHRcdGNsaXA6IDEsXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IEFycmF5LmZyb20oT2JqZWN0LnZhbHVlcyhsYW5Db2xvcnNDdXQpKS5tYXAoKGNvbG9yKSA9PiB7XHJcblx0XHRcdFx0XHRyZXR1cm4gKGNvbG9yICs9IFwiNTBcIik7XHJcblx0XHRcdFx0fSksXHJcblx0XHRcdFx0bGFiZWw6IFwi0JzQuNC90LjQvNCw0LvRjNC90LDRjyDRgdC60L7RgNC+0YHRgtGMXCIsXHJcblx0XHRcdFx0ZGF0YTogT2JqZWN0LnZhbHVlcyhtaW5TcGVlZCkubWFwKChzcGVlZCkgPT4ge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHNwZWVkICogNjA7XHJcblx0XHRcdFx0fSksXHJcblx0XHRcdFx0aG92ZXJPZmZzZXQ6IDUsXHJcblx0XHRcdFx0Ym9yZGVyV2lkdGg6IDAsXHJcblx0XHRcdFx0Y2xpcDogMSxcclxuXHRcdFx0fSxcclxuXHRcdF07XHJcblx0fSwgNzAwKTtcclxuXHJcblx0YmVzdENoYXJ0QWN0aXZlLnVwZGF0ZSgpO1xyXG5cdGNoYXJ0U3BlZWRBY3RpdmUudXBkYXRlKCk7XHJcbn1cclxuZnVuY3Rpb24gbW9kZU9uZSgpIHtcclxuXHRkcmF3VGFibGVSZXN1bHRzKCk7XHJcblx0aWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiaXNTZWNvbmRNb2RlT25cIikgPT0gXCJmYWxzZVwiKSB7XHJcblx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImlzU2Vjb25kTW9kZU9uXCIsIHRydWUpO1xyXG5cdFx0Y2hlY2tCb3hJdGVtVHdvLnN0eWxlLm9wYWNpdHkgPSBcIlwiO1xyXG5cdFx0Y2hlY2tCb3hJdGVtT25lLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcclxuXHRcdHRpbWVzLmZvckVhY2goKHRpbWUsIGluZGV4KSA9PiB7XHJcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdEFycmF5LmZyb20ocm93W2luZGV4XS5jaGlsZHJlbikuZm9yRWFjaCgoY2hpbGQpID0+IHtcclxuXHRcdFx0XHRcdGNoaWxkLnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSwgaW5kZXggKiA2MCk7XHJcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdHRpbWUudGV4dENvbnRlbnQgPSBNYXRoLnJvdW5kKHBhcnNlRmxvYXQodGltZS50ZXh0Q29udGVudCkgKiA2MDAwKSAvIDEwMCArIFwiIGNcIjtcclxuXHJcblx0XHRcdFx0QXJyYXkuZnJvbShyb3dbaW5kZXhdLmNoaWxkcmVuKS5mb3JFYWNoKChjaGlsZCkgPT4ge1xyXG5cdFx0XHRcdFx0Y2hpbGQuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9LCA1MDAgKyBpbmRleCAqIDYwKTtcclxuXHRcdH0pO1xyXG5cdFx0c3BlZWRzLmZvckVhY2goKHNwZWVkLCBpbmRleCkgPT4ge1xyXG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRzcGVlZC50ZXh0Q29udGVudCA9IE1hdGgucm91bmQoKHBhcnNlRmxvYXQoc3BlZWQudGV4dENvbnRlbnQpIC8gNjApICogMTAwKSAvIDEwMCArIFwiINC9L9GBXCI7XHJcblx0XHRcdH0sIDUwMCArIGluZGV4ICogNjApO1xyXG5cdFx0fSk7XHJcblx0XHR0aW1lc00uZm9yRWFjaCgodGltZSwgaW5kZXgpID0+IHtcclxuXHRcdFx0dGltZS5zdHlsZS5vcGFjaXR5ID0gXCIwXCI7XHJcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdHRpbWUudGV4dENvbnRlbnQgPSBNYXRoLnJvdW5kKHBhcnNlRmxvYXQodGltZS50ZXh0Q29udGVudCkgKiA2MDAwKSAvIDEwMCArIFwiIGNcIjtcclxuXHRcdFx0XHR0aW1lLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcclxuXHRcdFx0fSwgMzAwKTtcclxuXHRcdH0pO1xyXG5cdFx0c3BlZWRzTS5mb3JFYWNoKChzcGVlZCwgaW5kZXgpID0+IHtcclxuXHRcdFx0c3BlZWQuc3R5bGUub3BhY2l0eSA9IFwiMFwiO1xyXG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRzcGVlZC50ZXh0Q29udGVudCA9IE1hdGgucm91bmQoKHBhcnNlRmxvYXQoc3BlZWQudGV4dENvbnRlbnQpIC8gNjApICogMTAwKSAvIDEwMCArIFwiINC9L9GBXCI7XHJcblxyXG5cdFx0XHRcdHNwZWVkLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcclxuXHRcdFx0fSwgMzAwKTtcclxuXHRcdH0pO1xyXG5cdFx0cmVkU3BlZWRMaXN0ID0gcmVkU3BlZWRMaXN0Lm1hcCgoc3BlZWQpID0+IHtcclxuXHRcdFx0c3BlZWQgLz0gNjA7XHJcblx0XHRcdHJldHVybiBzcGVlZDtcclxuXHRcdH0pO1xyXG5cdFx0c3BlZWRMaXN0ID0gc3BlZWRMaXN0Lm1hcCgoc3BlZWQpID0+IHtcclxuXHRcdFx0c3BlZWQgLz0gNjA7XHJcblx0XHRcdHJldHVybiBzcGVlZDtcclxuXHRcdH0pO1xyXG5cdFx0YmVzdENoYXJ0QWN0aXZlLm9wdGlvbnMucGx1Z2lucyA9IHtcclxuXHRcdFx0bGVnZW5kOiB7XHJcblx0XHRcdFx0ZGlzcGxheTogdHJ1ZSxcclxuXHRcdFx0XHRwb3NpdGlvbjogXCJib3R0b21cIixcclxuXHRcdFx0fSxcclxuXHRcdFx0dGl0bGU6IHtcclxuXHRcdFx0XHRkaXNwbGF5OiB0cnVlLFxyXG5cdFx0XHRcdHRleHQ6IFwi0KHQutC+0YDQvtGB0YLQuCDQv9C+INGP0LfRi9C60LDQvCAo0L0v0YEpXCIsXHJcblx0XHRcdFx0Zm9udDoge1xyXG5cdFx0XHRcdFx0c2l6ZTogMjAsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSxcclxuXHRcdH07XHJcblx0XHRjaGFydFNwZWVkQWN0aXZlLm9wdGlvbnMucGx1Z2lucyA9IHtcclxuXHRcdFx0bGVnZW5kOiB7XHJcblx0XHRcdFx0ZGlzcGxheTogZmFsc2UsXHJcblx0XHRcdH0sXHJcblx0XHRcdHRpdGxlOiB7XHJcblx0XHRcdFx0ZGlzcGxheTogdHJ1ZSxcclxuXHRcdFx0XHR0ZXh0OiBcItCh0LrQvtGA0L7RgdGC0Ywg0L/QtdGH0LDRgtC4INGBINGC0LXRh9C10L3QuNC10Lwg0LLRgNC10LzQtdC90LggKNC9L9GBKVwiLFxyXG5cdFx0XHRcdGZvbnQ6IHtcclxuXHRcdFx0XHRcdHNpemU6IDIwLFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0sXHJcblx0XHR9O1xyXG5cdFx0Y2hhcnRTcGVlZEFjdGl2ZS5kYXRhLmRhdGFzZXRzID0gW1xyXG5cdFx0XHR7XHJcblx0XHRcdFx0dHlwZTogXCJsaW5lXCIsXHJcblx0XHRcdFx0bGFiZWw6IFwi0KHQutC+0YDQvtGB0YLRjFwiLFxyXG5cdFx0XHRcdGRhdGE6IHJlZFNwZWVkTGlzdCxcclxuXHRcdFx0XHRob3Zlck9mZnNldDogNSxcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHR5cGU6IFwiYmFyXCIsXHJcblx0XHRcdFx0bGFiZWw6IFwi0KHQutC+0YDQvtGB0YLRjFwiLFxyXG5cdFx0XHRcdGRhdGE6IHJlZFNwZWVkTGlzdCxcclxuXHRcdFx0XHRob3Zlck9mZnNldDogNSxcclxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yc0JhcixcclxuXHRcdFx0XHRob3ZlckJhY2tncm91bmRDb2xvcjogYWN0aXZlQ29sb3JzQmFyLFxyXG5cdFx0XHR9LFxyXG5cdFx0XTtcclxuXHRcdChiZXN0Q2hhcnRBY3RpdmUuZGF0YS5kYXRhc2V0cyA9IFtcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogT2JqZWN0LnZhbHVlcyhsYW5Db2xvcnNDdXQpLFxyXG5cdFx0XHRcdGxhYmVsOiBcItCc0LDQutGB0LjQvNCw0LvRjNC90LDRjyDRgdC60L7RgNC+0YHRgtGMXCIsXHJcblx0XHRcdFx0ZGF0YTogT2JqZWN0LnZhbHVlcyhtYXhTcGVlZCksXHJcblx0XHRcdFx0aG92ZXJPZmZzZXQ6IDUsXHJcblx0XHRcdFx0Ym9yZGVyV2lkdGg6IDAsXHJcblx0XHRcdFx0Y2xpcDogMSxcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogQXJyYXkuZnJvbShPYmplY3QudmFsdWVzKGxhbkNvbG9yc0N1dCkpLm1hcCgoY29sb3IpID0+IHtcclxuXHRcdFx0XHRcdHJldHVybiAoY29sb3IgKz0gXCI5MFwiKTtcclxuXHRcdFx0XHR9KSxcclxuXHRcdFx0XHRsYWJlbDogXCLQodGA0LXQtNC90Y/RjyDRgdC60L7RgNC+0YHRgtGMXCIsXHJcblx0XHRcdFx0ZGF0YTogT2JqZWN0LnZhbHVlcyhzdW1SZXN1bHQpLFxyXG5cdFx0XHRcdGhvdmVyT2Zmc2V0OiA1LFxyXG5cdFx0XHRcdGJvcmRlcldpZHRoOiAwLFxyXG5cdFx0XHRcdGNsaXA6IDEsXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IEFycmF5LmZyb20oT2JqZWN0LnZhbHVlcyhsYW5Db2xvcnNDdXQpKS5tYXAoKGNvbG9yKSA9PiB7XHJcblx0XHRcdFx0XHRyZXR1cm4gKGNvbG9yICs9IFwiNTBcIik7XHJcblx0XHRcdFx0fSksXHJcblx0XHRcdFx0bGFiZWw6IFwi0JzQuNC90LjQvNCw0LvRjNC90LDRjyDRgdC60L7RgNC+0YHRgtGMXCIsXHJcblx0XHRcdFx0ZGF0YTogT2JqZWN0LnZhbHVlcyhtaW5TcGVlZCksXHJcblx0XHRcdFx0aG92ZXJPZmZzZXQ6IDUsXHJcblx0XHRcdFx0Ym9yZGVyV2lkdGg6IDAsXHJcblx0XHRcdFx0Y2xpcDogMSxcclxuXHRcdFx0fSxcclxuXHRcdF0pLFxyXG5cdFx0XHRiZXN0Q2hhcnRBY3RpdmUudXBkYXRlKCk7XHJcblx0XHRjaGFydFNwZWVkQWN0aXZlLnVwZGF0ZSgpO1xyXG5cdH1cclxufVxyXG5mdW5jdGlvbiBtb2RlVHdvKCkge1xyXG5cdGRyYXdUYWJsZVJlc3VsdHMoKTtcclxuXHRpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJpc1NlY29uZE1vZGVPblwiKSA9PSBcInRydWVcIikge1xyXG5cdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJpc1NlY29uZE1vZGVPblwiLCBmYWxzZSk7XHJcblx0XHRjaGVja0JveEl0ZW1PbmUuc3R5bGUub3BhY2l0eSA9IFwiXCI7XHJcblx0XHRjaGVja0JveEl0ZW1Ud28uc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xyXG5cdFx0dGltZXMuZm9yRWFjaCgodGltZSwgaW5kZXgpID0+IHtcclxuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0QXJyYXkuZnJvbShyb3dbaW5kZXhdLmNoaWxkcmVuKS5mb3JFYWNoKChjaGlsZCkgPT4ge1xyXG5cdFx0XHRcdFx0Y2hpbGQuc3R5bGUub3BhY2l0eSA9IFwiMFwiO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9LCBpbmRleCAqIDYwKTtcclxuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0dGltZS50ZXh0Q29udGVudCA9IE1hdGgucm91bmQoKHBhcnNlRmxvYXQodGltZS50ZXh0Q29udGVudCkgLyA2MCkgKiAxMDAwMCkgLyAxMDAwMCArIFwiINC80LjQvVwiO1xyXG5cdFx0XHRcdEFycmF5LmZyb20ocm93W2luZGV4XS5jaGlsZHJlbikuZm9yRWFjaCgoY2hpbGQpID0+IHtcclxuXHRcdFx0XHRcdGNoaWxkLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSwgNTAwICsgaW5kZXggKiA2MCk7XHJcblx0XHR9KTtcclxuXHRcdHNwZWVkcy5mb3JFYWNoKChzcGVlZCwgaW5kZXgpID0+IHtcclxuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0c3BlZWQudGV4dENvbnRlbnQgPSBNYXRoLnJvdW5kKHBhcnNlRmxvYXQoc3BlZWQudGV4dENvbnRlbnQpICogNjAwMCkgLyAxMDAgKyBcIiDQvS/QvNC40L1cIjtcclxuXHRcdFx0fSwgNTAwICsgaW5kZXggKiA2MCk7XHJcblx0XHR9KTtcclxuXHRcdHRpbWVzTS5mb3JFYWNoKCh0aW1lLCBpbmRleCkgPT4ge1xyXG5cdFx0XHR0aW1lLnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcclxuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0dGltZS50ZXh0Q29udGVudCA9IE1hdGgucm91bmQoKHBhcnNlRmxvYXQodGltZS50ZXh0Q29udGVudCkgLyA2MCkgKiAxMDApIC8gMTAwICsgXCIg0LzQuNC9XCI7XHJcblx0XHRcdFx0dGltZS5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XHJcblx0XHRcdH0sIDMwMCk7XHJcblx0XHR9KTtcclxuXHRcdHNwZWVkc00uZm9yRWFjaCgoc3BlZWQsIGluZGV4KSA9PiB7XHJcblx0XHRcdHNwZWVkLnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcclxuXHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0c3BlZWQudGV4dENvbnRlbnQgPSBNYXRoLnJvdW5kKHBhcnNlRmxvYXQoc3BlZWQudGV4dENvbnRlbnQpICogNjAwMCkgLyAxMDAgKyBcIiDQvS/QvNC40L1cIjtcclxuXHJcblx0XHRcdFx0c3BlZWQuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xyXG5cdFx0XHR9LCAzMDApO1xyXG5cdFx0fSk7XHJcblx0XHRyZWRTcGVlZExpc3QgPSByZWRTcGVlZExpc3QubWFwKChzcGVlZCkgPT4ge1xyXG5cdFx0XHRzcGVlZCAqPSA2MDtcclxuXHRcdFx0cmV0dXJuIHNwZWVkO1xyXG5cdFx0fSk7XHJcblx0XHRzcGVlZExpc3QgPSBzcGVlZExpc3QubWFwKChzcGVlZCkgPT4ge1xyXG5cdFx0XHRzcGVlZCAqPSA2MDtcclxuXHRcdFx0cmV0dXJuIHNwZWVkO1xyXG5cdFx0fSk7XHJcblx0XHRiZXN0Q2hhcnRBY3RpdmUub3B0aW9ucy5wbHVnaW5zID0ge1xyXG5cdFx0XHRsZWdlbmQ6IHtcclxuXHRcdFx0XHRkaXNwbGF5OiB0cnVlLFxyXG5cdFx0XHRcdHBvc2l0aW9uOiBcImJvdHRvbVwiLFxyXG5cdFx0XHR9LFxyXG5cdFx0XHR0aXRsZToge1xyXG5cdFx0XHRcdGRpc3BsYXk6IHRydWUsXHJcblx0XHRcdFx0dGV4dDogXCLQodC60L7RgNC+0YHRgtC4INC/0L4g0Y/Qt9GL0LrQsNC8ICjQvS/QvNC40L0pXCIsXHJcblx0XHRcdFx0Zm9udDoge1xyXG5cdFx0XHRcdFx0c2l6ZTogMjAsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSxcclxuXHRcdH07XHJcblx0XHRjaGFydFNwZWVkQWN0aXZlLm9wdGlvbnMucGx1Z2lucyA9IHtcclxuXHRcdFx0bGVnZW5kOiB7XHJcblx0XHRcdFx0ZGlzcGxheTogZmFsc2UsXHJcblx0XHRcdH0sXHJcblx0XHRcdHRpdGxlOiB7XHJcblx0XHRcdFx0ZGlzcGxheTogdHJ1ZSxcclxuXHRcdFx0XHR0ZXh0OiBcItCh0LrQvtGA0L7RgdGC0Ywg0L/QtdGH0LDRgtC4INGBINGC0LXRh9C10L3QuNC10Lwg0LLRgNC10LzQtdC90LggKNC9L9C80LjQvSlcIixcclxuXHRcdFx0XHRmb250OiB7XHJcblx0XHRcdFx0XHRzaXplOiAyMCxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9LFxyXG5cdFx0fTtcclxuXHRcdGNoYXJ0U3BlZWRBY3RpdmUuZGF0YS5kYXRhc2V0cyA9IFtcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHR5cGU6IFwibGluZVwiLFxyXG5cdFx0XHRcdGxhYmVsOiBcItCh0LrQvtGA0L7RgdGC0YxcIixcclxuXHRcdFx0XHRkYXRhOiByZWRTcGVlZExpc3QsXHJcblx0XHRcdFx0aG92ZXJPZmZzZXQ6IDUsXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHR0eXBlOiBcImJhclwiLFxyXG5cdFx0XHRcdGxhYmVsOiBcItCh0LrQvtGA0L7RgdGC0YxcIixcclxuXHRcdFx0XHRkYXRhOiByZWRTcGVlZExpc3QsXHJcblx0XHRcdFx0aG92ZXJPZmZzZXQ6IDUsXHJcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBjb2xvcnNCYXIsXHJcblx0XHRcdFx0aG92ZXJCYWNrZ3JvdW5kQ29sb3I6IGFjdGl2ZUNvbG9yc0JhcixcclxuXHRcdFx0fSxcclxuXHRcdF07XHJcblx0XHQoYmVzdENoYXJ0QWN0aXZlLmRhdGEuZGF0YXNldHMgPSBbXHJcblx0XHRcdHtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IE9iamVjdC52YWx1ZXMobGFuQ29sb3JzQ3V0KSxcclxuXHRcdFx0XHRsYWJlbDogXCLQnNCw0LrRgdC40LzQsNC70YzQvdCw0Y8g0YHQutC+0YDQvtGB0YLRjFwiLFxyXG5cdFx0XHRcdGRhdGE6IE9iamVjdC52YWx1ZXMobWF4U3BlZWQpLm1hcCgoc3BlZWQpID0+IHtcclxuXHRcdFx0XHRcdHJldHVybiBzcGVlZCAqIDYwO1xyXG5cdFx0XHRcdH0pLFxyXG5cdFx0XHRcdGhvdmVyT2Zmc2V0OiA1LFxyXG5cdFx0XHRcdGJvcmRlcldpZHRoOiAwLFxyXG5cdFx0XHRcdGNsaXA6IDEsXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IEFycmF5LmZyb20oT2JqZWN0LnZhbHVlcyhsYW5Db2xvcnNDdXQpKS5tYXAoKGNvbG9yKSA9PiB7XHJcblx0XHRcdFx0XHRyZXR1cm4gKGNvbG9yICs9IFwiOTBcIik7XHJcblx0XHRcdFx0fSksXHJcblx0XHRcdFx0bGFiZWw6IFwi0KHRgNC10LTQvdGP0Y8g0YHQutC+0YDQvtGB0YLRjFwiLFxyXG5cdFx0XHRcdGRhdGE6IE9iamVjdC52YWx1ZXMoc3VtUmVzdWx0KS5tYXAoKHNwZWVkKSA9PiB7XHJcblx0XHRcdFx0XHRyZXR1cm4gc3BlZWQgKiA2MDtcclxuXHRcdFx0XHR9KSxcclxuXHRcdFx0XHRob3Zlck9mZnNldDogNSxcclxuXHRcdFx0XHRib3JkZXJXaWR0aDogMCxcclxuXHRcdFx0XHRjbGlwOiAxLFxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBBcnJheS5mcm9tKE9iamVjdC52YWx1ZXMobGFuQ29sb3JzQ3V0KSkubWFwKChjb2xvcikgPT4ge1xyXG5cdFx0XHRcdFx0cmV0dXJuIChjb2xvciArPSBcIjUwXCIpO1xyXG5cdFx0XHRcdH0pLFxyXG5cdFx0XHRcdGxhYmVsOiBcItCc0LjQvdC40LzQsNC70YzQvdCw0Y8g0YHQutC+0YDQvtGB0YLRjFwiLFxyXG5cdFx0XHRcdGRhdGE6IE9iamVjdC52YWx1ZXMobWluU3BlZWQpLm1hcCgoc3BlZWQpID0+IHtcclxuXHRcdFx0XHRcdHJldHVybiBzcGVlZCAqIDYwO1xyXG5cdFx0XHRcdH0pLFxyXG5cdFx0XHRcdGhvdmVyT2Zmc2V0OiA1LFxyXG5cdFx0XHRcdGJvcmRlcldpZHRoOiAwLFxyXG5cdFx0XHRcdGNsaXA6IDEsXHJcblx0XHRcdH0sXHJcblx0XHRdKSxcclxuXHRcdFx0YmVzdENoYXJ0QWN0aXZlLnVwZGF0ZSgpO1xyXG5cdFx0Y2hhcnRTcGVlZEFjdGl2ZS51cGRhdGUoKTtcclxuXHR9XHJcbn1cclxuY2hlY2tCb3hJdGVtT25lLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBtb2RlT25lKTtcclxuY2hlY2tCb3hJdGVtVHdvLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBtb2RlVHdvKTtcclxuXHJcbnNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdGNoYXJ0U3BlZWRBY3RpdmUuZGF0YSA9IHtcclxuXHRcdGxhYmVsczogcmVkTGFuTGlzdCxcclxuXHRcdGRhdGFzZXRzOiBbXHJcblx0XHRcdHtcclxuXHRcdFx0XHR0eXBlOiBcImxpbmVcIixcclxuXHRcdFx0XHRsYWJlbDogXCLQodC60L7RgNC+0YHRgtGMXCIsXHJcblx0XHRcdFx0ZGF0YTogcmVkU3BlZWRMaXN0LFxyXG5cdFx0XHRcdGhvdmVyT2Zmc2V0OiA1LFxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0dHlwZTogXCJiYXJcIixcclxuXHRcdFx0XHRsYWJlbDogXCLQodC60L7RgNC+0YHRgtGMXCIsXHJcblx0XHRcdFx0ZGF0YTogcmVkU3BlZWRMaXN0LFxyXG5cdFx0XHRcdGhvdmVyT2Zmc2V0OiA1LFxyXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogY29sb3JzQmFyLFxyXG5cdFx0XHRcdGhvdmVyQmFja2dyb3VuZENvbG9yOiBhY3RpdmVDb2xvcnNCYXIsXHJcblx0XHRcdH0sXHJcblx0XHRdLFxyXG5cdH07XHJcblxyXG5cdGNoYXJ0U3BlZWRBY3RpdmUudXBkYXRlKCk7XHJcbn0sIDUwMCk7XHJcbnNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdGNoYXJ0TGFuQWN0aXZlLmRhdGEgPSB7XHJcblx0XHRsYWJlbHM6IE9iamVjdC5rZXlzKGxhbmdDb3VudCksXHJcblx0XHRkYXRhc2V0czogW1xyXG5cdFx0XHR7XHJcblx0XHRcdFx0bGFiZWw6IFwi0J/RgNC+0YbQtdC90YIg0YLRgNC10L3QuNGA0L7QstC+0LpcIixcclxuXHRcdFx0XHRkYXRhOiBPYmplY3QudmFsdWVzKGxhbmdDb3VudCkubWFwKCh2YWx1ZSkgPT4gTWF0aC5yb3VuZCgodmFsdWUgLyBsZW5ndGhUcikgKiAxMDApKSxcclxuXHRcdFx0XHRob3Zlck9mZnNldDogMTAsXHJcblx0XHRcdFx0Ym9yZGVyV2lkdGg6IDAsXHJcblx0XHRcdFx0Y2xpcDogMSxcclxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGNvbG9ycyxcclxuXHRcdFx0XHQvLyBob3ZlckJhY2tncm91bmRDb2xvcjogYWN0aXZlQ29sb3JzLFxyXG5cdFx0XHR9LFxyXG5cdFx0XSxcclxuXHR9O1xyXG5cclxuXHRjaGFydExhbkFjdGl2ZS51cGRhdGUoKTtcclxufSwgOTAwKTtcclxuc2V0VGltZW91dCgoKSA9PiB7XHJcblx0KGJlc3RDaGFydEFjdGl2ZS5kYXRhID0ge1xyXG5cdFx0bGFiZWxzOiBPYmplY3Qua2V5cyhzdW1SZXN1bHQpLFxyXG5cdFx0ZGF0YXNldHM6IFtcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogT2JqZWN0LnZhbHVlcyhsYW5Db2xvcnNDdXQpLFxyXG5cdFx0XHRcdGxhYmVsOiBcItCc0LDQutGB0LjQvNCw0LvRjNC90LDRjyDRgdC60L7RgNC+0YHRgtGMXCIsXHJcblx0XHRcdFx0ZGF0YTogT2JqZWN0LnZhbHVlcyhtYXhTcGVlZCksXHJcblx0XHRcdFx0aG92ZXJPZmZzZXQ6IDUsXHJcblx0XHRcdFx0Ym9yZGVyV2lkdGg6IDAsXHJcblx0XHRcdFx0Y2xpcDogMSxcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogQXJyYXkuZnJvbShPYmplY3QudmFsdWVzKGxhbkNvbG9yc0N1dCkpLm1hcCgoY29sb3IpID0+IHtcclxuXHRcdFx0XHRcdHJldHVybiAoY29sb3IgKz0gXCI5MFwiKTtcclxuXHRcdFx0XHR9KSxcclxuXHRcdFx0XHRsYWJlbDogXCLQodGA0LXQtNC90Y/RjyDRgdC60L7RgNC+0YHRgtGMXCIsXHJcblx0XHRcdFx0ZGF0YTogT2JqZWN0LnZhbHVlcyhzdW1SZXN1bHQpLFxyXG5cdFx0XHRcdGhvdmVyT2Zmc2V0OiA1LFxyXG5cdFx0XHRcdGJvcmRlcldpZHRoOiAwLFxyXG5cdFx0XHRcdGNsaXA6IDEsXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IEFycmF5LmZyb20oT2JqZWN0LnZhbHVlcyhsYW5Db2xvcnNDdXQpKS5tYXAoKGNvbG9yKSA9PiB7XHJcblx0XHRcdFx0XHRyZXR1cm4gKGNvbG9yICs9IFwiNTBcIik7XHJcblx0XHRcdFx0fSksXHJcblx0XHRcdFx0bGFiZWw6IFwi0JzQuNC90LjQvNCw0LvRjNC90LDRjyDRgdC60L7RgNC+0YHRgtGMXCIsXHJcblx0XHRcdFx0ZGF0YTogT2JqZWN0LnZhbHVlcyhtaW5TcGVlZCksXHJcblx0XHRcdFx0aG92ZXJPZmZzZXQ6IDUsXHJcblx0XHRcdFx0Ym9yZGVyV2lkdGg6IDAsXHJcblx0XHRcdFx0Y2xpcDogMSxcclxuXHRcdFx0fSxcclxuXHRcdF0sXHJcblx0fSksXHJcblx0XHRiZXN0Q2hhcnRBY3RpdmUudXBkYXRlKCk7XHJcbn0sIDcwMCk7XHJcblxyXG5zZXRUaW1lb3V0KCgpID0+IHtcclxuXHRjaGFydEFjY3VyYWN5QWN0aXZlLmRhdGEgPSB7XHJcblx0XHRsYWJlbHM6IE9iamVjdC5rZXlzKGFjY3VyYWN5TGlzdCksXHJcblx0XHRkYXRhc2V0czogW1xyXG5cdFx0XHR7XHJcblx0XHRcdFx0bGFiZWw6IFwi0KLQvtGH0L3QvtGB0YLRjFwiLFxyXG5cdFx0XHRcdGRhdGE6IE9iamVjdC52YWx1ZXMoYWNjdXJhY3lMaXN0KSxcclxuXHRcdFx0XHQvLyBob3ZlckJvcmRlcldpZHRoOiAzLFxyXG5cdFx0XHRcdC8vIGJvcmRlckNvbG9yOiBcImJsYWNrXCIsXHJcblx0XHRcdFx0Ym9yZGVyV2lkdGg6IDAsXHJcblx0XHRcdFx0aG92ZXJCb3JkZXJDb2xvcjogXCJibGFja1wiLFxyXG5cdFx0XHRcdGJvcmRlckNvbG9yOiBcImJsYWNrXCIsXHJcblx0XHRcdFx0Y2xpcDogMSxcclxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGNvbG9ycyxcclxuXHRcdFx0XHRob3ZlckJhY2tncm91bmRDb2xvcjogYWN0aXZlQ29sb3JzLFxyXG5cdFx0XHR9LFxyXG5cdFx0XSxcclxuXHR9O1xyXG5cdGNoYXJ0QWNjdXJhY3lBY3RpdmUudXBkYXRlKCk7XHJcbn0sIDExMDApO1xyXG5cclxuLy9NeXJlc3VsdFxyXG5cclxubGV0IHN0ZXAgPSAxMDAgLyByb3dBY3RpdmUubGVuZ3RoO1xyXG5yb3dBY3RpdmUuZm9yRWFjaCgocm93RWwsIGluZGV4KSA9PiB7XHJcblx0cm93RWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoKSA9PiB7XHJcblx0XHRsZXQgY29sb3JTZXR0aW5nID0gXCJoc2woXCIgKyAoMTAwIC0gc3RlcCAqIGluZGV4KSArIFwiLDEwMCUsNTAlKVwiO1xyXG5cdFx0QXJyYXkuZnJvbShyb3dFbC5jaGlsZHJlbikuZm9yRWFjaCgoY2hpbGQpID0+IHtcclxuXHRcdFx0Y2hpbGQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3JTZXR0aW5nO1xyXG5cdFx0fSk7XHJcblx0fSk7XHJcbn0pO1xyXG5yb3dBY3RpdmUuZm9yRWFjaCgocm93RWwsIGluZGV4KSA9PiB7XHJcblx0cm93RWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsICgpID0+IHtcclxuXHRcdEFycmF5LmZyb20ocm93RWwuY2hpbGRyZW4pLmZvckVhY2goKGNoaWxkKSA9PiB7XHJcblx0XHRcdGNoaWxkLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiXCI7XHJcblx0XHR9KTtcclxuXHR9KTtcclxufSk7XHJcbmxldCBsYW47XHJcbmxldCBpbnB1dHNGID0gQXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwidG9wUmVzdWx0X19pbnB1dFwiKSk7XHJcbmlucHV0c0YuZm9yRWFjaCgoaW5wdXQpID0+IHtcclxuXHRpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xyXG5cdFx0bGFuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaW5wdXQuaWQuc2xpY2UoMCwgLTIpICsgXCItbGFiZWwtZlwiKS50ZXh0Q29udGVudDtcclxuXHRcdGlmIChpbnB1dC5jaGVja2VkKSB7XHJcblx0XHRcdGFjdGl2ZUxhbnNGLnB1c2gobGFuKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlmIChhY3RpdmVMYW5zRi5pbmRleE9mKGxhbikgPiAtMSkge1xyXG5cdFx0XHRcdGFjdGl2ZUxhbnNGLnNwbGljZShhY3RpdmVMYW5zRi5pbmRleE9mKGxhbiksIDEpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRmaWx0ZXJSZXN1bHRzKCk7XHJcblx0XHRpZiAoaXNSZXN1bHRNb2RlQWN0aXZlKSB7XHJcblx0XHRcdGNvdW50TW9kZSgpO1xyXG5cdFx0XHRyZXN1bHRNb2RlKCk7XHJcblx0XHRcdHNvcnRBcnJheVJlc3VsdE1vZGUocmVzdWx0TW9kZVJlc3VsdCk7XHJcblx0XHRcdGRyYXdUYWJsZVJlc3VsdHMoKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJlc3VsdE1vZGUoKTtcclxuXHRcdFx0Y291bnRNb2RlKCk7XHJcblx0XHRcdHNvcnRBcnJheUNvdW50TW9kZShyZXN1bHRNb2RlUmVzdWx0KTtcclxuXHRcdFx0ZHJhd1RhYmxlUmVzdWx0cygpO1xyXG5cdFx0fVxyXG5cdFx0ZHJhd1RhYmxlUmVzdWx0cygpO1xyXG5cdH0pO1xyXG59KTtcclxuLy9cclxuXHJcbi8vVG9wXHJcblxyXG5sZXQgdG9wUmVzdWx0cyA9IE9iamVjdC5ncm91cEJ5KGFsbFJlc3VsdHMsICh7IG5hbWUgfSkgPT4gbmFtZSk7XHJcbmZ1bmN0aW9uIGZpbHRlclJlc3VsdHMoKSB7XHJcblx0cmVzdWx0TW9kZVJlc3VsdCA9IFtdO1xyXG5cdE9iamVjdC5rZXlzKHRvcFJlc3VsdHMpLmZvckVhY2goKHBlcnNvbiwgaW5kZXgpID0+IHtcclxuXHRcdGxldCByZXN1bHQgPSB0b3BSZXN1bHRzW3BlcnNvbl07XHJcblx0XHRsZXQgYWNjdXJhY3lSb3cgPSAwO1xyXG5cdFx0bGV0IHNwZWVkUm93ID0gMDtcclxuXHRcdGxldCBjb3VudFJvdyA9IDA7XHJcblx0XHRyZXN1bHQuZm9yRWFjaCgocmVzdWx0Um93KSA9PiB7XHJcblx0XHRcdGlmIChhY3RpdmVMYW5zRi5pbmRleE9mKHJlc3VsdFJvdy5sYW5ndWFnZSkgPiAtMSkge1xyXG5cdFx0XHRcdGFjY3VyYWN5Um93ICs9IHJlc3VsdFJvdy5hY2N1cmFjeTtcclxuXHRcdFx0XHRzcGVlZFJvdyArPSByZXN1bHRSb3cuc3BlZWQ7XHJcblx0XHRcdFx0Y291bnRSb3crKztcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRhY2N1cmFjeVJvdyAvPSBjb3VudFJvdztcclxuXHRcdHNwZWVkUm93IC89IGNvdW50Um93O1xyXG5cdFx0cmVzdWx0TW9kZVJlc3VsdC5wdXNoKHtcclxuXHRcdFx0bmFtZTogcGVyc29uLFxyXG5cdFx0XHRhY2N1cmFjeTogTWF0aC5yb3VuZChhY2N1cmFjeVJvdyksXHJcblx0XHRcdHNwZWVkOiBNYXRoLnJvdW5kKHNwZWVkUm93ICogMTAwKSAvIDEwMCxcclxuXHRcdFx0Y291bnQ6IGNvdW50Um93LFxyXG5cdFx0fSk7XHJcblx0fSk7XHJcblx0Y29uc29sZS5sb2coLi4ucmVzdWx0TW9kZVJlc3VsdCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNvcnRBcnJheVJlc3VsdE1vZGUoYXJyYXkpIHtcclxuXHRyZXR1cm4gYXJyYXkuc29ydCgoZWxlbWVudE9uZSwgZWxlbWVudFR3bykgPT4ge1xyXG5cdFx0bGV0IGZpcnN0UmVzdWx0ID0gZWxlbWVudE9uZVtcInNwZWVkXCJdICogZWxlbWVudE9uZVtcImFjY3VyYWN5XCJdO1xyXG5cdFx0bGV0IHNlY29uZFJlc3VsdCA9IGVsZW1lbnRUd29bXCJzcGVlZFwiXSAqIGVsZW1lbnRUd29bXCJhY2N1cmFjeVwiXTtcclxuXHRcdHJldHVybiBmaXJzdFJlc3VsdCA+IHNlY29uZFJlc3VsdCA/IC0xIDogZmlyc3RSZXN1bHQgPCBzZWNvbmRSZXN1bHQgPyAxIDogMDtcclxuXHR9KTtcclxufVxyXG5mdW5jdGlvbiBzb3J0QXJyYXlDb3VudE1vZGUoYXJyYXkpIHtcclxuXHRyZXR1cm4gYXJyYXkuc29ydCgoZWxlbWVudE9uZSwgZWxlbWVudFR3bykgPT4ge1xyXG5cdFx0bGV0IGZpcnN0UmVzdWx0ID0gZWxlbWVudE9uZVtcImNvdW50XCJdO1xyXG5cdFx0bGV0IHNlY29uZFJlc3VsdCA9IGVsZW1lbnRUd29bXCJjb3VudFwiXTtcclxuXHRcdHJldHVybiBmaXJzdFJlc3VsdCA+IHNlY29uZFJlc3VsdCA/IC0xIDogZmlyc3RSZXN1bHQgPCBzZWNvbmRSZXN1bHQgPyAxIDogMDtcclxuXHR9KTtcclxufVxyXG5PYmplY3Qua2V5cyh0b3BSZXN1bHRzKS5mb3JFYWNoKChwZXJzb24sIGluZGV4KSA9PiB7XHJcblx0bGV0IHJlc3VsdCA9IHRvcFJlc3VsdHNbcGVyc29uXTtcclxuXHRsZXQgYWNjdXJhY3lSb3cgPSAwO1xyXG5cdGxldCBzcGVlZFJvdyA9IDA7XHJcblx0bGV0IGNvdW50Um93ID0gMDtcclxuXHRyZXN1bHQuZm9yRWFjaCgocmVzdWx0Um93KSA9PiB7XHJcblx0XHRpZiAoYWN0aXZlTGFuc0YuaW5kZXhPZihyZXN1bHRSb3cubGFuZ3VhZ2UpID4gLTEpIHtcclxuXHRcdFx0YWNjdXJhY3lSb3cgKz0gcmVzdWx0Um93LmFjY3VyYWN5O1xyXG5cdFx0XHRzcGVlZFJvdyArPSByZXN1bHRSb3cuc3BlZWQ7XHJcblx0XHRcdGNvdW50Um93Kys7XHJcblx0XHR9XHJcblx0fSk7XHJcblx0YWNjdXJhY3lSb3cgLz0gY291bnRSb3c7XHJcblx0c3BlZWRSb3cgLz0gY291bnRSb3c7XHJcblx0cmVzdWx0TW9kZVJlc3VsdC5wdXNoKHtcclxuXHRcdG5hbWU6IHBlcnNvbixcclxuXHRcdGFjY3VyYWN5OiBNYXRoLnJvdW5kKGFjY3VyYWN5Um93KSxcclxuXHRcdHNwZWVkOiBNYXRoLnJvdW5kKHNwZWVkUm93ICogMTAwKSAvIDEwMCxcclxuXHRcdGNvdW50OiBjb3VudFJvdyxcclxuXHR9KTtcclxufSk7XHJcbnNvcnRBcnJheUNvdW50TW9kZShyZXN1bHRNb2RlUmVzdWx0KTtcclxuXHJcbnNvcnRBcnJheVJlc3VsdE1vZGUocmVzdWx0TW9kZVJlc3VsdCk7XHJcblxyXG5maWx0ZXJSZXN1bHRzKCk7XHJcblxyXG5sZXQgdG9wVGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwidG9wUmVzdWx0X190YWJsZVwiKVswXTtcclxudG9wVGFibGUuaW5uZXJIVE1MID1cclxuXHRgPHRoZWFkPlxyXG5cdFx0PHRyPlxyXG5cdFx0XHQ8dGg+4oSWPC90aD5cclxuXHRcdFx0PHRoPtCY0LzRjzwvdGg+XHJcblx0XHRcdDx0aD7QotC+0YfQvdC+0YHRgtGMPC90aD5cclxuXHRcdFx0PHRoPtCh0LrQvtGA0L7RgdGC0Yw8L3RoPlxyXG5cdFx0XHQ8dGg+0JrQvtC70LjRh9C10YHRgtCy0L4g0YLRgNC10L3QuNGA0L7QstC+0Lo8L3RoPlxyXG5cdFx0PC90cj5cclxuXHQ8L3RoZWFkPlxyXG5cdFx0XHRcdFx0XHRgICtcclxuXHRgPHRyPlxyXG5cdFx0PHRoPjwvdGg+XHJcblx0XHQ8dGg+PC90aD5cclxuXHRcdDx0aD48L3RoPlxyXG5cdFx0PHRoPjwvdGg+XHJcblx0XHQ8dGg+PC90aD5cclxuXHQ8L3RyPmAucmVwZWF0KHJlc3VsdE1vZGVSZXN1bHQubGVuZ3RoKTtcclxubGV0IHRvcFRhYmxlUm93ID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnRvcFJlc3VsdF9fdGFibGUgdHJcIikpLnNwbGljZSgxKTtcclxuZnVuY3Rpb24gZHJhd1RhYmxlUmVzdWx0cygpIHtcclxuXHRyZXN1bHRNb2RlUmVzdWx0LmZvckVhY2goKHJlc3VsdHMsIGluZGV4KSA9PiB7XHJcblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0dG9wVGFibGVSb3dbaW5kZXhdLnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcclxuXHRcdH0sIDUwICogaW5kZXgpO1xyXG5cdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdEFycmF5LmZyb20odG9wVGFibGVSb3dbaW5kZXhdLmNoaWxkcmVuKS5mb3JFYWNoKCh0aCkgPT4ge1xyXG5cdFx0XHRcdHRoLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcclxuXHRcdFx0XHR0aC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIlwiO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0dG9wVGFibGVSb3dbaW5kZXhdLnN0eWxlID0gXCJcIjtcclxuXHRcdFx0aWYgKHVzZXJOYW1lID09IHJlc3VsdHMubmFtZSkge1xyXG5cdFx0XHRcdEFycmF5LmZyb20odG9wVGFibGVSb3dbaW5kZXhdLmNoaWxkcmVuKS5mb3JFYWNoKCh0aCkgPT4ge1xyXG5cdFx0XHRcdFx0dGguc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjY2NjY2NkOTBcIjtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0b3BUYWJsZVJvd1tpbmRleF0uY2hpbGRyZW5bMF0udGV4dENvbnRlbnQgPSBpbmRleCArIDE7XHJcblx0XHRcdHRvcFRhYmxlUm93W2luZGV4XS5jaGlsZHJlblsxXS50ZXh0Q29udGVudCA9IHJlc3VsdHMubmFtZTtcclxuXHRcdFx0dG9wVGFibGVSb3dbaW5kZXhdLmNoaWxkcmVuWzJdLnRleHRDb250ZW50ID0gcmVzdWx0cy5hY2N1cmFjeSA/IHJlc3VsdHMuYWNjdXJhY3kgKyBcIiVcIiA6IFwiLVwiO1xyXG5cdFx0XHRpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJpc1NlY29uZE1vZGVPblwiKSA9PSBcInRydWVcIikge1xyXG5cdFx0XHRcdHRvcFRhYmxlUm93W2luZGV4XS5jaGlsZHJlblszXS50ZXh0Q29udGVudCA9IHJlc3VsdHMuc3BlZWQgPyByZXN1bHRzLnNwZWVkICsgXCIg0L0v0YFcIiA6IFwiLVwiO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRvcFRhYmxlUm93W2luZGV4XS5jaGlsZHJlblszXS50ZXh0Q29udGVudCA9IHJlc3VsdHMuc3BlZWRcclxuXHRcdFx0XHRcdD8gTWF0aC5yb3VuZChyZXN1bHRzLnNwZWVkICogNjAwMCkgLyAxMDAgKyBcIiDQvS/QvNC40L1cIlxyXG5cdFx0XHRcdFx0OiBcIi1cIjtcclxuXHRcdFx0fVxyXG5cdFx0XHR0b3BUYWJsZVJvd1tpbmRleF0uY2hpbGRyZW5bNF0udGV4dENvbnRlbnQgPSByZXN1bHRzLmNvdW50O1xyXG5cdFx0XHR0b3BUYWJsZVJvd1tpbmRleF0uc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xyXG5cdFx0XHRpZiAoIXJlc3VsdHMuYWNjdXJhY3kpIHtcclxuXHRcdFx0XHRBcnJheS5mcm9tKHRvcFRhYmxlUm93W2luZGV4XS5jaGlsZHJlbikuZm9yRWFjaCgodGgpID0+IHtcclxuXHRcdFx0XHRcdHRoLnN0eWxlLm9wYWNpdHkgPSBcIjAuNVwiO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdGlmICghaXNTaG93TW9kZSkge1xyXG5cdFx0XHRcdFx0dG9wVGFibGVSb3dbaW5kZXhdLnN0eWxlID0gXCJkaXNwbGF5Om5vbmU7XCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9LCAyNTAgKyA1MCAqIGluZGV4KTtcclxuXHR9KTtcclxuXHQvLyBpZiAoXHJcblx0Ly8gXHRkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwidG9wUmVzdWx0X190YWJsZVwiKVswXS5vZmZzZXRIZWlnaHQgPFxyXG5cdC8vIFx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInRvcFJlc3VsdFwiKVswXS5vZmZzZXRIZWlnaHRcclxuXHQvLyApIHtcclxuXHQvLyBcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJ0b3BSZXN1bHRcIilbMF0uc3R5bGUuaGVpZ2h0ID1cclxuXHQvLyBcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInRvcFJlc3VsdF9fdGFibGVcIilbMF0ub2Zmc2V0SGVpZ2h0O1xyXG5cdC8vIFx0Y29uc29sZS5sb2coMTIzNDU2ICsgXCJxd2VydHlcIik7XHJcblx0Ly8gfVxyXG59XHJcbnNvcnRBcnJheUNvdW50TW9kZShyZXN1bHRNb2RlUmVzdWx0KTtcclxucmVzdWx0TW9kZVJlc3VsdC5mb3JFYWNoKChyZXN1bHRzLCBpbmRleCkgPT4ge1xyXG5cdGlmICh1c2VyTmFtZSA9PSByZXN1bHRzLm5hbWUpIHtcclxuXHRcdGRhdGFbN10udGV4dENvbnRlbnQgPSBpbmRleCArIDE7XHJcblx0fVxyXG59KTtcclxuc29ydEFycmF5UmVzdWx0TW9kZShyZXN1bHRNb2RlUmVzdWx0KTtcclxucmVzdWx0TW9kZVJlc3VsdC5mb3JFYWNoKChyZXN1bHRzLCBpbmRleCkgPT4ge1xyXG5cdGlmICh1c2VyTmFtZSA9PSByZXN1bHRzLm5hbWUpIHtcclxuXHRcdGRhdGFbNl0udGV4dENvbnRlbnQgPSBpbmRleCArIDE7XHJcblx0fVxyXG59KTtcclxuZHJhd1RhYmxlUmVzdWx0cygpO1xyXG5cclxuLy9cclxuIl0sIm1hcHBpbmdzIjoiQUFBQSxZQUFZO0FBQ1osSUFBSUEsVUFBVSxHQUFHQyxRQUFRLENBQUNDLHNCQUFzQixDQUFDLHFCQUFxQixDQUFDO0FBQ3ZFLElBQUlDLFFBQVEsR0FBR0YsUUFBUSxDQUFDQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUM7QUFDeEQsSUFBSUUsZUFBZSxHQUFHSCxRQUFRLENBQUNDLHNCQUFzQixDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9FLElBQUlHLGVBQWUsR0FBR0osUUFBUSxDQUFDQyxzQkFBc0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvRSxJQUFJSSxLQUFLLEdBQUdDLEtBQUssQ0FBQ0MsSUFBSSxDQUFDUCxRQUFRLENBQUNDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQy9ELElBQUlPLE1BQU0sR0FBR0YsS0FBSyxDQUFDQyxJQUFJLENBQUNQLFFBQVEsQ0FBQ0Msc0JBQXNCLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDakUsSUFBSVEsTUFBTSxHQUFHSCxLQUFLLENBQUNDLElBQUksQ0FBQ1AsUUFBUSxDQUFDQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNsRSxJQUFJUyxPQUFPLEdBQUdKLEtBQUssQ0FBQ0MsSUFBSSxDQUFDUCxRQUFRLENBQUNDLHNCQUFzQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3BFLElBQUlVLElBQUksR0FBR0wsS0FBSyxDQUFDQyxJQUFJLENBQUNQLFFBQVEsQ0FBQ0Msc0JBQXNCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUN4RSxJQUFJVyxTQUFTLEdBQUdOLEtBQUssQ0FBQ0MsSUFBSSxDQUFDUCxRQUFRLENBQUNDLHNCQUFzQixDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDL0UsSUFBSVksR0FBRyxHQUFHUCxLQUFLLENBQUNDLElBQUks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
