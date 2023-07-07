let tasks = [];
let completed = [];
const todoList = document.getElementById("todo");
const completedList = document.getElementById("completed");

function update() {
    while (todoList.firstChild) {
        todoList.removeChild(todoList.firstChild);
    }

    while (completedList.firstChild) {
        completedList.removeChild(completedList.firstChild);
    }

    for (let i = 0; i < tasks.length; i++) {
        let entry = document.createElement("div");
        entry.className = "listItem";

        entry.appendChild(document.createTextNode(tasks[i]));

        let remButton = document.createElement("input");
        remButton.type = "button";
        remButton.value = "Remove";
        remButton.onclick = () => {
            tasks.splice(i, 1);
            update();
        };

        let finButton = document.createElement("input");
        finButton.type = "button";
        finButton.value = "Finished";
        finButton.onclick = () => {
            completed.push(tasks[i]);
            tasks.splice(i, 1);
            update();
        };

        entry.appendChild(remButton);
        entry.appendChild(finButton);

        todoList.appendChild(entry);
    }

    for (let i = 0; i < completed.length; i++) {
        let entry = document.createElement("div");
        entry.className = "listItem";
        let text = document.createElement("strike");

        text.appendChild(document.createTextNode(completed[i]));
        entry.appendChild(text);

        let remButton = document.createElement("input");
        remButton.type = "button";
        remButton.value = "Remove";
        remButton.onclick = () => {
            completed.splice(i, 1);
            update();
        };

        let finButton = document.createElement("input");
        finButton.type = "button";
        finButton.value = "Oops unfinished";
        finButton.onclick = () => {
            tasks.push(completed[i]);
            completed.splice(i, 1);
            update();
        };

        entry.appendChild(remButton);
        entry.appendChild(finButton);
        completedList.appendChild(entry);
    }
}

function newTask() {
    tasks.push(document.getElementById("newTask").elements[0].value);
    update();
}

addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        localStorage.setItem("completed", JSON.stringify(completed));
    }
    console.log("Goodbye");
});

addEventListener("load", () => {
    console.log("Hello");
    checkTasks = localStorage.getItem("tasks");
    if (checkTasks) {
        tasks = JSON.parse(checkTasks);
    }
    checkCompleted = localStorage.getItem("completed");
    if (checkCompleted) {
        completed = JSON.parse(checkCompleted);
    }

    update();
});
