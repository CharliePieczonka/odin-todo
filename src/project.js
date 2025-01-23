class project {
    static projID = 0;
    title;
    description;
    id;
    tasks = [];

    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.id = project.projID;
        project.projID++;
    }

    addTask(task) {
        this.tasks.push(task);
    }

    displayProject() {
        

    }
}

export { project }