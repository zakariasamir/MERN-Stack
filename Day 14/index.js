const fs = require("fs");
const cities = [
  { name: "New York", lat: 40.7128, lng: -74.006 },
  { name: "London", lat: 51.5074, lng: -0.1278 },
  { name: "Paris", lat: 48.8566, lng: 2.3522 },
  { name: "Tokyo", lat: 35.6895, lng: 139.6917 },
  { name: "Sydney", lat: -33.8651, lng: 151.2099 },
  { name: "Rome", lat: 41.9028, lng: 12.4964 },
  { name: "Cairo", lat: 30.0444, lng: 31.2357 },
  { name: "Rio de Janeiro", lat: -22.9068, lng: -43.1729 },
  { name: "Dubai", lat: 25.2048, lng: 55.2708 },
  { name: "Rabat", lat: 34.0209, lng: -6.8416 },
];
function getCity() {
  try {
    let cityData = fs.readFileSync("input.txt", "utf8");
    let cityName = cityData.toString();
    const City = cities.filter((cityObj) => cityObj.name === cityName)[0];
    return City;
  } catch (error) {
    console.error("Error reading the file", error);
  }
}
async function fetchData() {
  try {
    const { name, lat, lng } = await getCity();
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`
    );
    const data = await response.json();
    return `Current Temperature In :${name} ${data.current_weather.temperature} ${data.current_weather_units.temperature}`;
  } catch (error) {
    console.error("Error while fetching the API", error);
  }
}

async function writeCityTemperature() {
  fs.unlink('cityname.txt', (err) => {
    if (err) {
      console.error('Error deleting file:', err);
    }
  });
  fs.writeFileSync("cityname.txt",await fetchData());
  try {
    
    console.log('File created successfully')
  } catch (error) {
    console.error("Error while creating the file");
  }
}
writeCityTemperature();
