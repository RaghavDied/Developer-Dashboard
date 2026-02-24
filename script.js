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