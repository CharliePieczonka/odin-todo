class Task {
    title;
    description;
    dueDate;
    priority;
    complete = false;
    id;

    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    isComplete() {
        return this.complete;
    }

    toggleComplete() {
        if(this.complete === true) {
            this.complete = false;
        }
        else {
            this.complete = true;
        }
    }
}

export { Task }