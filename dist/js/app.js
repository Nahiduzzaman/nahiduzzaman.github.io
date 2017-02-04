var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
/*span.onclick = function() {
    modal.style.display = "none";
}*/

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//===============================================================
var task = {};
var todoData = [];
var searchText = '';



if(JSON.parse(localStorage.getItem("todos")) == null){
	var todos = [];
}
else{
	var todos = JSON.parse(localStorage.getItem("todos"));
}

function searchTodo(text){
	var searchText = text.value;
	console.log('searchText',searchText);
	create(searchText);
}

function filter(selection){
	console.log('selection',selection.value);
	var flag = 'filter';
	create(selection.value,flag);
}

function cancel(){
	modal.style.display = "none";
}

function trimString(s) {
  var l=0, r=s.length -1;
  while(l < s.length && s[l] == ' ') l++;
  while(r > l && s[r] == ' ') r-=1;
  return s.substring(l, r+1);
}

function compareObjects(o1, o2) {
  var k = '';
  for(k in o1) if(o1[k] != o2[k]) return false;
  for(k in o2) if(o1[k] != o2[k]) return false;
  return true;
}

function itemExists(haystack, needle) {
  for(var i=0; i<haystack.length; i++) if(compareObjects(haystack[i], needle)) return true;
  return false;
}

function create(status,isfilter,searchText) {

    if(JSON.parse(localStorage.getItem("todos")) == null){
		var todos = [];
	}
	else{
		var todos = JSON.parse(localStorage.getItem("todos"));
	}

	document.getElementById("main").innerHTML="";

	task = {
		created_at: new Date(),
		taskname: document.getElementById("taskname").value,
		description: document.getElementById("description").value,
		done: false
	}

	console.log('taskname',task.taskname);
	console.log('todos',todos);

	console.log(status);
	if(isfilter){
		console.log('omg');
	}
	else{
	    console.log('yess');
		if(task.taskname != ""){
			todos.push(task);
			console.log('todos',todos);
			localStorage.setItem("todos", JSON.stringify(todos));
			localStorage.setItem("todoData", JSON.stringify(todos));
		}
	}


    
	todoData = JSON.parse(localStorage.getItem("todoData"));
	//console.log('todoData',JSON.stringify(todoData));
    
    if(status == 'done'){
    	var completedData = [];
	    for(var i = 0; i < todoData.length; i++) {
	    	if(todoData[i].done == true){
	    		completedData.push(todoData[i]);
	    	}
	    }

	    console.log('completedData',completedData);
	    todoData = completedData;
	}

	if(status == 'pending'){
    	var pendingData = [];
	    for(var i = 0; i < todoData.length; i++) {
	    	if(todoData[i].done == false){
	    		pendingData.push(todoData[i]);
	    	}
	    }

	    console.log('pendingData',pendingData);
	    todoData = pendingData;
	}

	if(status == 'all'){
    	var allData = [];
	    for(var i = 0; i < todoData.length; i++) {
	        allData.push(todoData[i]);	    	
	    }

	    console.log('allData',allData);
	    todoData = allData;
	}
    searchText = status;
	if(searchText){
		console.log('searchText in create()',searchText);
		console.log('searchText in TodoData',todoData);
	    var results = [];
		/*for(var i=0; i<todoData.length; i++) {
		  for(var key in todoData[i]) {
		    //console.log('key',key)
		    if(typeof todoData[i][key] === 'string' && todoData[i][key].toLowerCase().indexOf(trimString(searchText).toLowerCase())!=-1) {
		      results.push(todoData[i]);
		    }
		  }
		}*/
		  toSearch = trimString(searchText).toLowerCase(); // trim it
		  for(var i=0; i<todoData.length; i++) {
		    for(var key in todoData[i]) {
		      if(typeof todoData[i][key] === 'string' && todoData[i][key].toLowerCase().indexOf(toSearch)!=-1) {
		        if(!itemExists(results, todoData[i])) results.push(todoData[i]);
		      }
		    }
		  }
        console.log('results',results)
		todoData = results;
    }

	for(var i = 0; i < todoData.length; i++) {
	  if(todoData[i].done){
	  	console.log('if')
	  	var card = document.createElement("div");
		card.className = "card";
		card.id = "task"+[i];
    	card.style.backgroundColor = '#bfbfbf';
    	card.style.border='1px solid #000';
		//document.body.appendChild(card);
		document.getElementById("main").appendChild(card);

		var container = document.createElement("div");
		container.className = "container";
		container.innerHTML = '<h4><b>'+todoData[i].taskname+'</b><input '+
							  'type="checkbox" onChange="done(task'+[i]+', this,'+[i]+')" style="float: right;" checked><span onclick="remove('+[i]+')" style="float:right" disabled>&times;</span></h4>'+ 
	                          '<p>'+todoData[i].description+'</p>';
	    container.getElementsByTagName("B")[0].style.textDecoration="line-through";
		card.appendChild(container);
	  }else{
	  	console.log('else');
		var card = document.createElement("div");
		card.className = "card";
		card.id = "task"+[i];
		//document.body.appendChild(card);
		document.getElementById("main").appendChild(card);

		var container = document.createElement("div");
		container.className = "container";
		container.innerHTML = '<h4><b>'+todoData[i].taskname+'</b><input '+
							  'type="checkbox" onChange="done(task'+[i]+', this,'+[i]+')" style="float: right;"><span onclick="remove('+[i]+')" style="float:right">&times;</span></h4>'+ 
	                          '<p>'+todoData[i].description+'</p>';
		card.appendChild(container);
	  }
	}

	modal.style.display = "none";
	
}

create();


function done(x, _this, task) {
  console.log(todoData[task]);
  if (_this.checked) {
  	todoData[task].done = true;
  	console.log(x.getElementsByTagName("B"));
  	x.getElementsByTagName("B")[0].style.textDecoration="line-through";
    x.style.backgroundColor = '#bfbfbf';
    x.style.border='1px solid #000';
    //x.style.boxShadow='-2px -3px 8px 0 rgba(0,0,0,0.2);transition: 0.3s';

  } else  {
  	todoData[task].done = false;
    x.style = '';
    x.getElementsByTagName("B")[0].style.textDecoration="";
  }
  localStorage.setItem("todos", JSON.stringify(todoData));
  localStorage.setItem("todoData", JSON.stringify(todoData));
  //create();
  console.log('TodoData',todoData);
}

function remove(idx){
	console.log('idx',idx);
	todos.splice(idx,1);
	todoData.splice(idx, 1);
	localStorage.setItem("todos", JSON.stringify(todos));
	localStorage.setItem("todoData", JSON.stringify(todoData));
	create();
}
/*div.style.height = "100px";
div.style.background = "red";
div.style.color = "white";
div.innerHTML = "Hello";*/

//document.getElementById("main").appendChild(div);

/*function create() {
       var mainContainer = document.createElement("div");
       mainContainer.id = "mainContainer";
       document.body.appendChild(mainContainer);
        
       for(var i = 0; i < 3; i++) {
           var divBlock = document.createElement("div");                
           divBlock.className = "blocks";
           divBlock.innerHTML = "Hello"
           mainContainer.appendChild(divBlock);       
       }
            
    }
 create();*/