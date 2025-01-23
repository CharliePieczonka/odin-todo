import "./styles.css";
import { project } from "./project.js";
import { task } from "./task.js";

let allProjects = [];

let project1 = new project("Default Project", "This is the default project present when the user first runs the app.");
let task1 = new task("Initial Setup", "Initialize Webpack and create the required starting files", "01-17-2025", 1);
let task2 = new task("Create Project Class", "Create project.js and a project class", "01-17-2025", 1);

project1.addTask(task1);
project1.addTask(task2);
allProjects.push(project1);

console.log(project1);

project.displayAllProjects(allProjects);


let displayController = (function () {
    let projButtons = document.querySelectorAll(".project-button");

    projButtons.forEach(button => button.addEventListener("click", () => {
        allProjects[parseInt(button.getAttribute("projid"))].displayProject();
    }));
    
})();