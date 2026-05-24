const express = require("express");
const app = express();

app.get("/weather", async (req, res) => {
  const r = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=48.2&longitude=16.3&current_weather=true",
  );
  const data = await r.json();
  res.json({ temperature: data.current_weather.temperature });
});

app.get("/joke", async (req, res) => {
  const r = await fetch("https://official-joke-api.appspot.com/random_joke");
  res.json(await r.json());
});

app.get("/cat", async (req, res) => {
  const r = await fetch("https://api.thecatapi.com/v1/images/search");
  const data = await r.json();
  res.json(data[0]);
});

app.listen(5000, () =>
  console.log("Backend running on port 5000"),
);
