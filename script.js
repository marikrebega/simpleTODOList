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
    
    function sortable(rootEl, onUpdate){
        var dragEl, nextEl;

        // Делаем всех детей перетаскиваемыми
        [].slice.call(rootEl.children).forEach(function (itemEl){
            itemEl.draggable = true;
        });

        // Фнукция отвечающая за сортировку
        function _onDragOver(evt){
            evt.preventDefault();
            evt.dataTransfer.dropEffect = 'move';

            var target = evt.target;
            if( target && target !== dragEl && target.nodeName == 'LI' ){
                // Сортируем
                var rect = target.getBoundingClientRect();
                var next = (evt.clientY - rect.top)/(rect.bottom - rect.top) > 0.5;
                rootEl.insertBefore(dragEl, next && target.nextSibling || target);
            }
        }

        // Окончание сортировки
        function _onDragEnd(evt){
            evt.preventDefault();

            dragEl.classList.remove('ghost');
            rootEl.ondragstart = null;
            [].slice.call(rootEl.children).forEach(function (itemEl){
                itemEl.draggable = false;
            });
            rootEl.removeEventListener('dragover', _onDragOver, false);
            rootEl.removeEventListener('dragend', _onDragEnd, false);

            if( nextEl !== dragEl.nextSibling ){
                // Сообщаем об окончании сортировки
                onUpdate(dragEl);
            }
        }
    
        // Начало сортировки
        rootEl.ondragstart = function (evt){
            dragEl = evt.target; // Запоминаем элемент который будет перемещать
            nextEl = dragEl.nextSibling;

            // Ограничиваем тип перетаскивания
            evt.dataTransfer.effectAllowed = 'move';
            evt.dataTransfer.setData('Text', dragEl.textContent);

            // Пописываемся на события при dnd
            rootEl.addEventListener('dragover', _onDragOver, false);
            rootEl.addEventListener('dragend', _onDragEnd, false);

            setTimeout(function (){
                // Если выполнить данное действие без setTimeout, то
                // перетаскиваемый объект, будет иметь этот класс.
                dragEl.classList.add('ghost');
            }, 0)
        }
    }
    
    function dragDropTask () {
        var ul = this.parentNode.parentNode.parentNode;
        console.log(ul);
        sortable( ul, function (item) {
            console.log(item);
        });
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
        dragButton.onmousedown = dragDropTask;
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