class Task {
    title;
    description;
    dueDate;
    priority;
    complete;
    id;

    constructor(title, description, dueDate, priority, complete) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.complete = complete;
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