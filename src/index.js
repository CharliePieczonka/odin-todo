import "./styles.css";
import { project } from "./project.js";
import { task } from "./task.js";
import addImage from "./images/add.svg";

let allProjects = [];

let project1 = new project("Default Project", "This is the default project present when the user first runs the app.");
let task1 = new task("Initial Setup", "Initialize Webpack and create the required starting files", "1/17/2025", 1);
let task2 = new task("Create Project Class", "Create project.js and a project class", "1/17/2025", 1);

project1.addTask(task1);
project1.addTask(task2);
allProjects.push(project1);

console.log(project1);

let displayController = (function () {
    let currentProj;
    let projectDialog = document.querySelector("#project-dialog");
    let taskDialog =  document.querySelector("#task-dialog");

    // create the project elements for the all projects page and add them to the DOM
    let displayAllProjects = () => {
        let projectCount = 0;

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
            proj.id = projectCount;
            projectCount++;

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

            let projectButtons = document.createElement("div");
            projectButtons.setAttribute("class", "project-buttons");

            let openProject = document.createElement("button");
            openProject.setAttribute("class", "project-open");
            openProject.setAttribute("projID", proj.id);
            openProject.textContent = "open";

            // event listener for the open button on each project card
            openProject.addEventListener("click", () => {
                displayProject(proj);
            });

            let deleteProjectBtn = document.createElement("button");
            deleteProjectBtn.setAttribute("class", "project-delete");
            deleteProjectBtn.setAttribute("projID", proj.id);
            deleteProjectBtn.textContent = "delete";

            // event listener to delete a project
            deleteProjectBtn.addEventListener("click", () => {
                deleteProject(proj.id);
            });


            textDiv.appendChild(projectTitle);
            textDiv.appendChild(projectDesc);
            projectDiv.appendChild(textDiv);

            projectButtons.appendChild(openProject);
            projectButtons.appendChild(deleteProjectBtn);

            projectDiv.appendChild(projectButtons);
            content.appendChild(projectDiv);

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
        let taskCount = 0;
        currentProj= proj;

        let content = document.querySelector(".content-container");
        content.innerHTML = "";
        content.style.flexDirection = "column";

        let subTitle = document.querySelector("#sub-title");
        subTitle.textContent = proj.title + " Tasks";

        let mainHeader = document.querySelector(".main-header");

        // if a new task is added don't add a new back button. only add if switching from all projects to a project page
        let backButton = document.querySelector(".back-button");
        if(backButton === null) {
            backButton = document.createElement("p");
            backButton.setAttribute("class", "back-button");
            backButton.textContent = "< back";

            backButton.addEventListener("click", () => {
                displayAllProjects();
            });

            mainHeader.insertBefore(backButton, subTitle);
        }

        proj.tasks.forEach(task => {
            task.id = taskCount;
            taskCount++;

            let taskDiv = document.createElement("div");
            taskDiv.setAttribute("class", "task");

            let headerDiv = document.createElement("div");
            headerDiv.setAttribute("class", "task-header");

            let headerLeft = document.createElement("div");
            headerLeft.setAttribute("class", "task-header-left");

            let checkBox = document.createElement("input");
            checkBox.setAttribute("type", "checkbox");
            checkBox.setAttribute("class", "task-completed");

            // event listener for completing a task 
            checkBox.addEventListener("change", () => {
                toggleCompletion(checkBox.checked, task.id);
            });

            let taskTitle = document.createElement("p");
            taskTitle.setAttribute("class", "task-title");
            taskTitle.textContent = task.title;

            let infoDiv = document.createElement("div");
            infoDiv.setAttribute("class", "task-info");

            let taskDue = document.createElement("p");
            taskDue.setAttribute("class", "task-duedate");
            taskDue.textContent = "Due: " + task.dueDate;

            let taskPriority = document.createElement("p");
            taskPriority.setAttribute("class", "task-priority");
            taskPriority.textContent = "Priority: " + task.priority;

            let taskDesc = document.createElement("p");
            taskDesc.setAttribute("class", "task-description");
            taskDesc.textContent = task.description;

            let buttonsDiv = document.createElement("div");
            buttonsDiv.setAttribute("class", "task-buttons");

            // TODO: implement edit task button
            // let editButton = document.createElement("button");
            // editButton.setAttribute("class", "task-edit");
            // editButton.setAttribute("class", "task-button");
            // editButton.setAttribute("projID", task.id);
            // editButton.textContent = "edit";

            let deleteTaskBtn = document.createElement("button");
            deleteTaskBtn.setAttribute("class", "task-delete");
            deleteTaskBtn.setAttribute("class", "task-button");
            deleteTaskBtn.setAttribute("projID", task.id);
            deleteTaskBtn.textContent = "delete";

            // event listener for deleting a task
            deleteTaskBtn.addEventListener("click", () => {
                deleteTask(task.id);
            });

            headerLeft.appendChild(checkBox);
            headerLeft.appendChild(taskTitle);

            infoDiv.appendChild(taskDue);
            infoDiv.appendChild(taskPriority);

            headerDiv.appendChild(headerLeft);
            headerDiv.appendChild(infoDiv);

            //buttonsDiv.appendChild(editButton);
            buttonsDiv.appendChild(deleteTaskBtn);

            taskDiv.appendChild(headerDiv);
            taskDiv.appendChild(taskDesc);
            taskDiv.appendChild(buttonsDiv);
            content.appendChild(taskDiv);
        });

        let newTaskDiv = document.createElement("div");
        newTaskDiv.setAttribute("class", "task new-task");
        let newImg = document.createElement("img");
        newImg.setAttribute("class", "task-add");
        newImg.src = addImage;
        newImg.alt = "New Project";

        // when new task is clicked, open the new task dialog
        newTaskDiv.addEventListener("click", () => {
            taskDialog.showModal();
        });

        newTaskDiv.appendChild(newImg);
        content.appendChild(newTaskDiv);
    }

    let deleteProject = (projectID) => {
        allProjects.splice(projectID, 1);
        displayAllProjects();
    }

    let deleteTask = (taskID) => {
        currentProj.tasks.splice(taskID, 1);
        displayProject(currentProj);
    }

    let toggleCompletion = (toggleValue, taskID) => {
        let task = document.querySelectorAll(".task")[taskID];

        //TODO: Strikethrough the text on the task
        // let taskTitle = task.querySelector("task-title");
        // let taskDue = task.querySelector("task-duedate");
        // let taskPriority = task.querySelector("task-priority");
        // let taskDesc = task.querySelector("task-description");

        if(toggleValue) {
            task.style.backgroundColor = "lightgrey";
        }
        else {
            task.style.backgroundColor = "white";
        }
       
    }

    // setup new project dialog functionality
    let confirmProject = document.querySelector("#project-submit");

    confirmProject.addEventListener("click", (event) => {
        event.preventDefault(); // We don't want to submit this fake form

        let newTitle = document.querySelector("#project-title");
        let newDesc = document.querySelector("#project-desc");

        let newProj = new project(newTitle.value, newDesc.value);
        allProjects.push(newProj);

        newTitle.value = "";
        newDesc.value = "";
        
        projectDialog.close();
        displayAllProjects();
    });

    // setup new task dialog functionality
    let confirmTask = document.querySelector("#task-submit");

    confirmTask.addEventListener("click", (event) => {
        event.preventDefault(); // We don't want to submit this fake form

        let newTitle = document.querySelector("#task-title");
        let newDesc = document.querySelector("#task-desc");
        let newDueDate = document.querySelector("#dueDate");
        let newPriority = document.querySelector("#priority");

        let newTask = new task(newTitle.value, newDesc.value, newDueDate.valueAsDate.toLocaleDateString("en-US"), newPriority.value);
        currentProj.tasks.push(newTask);

        newTitle.value = "";
        newDesc.value = "";
        newPriority.value = "1";
        newDueDate.value = "";

        
        taskDialog.close();
        displayProject(currentProj);
    });


    return { displayAllProjects }
})();


displayController.displayAllProjects();