/* OpenWeather API Key */
let apiKey = 'b6992bfe8d46b31fe63099fb7a21d34d'

/* To transform kelvin to centigrade */
const KELVIN = 273.15

/* Base URL for OpenWeather API */
let urlBase = 'https://api.openweathermap.org/data/2.5/weather'

/* Get current location */
document.querySelector('#search').addEventListener('click', () => {
    let cityInput = document.querySelector('#city')
    let city = cityInput.value

    if (city) {
        fetchWeatherData(city)
        cityInput.value = ''
    }
})

async function fetchWeatherData(city) {
    try {
        let response = await fetch(`${urlBase}?q=${city}&appid=${apiKey}`)
        if (!response.ok) {
            throw new Error('Ciudad no encontrada')
        }
        const data = await response.json()
        showWeatherData(data)
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
        })
    }
}

function showWeatherData(data) {
    /* Get DOM elements */
    let forecastContainer = document.querySelector('#forecast')

    /* Get data from city */
    let city = data.name
    let temp = Math.round(data.main.temp - KELVIN)
    let weather = data.weather[0].description
    let icon = data.weather[0].icon
    let humidity = data.main.humidity
    let wind = data.wind.speed

    /* Create DOM elements */
    let card = document.createElement('div')
    card.classList.add('card', 'm-2')

    let cardBody = document.createElement('div')
    cardBody.classList.add('card-body')

    let cityName = document.createElement('h5')
    cityName.classList.add('card-title')
    cityName.textContent = city

    let tempInfo = document.createElement('p')
    tempInfo.classList.add('card-text')
    tempInfo.textContent = `Temperatura: ${temp}°C`

    let weatherInfo = document.createElement('p')
    weatherInfo.classList.add('card-text')
    weatherInfo.textContent = `Clima: ${weather}`

    let iconInfo = document.createElement('img')
    iconInfo.src = `https://openweathermap.org/img/w/${icon}.png`

    let humidityInfo = document.createElement('p')
    humidityInfo.classList.add('card-text')
    humidityInfo.textContent = `Humedad: ${humidity}%`

    let windInfo = document.createElement('p')
    windInfo.classList.add('card-text')
    windInfo.textContent = `Viento: ${wind} km/h`

    /* Delete city button */
    let deleteButton = document.createElement('button')
    deleteButton.classList.add('btn', 'btn-danger', 'mt-2')
    deleteButton.textContent = 'Borrar'
    deleteButton.onclick = function () {
        forecastContainer.removeChild(card)
        Swal.fire({
            icon: 'success',
            title: 'Ciudad eliminada',
            showConfirmButton: false,
            timer: 1500,
        })
    }

    /* Append DOM elements */
    cardBody.appendChild(cityName)
    cardBody.appendChild(tempInfo)
    cardBody.appendChild(weatherInfo)
    cardBody.appendChild(iconInfo)
    cardBody.appendChild(humidityInfo)
    cardBody.appendChild(windInfo)
    cardBody.appendChild(deleteButton)
    card.appendChild(cardBody)
    forecastContainer.appendChild(card)
}
