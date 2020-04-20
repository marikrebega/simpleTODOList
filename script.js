window.onload = function () {
    
    var addTaskButton = document.querySelector(".submit-task");
    addTaskButton.onclick = addTask;
    
    var list = document.querySelector(".list");
    bindListEvent(list);
    
    var addListButton = document.querySelector("#add-list");
    addListButton.onclick = addList;
    
    function createTask (task) {
        var listItem = document.createElement("li");
        listItem.className = "task"
        
        var divIsDone = document.createElement("div");
        divIsDone.className = "isDone";
        
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        
        divIsDone.append(checkbox);
        divIsDone.innerHTML += "\n";
        
        var taskName = document.createElement("p");
        taskName.className = "task-name";
        taskName.innerHTML = task;
        
        var taskEdit = document.createElement("input");
        taskEdit.type = "text";
        taskEdit.className = "task-edit no-edit-mode";
        taskEdit.value = task;
        
        var divEditItems = document.createElement("div");
        divEditItems.className = "edit-items";
        divEditItems.innerHTML = '<i class="fas fa-arrows-alt-v icon-border task-item"></i>\n<i class="fas fa-edit icon-border task-item"></i>\n<i class="fas fa-trash-alt task-item"></i>';
        

        listItem.append(divIsDone);
        listItem.append(taskName);
        listItem.append(taskEdit);
        listItem.append(divEditItems);
        
        return listItem
    }
    
    function addTask (event) {
        var textTask = this.parentNode.querySelector(".text-task");
        var taskList = this.parentNode.parentNode.parentNode.querySelector("ul");
        if(textTask.value) {
            var listItem = createTask(textTask.value)
            taskList.append(listItem);
        }
        textTask.value = "";
        bindTaskEvent(listItem);
        console.log(event.target);
    }
    
    
    function createList () {
        var newList = list.cloneNode(true);
        var ul = newList.querySelector("ul")
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }
        newList.querySelector(".submit-task").onclick = addTask;
        
        var nameList = newList.getElementsByClassName('list-name')[0];
        nameList.innerHTML = "new TODO List";
        
        return newList;
    }
    
    function addList (event) {
        var list = createList();
        document.querySelector("body").append(list);
        bindListEvent(list);
    }
    
    function finished () {
        var listItem = this.parentNode.parentNode;
        var p = listItem.querySelector("p");
        
        if(this.checked) {
            p.style.textDecoration = "line-through";
            listItem.style.backgroundColor = "#d9d9d9";
        }else {
            p.style.textDecoration = "none";
            listItem.style.backgroundColor = "white";
        }
    }
    
    function dragDropTask () {
        console.log("1");
    }
    
    function editTask () {
        var listItem = this.parentNode.parentNode;
        var p = listItem.querySelector("p");
        var input = listItem.querySelector("input[type=text]");
        input.classList.toggle("no-edit-mode");
        
        var noEditMode = input.classList.contains("no-edit-mode")
        
        if(!noEditMode) {
            this.classList.remove("fa-edit");
            this.classList.add("fa-check");
            this.style.width = 27.88+"px";
            console.log(this.style.width);
            input.oninput = function () {
                if(input.value != ""){
                    p.innerHTML = input.value;
                    p.style.textDecoration = "none";
                    listItem.style.backgroundColor = "white";
                    listItem.querySelector("input[type=checkbox]").checked = false;
                }
            }
        }else {
            this.classList.remove("fa-check");
            this.classList.add("fa-edit");
        }
    }
    
    function deleteTask () {
        var li = this.parentNode.parentNode;
        li.remove(li);
    }
    
    function bindTaskEvent (listItem) {
        var checkbox = listItem.querySelector("input[type=checkbox]");
        var dragButton = listItem.querySelector(".task-item.fa-arrows-alt-v");
        var editButton = listItem.querySelector(".task-item.fa-edit");
        var deleteButton = listItem.querySelector(".task-item.fa-trash-alt");
        
        checkbox.onclick = finished;
        dragButton.onclick = dragDropTask;
        editButton.onclick = editTask;
        deleteButton.onclick = deleteTask;
    }
    
    function editList () {
        var list = this.parentNode.parentNode;
        var p = list.querySelector("p");
        var input = list.querySelector("input[type=text]");
        input.classList.toggle("no-edit-mode");
        
        var noEditMode = input.classList.contains("no-edit-mode")
        
        if(!noEditMode) {
            this.classList.remove("fa-edit");
            this.classList.add("fa-check");
            this.style.width = 49.13+"px";
            input.oninput = function () {
                if(input.value != ""){
                    p.innerHTML = input.value;
                }
            }
        }else {
            this.classList.remove("fa-check");
            this.classList.add("fa-edit");
        }
    }
    
    function deleteList () {
        var list = this.parentNode.parentNode.parentNode;
        list.remove(list);
    }
    
    function bindListEvent (list) {
        var editButton = list.querySelector(".fa-edit.header-items");
        var deleteButton = list.querySelector(".fa-trash-alt.header-items");
        
        editButton.onclick = editList;
        deleteButton.onclick = deleteList;
    }
}