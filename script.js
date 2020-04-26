window.onload = function () {
	
	function start() {
		var listsQuery = selectList();
		
		for (let i = 0; i<listsQuery.length; i++){
			console.log("QUERY LIST: ",listsQuery[i]);
			document.querySelector('body').append(startCreateList(listsQuery[i]));
		}
		
		var lists = document.getElementsByClassName('list');
		for (let i = 0; i< lists.length; i++){
			bindListEvent(lists[i]);
			console.log(lists[i]);
			console.log("DATA-ID list[",i,"] =",lists[i].dataset.id);
			
			var tasksQuery = selectTask(lists[i].dataset.id);
			for (let j = 0; j<tasksQuery.length; j++) {
				startAddTask(tasksQuery[j], lists[i]);
			}
		}
	}
	
	start();
	
    var addListButton = document.querySelector("#add-list");
    addListButton.onclick = addList;
	
	
	function dragTask(tasks) {
		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", "dragTask.php?tasks="+tasks, false);
		xhttp.send();
	}
	function selectTask(id) {
		var tasks;
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				tasks = JSON.parse(this.responseText);
				console.log("QUERY TASKS", tasks);
			}
		}
		xhttp.open("GET", "selectTask.php?id="+id, false);
		xhttp.send();
		
		return tasks;
	}
	function selectList() {
		var lists;
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				lists = JSON.parse(this.responseText);
				console.log(lists);
			}
		}
		xhttp.open("GET", "selectList.php", false);
		xhttp.send();
		
		return lists;
	}
	function insertTask(name, pId) {
		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", "insertTask.php?name="+name+"&p_id="+pId, true);
		xhttp.send();
	}
	function insertList() {
		var maxId;
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				maxId = this.responseText;
				console.log(maxId);
			}
		}
		xhttp.open("GET", "insertList.php", false);
		xhttp.send();
		
		return maxId;
	}
	function updateTask(pId, oldName, newName, status) {
		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", "updateTask.php?p_id=" +pId+ "&old_name=" +oldName+ "&new_name=" +newName+ "&status=" +status, false);
		xhttp.send();
	}
	function updateList(id, name) {
		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", "updateList.php?id="+id + "&name="+name, true);
		xhttp.send();
	}
	function deleteTaskQuery(name) {
		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", "deleteTask.php?name="+name, true);
		xhttp.send();
	}
	function deleteListQuery(id) {
		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", "deleteList.php?id="+id, true);
		xhttp.send();
	}
	
	function startAddTask (task, list) {
        var taskList = list.querySelector("ul");
		console.log("add task data", task);
		
		var listItem = createTask(task.name);
		if (task.status == 1) {
			listItem.querySelector("input[type=checkbox]").checked = true;
			finishedCreate(listItem.querySelector("input[type=checkbox]"));
		}
		taskList.append(listItem);
        bindTaskEvent(listItem);
    }
	function startCreateList (listQ) {
		var list = document.createElement("div");
		list.className = "list";
		list.dataset.id = listQ.id;
		
		var listHeader = document.createElement("div");
		listHeader.className = "list-header";
		var iconList = document.createElement("i");
		iconList.className = "fas fa-calendar-alt";
		var listName = document.createElement("p");
		listName.className = "list-name";
		listName.innerHTML = listQ.name;
		var listEdit = document.createElement("input");
		listEdit.className = "list-edit no-edit-mode";
		listEdit.type = "text";
		var editItems = document.createElement("div");
		editItems.className = "edit-items-list";
		editItems.innerHTML = '<i class="fas fa-edit header-items"></i>\n<i class="fas fa-trash-alt header-items"></i>';
		listHeader.append(iconList);
		listHeader.append(listName);
		listHeader.append(listEdit);
		listHeader.append(editItems);
		
		var addTaskDiv = document.createElement("div");
		addTaskDiv.className = "add-task";
		addTaskDiv.innerHTML = '<i class="fas fa-plus"></i>\n<form class="input-task" onsubmit="return false;">\n<input class="text-task" type="text" placeholder="Start typing here to create a task...">\n<button class="submit-task" type="button">Add Task</button>\n</form>'
		
		var taskList = document.createElement("div");
		taskList.className = "task-list";
		var ul = document.createElement("ul");
		taskList.append(ul);
		
		list.append(listHeader);
		list.append(addTaskDiv);
		list.append(taskList);
		
		return list;
	}
    
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
    function addTask () {
        var textTask = this.parentNode.querySelector(".text-task");
        var taskList = this.parentNode.parentNode.parentNode.querySelector("ul");
		var list = taskList.parentNode.parentNode;
		
        if(textTask.value) {
			insertTask(textTask.value, list.dataset.id);
			
            var listItem = createTask(textTask.value);
            taskList.append(listItem);
        }
        textTask.value = "";
        bindTaskEvent(listItem);
        console.log(this);
    }
    
    function createList (id) {
        var list = document.createElement("div");
		list.className = "list";
		list.dataset.id = id;
		
		var listHeader = document.createElement("div");
		listHeader.className = "list-header";
		var iconList = document.createElement("i");
		iconList.className = "fas fa-calendar-alt";
		var listName = document.createElement("p");
		listName.className = "list-name";
		listName.innerHTML = "new TODO List("+id+")";
		var listEdit = document.createElement("input");
		listEdit.className = "list-edit no-edit-mode";
		listEdit.type = "text";
		var editItems = document.createElement("div");
		editItems.className = "edit-items-list";
		editItems.innerHTML = '<i class="fas fa-edit header-items"></i>\n<i class="fas fa-trash-alt header-items"></i>';
		listHeader.append(iconList);
		listHeader.append(listName);
		listHeader.append(listEdit);
		listHeader.append(editItems);
		
		var addTaskDiv = document.createElement("div");
		addTaskDiv.className = "add-task";
		addTaskDiv.innerHTML = '<i class="fas fa-plus"></i>\n<form class="input-task" onsubmit="return false;">\n<input class="text-task" type="text" placeholder="Start typing here to create a task...">\n<button class="submit-task" type="button">Add Task</button>\n</form>'
		
		var taskList = document.createElement("div");
		taskList.className = "task-list";
		var ul = document.createElement("ul");
		taskList.append(ul);
		
		list.append(listHeader);
		list.append(addTaskDiv);
		list.append(taskList);
		
		return list;
    }
    function addList (event) {
		var id = insertList();
        var newList = createList(id);
		
        document.querySelector("body").append(newList);
        bindListEvent(newList);
    }
	
	function finishedCreate (checkbox) {
        var listItem = checkbox.parentNode.parentNode;
        var p = listItem.querySelector("p");
        
        if(checkbox.checked) {
            p.style.textDecoration = "line-through";
            listItem.style.backgroundColor = "#d9d9d9";
        }else {
            p.style.textDecoration = "none";
            listItem.style.backgroundColor = "white";
        }
    }
    
    function finished () {
        var listItem = this.parentNode.parentNode;
        var p = listItem.querySelector("p");
        
		var oldName = p.textContent;
		var pId = listItem.parentNode.parentNode.parentNode.dataset.id;
		
        if(this.checked) {
            p.style.textDecoration = "line-through";
            listItem.style.backgroundColor = "#d9d9d9";
			updateTask(pId,oldName,oldName,1);
        }else {
            p.style.textDecoration = "none";
            listItem.style.backgroundColor = "white";
			updateTask(pId,oldName,oldName,0);
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
			
			var lists = document.getElementsByClassName('list');
			var tasks = [];
			var numb = 0;
			for(let i=0; i<lists.length; i++) {
				var pIdT = lists[i].dataset.id;
				var tempTasks = lists[i].getElementsByClassName('task');
				for(let j=0; j<tempTasks.length; j++){
					var nameT = tempTasks[j].querySelector('.task-name').textContent;
					var statusT = tempTasks[j].querySelector('input[type=checkbox]').checked ? 1 : 0;

					var task = {
						name : nameT,
						status : statusT,
						pId : pIdT
					}
					tasks[numb] = task;
					numb++;
				}
			}
			console.log('Prioritize Tasks', tasks);
			tasks = JSON.stringify(tasks);
			dragTask(tasks);
        });
    }
    function editTask () {
        var listItem = this.parentNode.parentNode;
        var p = listItem.querySelector("p");
        var input = listItem.querySelector("input[type=text]");
        input.classList.toggle("no-edit-mode");
		
		var oldName = p.textContent;
		var pId = listItem.parentNode.parentNode.parentNode.dataset.id;
		
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
				var newName = p.textContent;
				updateTask(pId,oldName,newName,0);
				oldName = newName;
            }
        }else {
            this.classList.remove("fa-check");
            this.classList.add("fa-edit");
        }
    }
    function deleteTask () {
        var li = this.parentNode.parentNode;
        li.remove(li);
		console.log(li.querySelector(".task-name").textContent);
		deleteTaskQuery(li.querySelector(".task-name").textContent);
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
			updateList(list.parentNode.dataset.id, input.value);
        }
    }
    function deleteList () {
        var list = this.parentNode.parentNode.parentNode;
		deleteListQuery(list.dataset.id);
        list.remove(list);
    }
    function bindListEvent (list) {
        var editButton = list.querySelector(".fa-edit.header-items");
        var deleteButton = list.querySelector(".fa-trash-alt.header-items");
		var addTaskButton = list.querySelector(".submit-task");
        
        editButton.onclick = editList;
        deleteButton.onclick = deleteList;
		addTaskButton.onclick = addTask;
    }
}