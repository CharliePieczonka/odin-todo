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
}

export { project }