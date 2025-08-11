// Part 1: Add event listener to the button
function addEventListenerToButton() {
    const button = document.querySelector('.weatherform button');
    button.addEventListener('click', handleFormSubmission);
}

// Display error message
function displayError(message) {
    const card = document.querySelector('.card');
    card.style.display = 'block';
    card.innerHTML = `<p class="error">${message}</p>`;
}

// Part 2: Handle form submission
function handleFormSubmission(event) {
    event.preventDefault();
    const cityInput = document.querySelector('.cityinput').value.trim();
    if (!cityInput) {
        displayError('Please enter a city name');
        return;
    }
    getWeatherData(cityInput);
}

// Fetch weather data from OpenWeatherMap API
async function getWeatherData(city) {
    const apiKey = '25c37ee67be670212b7f473c5fb81da5'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found or API error');
        }
        const data = await response.json();
        displayWeatherInfo(data);
    } catch (error) {
        displayError(error.message);
    }
}

// Display weather information
function displayWeatherInfo(data) {
    const card = document.querySelector('.card');
    const emoji = getWeatherEmoji(data.weather[0].main);
    card.style.display = 'block';
    card.innerHTML = `
        <h2>${data.name}</h2>
        <p>${emoji} ${data.weather[0].description}</p>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

// Get weather emoji based on weather condition
function getWeatherEmoji(weatherMain) {
    const emojis = {
        Clear: '☀️',
        Clouds: '☁️',
        Rain: '🌧️',
        Drizzle: '🌦️',
        Thunderstorm: '⛈️',
        Snow: '❄️',
        Mist: '🌫️',
        Fog: '🌫️'
    };
    return emojis[weatherMain] || '🌍';
}

// Initialize the event listener when the page loads
document.addEventListener('DOMContentLoaded', addEventListenerToButton);













