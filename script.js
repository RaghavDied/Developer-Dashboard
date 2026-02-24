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

