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
let langCount = {
  Java: 0,
  HTML: 0,
  C: 0,
  JavaScript: 0,
  "C#": 0,
  SQL: 0,
  "C++": 0,
  CSS: 0,
  Python: 0,
  PHP: 0
};
let speedList = [];
let lanList = [];
let speedLength = [];
let countList = {
  Java: 0,
  HTML: 0,
  C: 0,
  JavaScript: 0,
  "C#": 0,
  SQL: 0,
  "C++": 0,
  CSS: 0,
  Python: 0,
  PHP: 0
};
let sumResult = {
  Java: 0,
  HTML: 0,
  C: 0,
  JavaScript: 0,
  "C#": 0,
  SQL: 0,
  "C++": 0,
  CSS: 0,
  Python: 0,
  PHP: 0
};
let maxSpeed = {
  Java: 0,
  HTML: 0,
  C: 0,
  JavaScript: 0,
  "C#": 0,
  SQL: 0,
  "C++": 0,
  CSS: 0,
  Python: 0,
  PHP: 0
};
let minSpeed = {
  Java: 0,
  HTML: 0,
  C: 0,
  JavaScript: 0,
  "C#": 0,
  SQL: 0,
  "C++": 0,
  CSS: 0,
  Python: 0,
  PHP: 0
};
let errorList = {
  Java: 0,
  HTML: 0,
  C: 0,
  JavaScript: 0,
  "C#": 0,
  SQL: 0,
  "C++": 0,
  CSS: 0,
  Python: 0,
  PHP: 0
};
let accuracyList = {
  Java: 0,
  HTML: 0,
  C: 0,
  JavaScript: 0,
  "C#": 0,
  SQL: 0,
  "C++": 0,
  CSS: 0,
  Python: 0,
  PHP: 0
};
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
  PHP: "#7251b5"
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
  PHP: "#7251b5"
};
let colors = [];
let activeColors = [];
let colorsBar = [];
let activeColorsBar = [];
inputs.forEach(input => {
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
    redLanList.forEach(lan => {
      colorsBar.push(lanColors[lan] + "50");
      activeColorsBar.push(lanColors[lan]);
    });
    chartSpeedActive.data.labels = redLanList;
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
    }], chartSpeedActive.update();
  });
});
Array.from(Object.keys(countList)).forEach(lan => {
  if (countList[lan] == 0) {
    countList[lan];
    delete countList[lan];
  }
});
userResults.forEach(json => {
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
userResults.forEach(json => {
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
Object.keys(langCount).forEach(lang => {
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
if (accuracyList.Java || accuracyList.HTML || accuracyList.C || accuracyList["C++"] || accuracyList["C#"] || accuracyList.Python || accuracyList.CSS || accuracyList.JavaScript) {
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
redLanList.forEach(lan => {
  colorsBar.push(lanColors[lan] + "50");
  activeColorsBar.push(lanColors[lan]);
});
Object.keys(langCount).forEach(lan => {
  colors.push(lanColors[lan]);
  activeColors.push(lanColors[lan] + "b3");
});
let chartSpeedActive = new Chart(chartSpeed, {
  data: {
    labels: redLanList,
    datasets: [{
      type: "line",
      label: "Скорость",
      data: "0,".repeat(lengthTr).split(",", lengthTr),
      hoverOffset: 5
    }, {
      type: "bar",
      label: "Скорость",
      data: [],
      hoverOffset: 5,
      backgroundColor: colorsBar,
      hoverBackgroundColor: activeColorsBar
    }]
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
        pointHoverBorderColor: "#8ac926"
      },
      line: {
        borderWidth: 4,
        tension: 0.4,
        borderColor: "#8ac926"
      }
    },
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: localStorage.getItem("isSecondModeOn") == "true" ? "Скорость печати с течением времени (н/с)" : "Скорость печати с течением времени (н/мин)",
        font: {
          size: 20
        }
      }
    },
    interaction: {
      intersect: false
    },
    scales: {
      y: {
        beginAtZero: true
      },
      x: {
        display: true,
        title: {
          display: true
        }
      }
    }
  }
});
let chartLanActive = new Chart(chartLan, {
  type: "doughnut",
  data: {
    labels: Object.keys(langCount),
    datasets: [{
      label: "Процент тренировок",
      data: [0, 0, 0, 0, 0, 0, 0, 0],
      hoverOffset: 10,
      borderWidth: 0,
      clip: 1,
      backgroundColor: colors
      // hoverBackgroundColor: activeColors,
    }]
  },
  options: {
    cutout: 0,
    layout: {
      padding: 5
    },
    responsive: true,
    plugins: {
      legend: {
        position: "right"
      },
      title: {
        display: true,
        text: "Языки тренировок (%)",
        font: {
          size: 20
        }
      }
    }
  }
});
let bestChartActive = new Chart(chartBestLan, {
  type: "bar",
  data: {
    labels: Object.keys(sumResult),
    datasets: [{
      backgroundColor: Object.values(lanColors),
      label: "Максимальная скорость",
      data: [0, 0, 0, 0, 0, 0, 0, 0],
      hoverOffset: 5,
      borderWidth: 0,
      clip: 1
    }, {
      backgroundColor: Array.from(Object.values(lanColors)).map(color => {
        return color += "90";
      }),
      label: "Средняя скорость",
      data: [0, 0, 0, 0, 0, 0, 0, 0],
      hoverOffset: 5,
      borderWidth: 0,
      clip: 1
    }, {
      backgroundColor: Array.from(Object.values(lanColors)).map(color => {
        return color += "50";
      }),
      label: "Минимальная скорость",
      // data: [0,0,0,0,0,0,0,0],
      hoverOffset: 5,
      borderWidth: 0,
      clip: 1
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom"
      },
      title: {
        display: true,
        text: localStorage.getItem("isSecondModeOn") == "true" ? "Скорости по языкам (н/с)" : "Скорости по языкам (н/мин)",
        font: {
          size: 20
        }
      }
    }
  }
});
let chartAccuracyActive = new Chart(chartAccuracy, {
  type: "polarArea",
  data: {
    labels: Object.keys(accuracyList),
    datasets: [{
      label: "Точность",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      // hoverBorderWidth: 3,
      // borderColor: "black",
      borderWidth: 0,
      hoverBorderColor: "black",
      borderColor: "black",
      clip: 1,
      backgroundColor: colors,
      hoverBackgroundColor: activeColors
    }]
  },
  options: {
    responsive: true,
    scales: {
      r: {
        display: false
      }
    },
    plugins: {
      legend: {
        position: "right"
      },
      title: {
        display: true,
        text: "Точность в сравнении (%)",
        font: {
          size: 20
        }
      }
    }
  }
});
let chartCountLanActive = new Chart(chartCountLan, {
  data: {
    labels: Object.keys(langCount),
    datasets: [{
      type: "bar",
      label: "Количество тренировок",
      data: [0, 0, 0, 0, 0, 0, 0, 0],
      hoverOffset: 5,
      backgroundColor: Object.values(lanColors),
      hoverBackgroundColor: Object.values(lanColors).map(color => {
        return color + "90";
      })
    }]
  },
  options: {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: "Количество тренировок по языкам",
        font: {
          size: 20
        }
      }
    },
    interaction: {
      intersect: false
    },
    scales: {
      y: {
        beginAtZero: true
      },
      x: {
        display: false,
        title: {
          display: true
        }
      }
    }
  }
});

////# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQuanMiLCJuYW1lcyI6WyJpbnB1dHMiLCJBcnJheSIsImZyb20iLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJsYW5UZXh0IiwiY2lyY2xlcyIsIm51bWJlcnMiLCJjaGFydExhbiIsImdldEVsZW1lbnRCeUlkIiwiY2hhcnRTcGVlZCIsImNoYXJ0QmVzdExhbiIsImNoYXJ0QWNjdXJhY3kiLCJjaGFydENvdW50TGFuIiwibGFuZ0NvdW50IiwiSmF2YSIsIkhUTUwiLCJDIiwiSmF2YVNjcmlwdCIsIlNRTCIsIkNTUyIsIlB5dGhvbiIsIlBIUCIsInNwZWVkTGlzdCIsImxhbkxpc3QiLCJzcGVlZExlbmd0aCIsImNvdW50TGlzdCIsInN1bVJlc3VsdCIsIm1heFNwZWVkIiwibWluU3BlZWQiLCJlcnJvckxpc3QiLCJhY2N1cmFjeUxpc3QiLCJpIiwidGltZUxpc3QiLCJyZWRMYW5MaXN0IiwicmVkU3BlZWRMaXN0IiwiYWN0aXZlTGFucyIsImFjdGl2ZUxhbnNGIiwibGFuQ29sb3JzIiwibGFuQ29sb3JzQ3V0IiwiY29sb3JzIiwiYWN0aXZlQ29sb3JzIiwiY29sb3JzQmFyIiwiYWN0aXZlQ29sb3JzQmFyIiwiZm9yRWFjaCIsImlucHV0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImxhbiIsImlkIiwidGV4dENvbnRlbnQiLCJjaGVja2VkIiwicHVzaCIsImluZGV4T2YiLCJzcGxpY2UiLCJpbmRleCIsImNoYXJ0U3BlZWRBY3RpdmUiLCJkYXRhIiwibGFiZWxzIiwiZGF0YXNldHMiLCJ0eXBlIiwibGFiZWwiLCJob3Zlck9mZnNldCIsImJhY2tncm91bmRDb2xvciIsImhvdmVyQmFja2dyb3VuZENvbG9yIiwidXBkYXRlIiwiT2JqZWN0Iiwia2V5cyIsInVzZXJSZXN1bHRzIiwianNvbiIsImxhbmd1YWdlIiwic3BlZWQiLCJ0aW1lIiwicGFyc2VGbG9hdCIsImFjY3VyYWN5IiwibWlzdGFrZSIsImNvbnNvbGUiLCJsb2ciLCJsZW5ndGhUciIsImxhbmciLCJzdHlsZSIsInN0cm9rZSIsInNldEF0dHJpYnV0ZSIsIk1hdGgiLCJyb3VuZCIsInJlcGxhY2UiLCJDaGFydCIsInJlcGVhdCIsInNwbGl0Iiwib3B0aW9ucyIsInJlc3BvbnNpdmUiLCJlbGVtZW50cyIsInBvaW50IiwicmFkaXVzIiwiaG92ZXJSYWRpdXMiLCJob3ZlckJvcmRlcldpZHRoIiwicG9pbnRCYWNrZ3JvdW5kQ29sb3IiLCJwb2ludEhvdmVyQmFja2dyb3VuZENvbG9yIiwiZmlsbCIsInBvaW50SG92ZXJCb3JkZXJDb2xvciIsImxpbmUiLCJib3JkZXJXaWR0aCIsInRlbnNpb24iLCJib3JkZXJDb2xvciIsInBsdWdpbnMiLCJsZWdlbmQiLCJkaXNwbGF5IiwidGl0bGUiLCJ0ZXh0IiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImZvbnQiLCJzaXplIiwiaW50ZXJhY3Rpb24iLCJpbnRlcnNlY3QiLCJzY2FsZXMiLCJ5IiwiYmVnaW5BdFplcm8iLCJ4IiwiY2hhcnRMYW5BY3RpdmUiLCJjbGlwIiwiY3V0b3V0IiwibGF5b3V0IiwicGFkZGluZyIsInBvc2l0aW9uIiwiYmVzdENoYXJ0QWN0aXZlIiwidmFsdWVzIiwibWFwIiwiY29sb3IiLCJjaGFydEFjY3VyYWN5QWN0aXZlIiwiaG92ZXJCb3JkZXJDb2xvciIsInIiLCJjaGFydENvdW50TGFuQWN0aXZlIiwiaW5kZXhBeGlzIl0sInNvdXJjZXMiOlsiY2hhcnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiYHVzZSBzdHJpY3RgO1xyXG5sZXQgaW5wdXRzID0gQXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibXlSZXN1bHRfX2lucHV0XCIpKTtcclxubGV0IGxhblRleHQgPSBBcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJteVJlc3VsdF9fbGFuZ3VhZ2VcIikpO1xyXG5sZXQgY2lyY2xlcyA9IEFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm15UmVzdWx0X19jaXJjbGVcIikpO1xyXG5sZXQgbnVtYmVycyA9IEFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm15UmVzdWx0X19udW1iZXJcIikpO1xyXG5jb25zdCBjaGFydExhbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGFuZ3VhZ2VDaGFydFwiKTtcclxuY29uc3QgY2hhcnRTcGVlZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3BlZWRDaGFydFwiKTtcclxuY29uc3QgY2hhcnRCZXN0TGFuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiZXN0TGFuQ2hhcnRcIik7XHJcbmNvbnN0IGNoYXJ0QWNjdXJhY3kgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFjY3VyYWN5Q2hhcnRcIik7XHJcbmNvbnN0IGNoYXJ0Q291bnRMYW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvdW50TGFuQ2hhcnRcIik7XHJcbmxldCBsYW5nQ291bnQgPSB7IEphdmE6IDAsIEhUTUw6IDAsIEM6IDAsIEphdmFTY3JpcHQ6IDAsIFwiQyNcIjogMCwgU1FMOiAwLCBcIkMrK1wiOiAwLCBDU1M6IDAsIFB5dGhvbjogMCwgUEhQOiAwIH07XHJcbmxldCBzcGVlZExpc3QgPSBbXTtcclxubGV0IGxhbkxpc3QgPSBbXTtcclxubGV0IHNwZWVkTGVuZ3RoID0gW107XHJcbmxldCBjb3VudExpc3QgPSB7IEphdmE6IDAsIEhUTUw6IDAsIEM6IDAsIEphdmFTY3JpcHQ6IDAsIFwiQyNcIjogMCwgU1FMOiAwLCBcIkMrK1wiOiAwLCBDU1M6IDAsIFB5dGhvbjogMCwgUEhQOiAwIH07XHJcbmxldCBzdW1SZXN1bHQgPSB7IEphdmE6IDAsIEhUTUw6IDAsIEM6IDAsIEphdmFTY3JpcHQ6IDAsIFwiQyNcIjogMCwgU1FMOiAwLCBcIkMrK1wiOiAwLCBDU1M6IDAsIFB5dGhvbjogMCwgUEhQOiAwIH07XHJcbmxldCBtYXhTcGVlZCA9IHsgSmF2YTogMCwgSFRNTDogMCwgQzogMCwgSmF2YVNjcmlwdDogMCwgXCJDI1wiOiAwLCBTUUw6IDAsIFwiQysrXCI6IDAsIENTUzogMCwgUHl0aG9uOiAwLCBQSFA6IDAgfTtcclxubGV0IG1pblNwZWVkID0geyBKYXZhOiAwLCBIVE1MOiAwLCBDOiAwLCBKYXZhU2NyaXB0OiAwLCBcIkMjXCI6IDAsIFNRTDogMCwgXCJDKytcIjogMCwgQ1NTOiAwLCBQeXRob246IDAsIFBIUDogMCB9O1xyXG5sZXQgZXJyb3JMaXN0ID0geyBKYXZhOiAwLCBIVE1MOiAwLCBDOiAwLCBKYXZhU2NyaXB0OiAwLCBcIkMjXCI6IDAsIFNRTDogMCwgXCJDKytcIjogMCwgQ1NTOiAwLCBQeXRob246IDAsIFBIUDogMCB9O1xyXG5sZXQgYWNjdXJhY3lMaXN0ID0geyBKYXZhOiAwLCBIVE1MOiAwLCBDOiAwLCBKYXZhU2NyaXB0OiAwLCBcIkMjXCI6IDAsIFNRTDogMCwgXCJDKytcIjogMCwgQ1NTOiAwLCBQeXRob246IDAsIFBIUDogMCB9O1xyXG5sZXQgaSA9IDE7XHJcbi8vXHJcbmxldCB0aW1lTGlzdCA9IFtdO1xyXG5sZXQgcmVkTGFuTGlzdCA9IFtdO1xyXG5sZXQgcmVkU3BlZWRMaXN0ID0gW107XHJcbmxldCBhY3RpdmVMYW5zID0gW1wiSmF2YVNjcmlwdFwiLCBcIkhUTUxcIiwgXCJDU1NcIiwgXCJDXCIsIFwiU1FMXCIsIFwiQysrXCIsIFwiQyNcIiwgXCJKYXZhXCIsIFwiUHl0aG9uXCIsIFwiUEhQXCJdO1xyXG5sZXQgYWN0aXZlTGFuc0YgPSBbXCJKYXZhU2NyaXB0XCIsIFwiSFRNTFwiLCBcIkNTU1wiLCBcIkNcIiwgXCJTUUxcIiwgXCJDKytcIiwgXCJDI1wiLCBcIkphdmFcIiwgXCJQeXRob25cIiwgXCJQSFBcIl07XHJcbmxldCBsYW5Db2xvcnMgPSB7XHJcblx0Ly8gSFRNTDogXCIjZTM0YzI2OTlcIixcclxuXHQvLyBDU1M6IFwiIzAwOGJjYzk1XCIsXHJcblx0Ly8gSmF2YVNjcmlwdDogXCIjZjZkZDAwOTVcIixcclxuXHQvLyBcIkMrK1wiOiBcIiMyZmM3Zjc5NVwiLFxyXG5cdC8vIFwiQyNcIjogXCIjOTk2MjllOTVcIixcclxuXHQvLyBQeXRob246IFwiI2Y3YzQxYjk1XCIsXHJcblx0Ly8gQzogXCIjZjc4NjFkOTVcIixcclxuXHQvLyBKYXZhOiBcIiNkMDRlMTY5NVwiLFxyXG5cdEphdmE6IFwiI2FkMTQ1N1wiLFxyXG5cdEhUTUw6IFwiI2Y0NDMzNlwiLFxyXG5cdEM6IFwiI2ZmOTgwMFwiLFxyXG5cdEphdmFTY3JpcHQ6IFwiI2ZmYzEwN1wiLFxyXG5cdFwiQyNcIjogXCIjOGFjOTI2XCIsXHJcblx0U1FMOiBcIiM4M2UzNzdcIixcclxuXHRcIkMrK1wiOiBcIiMwMDk2ODhcIixcclxuXHRDU1M6IFwiIzE1NjVjMFwiLFxyXG5cdFB5dGhvbjogXCIjNDQ4YWZmXCIsXHJcblx0UEhQOiBcIiM3MjUxYjVcIixcclxufTtcclxubGV0IGxhbkNvbG9yc0N1dCA9IHtcclxuXHRKYXZhOiBcIiNhZDE0NTdcIixcclxuXHRIVE1MOiBcIiNmNDQzMzZcIixcclxuXHRDOiBcIiNmZjk4MDBcIixcclxuXHRKYXZhU2NyaXB0OiBcIiNmZmMxMDdcIixcclxuXHRcIkMjXCI6IFwiIzhhYzkyNlwiLFxyXG5cdFNRTDogXCIjODNlMzc3XCIsXHJcblx0XCJDKytcIjogXCIjMDA5Njg4XCIsXHJcblx0Q1NTOiBcIiMxNTY1YzBcIixcclxuXHRQeXRob246IFwiIzQ0OGFmZlwiLFxyXG5cdFBIUDogXCIjNzI1MWI1XCIsXHJcbn07XHJcbmxldCBjb2xvcnMgPSBbXTtcclxubGV0IGFjdGl2ZUNvbG9ycyA9IFtdO1xyXG5sZXQgY29sb3JzQmFyID0gW107XHJcbmxldCBhY3RpdmVDb2xvcnNCYXIgPSBbXTtcclxuXHJcbmlucHV0cy5mb3JFYWNoKChpbnB1dCkgPT4ge1xyXG5cdGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XHJcblx0XHRsZXQgbGFuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaW5wdXQuaWQgKyBcIi1sYWJlbFwiKS50ZXh0Q29udGVudDtcclxuXHRcdGlmIChpbnB1dC5jaGVja2VkKSB7XHJcblx0XHRcdGFjdGl2ZUxhbnMucHVzaChsYW4pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aWYgKGFjdGl2ZUxhbnMuaW5kZXhPZihsYW4pID4gLTEpIHtcclxuXHRcdFx0XHRhY3RpdmVMYW5zLnNwbGljZShhY3RpdmVMYW5zLmluZGV4T2YobGFuKSwgMSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJlZExhbkxpc3QgPSBbXTtcclxuXHRcdHJlZFNwZWVkTGlzdCA9IFtdO1xyXG5cdFx0bGFuTGlzdC5mb3JFYWNoKChsYW4sIGluZGV4KSA9PiB7XHJcblx0XHRcdGlmIChhY3RpdmVMYW5zLmluZGV4T2YobGFuKSA+IC0xKSB7XHJcblx0XHRcdFx0cmVkTGFuTGlzdC5wdXNoKGxhbik7XHJcblx0XHRcdFx0cmVkU3BlZWRMaXN0LnB1c2goc3BlZWRMaXN0W2luZGV4XSk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0Y29sb3JzQmFyID0gW107XHJcblx0XHRhY3RpdmVDb2xvcnNCYXIgPSBbXTtcclxuXHRcdHJlZExhbkxpc3QuZm9yRWFjaCgobGFuKSA9PiB7XHJcblx0XHRcdGNvbG9yc0Jhci5wdXNoKGxhbkNvbG9yc1tsYW5dICsgXCI1MFwiKTtcclxuXHRcdFx0YWN0aXZlQ29sb3JzQmFyLnB1c2gobGFuQ29sb3JzW2xhbl0pO1xyXG5cdFx0fSk7XHJcblx0XHRjaGFydFNwZWVkQWN0aXZlLmRhdGEubGFiZWxzID0gcmVkTGFuTGlzdDtcclxuXHRcdChjaGFydFNwZWVkQWN0aXZlLmRhdGEuZGF0YXNldHMgPSBbXHJcblx0XHRcdHtcclxuXHRcdFx0XHR0eXBlOiBcImxpbmVcIixcclxuXHRcdFx0XHRsYWJlbDogXCLQodC60L7RgNC+0YHRgtGMXCIsXHJcblx0XHRcdFx0ZGF0YTogcmVkU3BlZWRMaXN0LFxyXG5cdFx0XHRcdGhvdmVyT2Zmc2V0OiA1LFxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0dHlwZTogXCJiYXJcIixcclxuXHRcdFx0XHRsYWJlbDogXCLQodC60L7RgNC+0YHRgtGMXCIsXHJcblx0XHRcdFx0ZGF0YTogcmVkU3BlZWRMaXN0LFxyXG5cdFx0XHRcdGhvdmVyT2Zmc2V0OiA1LFxyXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogY29sb3JzQmFyLFxyXG5cdFx0XHRcdGhvdmVyQmFja2dyb3VuZENvbG9yOiBhY3RpdmVDb2xvcnNCYXIsXHJcblx0XHRcdH0sXHJcblx0XHRdKSxcclxuXHRcdFx0Y2hhcnRTcGVlZEFjdGl2ZS51cGRhdGUoKTtcclxuXHR9KTtcclxufSk7XHJcbkFycmF5LmZyb20oT2JqZWN0LmtleXMoY291bnRMaXN0KSkuZm9yRWFjaCgobGFuKSA9PiB7XHJcblx0aWYgKGNvdW50TGlzdFtsYW5dID09IDApIHtcclxuXHRcdGNvdW50TGlzdFtsYW5dO1xyXG5cdFx0ZGVsZXRlIGNvdW50TGlzdFtsYW5dO1xyXG5cdH1cclxufSk7XHJcbnVzZXJSZXN1bHRzLmZvckVhY2goKGpzb24pID0+IHtcclxuXHRpZiAoT2JqZWN0LmtleXMobGFuZ0NvdW50KS5pbmRleE9mKGpzb24ubGFuZ3VhZ2UpID09IC0xKSB7XHJcblx0XHRsYW5nQ291bnRbanNvbi5sYW5ndWFnZV0gPSAxO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRsYW5nQ291bnRbanNvbi5sYW5ndWFnZV0gKz0gMTtcclxuXHR9XHJcblx0c3VtUmVzdWx0W2pzb24ubGFuZ3VhZ2VdICs9IGpzb24uc3BlZWQ7XHJcblx0aWYgKCFhY2N1cmFjeUxpc3RbanNvbi5sYW5ndWFnZV0pIHtcclxuXHRcdGFjY3VyYWN5TGlzdFtqc29uLmxhbmd1YWdlXSA9IDA7XHJcblx0fVxyXG5cdHRpbWVMaXN0LnB1c2goanNvbi50aW1lKTtcclxuXHRhY2N1cmFjeUxpc3RbanNvbi5sYW5ndWFnZV0gKz0gcGFyc2VGbG9hdChqc29uLmFjY3VyYWN5KTtcclxuXHRpZiAoanNvbi5zcGVlZCA+IG1heFNwZWVkW2pzb24ubGFuZ3VhZ2VdKSB7XHJcblx0XHRtYXhTcGVlZFtqc29uLmxhbmd1YWdlXSA9IGpzb24uc3BlZWQ7XHJcblx0fVxyXG5cdGlmIChqc29uLnNwZWVkID4gbWluU3BlZWRbanNvbi5sYW5ndWFnZV0pIHtcclxuXHRcdG1pblNwZWVkW2pzb24ubGFuZ3VhZ2VdID0ganNvbi5zcGVlZDtcclxuXHR9XHJcblx0c3BlZWRMaXN0LnB1c2goanNvbi5zcGVlZCk7XHJcblx0bGFuTGlzdC5wdXNoKGpzb24ubGFuZ3VhZ2UpO1xyXG5cdGVycm9yTGlzdFtqc29uLmxhbmd1YWdlXSArPSBwYXJzZUZsb2F0KGpzb24ubWlzdGFrZSk7XHJcblxyXG5cdHNwZWVkTGVuZ3RoLnB1c2goaSk7XHJcblx0Y291bnRMaXN0W2pzb24ubGFuZ3VhZ2VdKys7XHJcblx0aSsrO1xyXG59KTtcclxuY29uc29sZS5sb2codGltZUxpc3QpO1xyXG5sZXQgbGVuZ3RoVHIgPSBpIC0gMTtcclxudXNlclJlc3VsdHMuZm9yRWFjaCgoanNvbikgPT4ge1xyXG5cdGlmIChqc29uLnNwZWVkIDwgbWluU3BlZWRbanNvbi5sYW5ndWFnZV0pIHtcclxuXHRcdG1pblNwZWVkW2pzb24ubGFuZ3VhZ2VdID0ganNvbi5zcGVlZDtcclxuXHR9XHJcbn0pO1xyXG5sYW5MaXN0LmZvckVhY2goKGxhbiwgaW5kZXgpID0+IHtcclxuXHRpZiAoYWN0aXZlTGFucy5pbmRleE9mKGxhbikgPiAtMSkge1xyXG5cdFx0cmVkTGFuTGlzdC5wdXNoKGxhbik7XHJcblx0XHRyZWRTcGVlZExpc3QucHVzaChzcGVlZExpc3RbaW5kZXhdKTtcclxuXHR9XHJcbn0pO1xyXG5PYmplY3Qua2V5cyhsYW5nQ291bnQpLmZvckVhY2goKGxhbmcpID0+IHtcclxuXHRzdW1SZXN1bHRbbGFuZ10gLz0gbGFuZ0NvdW50W2xhbmddO1xyXG5cclxuXHRlcnJvckxpc3RbbGFuZ10gLz0gbGFuZ0NvdW50W2xhbmddO1xyXG5cdGFjY3VyYWN5TGlzdFtsYW5nXSAvPSBsYW5nQ291bnRbbGFuZ107XHJcblx0aWYgKGxhbmdDb3VudFtsYW5nXSA9PSAwKSB7XHJcblx0XHRkZWxldGUgbGFuZ0NvdW50W2xhbmddO1xyXG5cdFx0ZGVsZXRlIGFjY3VyYWN5TGlzdFtsYW5nXTtcclxuXHRcdGRlbGV0ZSBtYXhTcGVlZFtsYW5nXTtcclxuXHRcdGRlbGV0ZSBtaW5TcGVlZFtsYW5nXTtcclxuXHRcdGRlbGV0ZSBzdW1SZXN1bHRbbGFuZ107XHJcblx0XHRkZWxldGUgbGFuQ29sb3JzQ3V0W2xhbmddO1xyXG5cdH1cclxufSk7XHJcblxyXG5pZiAoXHJcblx0YWNjdXJhY3lMaXN0LkphdmEgfHxcclxuXHRhY2N1cmFjeUxpc3QuSFRNTCB8fFxyXG5cdGFjY3VyYWN5TGlzdC5DIHx8XHJcblx0YWNjdXJhY3lMaXN0W1wiQysrXCJdIHx8XHJcblx0YWNjdXJhY3lMaXN0W1wiQyNcIl0gfHxcclxuXHRhY2N1cmFjeUxpc3QuUHl0aG9uIHx8XHJcblx0YWNjdXJhY3lMaXN0LkNTUyB8fFxyXG5cdGFjY3VyYWN5TGlzdC5KYXZhU2NyaXB0XHJcbikge1xyXG5cdE9iamVjdC5rZXlzKGxhbkNvbG9ycykuZm9yRWFjaCgobGFuLCBpKSA9PiB7XHJcblx0XHRsYW5UZXh0W2ldLnRleHRDb250ZW50ID0gbGFuO1xyXG5cdFx0Y2lyY2xlc1tpXS5zdHlsZS5zdHJva2UgPSBsYW5Db2xvcnNbbGFuXTtcclxuXHRcdGlmIChhY2N1cmFjeUxpc3RbbGFuXSkge1xyXG5cdFx0XHRjaXJjbGVzW2ldLnNldEF0dHJpYnV0ZShcInN0cm9rZS1kYXNoYXJyYXlcIiwgYWNjdXJhY3lMaXN0W2xhbl0gKyBcIiAxMDBcIik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjaXJjbGVzW2ldLnN0eWxlID0gXCJvcGFjaXR5OjA7dHJhbnNpdGlvbjogMHM7XCI7XHJcblx0XHR9XHJcblx0XHRudW1iZXJzW2ldLnRleHRDb250ZW50ID0gKE1hdGgucm91bmQoYWNjdXJhY3lMaXN0W2xhbl0pICsgXCIlXCIpLnJlcGxhY2UoXCJOYU5cIiwgXCIwXCIpO1xyXG5cdH0pO1xyXG59XHJcbnJlZExhbkxpc3QuZm9yRWFjaCgobGFuKSA9PiB7XHJcblx0Y29sb3JzQmFyLnB1c2gobGFuQ29sb3JzW2xhbl0gKyBcIjUwXCIpO1xyXG5cdGFjdGl2ZUNvbG9yc0Jhci5wdXNoKGxhbkNvbG9yc1tsYW5dKTtcclxufSk7XHJcbk9iamVjdC5rZXlzKGxhbmdDb3VudCkuZm9yRWFjaCgobGFuKSA9PiB7XHJcblx0Y29sb3JzLnB1c2gobGFuQ29sb3JzW2xhbl0pO1xyXG5cdGFjdGl2ZUNvbG9ycy5wdXNoKGxhbkNvbG9yc1tsYW5dICsgXCJiM1wiKTtcclxufSk7XHJcblxyXG5sZXQgY2hhcnRTcGVlZEFjdGl2ZSA9IG5ldyBDaGFydChjaGFydFNwZWVkLCB7XHJcblx0ZGF0YToge1xyXG5cdFx0bGFiZWxzOiByZWRMYW5MaXN0LFxyXG5cdFx0ZGF0YXNldHM6IFtcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHR5cGU6IFwibGluZVwiLFxyXG5cdFx0XHRcdGxhYmVsOiBcItCh0LrQvtGA0L7RgdGC0YxcIixcclxuXHRcdFx0XHRkYXRhOiBcIjAsXCIucmVwZWF0KGxlbmd0aFRyKS5zcGxpdChcIixcIiwgbGVuZ3RoVHIpLFxyXG5cdFx0XHRcdGhvdmVyT2Zmc2V0OiA1LFxyXG5cdFx0XHR9LFxyXG5cdFx0XHR7XHJcblx0XHRcdFx0dHlwZTogXCJiYXJcIixcclxuXHRcdFx0XHRsYWJlbDogXCLQodC60L7RgNC+0YHRgtGMXCIsXHJcblx0XHRcdFx0ZGF0YTogW10sXHJcblx0XHRcdFx0aG92ZXJPZmZzZXQ6IDUsXHJcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBjb2xvcnNCYXIsXHJcblx0XHRcdFx0aG92ZXJCYWNrZ3JvdW5kQ29sb3I6IGFjdGl2ZUNvbG9yc0JhcixcclxuXHRcdFx0fSxcclxuXHRcdF0sXHJcblx0fSxcclxuXHRvcHRpb25zOiB7XHJcblx0XHRyZXNwb25zaXZlOiB0cnVlLFxyXG5cdFx0ZWxlbWVudHM6IHtcclxuXHRcdFx0cG9pbnQ6IHtcclxuXHRcdFx0XHRyYWRpdXM6IDQsXHJcblx0XHRcdFx0aG92ZXJSYWRpdXM6IDUsXHJcblx0XHRcdFx0aG92ZXJCb3JkZXJXaWR0aDogMixcclxuXHRcdFx0XHRwb2ludEJhY2tncm91bmRDb2xvcjogXCIjOGFjOTI2XCIsXHJcblx0XHRcdFx0cG9pbnRIb3ZlckJhY2tncm91bmRDb2xvcjogXCIjMDAwMDAwXCIsXHJcblx0XHRcdFx0ZmlsbDogdHJ1ZSxcclxuXHRcdFx0XHRwb2ludEhvdmVyQm9yZGVyQ29sb3I6IFwiIzhhYzkyNlwiLFxyXG5cdFx0XHR9LFxyXG5cdFx0XHRsaW5lOiB7XHJcblx0XHRcdFx0Ym9yZGVyV2lkdGg6IDQsXHJcblx0XHRcdFx0dGVuc2lvbjogMC40LFxyXG5cdFx0XHRcdGJvcmRlckNvbG9yOiBcIiM4YWM5MjZcIixcclxuXHRcdFx0fSxcclxuXHRcdH0sXHJcblx0XHRwbHVnaW5zOiB7XHJcblx0XHRcdGxlZ2VuZDoge1xyXG5cdFx0XHRcdGRpc3BsYXk6IGZhbHNlLFxyXG5cdFx0XHR9LFxyXG5cdFx0XHR0aXRsZToge1xyXG5cdFx0XHRcdGRpc3BsYXk6IHRydWUsXHJcblx0XHRcdFx0dGV4dDpcclxuXHRcdFx0XHRcdGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiaXNTZWNvbmRNb2RlT25cIikgPT0gXCJ0cnVlXCJcclxuXHRcdFx0XHRcdFx0PyBcItCh0LrQvtGA0L7RgdGC0Ywg0L/QtdGH0LDRgtC4INGBINGC0LXRh9C10L3QuNC10Lwg0LLRgNC10LzQtdC90LggKNC9L9GBKVwiXHJcblx0XHRcdFx0XHRcdDogXCLQodC60L7RgNC+0YHRgtGMINC/0LXRh9Cw0YLQuCDRgSDRgtC10YfQtdC90LjQtdC8INCy0YDQtdC80LXQvdC4ICjQvS/QvNC40L0pXCIsXHJcblx0XHRcdFx0Zm9udDoge1xyXG5cdFx0XHRcdFx0c2l6ZTogMjAsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSxcclxuXHRcdH0sXHJcblx0XHRpbnRlcmFjdGlvbjoge1xyXG5cdFx0XHRpbnRlcnNlY3Q6IGZhbHNlLFxyXG5cdFx0fSxcclxuXHRcdHNjYWxlczoge1xyXG5cdFx0XHR5OiB7XHJcblx0XHRcdFx0YmVnaW5BdFplcm86IHRydWUsXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHR4OiB7XHJcblx0XHRcdFx0ZGlzcGxheTogdHJ1ZSxcclxuXHRcdFx0XHR0aXRsZToge1xyXG5cdFx0XHRcdFx0ZGlzcGxheTogdHJ1ZSxcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHR9LFxyXG5cdFx0fSxcclxuXHR9LFxyXG59KTtcclxubGV0IGNoYXJ0TGFuQWN0aXZlID0gbmV3IENoYXJ0KGNoYXJ0TGFuLCB7XHJcblx0dHlwZTogXCJkb3VnaG51dFwiLFxyXG5cdGRhdGE6IHtcclxuXHRcdGxhYmVsczogT2JqZWN0LmtleXMobGFuZ0NvdW50KSxcclxuXHRcdGRhdGFzZXRzOiBbXHJcblx0XHRcdHtcclxuXHRcdFx0XHRsYWJlbDogXCLQn9GA0L7RhtC10L3RgiDRgtGA0LXQvdC40YDQvtCy0L7QulwiLFxyXG5cdFx0XHRcdGRhdGE6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcclxuXHRcdFx0XHRob3Zlck9mZnNldDogMTAsXHJcblx0XHRcdFx0Ym9yZGVyV2lkdGg6IDAsXHJcblx0XHRcdFx0Y2xpcDogMSxcclxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGNvbG9ycyxcclxuXHRcdFx0XHQvLyBob3ZlckJhY2tncm91bmRDb2xvcjogYWN0aXZlQ29sb3JzLFxyXG5cdFx0XHR9LFxyXG5cdFx0XSxcclxuXHR9LFxyXG5cdG9wdGlvbnM6IHtcclxuXHRcdGN1dG91dDogMCxcclxuXHRcdGxheW91dDoge1xyXG5cdFx0XHRwYWRkaW5nOiA1LFxyXG5cdFx0fSxcclxuXHRcdHJlc3BvbnNpdmU6IHRydWUsXHJcblx0XHRwbHVnaW5zOiB7XHJcblx0XHRcdGxlZ2VuZDoge1xyXG5cdFx0XHRcdHBvc2l0aW9uOiBcInJpZ2h0XCIsXHJcblx0XHRcdH0sXHJcblx0XHRcdHRpdGxlOiB7XHJcblx0XHRcdFx0ZGlzcGxheTogdHJ1ZSxcclxuXHRcdFx0XHR0ZXh0OiBcItCv0LfRi9C60Lgg0YLRgNC10L3QuNGA0L7QstC+0LogKCUpXCIsXHJcblx0XHRcdFx0Zm9udDoge1xyXG5cdFx0XHRcdFx0c2l6ZTogMjAsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSxcclxuXHRcdH0sXHJcblx0fSxcclxufSk7XHJcbmxldCBiZXN0Q2hhcnRBY3RpdmUgPSBuZXcgQ2hhcnQoY2hhcnRCZXN0TGFuLCB7XHJcblx0dHlwZTogXCJiYXJcIixcclxuXHRkYXRhOiB7XHJcblx0XHRsYWJlbHM6IE9iamVjdC5rZXlzKHN1bVJlc3VsdCksXHJcblx0XHRkYXRhc2V0czogW1xyXG5cdFx0XHR7XHJcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBPYmplY3QudmFsdWVzKGxhbkNvbG9ycyksXHJcblx0XHRcdFx0bGFiZWw6IFwi0JzQsNC60YHQuNC80LDQu9GM0L3QsNGPINGB0LrQvtGA0L7RgdGC0YxcIixcclxuXHRcdFx0XHRkYXRhOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcblx0XHRcdFx0aG92ZXJPZmZzZXQ6IDUsXHJcblx0XHRcdFx0Ym9yZGVyV2lkdGg6IDAsXHJcblx0XHRcdFx0Y2xpcDogMSxcclxuXHRcdFx0fSxcclxuXHRcdFx0e1xyXG5cdFx0XHRcdGJhY2tncm91bmRDb2xvcjogQXJyYXkuZnJvbShPYmplY3QudmFsdWVzKGxhbkNvbG9ycykpLm1hcCgoY29sb3IpID0+IHtcclxuXHRcdFx0XHRcdHJldHVybiAoY29sb3IgKz0gXCI5MFwiKTtcclxuXHRcdFx0XHR9KSxcclxuXHRcdFx0XHRsYWJlbDogXCLQodGA0LXQtNC90Y/RjyDRgdC60L7RgNC+0YHRgtGMXCIsXHJcblx0XHRcdFx0ZGF0YTogWzAsIDAsIDAsIDAsIDAsIDAsIDAsIDBdLFxyXG5cdFx0XHRcdGhvdmVyT2Zmc2V0OiA1LFxyXG5cdFx0XHRcdGJvcmRlcldpZHRoOiAwLFxyXG5cdFx0XHRcdGNsaXA6IDEsXHJcblx0XHRcdH0sXHJcblx0XHRcdHtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IEFycmF5LmZyb20oT2JqZWN0LnZhbHVlcyhsYW5Db2xvcnMpKS5tYXAoKGNvbG9yKSA9PiB7XHJcblx0XHRcdFx0XHRyZXR1cm4gKGNvbG9yICs9IFwiNTBcIik7XHJcblx0XHRcdFx0fSksXHJcblx0XHRcdFx0bGFiZWw6IFwi0JzQuNC90LjQvNCw0LvRjNC90LDRjyDRgdC60L7RgNC+0YHRgtGMXCIsXHJcblx0XHRcdFx0Ly8gZGF0YTogWzAsMCwwLDAsMCwwLDAsMF0sXHJcblx0XHRcdFx0aG92ZXJPZmZzZXQ6IDUsXHJcblx0XHRcdFx0Ym9yZGVyV2lkdGg6IDAsXHJcblx0XHRcdFx0Y2xpcDogMSxcclxuXHRcdFx0fSxcclxuXHRcdF0sXHJcblx0fSxcclxuXHRvcHRpb25zOiB7XHJcblx0XHRyZXNwb25zaXZlOiB0cnVlLFxyXG5cdFx0cGx1Z2luczoge1xyXG5cdFx0XHRsZWdlbmQ6IHtcclxuXHRcdFx0XHRwb3NpdGlvbjogXCJib3R0b21cIixcclxuXHRcdFx0fSxcclxuXHRcdFx0dGl0bGU6IHtcclxuXHRcdFx0XHRkaXNwbGF5OiB0cnVlLFxyXG5cdFx0XHRcdHRleHQ6XHJcblx0XHRcdFx0XHRsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImlzU2Vjb25kTW9kZU9uXCIpID09IFwidHJ1ZVwiXHJcblx0XHRcdFx0XHRcdD8gXCLQodC60L7RgNC+0YHRgtC4INC/0L4g0Y/Qt9GL0LrQsNC8ICjQvS/RgSlcIlxyXG5cdFx0XHRcdFx0XHQ6IFwi0KHQutC+0YDQvtGB0YLQuCDQv9C+INGP0LfRi9C60LDQvCAo0L0v0LzQuNC9KVwiLFxyXG5cdFx0XHRcdGZvbnQ6IHtcclxuXHRcdFx0XHRcdHNpemU6IDIwLFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0sXHJcblx0XHR9LFxyXG5cdH0sXHJcbn0pO1xyXG5sZXQgY2hhcnRBY2N1cmFjeUFjdGl2ZSA9IG5ldyBDaGFydChjaGFydEFjY3VyYWN5LCB7XHJcblx0dHlwZTogXCJwb2xhckFyZWFcIixcclxuXHRkYXRhOiB7XHJcblx0XHRsYWJlbHM6IE9iamVjdC5rZXlzKGFjY3VyYWN5TGlzdCksXHJcblx0XHRkYXRhc2V0czogW1xyXG5cdFx0XHR7XHJcblx0XHRcdFx0bGFiZWw6IFwi0KLQvtGH0L3QvtGB0YLRjFwiLFxyXG5cdFx0XHRcdGRhdGE6IFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwXSxcclxuXHRcdFx0XHQvLyBob3ZlckJvcmRlcldpZHRoOiAzLFxyXG5cdFx0XHRcdC8vIGJvcmRlckNvbG9yOiBcImJsYWNrXCIsXHJcblx0XHRcdFx0Ym9yZGVyV2lkdGg6IDAsXHJcblx0XHRcdFx0aG92ZXJCb3JkZXJDb2xvcjogXCJibGFja1wiLFxyXG5cdFx0XHRcdGJvcmRlckNvbG9yOiBcImJsYWNrXCIsXHJcblx0XHRcdFx0Y2xpcDogMSxcclxuXHRcdFx0XHRiYWNrZ3JvdW5kQ29sb3I6IGNvbG9ycyxcclxuXHRcdFx0XHRob3ZlckJhY2tncm91bmRDb2xvcjogYWN0aXZlQ29sb3JzLFxyXG5cdFx0XHR9LFxyXG5cdFx0XSxcclxuXHR9LFxyXG5cdG9wdGlvbnM6IHtcclxuXHRcdHJlc3BvbnNpdmU6IHRydWUsXHJcblx0XHRzY2FsZXM6IHtcclxuXHRcdFx0cjogeyBkaXNwbGF5OiBmYWxzZSB9LFxyXG5cdFx0fSxcclxuXHRcdHBsdWdpbnM6IHtcclxuXHRcdFx0bGVnZW5kOiB7XHJcblx0XHRcdFx0cG9zaXRpb246IFwicmlnaHRcIixcclxuXHRcdFx0fSxcclxuXHRcdFx0dGl0bGU6IHtcclxuXHRcdFx0XHRkaXNwbGF5OiB0cnVlLFxyXG5cdFx0XHRcdHRleHQ6IFwi0KLQvtGH0L3QvtGB0YLRjCDQsiDRgdGA0LDQstC90LXQvdC40LggKCUpXCIsXHJcblx0XHRcdFx0Zm9udDoge1xyXG5cdFx0XHRcdFx0c2l6ZTogMjAsXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSxcclxuXHRcdH0sXHJcblx0fSxcclxufSk7XHJcblxyXG5sZXQgY2hhcnRDb3VudExhbkFjdGl2ZSA9IG5ldyBDaGFydChjaGFydENvdW50TGFuLCB7XHJcblx0ZGF0YToge1xyXG5cdFx0bGFiZWxzOiBPYmplY3Qua2V5cyhsYW5nQ291bnQpLFxyXG5cdFx0ZGF0YXNldHM6IFtcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHR5cGU6IFwiYmFyXCIsXHJcblx0XHRcdFx0bGFiZWw6IFwi0JrQvtC70LjRh9C10YHRgtCy0L4g0YLRgNC10L3QuNGA0L7QstC+0LpcIixcclxuXHRcdFx0XHRkYXRhOiBbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMF0sXHJcblx0XHRcdFx0aG92ZXJPZmZzZXQ6IDUsXHJcblx0XHRcdFx0YmFja2dyb3VuZENvbG9yOiBPYmplY3QudmFsdWVzKGxhbkNvbG9ycyksXHJcblx0XHRcdFx0aG92ZXJCYWNrZ3JvdW5kQ29sb3I6IE9iamVjdC52YWx1ZXMobGFuQ29sb3JzKS5tYXAoKGNvbG9yKSA9PiB7XHJcblx0XHRcdFx0XHRyZXR1cm4gY29sb3IgKyBcIjkwXCI7XHJcblx0XHRcdFx0fSksXHJcblx0XHRcdH0sXHJcblx0XHRdLFxyXG5cdH0sXHJcblx0b3B0aW9uczoge1xyXG5cdFx0aW5kZXhBeGlzOiBcInlcIixcclxuXHRcdHJlc3BvbnNpdmU6IHRydWUsXHJcblx0XHRwbHVnaW5zOiB7XHJcblx0XHRcdGxlZ2VuZDoge1xyXG5cdFx0XHRcdGRpc3BsYXk6IGZhbHNlLFxyXG5cdFx0XHR9LFxyXG5cdFx0XHR0aXRsZToge1xyXG5cdFx0XHRcdGRpc3BsYXk6IHRydWUsXHJcblx0XHRcdFx0dGV4dDogXCLQmtC+0LvQuNGH0LXRgdGC0LLQviDRgtGA0LXQvdC40YDQvtCy0L7QuiDQv9C+INGP0LfRi9C60LDQvFwiLFxyXG5cdFx0XHRcdGZvbnQ6IHtcclxuXHRcdFx0XHRcdHNpemU6IDIwLFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0sXHJcblx0XHR9LFxyXG5cdFx0aW50ZXJhY3Rpb246IHtcclxuXHRcdFx0aW50ZXJzZWN0OiBmYWxzZSxcclxuXHRcdH0sXHJcblx0XHRzY2FsZXM6IHtcclxuXHRcdFx0eToge1xyXG5cdFx0XHRcdGJlZ2luQXRaZXJvOiB0cnVlLFxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0eDoge1xyXG5cdFx0XHRcdGRpc3BsYXk6IGZhbHNlLFxyXG5cdFx0XHRcdHRpdGxlOiB7XHJcblx0XHRcdFx0XHRkaXNwbGF5OiB0cnVlLFxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdH0sXHJcblx0XHR9LFxyXG5cdH0sXHJcbn0pO1xyXG5cclxuLy9cclxuIl0sIm1hcHBpbmdzIjoiQUFBQSxZQUFZO0FBQ1osSUFBSUEsTUFBTSxHQUFHQyxLQUFLLENBQUNDLElBQUksQ0FBQ0MsUUFBUSxDQUFDQyxzQkFBc0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQzNFLElBQUlDLE9BQU8sR0FBR0osS0FBSyxDQUFDQyxJQUFJLENBQUNDLFFBQVEsQ0FBQ0Msc0JBQXNCLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUMvRSxJQUFJRSxPQUFPLEdBQUdMLEtBQUssQ0FBQ0MsSUFBSSxDQUFDQyxRQUFRLENBQUNDLHNCQUFzQixDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDN0UsSUFBSUcsT0FBTyxHQUFHTixLQUFLLENBQUNDLElBQUksQ0FBQ0MsUUFBUSxDQUFDQyxzQkFBc0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQzdFLE1BQU1JLFFBQVEsR0FBR0wsUUFBUSxDQUFDTSxjQUFjLENBQUMsZUFBZSxDQUFDO0FBQ3pELE1BQU1DLFVBQVUsR0FBR1AsUUFBUSxDQUFDTSxjQUFjLENBQUMsWUFBWSxDQUFDO0FBQ3hELE1BQU1FLFlBQVksR0FBR1IsUUFBUSxDQUFDTSxjQUFjLENBQUMsY0FBYyxDQUFDO0FBQzVELE1BQU1HLGFBQWEsR0FBR1QsUUFBUSxDQUFDTSxjQUFjLENBQUMsZUFBZSxDQUFDO0FBQzlELE1BQU1JLGFBQWEsR0FBR1YsUUFBUSxDQUFDTSxjQUFjLENBQUMsZUFBZSxDQUFDO0FBQzlELElBQUlLLFNBQVMsR0FBRztFQUFFQyxJQUFJLEVBQUUsQ0FBQztFQUFFQyxJQUFJLEVBQUUsQ0FBQztFQUFFQyxDQUFDLEVBQUUsQ0FBQztFQUFFQyxVQUFVLEVBQUUsQ0FBQztFQUFFLElBQUksRUFBRSxDQUFDO0VBQUVDLEdBQUcsRUFBRSxDQUFDO0VBQUUsS0FBSyxFQUFFLENBQUM7RUFBRUMsR0FBRyxFQUFFLENBQUM7RUFBRUMsTUFBTSxFQUFFLENBQUM7RUFBRUMsR0FBRyxFQUFFO0FBQUUsQ0FBQztBQUMvRyxJQUFJQyxTQUFTLEdBQUcsRUFBRTtBQUNsQixJQUFJQyxPQUFPLEdBQUcsRUFBRTtBQUNoQixJQUFJQyxXQUFXLEdBQUcsRUFBRTtBQUNwQixJQUFJQyxTQUFTLEdBQUc7RUFBRVgsSUFBSSxFQUFFLENBQUM7RUFBRUMsSUFBSSxFQUFFLENBQUM7RUFBRUMsQ0FBQyxFQUFFLENBQUM7RUFBRUMsVUFBVSxFQUFFLENBQUM7RUFBRSxJQUFJLEVBQUUsQ0FBQztFQUFFQyxHQUFHLEVBQUUsQ0FBQztFQUFFLEtBQUssRUFBRSxDQUFDO0VBQUVDLEdBQUcsRUFBRSxDQUFDO0VBQUVDLE1BQU0sRUFBRSxDQUFDO0VBQUVDLEdBQUcsRUFBRTtBQUFFLENBQUM7QUFDL0csSUFBSUssU0FBUyxHQUFHO0VBQUVaLElBQUksRUFBRSxDQUFDO0VBQUVDLElBQUksRUFBRSxDQUFDO0VBQUVDLENBQUMsRUFBRSxDQUFDO0VBQUVDLFVBQVUsRUFBRSxDQUFDO0VBQUUsSUFBSSxFQUFFLENBQUM7RUFBRUMsR0FBRyxFQUFFLENBQUM7RUFBRSxLQUFLLEVBQUUsQ0FBQztFQUFFQyxHQUFHLEVBQUUsQ0FBQztFQUFFQyxNQUFNLEVBQUUsQ0FBQztFQUFFQyxHQUFHLEVBQUU7QUFBRSxDQUFDO0FBQy9HLElBQUlNLFFBQVEsR0FBRztFQUFFYixJQUFJLEVBQUUsQ0FBQztFQUFFQyxJQUFJLEVBQUUsQ0FBQztFQUFFQyxDQUFDLEVBQUUsQ0FBQztFQUFFQyxVQUFVLEVBQUUsQ0FBQztFQUFFLElBQUksRUFBRSxDQUFDO0VBQUVDLEdBQUcsRUFBRSxDQUFDO0VBQUUsS0FBSyxFQUFFLENBQUM7RUFBRUMsR0FBRyxFQUFFLENBQUM7RUFBRUMsTUFBTSxFQUFFLENBQUM7RUFBRUMsR0FBRyxFQUFFO0FBQUUsQ0FBQztBQUM5RyxJQUFJTyxRQUFRLEdBQUc7RUFBRWQsSUFBSSxFQUFFLENBQUM7RUFBRUMsSUFBSSxFQUFFLENBQUM7RUFBRUMsQ0FBQyxFQUFFLENBQUM7RUFBRUMsVUFBVSxFQUFFLENBQUM7RUFBRSxJQUFJLEVBQUUsQ0FBQztFQUFFQyxHQUFHLEVBQUUsQ0FBQztFQUFFLEtBQUssRUFBRSxDQUFDO0VBQUVDLEdBQUcsRUFBRSxDQUFDO0VBQUVDLE1BQU0sRUFBRSxDQUFDO0VBQUVDLEdBQUcsRUFBRTtBQUFFLENBQUM7QUFDOUcsSUFBSVEsU0FBUyxHQUFHO0VBQUVmLElBQUksRUFBRSxDQUFDO0VBQUVDLElBQUksRUFBRSxDQUFDO0VBQUVDLENBQUMsRUFBRSxDQUFDO0VBQUVDLFVBQVUsRUFBRSxDQUFDO0VBQUUsSUFBSSxFQUFFLENBQUM7RUFBRUMsR0FBRyxFQUFFLENBQUM7RUFBRSxLQUFLLEVBQUUsQ0FBQztFQUFFQyxHQUFHLEVBQUUsQ0FBQztFQUFFQyxNQUFNLEVBQUUsQ0FBQztFQUFFQyxHQUFHLEVBQUU7QUFBRSxDQUFDO0FBQy9HLElBQUlTLFlBQVksR0FBRztFQUFFaEIsSUFBSSxFQUFFLENBQUM7RUFBRUMsSUFBSSxFQUFFLENBQUM7RUFBRUMsQ0FBQyxFQUFFLENBQUM7RUFBRUMsVUFBVSxFQUFFLENBQUM7RUFBRSxJQUFJLEVBQUUsQ0FBQztFQUFFQyxHQUFHLEVBQUUsQ0FBQztFQUFFLEtBQUssRUFBRSxDQUFDO0VBQUVDLEdBQUcsRUFBRSxDQUFDO0VBQUVDLE1BQU0sRUFBRSxDQUFDO0VBQUVDLEdBQUcsRUFBRTtBQUFFLENBQUM7QUFDbEgsSUFBSVUsQ0FBQyxHQUFHLENBQUM7QUFDVDtBQUNBLElBQUlDLFFBQVEsR0FBRyxFQUFFO0FBQ2pCLElBQUlDLFVBQVUsR0FBRyxFQUFFO0FBQ25CLElBQUlDLFlBQVksR0FBRyxFQUFFO0FBQ3JCLElBQUlDLFVBQVUsR0FBRyxDQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQztBQUNoRyxJQUFJQyxXQUFXLEdBQUcsQ0FBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUM7QUFDakcsSUFBSUMsU0FBUyxHQUFHO0VBQ2Y7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBdkIsSUFBSSxFQUFFLFNBQVM7RUFDZkMsSUFBSSxFQUFFLFNBQVM7RUFDZkMsQ0FBQyxFQUFFLFNBQVM7RUFDWkMsVUFBVSxFQUFFLFNBQVM7RUFDckIsSUFBSSxFQUFFLFNBQVM7RUFDZkMsR0FBRyxFQUFFLFNBQVM7RUFDZCxLQUFLLEVBQUUsU0FBUztFQUNoQkMsR0FBRyxFQUFFLFNBQVM7RUFDZEMsTUFBTSxFQUFFLFNBQVM7RUFDakJDLEdBQUcsRUFBRTtBQUNOLENBQUM7QUFDRCxJQUFJaUIsWUFBWSxHQUFHO0VBQ2xCeEIsSUFBSSxFQUFFLFNBQVM7RUFDZkMsSUFBSSxFQUFFLFNBQVM7RUFDZkMsQ0FBQyxFQUFFLFNBQVM7RUFDWkMsVUFBVSxFQUFFLFNBQVM7RUFDckIsSUFBSSxFQUFFLFNBQVM7RUFDZkMsR0FBRyxFQUFFLFNBQVM7RUFDZCxLQUFLLEVBQUUsU0FBUztFQUNoQkMsR0FBRyxFQUFFLFNBQVM7RUFDZEMsTUFBTSxFQUFFLFNBQVM7RUFDakJDLEdBQUcsRUFBRTtBQUNOLENBQUM7QUFDRCxJQUFJa0IsTUFBTSxHQUFHLEVBQUU7QUFDZixJQUFJQyxZQUFZLEdBQUcsRUFBRTtBQUNyQixJQUFJQyxTQUFTLEdBQUcsRUFBRTtBQUNsQixJQUFJQyxlQUFlLEdBQUcsRUFBRTtBQUV4QjNDLE1BQU0sQ0FBQzRDLE9BQU8sQ0FBRUMsS0FBSyxJQUFLO0VBQ3pCQSxLQUFLLENBQUNDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNO0lBQ3JDLElBQUlDLEdBQUcsR0FBRzVDLFFBQVEsQ0FBQ00sY0FBYyxDQUFDb0MsS0FBSyxDQUFDRyxFQUFFLEdBQUcsUUFBUSxDQUFDLENBQUNDLFdBQVc7SUFDbEUsSUFBSUosS0FBSyxDQUFDSyxPQUFPLEVBQUU7TUFDbEJkLFVBQVUsQ0FBQ2UsSUFBSSxDQUFDSixHQUFHLENBQUM7SUFDckIsQ0FBQyxNQUFNO01BQ04sSUFBSVgsVUFBVSxDQUFDZ0IsT0FBTyxDQUFDTCxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtRQUNqQ1gsVUFBVSxDQUFDaUIsTUFBTSxDQUFDakIsVUFBVSxDQUFDZ0IsT0FBTyxDQUFDTCxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7TUFDOUM7SUFDRDtJQUNBYixVQUFVLEdBQUcsRUFBRTtJQUNmQyxZQUFZLEdBQUcsRUFBRTtJQUNqQlgsT0FBTyxDQUFDb0IsT0FBTyxDQUFDLENBQUNHLEdBQUcsRUFBRU8sS0FBSyxLQUFLO01BQy9CLElBQUlsQixVQUFVLENBQUNnQixPQUFPLENBQUNMLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO1FBQ2pDYixVQUFVLENBQUNpQixJQUFJLENBQUNKLEdBQUcsQ0FBQztRQUNwQlosWUFBWSxDQUFDZ0IsSUFBSSxDQUFDNUIsU0FBUyxDQUFDK0IsS0FBSyxDQUFDLENBQUM7TUFDcEM7SUFDRCxDQUFDLENBQUM7SUFDRlosU0FBUyxHQUFHLEVBQUU7SUFDZEMsZUFBZSxHQUFHLEVBQUU7SUFDcEJULFVBQVUsQ0FBQ1UsT0FBTyxDQUFFRyxHQUFHLElBQUs7TUFDM0JMLFNBQVMsQ0FBQ1MsSUFBSSxDQUFDYixTQUFTLENBQUNTLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztNQUNyQ0osZUFBZSxDQUFDUSxJQUFJLENBQUNiLFNBQVMsQ0FBQ1MsR0FBRyxDQUFDLENBQUM7SUFDckMsQ0FBQyxDQUFDO0lBQ0ZRLGdCQUFnQixDQUFDQyxJQUFJLENBQUNDLE1BQU0sR0FBR3ZCLFVBQVU7SUFDeENxQixnQkFBZ0IsQ0FBQ0MsSUFBSSxDQUFDRSxRQUFRLEdBQUcsQ0FDakM7TUFDQ0MsSUFBSSxFQUFFLE1BQU07TUFDWkMsS0FBSyxFQUFFLFVBQVU7TUFDakJKLElBQUksRUFBRXJCLFlBQVk7TUFDbEIwQixXQUFXLEVBQUU7SUFDZCxDQUFDLEVBQ0Q7TUFDQ0YsSUFBSSxFQUFFLEtBQUs7TUFDWEMsS0FBSyxFQUFFLFVBQVU7TUFDakJKLElBQUksRUFBRXJCLFlBQVk7TUFDbEIwQixXQUFXLEVBQUUsQ0FBQztNQUNkQyxlQUFlLEVBQUVwQixTQUFTO01BQzFCcUIsb0JBQW9CLEVBQUVwQjtJQUN2QixDQUFDLENBQ0QsRUFDQVksZ0JBQWdCLENBQUNTLE1BQU0sQ0FBQyxDQUFDO0VBQzNCLENBQUMsQ0FBQztBQUNILENBQUMsQ0FBQztBQUNGL0QsS0FBSyxDQUFDQyxJQUFJLENBQUMrRCxNQUFNLENBQUNDLElBQUksQ0FBQ3hDLFNBQVMsQ0FBQyxDQUFDLENBQUNrQixPQUFPLENBQUVHLEdBQUcsSUFBSztFQUNuRCxJQUFJckIsU0FBUyxDQUFDcUIsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO0lBQ3hCckIsU0FBUyxDQUFDcUIsR0FBRyxDQUFDO0lBQ2QsT0FBT3JCLFNBQVMsQ0FBQ3FCLEdBQUcsQ0FBQztFQUN0QjtBQUNELENBQUMsQ0FBQztBQUNGb0IsV0FBVyxDQUFDdkIsT0FBTyxDQUFFd0IsSUFBSSxJQUFLO0VBQzdCLElBQUlILE1BQU0sQ0FBQ0MsSUFBSSxDQUFDcEQsU0FBUyxDQUFDLENBQUNzQyxPQUFPLENBQUNnQixJQUFJLENBQUNDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO0lBQ3hEdkQsU0FBUyxDQUFDc0QsSUFBSSxDQUFDQyxRQUFRLENBQUMsR0FBRyxDQUFDO0VBQzdCLENBQUMsTUFBTTtJQUNOdkQsU0FBUyxDQUFDc0QsSUFBSSxDQUFDQyxRQUFRLENBQUMsSUFBSSxDQUFDO0VBQzlCO0VBQ0ExQyxTQUFTLENBQUN5QyxJQUFJLENBQUNDLFFBQVEsQ0FBQyxJQUFJRCxJQUFJLENBQUNFLEtBQUs7RUFDdEMsSUFBSSxDQUFDdkMsWUFBWSxDQUFDcUMsSUFBSSxDQUFDQyxRQUFRLENBQUMsRUFBRTtJQUNqQ3RDLFlBQVksQ0FBQ3FDLElBQUksQ0FBQ0MsUUFBUSxDQUFDLEdBQUcsQ0FBQztFQUNoQztFQUNBcEMsUUFBUSxDQUFDa0IsSUFBSSxDQUFDaUIsSUFBSSxDQUFDRyxJQUFJLENBQUM7RUFDeEJ4QyxZQUFZLENBQUNxQyxJQUFJLENBQUNDLFFBQVEsQ0FBQyxJQUFJRyxVQUFVLENBQUNKLElBQUksQ0FBQ0ssUUFBUSxDQUFDO0VBQ3hELElBQUlMLElBQUksQ0FBQ0UsS0FBSyxHQUFHMUMsUUFBUSxDQUFDd0MsSUFBSSxDQUFDQyxRQUFRLENBQUMsRUFBRTtJQUN6Q3pDLFFBQVEsQ0FBQ3dDLElBQUksQ0FBQ0MsUUFBUSxDQUFDLEdBQUdELElBQUksQ0FBQ0UsS0FBSztFQUNyQztFQUNBLElBQUlGLElBQUksQ0FBQ0UsS0FBSyxHQUFHekMsUUFBUSxDQUFDdUMsSUFBSSxDQUFDQyxRQUFRLENBQUMsRUFBRTtJQUN6Q3hDLFFBQVEsQ0FBQ3VDLElBQUksQ0FBQ0MsUUFBUSxDQUFDLEdBQUdELElBQUksQ0FBQ0UsS0FBSztFQUNyQztFQUNBL0MsU0FBUyxDQUFDNEIsSUFBSSxDQUFDaUIsSUFBSSxDQUFDRSxLQUFLLENBQUM7RUFDMUI5QyxPQUFPLENBQUMyQixJQUFJLENBQUNpQixJQUFJLENBQUNDLFFBQVEsQ0FBQztFQUMzQnZDLFNBQVMsQ0FBQ3NDLElBQUksQ0FBQ0MsUUFBUSxDQUFDLElBQUlHLFVBQVUsQ0FBQ0osSUFBSSxDQUFDTSxPQUFPLENBQUM7RUFFcERqRCxXQUFXLENBQUMwQixJQUFJLENBQUNuQixDQUFDLENBQUM7RUFDbkJOLFNBQVMsQ0FBQzBDLElBQUksQ0FBQ0MsUUFBUSxDQUFDLEVBQUU7RUFDMUJyQyxDQUFDLEVBQUU7QUFDSixDQUFDLENBQUM7QUFDRjJDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDM0MsUUFBUSxDQUFDO0FBQ3JCLElBQUk0QyxRQUFRLEdBQUc3QyxDQUFDLEdBQUcsQ0FBQztBQUNwQm1DLFdBQVcsQ0FBQ3ZCLE9BQU8sQ0FBRXdCLElBQUksSUFBSztFQUM3QixJQUFJQSxJQUFJLENBQUNFLEtBQUssR0FBR3pDLFFBQVEsQ0FBQ3VDLElBQUksQ0FBQ0MsUUFBUSxDQUFDLEVBQUU7SUFDekN4QyxRQUFRLENBQUN1QyxJQUFJLENBQUNDLFFBQVEsQ0FBQyxHQUFHRCxJQUFJLENBQUNFLEtBQUs7RUFDckM7QUFDRCxDQUFDLENBQUM7QUFDRjlDLE9BQU8sQ0FBQ29CLE9BQU8sQ0FBQyxDQUFDRyxHQUFHLEVBQUVPLEtBQUssS0FBSztFQUMvQixJQUFJbEIsVUFBVSxDQUFDZ0IsT0FBTyxDQUFDTCxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtJQUNqQ2IsVUFBVSxDQUFDaUIsSUFBSSxDQUFDSixHQUFHLENBQUM7SUFDcEJaLFlBQVksQ0FBQ2dCLElBQUksQ0FBQzVCLFNBQVMsQ0FBQytCLEtBQUssQ0FBQyxDQUFDO0VBQ3BDO0FBQ0QsQ0FBQyxDQUFDO0FBQ0ZXLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDcEQsU0FBUyxDQUFDLENBQUM4QixPQUFPLENBQUVrQyxJQUFJLElBQUs7RUFDeENuRCxTQUFTLENBQUNtRCxJQUFJLENBQUMsSUFBSWhFLFNBQVMsQ0FBQ2dFLElBQUksQ0FBQztFQUVsQ2hELFNBQVMsQ0FBQ2dELElBQUksQ0FBQyxJQUFJaEUsU0FBUyxDQUFDZ0UsSUFBSSxDQUFDO0VBQ2xDL0MsWUFBWSxDQUFDK0MsSUFBSSxDQUFDLElBQUloRSxTQUFTLENBQUNnRSxJQUFJLENBQUM7RUFDckMsSUFBSWhFLFNBQVMsQ0FBQ2dFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtJQUN6QixPQUFPaEUsU0FBUyxDQUFDZ0UsSUFBSSxDQUFDO0lBQ3RCLE9BQU8vQyxZQUFZLENBQUMrQyxJQUFJLENBQUM7SUFDekIsT0FBT2xELFFBQVEsQ0FBQ2tELElBQUksQ0FBQztJQUNyQixPQUFPakQsUUFBUSxDQUFDaUQsSUFBSSxDQUFDO0lBQ3JCLE9BQU9uRCxTQUFTLENBQUNtRCxJQUFJLENBQUM7SUFDdEIsT0FBT3ZDLFlBQVksQ0FBQ3VDLElBQUksQ0FBQztFQUMxQjtBQUNELENBQUMsQ0FBQztBQUVGLElBQ0MvQyxZQUFZLENBQUNoQixJQUFJLElBQ2pCZ0IsWUFBWSxDQUFDZixJQUFJLElBQ2pCZSxZQUFZLENBQUNkLENBQUMsSUFDZGMsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUNuQkEsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUNsQkEsWUFBWSxDQUFDVixNQUFNLElBQ25CVSxZQUFZLENBQUNYLEdBQUcsSUFDaEJXLFlBQVksQ0FBQ2IsVUFBVSxFQUN0QjtFQUNEK0MsTUFBTSxDQUFDQyxJQUFJLENBQUM1QixTQUFTLENBQUMsQ0FBQ00sT0FBTyxDQUFDLENBQUNHLEdBQUcsRUFBRWYsQ0FBQyxLQUFLO0lBQzFDM0IsT0FBTyxDQUFDMkIsQ0FBQyxDQUFDLENBQUNpQixXQUFXLEdBQUdGLEdBQUc7SUFDNUJ6QyxPQUFPLENBQUMwQixDQUFDLENBQUMsQ0FBQytDLEtBQUssQ0FBQ0MsTUFBTSxHQUFHMUMsU0FBUyxDQUFDUyxHQUFHLENBQUM7SUFDeEMsSUFBSWhCLFlBQVksQ0FBQ2dCLEdBQUcsQ0FBQyxFQUFFO01BQ3RCekMsT0FBTyxDQUFDMEIsQ0FBQyxDQUFDLENBQUNpRCxZQUFZLENBQUMsa0JBQWtCLEVBQUVsRCxZQUFZLENBQUNnQixHQUFHLENBQUMsR0FBRyxNQUFNLENBQUM7SUFDeEUsQ0FBQyxNQUFNO01BQ056QyxPQUFPLENBQUMwQixDQUFDLENBQUMsQ0FBQytDLEtBQUssR0FBRywyQkFBMkI7SUFDL0M7SUFDQXhFLE9BQU8sQ0FBQ3lCLENBQUMsQ0FBQyxDQUFDaUIsV0FBVyxHQUFHLENBQUNpQyxJQUFJLENBQUNDLEtBQUssQ0FBQ3BELFlBQVksQ0FBQ2dCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFcUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7RUFDbkYsQ0FBQyxDQUFDO0FBQ0g7QUFDQWxELFVBQVUsQ0FBQ1UsT0FBTyxDQUFFRyxHQUFHLElBQUs7RUFDM0JMLFNBQVMsQ0FBQ1MsSUFBSSxDQUFDYixTQUFTLENBQUNTLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztFQUNyQ0osZUFBZSxDQUFDUSxJQUFJLENBQUNiLFNBQVMsQ0FBQ1MsR0FBRyxDQUFDLENBQUM7QUFDckMsQ0FBQyxDQUFDO0FBQ0ZrQixNQUFNLENBQUNDLElBQUksQ0FBQ3BELFNBQVMsQ0FBQyxDQUFDOEIsT0FBTyxDQUFFRyxHQUFHLElBQUs7RUFDdkNQLE1BQU0sQ0FBQ1csSUFBSSxDQUFDYixTQUFTLENBQUNTLEdBQUcsQ0FBQyxDQUFDO0VBQzNCTixZQUFZLENBQUNVLElBQUksQ0FBQ2IsU0FBUyxDQUFDUyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDekMsQ0FBQyxDQUFDO0FBRUYsSUFBSVEsZ0JBQWdCLEdBQUcsSUFBSThCLEtBQUssQ0FBQzNFLFVBQVUsRUFBRTtFQUM1QzhDLElBQUksRUFBRTtJQUNMQyxNQUFNLEVBQUV2QixVQUFVO0lBQ2xCd0IsUUFBUSxFQUFFLENBQ1Q7TUFDQ0MsSUFBSSxFQUFFLE1BQU07TUFDWkMsS0FBSyxFQUFFLFVBQVU7TUFDakJKLElBQUksRUFBRSxJQUFJLENBQUM4QixNQUFNLENBQUNULFFBQVEsQ0FBQyxDQUFDVSxLQUFLLENBQUMsR0FBRyxFQUFFVixRQUFRLENBQUM7TUFDaERoQixXQUFXLEVBQUU7SUFDZCxDQUFDLEVBQ0Q7TUFDQ0YsSUFBSSxFQUFFLEtBQUs7TUFDWEMsS0FBSyxFQUFFLFVBQVU7TUFDakJKLElBQUksRUFBRSxFQUFFO01BQ1JLLFdBQVcsRUFBRSxDQUFDO01BQ2RDLGVBQWUsRUFBRXBCLFNBQVM7TUFDMUJxQixvQkFBb0IsRUFBRXBCO0lBQ3ZCLENBQUM7RUFFSCxDQUFDO0VBQ0Q2QyxPQUFPLEVBQUU7SUFDUkMsVUFBVSxFQUFFLElBQUk7SUFDaEJDLFFBQVEsRUFBRTtNQUNUQyxLQUFLLEVBQUU7UUFDTkMsTUFBTSxFQUFFLENBQUM7UUFDVEMsV0FBVyxFQUFFLENBQUM7UUFDZEMsZ0JBQWdCLEVBQUUsQ0FBQztRQUNuQkMsb0JBQW9CLEVBQUUsU0FBUztRQUMvQkMseUJBQXlCLEVBQUUsU0FBUztRQUNwQ0MsSUFBSSxFQUFFLElBQUk7UUFDVkMscUJBQXFCLEVBQUU7TUFDeEIsQ0FBQztNQUNEQyxJQUFJLEVBQUU7UUFDTEMsV0FBVyxFQUFFLENBQUM7UUFDZEMsT0FBTyxFQUFFLEdBQUc7UUFDWkMsV0FBVyxFQUFFO01BQ2Q7SUFDRCxDQUFDO0lBQ0RDLE9BQU8sRUFBRTtNQUNSQyxNQUFNLEVBQUU7UUFDUEMsT0FBTyxFQUFFO01BQ1YsQ0FBQztNQUNEQyxLQUFLLEVBQUU7UUFDTkQsT0FBTyxFQUFFLElBQUk7UUFDYkUsSUFBSSxFQUNIQyxZQUFZLENBQUNDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLE1BQU0sR0FDN0MsMENBQTBDLEdBQzFDLDRDQUE0QztRQUNoREMsSUFBSSxFQUFFO1VBQ0xDLElBQUksRUFBRTtRQUNQO01BQ0Q7SUFDRCxDQUFDO0lBQ0RDLFdBQVcsRUFBRTtNQUNaQyxTQUFTLEVBQUU7SUFDWixDQUFDO0lBQ0RDLE1BQU0sRUFBRTtNQUNQQyxDQUFDLEVBQUU7UUFDRkMsV0FBVyxFQUFFO01BQ2QsQ0FBQztNQUVEQyxDQUFDLEVBQUU7UUFDRlosT0FBTyxFQUFFLElBQUk7UUFDYkMsS0FBSyxFQUFFO1VBQ05ELE9BQU8sRUFBRTtRQUNWO01BQ0Q7SUFDRDtFQUNEO0FBQ0QsQ0FBQyxDQUFDO0FBQ0YsSUFBSWEsY0FBYyxHQUFHLElBQUlqQyxLQUFLLENBQUM3RSxRQUFRLEVBQUU7RUFDeENtRCxJQUFJLEVBQUUsVUFBVTtFQUNoQkgsSUFBSSxFQUFFO0lBQ0xDLE1BQU0sRUFBRVEsTUFBTSxDQUFDQyxJQUFJLENBQUNwRCxTQUFTLENBQUM7SUFDOUI0QyxRQUFRLEVBQUUsQ0FDVDtNQUNDRSxLQUFLLEVBQUUsb0JBQW9CO01BQzNCSixJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO01BQzlCSyxXQUFXLEVBQUUsRUFBRTtNQUNmdUMsV0FBVyxFQUFFLENBQUM7TUFDZG1CLElBQUksRUFBRSxDQUFDO01BQ1B6RCxlQUFlLEVBQUV0QjtNQUNqQjtJQUNELENBQUM7RUFFSCxDQUFDO0VBQ0RnRCxPQUFPLEVBQUU7SUFDUmdDLE1BQU0sRUFBRSxDQUFDO0lBQ1RDLE1BQU0sRUFBRTtNQUNQQyxPQUFPLEVBQUU7SUFDVixDQUFDO0lBQ0RqQyxVQUFVLEVBQUUsSUFBSTtJQUNoQmMsT0FBTyxFQUFFO01BQ1JDLE1BQU0sRUFBRTtRQUNQbUIsUUFBUSxFQUFFO01BQ1gsQ0FBQztNQUNEakIsS0FBSyxFQUFFO1FBQ05ELE9BQU8sRUFBRSxJQUFJO1FBQ2JFLElBQUksRUFBRSxzQkFBc0I7UUFDNUJHLElBQUksRUFBRTtVQUNMQyxJQUFJLEVBQUU7UUFDUDtNQUNEO0lBQ0Q7RUFDRDtBQUNELENBQUMsQ0FBQztBQUNGLElBQUlhLGVBQWUsR0FBRyxJQUFJdkMsS0FBSyxDQUFDMUUsWUFBWSxFQUFFO0VBQzdDZ0QsSUFBSSxFQUFFLEtBQUs7RUFDWEgsSUFBSSxFQUFFO0lBQ0xDLE1BQU0sRUFBRVEsTUFBTSxDQUFDQyxJQUFJLENBQUN2QyxTQUFTLENBQUM7SUFDOUIrQixRQUFRLEVBQUUsQ0FDVDtNQUNDSSxlQUFlLEVBQUVHLE1BQU0sQ0FBQzRELE1BQU0sQ0FBQ3ZGLFNBQVMsQ0FBQztNQUN6Q3NCLEtBQUssRUFBRSx1QkFBdUI7TUFDOUJKLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7TUFDOUJLLFdBQVcsRUFBRSxDQUFDO01BQ2R1QyxXQUFXLEVBQUUsQ0FBQztNQUNkbUIsSUFBSSxFQUFFO0lBQ1AsQ0FBQyxFQUNEO01BQ0N6RCxlQUFlLEVBQUU3RCxLQUFLLENBQUNDLElBQUksQ0FBQytELE1BQU0sQ0FBQzRELE1BQU0sQ0FBQ3ZGLFNBQVMsQ0FBQyxDQUFDLENBQUN3RixHQUFHLENBQUVDLEtBQUssSUFBSztRQUNwRSxPQUFRQSxLQUFLLElBQUksSUFBSTtNQUN0QixDQUFDLENBQUM7TUFDRm5FLEtBQUssRUFBRSxrQkFBa0I7TUFDekJKLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7TUFDOUJLLFdBQVcsRUFBRSxDQUFDO01BQ2R1QyxXQUFXLEVBQUUsQ0FBQztNQUNkbUIsSUFBSSxFQUFFO0lBQ1AsQ0FBQyxFQUNEO01BQ0N6RCxlQUFlLEVBQUU3RCxLQUFLLENBQUNDLElBQUksQ0FBQytELE1BQU0sQ0FBQzRELE1BQU0sQ0FBQ3ZGLFNBQVMsQ0FBQyxDQUFDLENBQUN3RixHQUFHLENBQUVDLEtBQUssSUFBSztRQUNwRSxPQUFRQSxLQUFLLElBQUksSUFBSTtNQUN0QixDQUFDLENBQUM7TUFDRm5FLEtBQUssRUFBRSxzQkFBc0I7TUFDN0I7TUFDQUMsV0FBVyxFQUFFLENBQUM7TUFDZHVDLFdBQVcsRUFBRSxDQUFDO01BQ2RtQixJQUFJLEVBQUU7SUFDUCxDQUFDO0VBRUgsQ0FBQztFQUNEL0IsT0FBTyxFQUFFO0lBQ1JDLFVBQVUsRUFBRSxJQUFJO0lBQ2hCYyxPQUFPLEVBQUU7TUFDUkMsTUFBTSxFQUFFO1FBQ1BtQixRQUFRLEVBQUU7TUFDWCxDQUFDO01BQ0RqQixLQUFLLEVBQUU7UUFDTkQsT0FBTyxFQUFFLElBQUk7UUFDYkUsSUFBSSxFQUNIQyxZQUFZLENBQUNDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLE1BQU0sR0FDN0MsMEJBQTBCLEdBQzFCLDRCQUE0QjtRQUNoQ0MsSUFBSSxFQUFFO1VBQ0xDLElBQUksRUFBRTtRQUNQO01BQ0Q7SUFDRDtFQUNEO0FBQ0QsQ0FBQyxDQUFDO0FBQ0YsSUFBSWlCLG1CQUFtQixHQUFHLElBQUkzQyxLQUFLLENBQUN6RSxhQUFhLEVBQUU7RUFDbEQrQyxJQUFJLEVBQUUsV0FBVztFQUNqQkgsSUFBSSxFQUFFO0lBQ0xDLE1BQU0sRUFBRVEsTUFBTSxDQUFDQyxJQUFJLENBQUNuQyxZQUFZLENBQUM7SUFDakMyQixRQUFRLEVBQUUsQ0FDVDtNQUNDRSxLQUFLLEVBQUUsVUFBVTtNQUNqQkosSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7TUFDakM7TUFDQTtNQUNBNEMsV0FBVyxFQUFFLENBQUM7TUFDZDZCLGdCQUFnQixFQUFFLE9BQU87TUFDekIzQixXQUFXLEVBQUUsT0FBTztNQUNwQmlCLElBQUksRUFBRSxDQUFDO01BQ1B6RCxlQUFlLEVBQUV0QixNQUFNO01BQ3ZCdUIsb0JBQW9CLEVBQUV0QjtJQUN2QixDQUFDO0VBRUgsQ0FBQztFQUNEK0MsT0FBTyxFQUFFO0lBQ1JDLFVBQVUsRUFBRSxJQUFJO0lBQ2hCeUIsTUFBTSxFQUFFO01BQ1BnQixDQUFDLEVBQUU7UUFBRXpCLE9BQU8sRUFBRTtNQUFNO0lBQ3JCLENBQUM7SUFDREYsT0FBTyxFQUFFO01BQ1JDLE1BQU0sRUFBRTtRQUNQbUIsUUFBUSxFQUFFO01BQ1gsQ0FBQztNQUNEakIsS0FBSyxFQUFFO1FBQ05ELE9BQU8sRUFBRSxJQUFJO1FBQ2JFLElBQUksRUFBRSwwQkFBMEI7UUFDaENHLElBQUksRUFBRTtVQUNMQyxJQUFJLEVBQUU7UUFDUDtNQUNEO0lBQ0Q7RUFDRDtBQUNELENBQUMsQ0FBQztBQUVGLElBQUlvQixtQkFBbUIsR0FBRyxJQUFJOUMsS0FBSyxDQUFDeEUsYUFBYSxFQUFFO0VBQ2xEMkMsSUFBSSxFQUFFO0lBQ0xDLE1BQU0sRUFBRVEsTUFBTSxDQUFDQyxJQUFJLENBQUNwRCxTQUFTLENBQUM7SUFDOUI0QyxRQUFRLEVBQUUsQ0FDVDtNQUNDQyxJQUFJLEVBQUUsS0FBSztNQUNYQyxLQUFLLEVBQUUsdUJBQXVCO01BQzlCSixJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO01BQzlCSyxXQUFXLEVBQUUsQ0FBQztNQUNkQyxlQUFlLEVBQUVHLE1BQU0sQ0FBQzRELE1BQU0sQ0FBQ3ZGLFNBQVMsQ0FBQztNQUN6Q3lCLG9CQUFvQixFQUFFRSxNQUFNLENBQUM0RCxNQUFNLENBQUN2RixTQUFTLENBQUMsQ0FBQ3dGLEdBQUcsQ0FBRUMsS0FBSyxJQUFLO1FBQzdELE9BQU9BLEtBQUssR0FBRyxJQUFJO01BQ3BCLENBQUM7SUFDRixDQUFDO0VBRUgsQ0FBQztFQUNEdkMsT0FBTyxFQUFFO0lBQ1I0QyxTQUFTLEVBQUUsR0FBRztJQUNkM0MsVUFBVSxFQUFFLElBQUk7SUFDaEJjLE9BQU8sRUFBRTtNQUNSQyxNQUFNLEVBQUU7UUFDUEMsT0FBTyxFQUFFO01BQ1YsQ0FBQztNQUNEQyxLQUFLLEVBQUU7UUFDTkQsT0FBTyxFQUFFLElBQUk7UUFDYkUsSUFBSSxFQUFFLGlDQUFpQztRQUN2Q0csSUFBSSxFQUFFO1VBQ0xDLElBQUksRUFBRTtRQUNQO01BQ0Q7SUFDRCxDQUFDO0lBQ0RDLFdBQVcsRUFBRTtNQUNaQyxTQUFTLEVBQUU7SUFDWixDQUFDO0lBQ0RDLE1BQU0sRUFBRTtNQUNQQyxDQUFDLEVBQUU7UUFDRkMsV0FBVyxFQUFFO01BQ2QsQ0FBQztNQUVEQyxDQUFDLEVBQUU7UUFDRlosT0FBTyxFQUFFLEtBQUs7UUFDZEMsS0FBSyxFQUFFO1VBQ05ELE9BQU8sRUFBRTtRQUNWO01BQ0Q7SUFDRDtFQUNEO0FBQ0QsQ0FBQyxDQUFDOztBQUVGIiwiaWdub3JlTGlzdCI6W119
