// ==UserScript==
// @name             AMC Team schedule color coding
// @match            *://amc.cloud.infor.com/etm/time/timesheet/etmTnsTeam.jsp*
// @version          1.0
// ==/UserScript==

let htmlHeaderTable = document.getElementById('htmlHeaderTable');

let currentDays = document.querySelectorAll('span.calendarCurrentDay');
//let tomorrowTds = document.querySelectorAll('td.calendarCurrentDay ~ td.etmTsCell');
let notScheduled = document.querySelectorAll('td.calendarCurrentDay');

//tomorrowTds doesn't work cuz it selects ALLLLLL the tds
//console.log(tomorrowTds)
// let weekdayHeaders = document.querySelector('#teamScheduleTable > tbody > tr:first-child')

let cooks = [];
let kitchenManagers = [];
let cookTimes = [];
let kmTimes = [];

for (let i = 0; i < notScheduled.length; i++) {
  notScheduled[i].style.backgroundColor = '#555';
}
for (let i = 0; i < currentDays.length; i++) {
  currentDays[i].style.backgroundColor = '#555';
    currentDays[i].parentElement.style.backgroundColor = '#555';

  if (currentDays[i].innerText.toLowerCase().includes('cook')) {
    currentDays[i].style.backgroundColor = '#94190d';
    currentDays[i].parentElement.style.backgroundColor = '#94190d';
    currentDays[i].parentElement.parentElement.children[0].style.backgroundColor = '#94190d';
    cooks.push(currentDays[i].parentElement.parentElement)
    cookTimes.push(currentDays[i].parentElement.innerText)
  }

   if (currentDays[i].innerText.toLowerCase().includes('manager')) {
    currentDays[i].style.backgroundColor = '#222645';
    currentDays[i].parentElement.style.backgroundColor = '#222645';
    currentDays[i].parentElement.parentElement.children[0].style.backgroundColor = '#222645';
  }

  if (currentDays[i].innerText.toLowerCase().includes('kitchen manager')) {
    currentDays[i].style.backgroundColor = '#0d5194';
    currentDays[i].parentElement.style.backgroundColor = '#0d5194';
    currentDays[i].parentElement.parentElement.children[0].style.backgroundColor = '#0d5194';
    kitchenManagers.push(currentDays[i].parentElement.parentElement)
    kmTimes.push(currentDays[i].parentElement.innerText)
  }
//   if (currentDays[i].innerText.toLowerCase().includes('not scheduled')) {
//     currentDays[i].parentElement.style = 'font-weight: normal;';
//   }
}

// let newTable = document.createElement('table')
// newTable.style = `
// 	width: 98%;
// 	margin: 0 auto;`
// let newTbody = document.createElement('tbody')
// newTable.appendChild(newTbody)

// newTbody.appendChild(weekdayHeaders)

// htmlHeaderTable.appendChild(newTable)

let kmString = '<h4 class="team-label">Kitchen Managers:</h4>',
    cookString = '<h4 class="team-label">Cooks:</h4>';
for (let i = 0; i < kitchenManagers.length; i++) {
  let stringHalves = kmTimes[i].split('(')
  kmString += `
  <tr>
    <td class="new-table-cell">${kitchenManagers[i].children[0].innerText}</td>
    <td class="new-table-cell">${stringHalves[0]}</td>
  </tr>`;
}
for (let i = 0; i < cooks.length; i++) {
  let stringHalves = cookTimes[i].split('(')
  //console.log(stringHalves)
  cookString += `
  <tr>
    <td class="new-table-cell">${cooks[i].children[0].innerText}</td>
    <td class="new-table-cell">${stringHalves[0]}</td>
  </tr>`;
}

//console.log(kmString, cookString)

let kmTbody = document.createElement('tbody')
let cookTbody = document.createElement('tbody')




kmTbody.innerHTML += kmString;
cookTbody.innerHTML += cookString;



let kmTable = document.createElement('table');
kmTable.appendChild(kmTbody);
let cookTable = document.createElement('table');
cookTable.appendChild(cookTbody);

let tablesContainer = document.createElement('div');
tablesContainer.appendChild(kmTable);
tablesContainer.appendChild(cookTable);
tablesContainer.classList.add('tables-container');

let listContainer = document.createElement('div');

let listHeader = document.createElement('h2');
listHeader.innerText = "Team for today:"
listHeader.style.textDecoration = 'underline';

listContainer.appendChild(listHeader)
listContainer.appendChild(tablesContainer)


listContainer.classList.add('listContainer')

listContainer.addEventListener('click', (e) => {
  listContainer.classList.toggle('open')
});

listContainer.style = `
	font-size: 1rem;
	cursor: pointer;
  background-color: #222;
  margin: 10px;
  padding: 10px;
  width: fit-content;
  border-radius: 6px;`;

htmlHeaderTable.appendChild(listContainer)