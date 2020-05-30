/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?APPID=';
const apiKey = 'fb1948a23afb212f015f7d1655335092';
const zipPart = '&q=52655'
const requestURL = baseURL + apiKey + zipPart;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const weatherData = async (url = '') => {
  const request = await fetch(url);
  try {
    const data = await request.json();
    console.log(data);
  }
  catch(error) {
    console.log('error', error);
  }
};

const appData = async (url = '') => {
  const request = await fetch(url);
  try {
    const data = await request.json();
    console.log(data);
  }
  catch(error) {
    console.log("error", error);
  }
};

const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  }
  catch(error) {
    console.log('error', error);
  }
};

// weatherData(requestURL);
// appData('/all');
postData('/feeling', {feeling: "Pretty good!"});