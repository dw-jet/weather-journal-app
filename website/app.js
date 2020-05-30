/* Global Variables */


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

const weatherData = async (url = '') => {
  const request = await fetch(url);
  try {
    const data = await request.json();
    console.log(data);
    return data;
  }
  catch(error) {
    console.log('error', error);
  }
};

const appData = async (url = '') => {
  const request = await fetch(url);
  try {
    const data = await request.json();
    return data;
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

const constructURL = (zip) => {
  const baseURL = 'http://api.openweathermap.org/data/2.5/weather?APPID=';
  const apiKey = 'fb1948a23afb212f015f7d1655335092';
  const zipPart = '&q=' + zip;
  const units = '&units=imperial'
  return baseURL + apiKey + zipPart + units;
};

const postEntry = () => {
  const zip = document.getElementById('zip').value;
  if (!zip) return;
  const feelings = document.getElementById('feelings').value;
  weatherData(constructURL(zip))
    .then(function(data) {
      postData('/entry', {
        date: newDate,
        feelings: feelings,
        temp: data.main.temp})
    .then(showLatest())
  })
}

const clearInputsHelper = () => {
  const zip = document.getElementById('zip');
  const feelings = document.getElementById('feelings');
  zip.value = "";
  feelings.value = "";
}

const showLatest = () => {
    clearInputsHelper();
    appData('/all')
    .then(function(entries) {
      lastEntry = entries.data.pop();
      dateDiv = document.getElementById('date');
      tempDiv = document.getElementById('temp');
      contentDiv = document.getElementById('content');
      dateDiv.textContent = lastEntry.date;
      tempDiv.textContent = lastEntry.temp;
      contentDiv.textContent = lastEntry.feelings;
    })
}

document.getElementById('generate').addEventListener('click', postEntry)