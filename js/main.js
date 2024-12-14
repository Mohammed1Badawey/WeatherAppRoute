let searchInput = document.querySelector(".search-city");
let searchButton = document.querySelector(".search");
let myForm = document.querySelector(".myForm");
let div = document.querySelector(".displayD");
let searchText;
let allDataFromApi;

// Global
let date;
let dayName;
let monthName;
let dayNumber;

// today
let dateOfDay;
let todayCurrentDegree;
let todayConditionText;
let todayConditionIcon;
let todayWind_kph;
let todayWind_dir;
let todayRainChance;
let cityName;
let todayCurrentHours;

// tomorrow
let tomorrowDateObj;
let tomorrowMaxDegree;
let tomorrowMinDegree;
let tomorrowConditionText;
let tomorrowConditionIcon;

// afterTomorrow
let afterTomorrowDateObj;
let afterTomorrowMaxDegree;
let afterTomorrowMinDegree;
let afterTomorrowConditionText;
let afterTomorrowConditionIcon;

//===================
let curLocLat;
let curLocLong;

navigator.geolocation.getCurrentPosition(function (loc) {
  let curLocLat = loc.coords.latitude;
  let curLocLong = loc.coords.longitude;
  getDegree(`${curLocLat},${curLocLong}`);
});

//=======================


myForm.addEventListener("submit", function (event) {
  event.preventDefault();
  searchText = searchInput.value;
  getDegree(searchText);
});

searchInput.addEventListener("input", function (event) {
  searchText = searchInput.value;
  getDegree(searchText);
});

let daysList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let monthsList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

async function getDegree(cityLink = "cairo") {
  const api = await fetch(
    ` http://api.weatherapi.com/v1/forecast.json?key=4da445371801446f8b9155946241212&q=${cityLink}&days=3`
  );
  allDataFromApi = await api.json();
  weatherDay = allDataFromApi.forecast.forecastday;

  getTodayDate();
  setElements();
  div.innerHTML = returnCartona();
}

function setElements() {
  setElementsToday();
  setElementsTomorrow();
  setElementsAfterTomorrow();
}

function setElementsToday() {
  todayCurrentDegree = allDataFromApi.current.feelslike_c;
  todayConditionText = weatherDay[0].hour[todayCurrentHours].condition.text;
  todayConditionIcon = "http:" + allDataFromApi.current.condition.icon;
  todayWind_kph = weatherDay[0].day.maxwind_kph;
  todayWind_dir = weatherDay[0].hour[todayCurrentHours].wind_dir;
  todayRainChance = weatherDay[0].day.daily_chance_of_rain;
  cityName = allDataFromApi.location.name;
}

function setElementsTomorrow() {
  tomorrowDateObj = weatherDay[1].date;
  tomorrowDate = new Date(tomorrowDateObj);
  tomorrowDayName = daysList[tomorrowDate.getDay()];

  tomorrowMaxDegree = weatherDay[1].day.maxtemp_c;
  tomorrowMinDegree = weatherDay[1].day.mintemp_c;
  tomorrowConditionText = weatherDay[1].day.condition.text;
  tomorrowConditionIcon = "http:" + weatherDay[1].day.condition.icon;
}

function setElementsAfterTomorrow() {
  afterTomorrowDateObj = weatherDay[2].date;
  afterTomorrowDate = new Date(afterTomorrowDateObj);
  afterTomorrowDayName = daysList[afterTomorrowDate.getDay()];

  afterTomorrowMaxDegree = weatherDay[2].day.maxtemp_c;
  afterTomorrowMinDegree = weatherDay[2].day.mintemp_c;
  afterTomorrowConditionText = weatherDay[2].day.condition.text;
  afterTomorrowConditionIcon = "http:" + weatherDay[2].day.condition.icon;
}

function getTodayDate() {
  date = new Date(weatherDay[0].date);
  dayName = daysList[date.getDay()];
  monthName = monthsList[date.getMonth()];
  dayNumber = date.getDate();
  todayCurrentHours = date.getHours();
}

function returnCartona() {
  return `
            <div class="card mt-5 first" style="width: 25rem">
              <div class="card-header d-flex justify-content-between">
                <span>${dayName}</span> <span>${dayNumber} ${monthName}</span>
              </div>
              <div class="card-body">
                <h5 class="card-title p-3"> ${cityName} </h5>
                <p class="card-text fw-bolder fs-1 text-center py-3">
                ${todayCurrentDegree}
                  <sup>o</sup>
                  C
                </p>
                <div class="">
                <img src="${todayConditionIcon}" alt="" class="ps-3 w-25">
                <span class=" d-block conditionText ps-3 fs-5">${todayConditionText}</span>
                </div>
              </div>
              <div class="card-footer d-flex justify-content-between">
                <span>
                  <i class="fa-solid fa-umbrella me-2 text-info"></i>${todayRainChance} %
                </span>
                <span>
                  <i class="fa-solid fa-wind me-2 text-info"></i>${todayWind_kph}</span
                >
                <span>
                  <i class="fa-solid fa-compass me-2 text-info"></i>${todayWind_dir}</span
                >
              </div>
            </div>

            <div class="card mt-5 bg-dark" style="width: 25rem">
              <div class="card-header text-center">
                <span>${tomorrowDayName}</span>
              </div>
              <div class="card-body">
                <div class="text-center py-2">
                  <img src="${tomorrowConditionIcon}" alt="" class="">
                </div>
                <p class="card-text fw-bolder fs-1 text-center pt-1">
                  ${tomorrowMaxDegree}
                  <sup>o</sup>
                  C
                </p>
                <p class="text-center">${tomorrowMinDegree}<sup>o</sup> C</p>
                <div class="text-center">
                  <span class="text-center p-2 d-block conditionText">${tomorrowConditionText}</span>
                </div>
              </div>
            </div>

            <div class="card mt-5 end" style="width: 25rem">
              <div class="card-header text-center">
                <span>${afterTomorrowDayName}</span>
              </div>
              <div class="card-body">
                <div class="text-center py-2">
                  <img src="${afterTomorrowConditionIcon}" alt="" class="">
                </div>
                <p class="card-text fw-bolder fs-1 text-center pt-1">
                ${afterTomorrowMaxDegree}
                  <sup>o</sup>
                  C
                </p>
                <p class="text-center">${afterTomorrowMinDegree}<sup>o</sup> C</p>
                <div class="text-center">
                  <span class="text-center p-2 d-block conditionText">${afterTomorrowConditionText}</span>
                </div>
              </div>
            </div>
            `;
}

getDegree();
