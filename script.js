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
// ===============================

const apiKey = "834070fbe6719ef6840e685e76644473";
const cityInput = document.getElementById("cityInput");
const searchWeather = document.getElementById("searchWeather");

const weatherResult = document.getElementById("weatherResult");
const weatherCity = document.getElementById("weatherCity");
const weatherTemp = document.getElementById("weatherTemp");
const weatherDesc = document.getElementById("weatherDesc");
const weatherHumidity = document.getElementById("weatherHumidity");
const weatherWind = document.getElementById("weatherWind");

async function getWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        weatherCity.innerText = `${data.name}, ${data.sys.country}`;
        weatherTemp.innerText = `Temperature: ${data.main.temp}°C`;
        weatherDesc.innerText = `Condition: ${data.weather[0].description}`;
        weatherHumidity.innerText = `Humidity: ${data.main.humidity}%`;
        weatherWind.innerText = `Wind Speed: ${data.wind.speed} m/s`;

        weatherResult.classList.remove("hidden");

    } catch (error) {
        weatherResult.classList.remove("hidden");
        weatherCity.innerText = "";
        weatherTemp.innerText = "";
        weatherDesc.innerText = "City not found. Please try again.";
        weatherHumidity.innerText = "";
        weatherWind.innerText = "";
    }
}

searchWeather.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
});