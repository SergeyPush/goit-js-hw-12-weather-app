const key = 'f3ec9826f1d149aea8664106191107';

const request =
  'http://api.apixu.com/v1/current.json?key=f3ec9826f1d149aea8664106191107&q=';
const baseURL = 'http://api.apixu.com/v1/current.json';

export default function(position) {
  let queryString;
  if (typeof position === 'object') {
    const { latitude, longitude } = position;
    queryString = [latitude, longitude].join(',');
  } else {
    queryString = position;
  }

  return fetch(`${baseURL}?key=${key}&q=${queryString}`);
}
