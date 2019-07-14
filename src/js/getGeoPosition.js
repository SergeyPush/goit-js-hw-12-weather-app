const getGeoPosition = () => {
  const options = {
    timeout: 5000,
    maximumAge: 30,
  };
  return new Promise((resolve, reject, options) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

export default getGeoPosition;
