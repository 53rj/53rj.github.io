const githubUsername = "53rj";

const projectList = document.getElementById("project-list");

async function loadProjects() {
    try {
        const response = await fetch(
            `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=100`
        );

        if (!response.ok) {
            throw new Error("GitHub API konnte nicht geladen werden.");
        }

        const repositories = await response.json();

        projectList.innerHTML = "";

        repositories
            .filter(repo => !repo.fork)
            .forEach(repo => {
                const projectCard = document.createElement("article");
                projectCard.classList.add("project-card");

                projectCard.innerHTML = `
                    <div class="project-card-header">
                        <h3>${repo.name}</h3>

                        ${
                            repo.language
                                ? `<span class="project-language">${repo.language}</span>`
                                : ""
                        }
                    </div>

                    <p class="project-description">
                        ${repo.description || "Keine Beschreibung vorhanden."}
                    </p>

                    <div class="project-links">
                        <a
                            href="${repo.html_url}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="project-button"
                        >
                            Öffnen ↗
                        </a>
                    </div>
                `;

                projectList.appendChild(projectCard);
            });

    } catch (error) {
        console.error(error);

        projectList.innerHTML = `
            <p class="project-error">
                Die Projekte konnten momentan nicht geladen werden.
            </p>
        `;
    }
}

loadProjects();
