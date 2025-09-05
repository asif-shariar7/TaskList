let formE1 = document.querySelector(".form");
let inputE1 = document.querySelector(".input");
let ulE1 = document.querySelector(".list");

let getList = JSON.parse(localStorage.getItem("list"));
if (getList) {
    getList.forEach((task) => {
        toDoList(task);
    });
}

formE1.addEventListener("submit", (e) => {
    e.preventDefault();
    toDoList();
});

function toDoList(task) {
    let newTask = inputE1.value;
    if (task) {
        newTask = task.name;
    }
    if (!newTask) {
        alert("Please Enter Task First");
        return;
    }

    const listE1 = document.createElement("li");

    if (task && task.checked) {
        listE1.classList.add("checked");
    }

    listE1.innerText = newTask;
    ulE1.appendChild(listE1);
    inputE1.value = "";

    const btn1 = document.createElement("i");
    btn1.className = "fa-solid fa-circle-check";
    listE1.appendChild(btn1);

    const btn2 = document.createElement("i");
    btn2.className = "fa-solid fa-trash";
    listE1.appendChild(btn2);

    btn1.addEventListener("click", () => {
        listE1.classList.toggle("checked");
        updateLocalStorage();
    });

    btn2.addEventListener("click", () => {
        listE1.remove();
        updateLocalStorage();
    });

    // Edit on double click
    listE1.addEventListener("dblclick", () => {
        const currentText = listE1.childNodes[0].nodeValue.trim();

        const inputEdit = document.createElement("input");
        inputEdit.type = "text";
        inputEdit.value = currentText;
        inputEdit.className = "edit-input";

        listE1.childNodes[0].nodeValue = "";
        listE1.insertBefore(inputEdit, btn1);

        inputEdit.focus();

        inputEdit.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                saveEdit();
            }
        });

        inputEdit.addEventListener("blur", () => {
            saveEdit();
        });

        function saveEdit() {
            const updatedText = inputEdit.value.trim();
            if (updatedText) {
                listE1.childNodes[0].nodeValue = updatedText;
            } else {
                alert("Task cannot be empty");
                listE1.childNodes[0].nodeValue = currentText;
            }
            inputEdit.remove();
            updateLocalStorage();
        }
    });

    updateLocalStorage();
}

function updateLocalStorage() {
    const listEls = document.querySelectorAll("li");
    let list = [];
    listEls.forEach((val) => {
        const taskText = val.childNodes[0].nodeValue.trim();
        list.push({
            name: taskText,
            checked: val.classList.contains("checked"),
        });
    });

    localStorage.setItem("list", JSON.stringify(list));
}