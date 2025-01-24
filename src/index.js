import "./styles.css";
import { project } from "./project.js";
import { task } from "./task.js";
import addImage from "./images/add.svg";

let allProjects = [];

let project1 = new project("Default Project", "This is the default project present when the user first runs the app.");
let task1 = new task("Initial Setup", "Initialize Webpack and create the required starting files", "01-17-2025", 1);
let task2 = new task("Create Project Class", "Create project.js and a project class", "01-17-2025", 1);

project1.addTask(task1);
project1.addTask(task2);
allProjects.push(project1);

console.log(project1);

let displayController = (function () {
    let projectDialog = document.querySelector("#project-dialog");

    // create the project overview elements and add them to the DOM
    let displayAllProjects = () => {
        let content = document.querySelector(".content-container");
        content.innerHTML = "";
        content.style.flexDirection = "row";

        let subTitle = document.querySelector("#sub-title");
        subTitle.textContent = "All Projects";

        let mainHeader = document.querySelector(".main-header");
        let backButton = document.querySelector(".back-button");

        if(backButton !== null) {
            mainHeader.removeChild(backButton);
        }
       
        
        allProjects.forEach(proj => {
            let projectDiv = document.createElement("div");
            projectDiv.setAttribute("class", "project");

            let textDiv = document.createElement("div");
            textDiv.setAttribute("class", "project-text");

            let projectTitle = document.createElement("p");
            projectTitle.setAttribute("class", "project-title");
            projectTitle.textContent = proj.title;

            let projectDesc = document.createElement("p");
            projectDesc.setAttribute("class", "project-description");
            projectDesc.textContent = proj.description;

            let projectButton = document.createElement("button");
            projectButton.setAttribute("class", "project-button");
            projectButton.setAttribute("projID", proj.id);
            projectButton.textContent = "Open";

            textDiv.appendChild(projectTitle);
            textDiv.appendChild(projectDesc);
            projectDiv.appendChild(textDiv);
            projectDiv.appendChild(projectButton);
            content.appendChild(projectDiv);

            // event listener for the open button on each project card
            projectButton.addEventListener("click", () => {
                displayProject(proj);
            });
        });

        let newProjectDiv = document.createElement("div");
        newProjectDiv.setAttribute("class", "project new-project");
        let newImg = document.createElement("img");
        newImg.setAttribute("class", "project-add");
        newImg.src = addImage;
        newImg.alt = "New Project";

        // when new project is clicked, open the new project dialog
        newProjectDiv.addEventListener("click", () => {
            projectDialog.showModal();
        });

        newProjectDiv.appendChild(newImg);
        content.appendChild(newProjectDiv);
    }

    // create the task elements and add them to the DOM for a single project when the open button is selected
    let displayProject = (proj) => {
        let content = document.querySelector(".content-container");
        content.innerHTML = "";
        content.style.flexDirection = "column";

        let subTitle = document.querySelector("#sub-title");
        subTitle.textContent = proj.title + " Tasks";

        let backButton = document.createElement("p");
        backButton.setAttribute("class", "back-button");
        backButton.textContent = "< back";

        backButton.addEventListener("click", () => {
            displayAllProjects();
        });

        let mainHeader = document.querySelector(".main-header");
        mainHeader.insertBefore(backButton, subTitle);
        

        proj.tasks.forEach(task => {
            let taskDiv = document.createElement("div");
            taskDiv.setAttribute("class", "task");

            let headerDiv = document.createElement("div");
            headerDiv.setAttribute("class", "task-header");

            let taskTitle = document.createElement("p");
            taskTitle.setAttribute("class", "task-title");
            taskTitle.textContent = task.title;

            let infoDiv = document.createElement("div");
            infoDiv.setAttribute("class", "task-info");

            let taskDue = document.createElement("p");
            taskDue.setAttribute("class", "task-duedate");
            taskDue.textContent = task.dueDate;

            let taskPriority = document.createElement("p");
            taskPriority.setAttribute("class", "task-priority");
            taskPriority.textContent = "Priority: " + task.priority;

            let taskDesc = document.createElement("p");
            taskDesc.setAttribute("class", "task-description");
            taskDesc.textContent = task.description;

            let buttonsDiv = document.createElement("div");
            buttonsDiv.setAttribute("class", "task-buttons");

            let editButton = document.createElement("button");
            editButton.setAttribute("class", "task-edit");
            editButton.setAttribute("class", "task-button");
            editButton.setAttribute("projID", task.id);
            editButton.textContent = "edit";

            let deleteButton = document.createElement("button");
            deleteButton.setAttribute("class", "task-delete");
            deleteButton.setAttribute("class", "task-button");
            deleteButton.setAttribute("projID", task.id);
            deleteButton.textContent = "delete";

            headerDiv.appendChild(taskTitle);

            infoDiv.appendChild(taskDue);
            infoDiv.appendChild(taskPriority);
            headerDiv.appendChild(infoDiv);

            buttonsDiv.appendChild(editButton);
            buttonsDiv.appendChild(deleteButton);

            taskDiv.appendChild(headerDiv);
            taskDiv.appendChild(taskDesc);
            taskDiv.appendChild(buttonsDiv);
            content.appendChild(taskDiv);
        });

        let newTask = document.createElement("div");
        newTask.setAttribute("class", "task new-task");
        let newImg = document.createElement("img");
        newImg.setAttribute("class", "task-add");
        newImg.src = addImage;
        newImg.alt = "New Project";

        newTask.appendChild(newImg);
        content.appendChild(newTask);
    }

    // setup new project dialog functionality
    let closeButton = document.querySelector("#project-cancel");
    let confirmBtn = document.querySelector("#project-submit");

    confirmBtn.addEventListener("click", (event) => {
        event.preventDefault(); // We don't want to submit this fake form

        let newTitle = document.querySelector("#title");
        let newAuthor = document.querySelector("#desc-input");

        let newProj = new project(newTitle.value, newAuthor.value);
        allProjects.push(newProj);

        newTitle.value = "";
        newAuthor.value = "";
        
        projectDialog.close();
        displayAllProjects();
    });

    // setup new task dialog functionality

    return { displayAllProjects, displayProject }
})();


displayController.displayAllProjects();