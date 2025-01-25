class Project {
    static projID = 0;
    title;
    description;
    id;
    tasks = [];

    constructor(title, description) {
        this.title = title;
        this.description = description;
    }

    addTask(task) {
        this.tasks.push(task);
    }
}

export { Project }