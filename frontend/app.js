// Load everything when page starts
window.addEventListener("load", () => {
  loadWeather();
  loadJoke();
  loadCat();
});

async function loadWeather() {
  try {
    const res = await fetch("/api/weather");
    const data = await res.json();

    document.getElementById("weather").innerHTML = `
            <p>🌡 Temperature: <strong>${data.temperature}°C</strong></p>
        `;
  } catch (err) {
    document.getElementById("weather").innerText = "Failed to load weather";
    console.error(err);
  }
}

async function loadJoke() {
  try {
    const res = await fetch("/api/joke");
    const data = await res.json();

    document.getElementById("joke").innerHTML = `
            <p><strong>${data.setup}</strong></p>
            <p>👉 ${data.punchline}</p>
        `;
  } catch (err) {
    document.getElementById("joke").innerText = "Failed to load joke";
    console.error(err);
  }
}

async function loadCat() {
  try {
    const res = await fetch("/api/cat");
    const data = await res.json();

    document.getElementById("cat").innerHTML = `
            <img src="${data.url}" alt="Random Cat" width="250" style="border-radius:10px;">
        `;
  } catch (err) {
    document.getElementById("cat").innerText = "Failed to load cat";
    console.error(err);
  }
}
