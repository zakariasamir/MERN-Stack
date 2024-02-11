const http = require("http");
const url = require("url");

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

async function fetchData(name, lat, lng) {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`
    );
    if (!response.ok) {
      throw new Error('Weather API request failed');
    }
    const data = await response.json();
    return `Current Temperature In ${name}: ${data.current_weather.temperature}${data.current_weather_units.temperature}`;
  } catch (error) {
    throw new Error(`Error fetching data for ${name}: ${error.message}`);
  }
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const query = parsedUrl.query;
  if (path === "/users") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("I am a list of users");
  } else if (path === "/products") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("I am a list of products :p");
  } else if (path === "/weather") {
    if (query.city) {
      const city = cities.find((cityObj) => cityObj.name === query.city);
      if (city) {
        const { name, lat, lng } = city;
        fetchData(name, lat, lng)
          .then((result) => {
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end(result);
          })
          .catch((error) => {
            console.error(error);
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Internal Server Error");
          });
      } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("City not found");
      }
    } else {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("City parameter is missing");
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
