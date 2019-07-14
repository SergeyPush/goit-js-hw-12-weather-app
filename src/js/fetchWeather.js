const key = 'f3ec9826f1d149aea8664106191107';

const request =
  'http://api.apixu.com/v1/current.json?key=f3ec9826f1d149aea8664106191107&q=';
const baseURL = 'http://api.apixu.com/v1/current.json';

export default function(position, city = null) {
  const { latitude, longitude } = position;
  queryString = city ? city : [latitude, longitude].join(',');

  fetch(`${baseURL}?key=${key}&q=${latitude}, ${longitude}`).then(res => {
    console.log(res.json());
  });
}
