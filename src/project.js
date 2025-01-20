import addImage from "./images/add.svg";

class project {
    title;
    description;
    tasks = [];

    constructor(title, description) {
        this.title = title;
        this.description = description;
    }

    addTask(task) {
        this.tasks.push(task);
    }

    displayProject() {
        
    }

    static displayAllProjects(projectsArray) {
        let subTitle = document.querySelector("#sub-title");
        subTitle.textContent = "All Projects";

        let content = document.querySelector(".content-container");

        projectsArray.forEach(project => {
            let projectDiv = document.createElement("div");
            projectDiv.setAttribute("class", "project");

            let textDiv = document.createElement("div");
            textDiv.setAttribute("class", "project-text");

            let projectTitle = document.createElement("div");
            projectTitle.setAttribute("class", "project-title");
            projectTitle.textContent = project.title;

            let projectDesc = document.createElement("div");
            projectDesc.setAttribute("class", "project-description");
            projectDesc.textContent = project.description;

            let projectButton = document.createElement("button");
            projectButton.setAttribute("class", "project-button");
            projectButton.textContent = "Open";

            textDiv.appendChild(projectTitle);
            textDiv.appendChild(projectDesc);
            projectDiv.appendChild(textDiv);
            projectDiv.appendChild(projectButton);
            content.appendChild(projectDiv);
        });

        let newProject = document.createElement("div");
        newProject.setAttribute("class", "project new-project");
        let newImg = document.createElement("img");
        newImg.setAttribute("id", "add");
        newImg.src = addImage;
        newImg.alt = "New Project";

        newProject.appendChild(newImg);
        content.appendChild(newProject);
    }
}

export { project }