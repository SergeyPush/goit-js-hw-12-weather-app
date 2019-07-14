import getGeoPosition from './getGeoPosition';
import fetchWeather from './fetchWeather';

getGeoPosition()
  .then(location => {
    fetchWeather(location.coords);
  })
  .catch(error => console.log(error.message));
