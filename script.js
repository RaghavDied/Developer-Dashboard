const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Load saved theme
if (localStorage.getItem("theme") === "light") {
    body.classList.remove("dark");
    body.classList.add("light");
}

themeToggle.addEventListener("click", () => {
    body.classList.toggle("light");

    if (body.classList.contains("light")) {
        localStorage.setItem("theme", "light");
    } else {
        localStorage.setItem("theme", "dark");
    }
});

// ===============================
// GitHub API Integration
// ===============================

const githubUsername = "RaghavDied";
const githubProfileDiv = document.getElementById("githubProfile");
const githubReposDiv = document.getElementById("githubRepos");

async function fetchGitHubData() {
    try {
        const userResponse = await fetch(`https://api.github.com/users/${githubUsername}`);
        const userData = await userResponse.json();

        const repoResponse = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated`);
        const repoData = await repoResponse.json();

        displayGitHubProfile(userData);
        displayGitHubRepos(repoData.slice(0, 5)); // Show 5 recent repos

    } catch (error) {
        githubProfileDiv.innerHTML = "Error loading GitHub data.";
    }
}

function displayGitHubProfile(data) {
    githubProfileDiv.innerHTML = `
        <div class="github-profile">
            <img src="${data.avatar_url}" alt="Avatar" class="avatar"/>
            <h3>${data.name || data.login}</h3>
            <p>${data.bio || "No bio available"}</p>
            <div class="stats">
                <span>Repos: ${data.public_repos}</span>
                <span>Followers: ${data.followers}</span>
                <span>Following: ${data.following}</span>
            </div>
        </div>
    `;
}

function displayGitHubRepos(repos) {
    githubReposDiv.innerHTML = `
        <h4>Recent Repositories</h4>
        <ul class="repo-list">
            ${repos.map(repo => `
                <li>
                    <a href="${repo.html_url}" target="_blank">
                        ${repo.name}
                    </a>
                </li>
            `).join("")}
        </ul>
    `;
}

fetchGitHubData();


// ===============================
// Goals Tracker
// ===============================

const goalInput = document.getElementById("goalInput");
const addGoalBtn = document.getElementById("addGoalBtn");
const goalList = document.getElementById("goalList");

let goals = JSON.parse(localStorage.getItem("goals")) || [];

function saveGoals() {
    localStorage.setItem("goals", JSON.stringify(goals));
}

function renderGoals() {
    goalList.innerHTML = "";

    goals.forEach((goal, index) => {
        const li = document.createElement("li");
        li.classList.add("goal-item");

        if (goal.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span>${goal.text}</span>
            <div>
                <button class="complete-btn">✔</button>
                <button class="delete-btn">✖</button>
            </div>
        `;

        // Complete toggle
        li.querySelector(".complete-btn").addEventListener("click", () => {
            goals[index].completed = !goals[index].completed;
            saveGoals();
            renderGoals();
        });

        // Delete goal
        li.querySelector(".delete-btn").addEventListener("click", () => {
            goals.splice(index, 1);
            saveGoals();
            renderGoals();
        });

        goalList.appendChild(li);
    });
}

addGoalBtn.addEventListener("click", () => {
    const text = goalInput.value.trim();
    if (text === "") return;

    goals.push({ text, completed: false });
    goalInput.value = "";
    saveGoals();
    renderGoals();
});

renderGoals();


// ===============================
// Quote Generator (Stable Version)
// ===============================

const quoteText = document.getElementById("quoteText");
const newQuoteBtn = document.getElementById("newQuoteBtn");

