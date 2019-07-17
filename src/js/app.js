import getGeoPosition from './getGeoPosition';
import fetchWeather from './fetchWeather';
import PNotify from 'pnotify/dist/es/PNotify.js';
import PNotifyStyleMaterial from 'pnotify/dist/es/PNotifyStyleMaterial.js';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons.js';
import 'pnotify/dist/PNotifyBrightTheme.css';
import 'material-design-icons/iconfont/material-icons.css';

const weatherDetails = document.getElementById('weather');
const location = document.querySelector("[data-field='location']");
const temp = document.querySelector("[data-field='temp']");
const humidity = document.querySelector("[data-field='humidity']");
const wind = document.querySelector("[data-field='wind']");
const conditions = document.querySelector("[data-field='conditions']");
const image = document.querySelector('img.icon');
const searchForm = document.getElementById('search-form');

PNotify.defaults.styling = 'material';
PNotify.defaults.icons = 'material';

getGeoPosition()
  .then(location => {
    fetchWeather(location.coords)
      .then(res => res.json())
      .then(loc => {
        displayWeather(loc);
        showWeatherCard();
      });
  })
  .catch(error => {
    PNotify.error({
      title: 'Error',
      text: `${error.message}`,
    });
  });

searchForm.addEventListener('submit', handleSubmitForm);

function handleSubmitForm(event) {
  event.preventDefault();
  const cityValue = event.target.elements.city.value;
  fetchWeather(cityValue)
    .then(res => {
      return res.json();
    })
    .then(loc => {
      if (loc.error) {
        throw new Error(loc.error.message);
      }
      showWeatherCard();
      displayWeather(loc);
    })
    .catch(error => {
      PNotify.error({
        title: 'Error',
        text: `${error.message}`,
      });
    });
}

function displayWeather(obj) {
  image.src = `https:${obj.current.condition.icon}`;
  location.textContent = obj.location.name;
  temp.textContent = obj.current.temp_c + ' C';
  humidity.textContent = obj.current.humidity + '%';
  wind.textContent = obj.current.wind_kph + 'kph';
  conditions.textContent = obj.current.condition.text;
}

function showWeatherCard() {
  weatherDetails.classList.remove('is-hidden');
}

function hideWeatherCard() {
  weatherDetails.classList.add('is-hidden');
}
