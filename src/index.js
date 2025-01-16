import { project } from "./project.js";
import { task } from "./task.js";

let project1 = new project("To Do List Application", "The Odin Project: JavaScript Course - Todo List Project");
let task1 = new task("Initial Setup", "Initialize Webpack and create the required starting files", "01-17-2025", 1);
let task2 = new task("Create Project Class", "Create project.js and a project class", "01-17-2025", 1);

project1.addTask(task1);
project1.addTask(task2);

console.log(project1);
