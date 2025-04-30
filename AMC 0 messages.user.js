// ==UserScript==
// @name             AMC 0 messages
// @match            *://amc.cloud.infor.com/*
// @version          1.0
// ==/UserScript==

let messageSpan = document.querySelector('span.message');

if(messageSpan.innerText === "0") {
   messageSpan.style.display = "none";
};