const quotes = [
    { text: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" },
    { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
    { text: "Experience is the name everyone gives to their mistakes.", author: "Oscar Wilde" },
    { text: "In order to be irreplaceable, one must always be different.", author: "Coco Chanel" },
    { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
    { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
    { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
    { text: "Programs must be written for people to read.", author: "Harold Abelson" }
];

function fetchQuote() {
    quoteText.style.opacity = 0;

    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];

        quoteText.innerText = `"${randomQuote.text}" — ${randomQuote.author}`;
        quoteText.style.opacity = 1;
    }, 300);
}

if (newQuoteBtn) {
    newQuoteBtn.addEventListener("click", fetchQuote);
}

fetchQuote();



// ===============================
// Weather Widget

const apiKey = "834070fbe6719ef6840e685e76644473";

const cityInput = document.getElementById("cityInput");
const searchWeather = document.getElementById("searchWeather");

const weatherResult = document.getElementById("weatherResult");
const weatherCity = document.getElementById("weatherCity");
const weatherTemp = document.getElementById("weatherTemp");
const weatherDesc = document.getElementById("weatherDesc");
const weatherHumidity = document.getElementById("weatherHumidity");
const weatherWind = document.getElementById("weatherWind");
const weatherIcon = document.getElementById("weatherIcon");
const weatherLoading = document.getElementById("weatherLoading");

async function getWeather(city) {
    try {
        // Reset state
        weatherResult.classList.add("hidden");
        weatherResult.classList.remove("show");
        weatherLoading.classList.remove("hidden");

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        // Populate UI
        weatherCity.innerText = `${data.name}, ${data.sys.country}`;
        weatherTemp.innerText = `${Math.round(data.main.temp)}°C`;
        weatherDesc.innerText = `Condition: ${data.weather[0].description}`;
        weatherHumidity.innerText = `Humidity: ${data.main.humidity}%`;
        weatherWind.innerText = `Wind Speed: ${data.wind.speed} m/s`;

        // Weather Icon
        const iconCode = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        weatherIcon.alt = data.weather[0].description;

        // Show result with animation
        weatherLoading.classList.add("hidden");
        weatherResult.classList.remove("hidden");

        setTimeout(() => {
            weatherResult.classList.add("show");
        }, 50);

    } catch (error) {
        weatherLoading.classList.add("hidden");
        weatherResult.classList.remove("hidden");
        weatherResult.classList.add("show");

        weatherCity.innerText = "";
        weatherTemp.innerText = "";
        weatherDesc.innerText = "City not found. Please try again.";
        weatherHumidity.innerText = "";
        weatherWind.innerText = "";
        weatherIcon.src = "";
    }
}

// Button click
searchWeather.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
});

// Allow Enter key
cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city);
        }
    }
});

searchWeather.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
});


// ===============================
// Typing Animation
// ===============================

const typingText = document.getElementById("typingText");

const phrases = [
    "Hi, I'm Raghav.",
    "Web Developer.",
    "Building Clean & Interactive Web Experiences.",
    "Welcome to My Dashboard."
];

let phraseIndex = 0;
let letterIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
        typingText.innerText = currentPhrase.substring(0, letterIndex + 1);
        letterIndex++;

        if (letterIndex === currentPhrase.length) {
            setTimeout(() => isDeleting = true, 1200);
        }
    } else {
        typingText.innerText = currentPhrase.substring(0, letterIndex - 1);
        letterIndex--;

        if (letterIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }
    }

    setTimeout(typeEffect, isDeleting ? 50 : 80);
}

typeEffect();


// ===============================
// Particle Background
// ===============================

tsParticles.load("particles-js", {
    background: {
        color: {
            value: "#0f172a"
        }
    },
    particles: {
        number: {
            value: 40
        },
        color: {
            value: "#00f5ff"
        },
        links: {
            enable: true,
            color: "#0077ff",
            distance: 150,
            opacity: .5
        },
        move: {
            enable: true,
            speed: 1.5
        },
        opacity: {
            value: 0.4
        },
        size: {
            value: 2
        }
    }
});

// ===============================
// Scroll Reveal Animation
// ===============================

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
}, {
    threshold: 0.15
});

reveals.forEach(section => {
    observer.observe(section);
});
