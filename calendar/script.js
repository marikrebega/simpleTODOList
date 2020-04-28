window.onload = function () {
	function calendar(cal, year, month, day) {
		var Dlast = new Date(year, month+1,0).getDate();
		var D = new Date(year, month, Dlast);
		var DNlast = new Date(D.getFullYear(), D.getMonth(), Dlast).getDay();
		var DNfirst = new Date(D.getFullYear(), D.getMonth(), 1).getDay();
		var month=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		var calendar = document.createElement('tbody');
		calendar.onclick = expDate;
		calendar.append(document.createElement('tr'));
		
		if (DNfirst != 0) {
			for(var  i = 1; i < DNfirst; i++) {
				var rows = calendar.querySelectorAll('tr');
				var td = document.createElement('td');
				td.classList.add('disabled');
				rows[rows.length-1].append(td);
			}
		} else {
			for(var  i = 0; i < 6; i++) {
				var rows = calendar.querySelectorAll('tr');
				var td = document.createElement('td');
				td.classList.add('disabled');
				rows[rows.length-1].append(td);
			}
		}
		
		for(var  i = 1; i <= Dlast; i++) {
			if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
				var rows = calendar.querySelectorAll('tr');
				var td = document.createElement('td');
				td.classList.add('today');
				if (i == day) {
					td.classList.add('choose');
				}
				td.innerHTML = i;
				rows[rows.length-1].append(td);
			} else if(i <= Dlast) {
				var rows = calendar.querySelectorAll('tr');
				var td = document.createElement('td');
				if (i == day) {
					td.classList.add('choose');
				}
				td.innerHTML = i;
				rows[rows.length-1].append(td);
			}
			if (new Date(D.getFullYear(),D.getMonth(),i).getDay() == 0) {
				calendar.append(document.createElement('tr'));
			}
		}
		
		document.querySelector('.'+cal).append(calendar);
		document.querySelector('.'+cal+' thead td:nth-child(2)').innerHTML = month[D.getMonth()] +' '+ D.getFullYear();
		document.querySelector('.'+cal).dataset.month = D.getMonth();
		document.querySelector('.'+cal).dataset.year = D.getFullYear();
	}
	
	
	var lists_modal = window.parent.document.querySelectorAll('.open-modal');	
	for(let i=0; i<lists_modal.length; i++) {
		lists_modal[i].onclick = function () {
			if(this.parentNode.parentNode.dataset.date && this.parentNode.parentNode.dataset.date != "null") {
				if (document.querySelector('tbody')) {
					document.querySelector('tbody').remove();
				}
				var date = this.parentNode.parentNode.dataset.date.split('-');
				calendar("calendar", parseInt(date[0]), parseInt(date[1])-1, parseInt(date[2]));
				
				document.querySelector('.calendar thead tr:nth-child(1) td:nth-child(1)').onclick = function() {
					var cal = document.querySelector('.calendar');
					document.querySelector('tbody').remove();
					if (parseInt(date[0]) == cal.dataset.year && (parseInt(date[1])-1) == (parseFloat(cal.dataset.month)-1)) {
						calendar("calendar", cal.dataset.year, parseFloat(cal.dataset.month)-1, parseInt(date[2]));
					} else {
						calendar("calendar", cal.dataset.year, parseFloat(cal.dataset.month)-1);
					}
				}
				
				document.querySelector('.calendar thead tr:nth-child(1) td:nth-child(3)').onclick = function() {
					var cal = document.querySelector('.calendar');
					document.querySelector('tbody').remove();
					if (parseInt(date[0]) == cal.dataset.year && parseInt(date[1]-1) == (parseFloat(cal.dataset.month)+1)) {
						calendar("calendar", cal.dataset.year, parseFloat(cal.dataset.month)+1, parseInt(date[2]));
					} else {
						calendar("calendar", cal.dataset.year, parseFloat(cal.dataset.month)+1);
					}
				}
				
			} else {
				if (document.querySelector('tbody')) {
					document.querySelector('tbody').remove();
				}
				calendar("calendar", new Date().getFullYear(), new Date().getMonth());
				var cal = document.querySelector('.calendar');
				
				document.querySelector('.calendar thead tr:nth-child(1) td:nth-child(1)').onclick = function() {
					document.querySelector('tbody').remove();
					calendar("calendar", cal.dataset.year, parseFloat(cal.dataset.month)-1);
				}
				
				document.querySelector('.calendar thead tr:nth-child(1) td:nth-child(3)').onclick = function() {
					document.querySelector('tbody').remove();
					calendar("calendar", cal.dataset.year, parseFloat(cal.dataset.month)+1);
				}
			}
		}
	}
	
	function expDate(event) {
		if(!event.target.classList.contains('disabled') && event.target.nodeName == 'TD') {
			var tbody = event.target.parentNode.parentNode;
			if(event.target.classList.contains('choose')) {
				event.target.classList.remove('choose');
				var date = 'a'.match('b');
			} else if(tbody.querySelector('.choose')) {
				tbody.querySelector('.choose').classList.remove('choose');
				event.target.classList.add('choose');
				var calendar = event.target.parentNode.parentNode.parentNode;
				var day = event.target.textContent;
				var month = parseInt(calendar.dataset.month)+1;
				var year = calendar.dataset.year;
				var date = year+'-'+month+'-'+day;
			} else {
				event.target.classList.add('choose');
				var calendar = event.target.parentNode.parentNode.parentNode;
				var day = event.target.textContent;
				var month = parseInt(calendar.dataset.month)+1;
				var year = calendar.dataset.year;
				var date = year+'-'+month+'-'+day;
			}
			
			console.log(date);
			var list = window.parent.document.querySelector('.date').parentNode.parentNode;
			list.dataset.date = date;
			updateList(list.dataset.id, date);
			console.log(list);
		}
	}
	
	function updateList(id, date) {
		var lists;
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				lists = this.responseText;
				console.log(lists);
			}
		}
		xhttp.open("GET", "../queryPHP/updateDate.php?id="+id + "&date="+date, true);
		xhttp.send();
	}
}