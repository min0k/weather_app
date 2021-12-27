const img = document.querySelector("img");
const p = document.querySelector("p");
const input = document.querySelector("input");
const button = document.querySelector("button");

button.addEventListener("click", getWeather)

window.addEventListener("keypress", e => {
    if (e.key != "Enter") {
        return
    } else {
        if (input.value === "") {
            return
        } else {
            getWeather();
        }
    }
})

async function getWeather() {
  const city = input.value;

  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c8f1afebfc3103e8a12de81b55d8d114&units=metric`,
      { mode: "cors" }
    );
    const weatherData = await response.json();

    const type = weatherData.weather[0].main;
    const temp = weatherData.main.temp;

    updateWeather(type, temp, city);

  } catch (error) {
    console.log(error);
    input.value = "";
    p.textContent = "Is that a real city?";
  }
}

function updateWeather(type, temp, city) {
  p.textContent = `${city.charAt(0).toUpperCase() + city.slice(1)} is ${temp} degrees. It's ${type}!`;
  input.value = "";
}
