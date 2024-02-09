`use strict`;
import commandList from "./commandlist.js";
let textField = document.getElementById("textfiield__text");
localStorage.setItem("commandLanguage", `html`);
let lenguage = localStorage.getItem("commandLanguage");
let commands = commandList[lenguage];
