google.charts.load('current', {'packages':['corechart']});

var tasks = [];


var form = document.getElementById("form");
var event_form = document.getElementById("event_form");
var grocery_form = document.getElementById("grocery_form");

var event_to_edit;
var grocery_to_edit;


$(document).ready(function(){
    $("#form").submit(function(){
        start();
        $("tr:last-child").animate({opacity : 0.4}, "slow");
        $("tr:last-child").animate({opacity : 1}, "slow");
        $("tr:last-child").animate({opacity : 0.4}, "slow");
        $("tr:last-child").animate({opacity : 1}, "slow");
        $("#table_div").fadeIn("slow");
        $("#myChart").fadeIn("slow");
    });
    
    $("#show_button").click(function(){
        $("#table_div").fadeToggle("slow");
        
    });
    
    
    $("#clear_button").click(function(){
        clearTasks();
        $("#table_div").fadeToggle("slow");
        $("#myChart").fadeToggle("slow");
    });
    
    $(".cancel_button").click(function(){
        $(".column-1").animate({marginLeft: '0'});
        $(".column-2").fadeIn("slow");
    });
    
    $("#begin").click(function(){
        $(".top-section").slideToggle("slow");
        $(".bottom-section").toggle("slow");
    });


    // $("tr").dblclick(function(){
    //     // alert("hi");
    //     $(".column-2").fadeOut("slow");
    //     $(".column-1").animate({marginLeft: '40%'});
    // });


    
    

  });


  $(document).ready(function(){
    $("#event_form").submit(function(){
        edit_event();
        $(".column-1").animate({marginLeft: '0'});
        $(".column-2").fadeIn("slow");
    });
  });


  $(document).ready(function(){
    $("#grocery_form").submit(function(){
        $(".column-1").animate({marginLeft: '0'});
        $(".column-2").fadeIn("slow");
        edit_grocery();
    });
  });




//Parent class object with some universal attributes and methods.
class Task{
    constructor(order, name, priority,date){
        this.order = order;
        this.name= name;
        this.priority = priority;
        this.date = date;
    }



    rename(name){
        this.name = name;
    }

    reorder(order){
        this.order = order;
    }


    edit_date(date){
        this.date = date;
    }


    edit_priority(priority){
        this.priority = priority;
    }

}

//child class of Task which inherits some stuff
class Grocery extends Task {
    constructor(order, name, items, priority, date){

        super(order, name, priority, date);
        this.items = items;
    }

    test(){
        alert("this is a grocery test: order is" + this.order);
    }

    edit_items(items){
        this.items = items;
    }

    add_task(){
        var table = document.getElementById("task_table");
    
        var task = this;
        var row = document.createElement("tr");
        row.className = "task-row grocery";
        
        
        var task = this;
        row.ondblclick = function(){
            grocery_to_edit = task; 
            show_grocery_form();
            
            $(".column-2").fadeOut("slow");
            $(".column-1").animate({marginLeft: '40%'});
        };
    
        var order = document.createElement("td");
        var name = document.createElement("td");
        var description = document.createElement("td");
        var category = document.createElement("td");
        var priority = document.createElement("td");
        var date = document.createElement("td");
    
        order.innerHTML = this.order;
        name.innerHTML = this.name;
        description.innerHTML = this.items;
        category.innerHTML = "Grocery";
        priority.innerHTML = this.priority;
        date.innerHTML = this.date;
    
    
    
        
    
        var del = document.createElement("td");
        var delete_button = document.createElement("button");
        delete_button.innerHTML = "Delete";
        delete_button.onclick = function(){delete_task(task.order);};
        delete_button.ondblclick = function(){event.stopPropagation();};
        del.appendChild(delete_button);
    
        
        var up = document.createElement("td");
        var up_button = document.createElement("button");
        up_button.innerHTML = "Up";
        up_button.onclick = function(){ up_task(task.order);};
        up_button.ondblclick = function(){event.stopPropagation();};
        up.appendChild(up_button);
    
    
        
        var down = document.createElement("td");
        var down_button = document.createElement("button");
        down_button.innerHTML = "Down";
        down_button.onclick = function(){ down_task(task.order);};
        down_button.ondblclick = function(){event.stopPropagation();};
        down.appendChild(down_button);
    
    
    
    
        row.id = "order-" + this.order;
        row.draggable = "true";

        row.addEventListener("drag", function() {drag(event);});
        row.addEventListener("dragover", function() {highlight(event);});
        row.addEventListener("dragleave", function() {un_highlight(event);});
        row.addEventListener("drop", function() {drop(event);});
          
        
        
    


        row.appendChild(order);
        row.appendChild(name);
        row.appendChild(description);
        row.appendChild(category);
        row.appendChild(priority);
        row.appendChild(date);
        row.appendChild(del);
        row.appendChild(up);
        row.appendChild(down);
    
    
        table.appendChild(row);
    }
}

//another child class of Task that inherits some stuff
class Event extends Task {
    constructor(order, name, description, priority, date){
        super(order, name, priority, date);
        this.description = description;
    }

    
    test(){
        alert("this is an event test: order is" + this.order);
    }

    edit_description(description){
        this.description = description;
    }

    //this method adds the newly created grocery task to the Table in the DOM
    add_task(){
        var table = document.getElementById("task_table");
    
        var row = document.createElement("tr");
        row.className = "task-row event";
        
        var task = this;
        row.ondblclick = function(){
            event_to_edit = task; 
            show_event_form();
            
            $(".column-2").fadeOut("slow");
            $(".column-1").animate({marginLeft: '40%'});
        };
    
        var order = document.createElement("td");
        var name = document.createElement("td");
        var description = document.createElement("td");
        var category = document.createElement("td");
        var priority = document.createElement("td");
        var date = document.createElement("td");
    
        order.innerHTML = this.order;
        name.innerHTML = this.name;
        description.innerHTML = this.description;
        category.innerHTML = "Event";
        priority.innerHTML = this.priority;
        date.innerHTML = this.date;
    
    
    
        
        var task_order = this.order;
    
        var del = document.createElement("td");
        var delete_button = document.createElement("button");
        delete_button.innerHTML = "Delete";
        delete_button.onclick = function(){delete_task(task_order);};
        delete_button.ondblclick = function(){alert();event.stopPropagation();};
        del.appendChild(delete_button);
    
        
        var up = document.createElement("td");
        var up_button = document.createElement("button");
        up_button.innerHTML = "Up";
        up_button.onclick = function(){ up_task(task_order);}
        up_button.ondblclick = function(){alert();event.stopPropagation();};
        up.appendChild(up_button);
    
    
        
        var down = document.createElement("td");
        var down_button = document.createElement("button");
        down_button.innerHTML = "Down";
        down_button.onclick = function(){ down_task(task_order);}
        down_button.ondblclick = function(){event.stopPropagation();};
        down.appendChild(down_button);
    
    
    
    
        row.id = "order-" + this.order;
        row.draggable = "true";
        


        row.addEventListener("drag", function() {drag(event);});
        row.addEventListener("dragover", function() {highlight(event);});
        row.addEventListener("dragleave", function() {un_highlight(event);});
        row.addEventListener("drop", function() {drop(event);});


        row.appendChild(order);
        row.appendChild(name);
        row.appendChild(description);
        row.appendChild(category);
        row.appendChild(priority);
        row.appendChild(date);
        row.appendChild(del);
        row.appendChild(up);
        row.appendChild(down);
    
    
        table.appendChild(row);
    }
}



//Beginning function that is called when submitting task creation form
function start(){   
    addTask();
    sortTasks();
    update_memory();

    refresh_table();

    event.preventDefault();

}

//called when updating localstorage memory after every change to the task list
function update_memory(){

    localStorage.setItem("task_list", JSON.stringify(tasks));
}

//called to recovery tasklist after every page refresh
function recover_memory(){
    if ((JSON.parse(localStorage.getItem("task_list"))) != null){

        var memory = JSON.parse(localStorage.getItem("task_list"));

        memory.forEach(recoverTasks);
        
    }   
}

//called to parse recovered memory of tasklist into proper list of class objects
function recoverTasks(task_object, order){

    var task_obj = task_object[1];
    var task;

    if (task_object[0] == "Grocery"){
        task = new Grocery(order+1,task_obj.name,task_obj.items,task_obj.priority,task_obj.date);
    }

    else if (task_object[0] == "Event"){
        task = new Event(order+1,task_obj.name,task_obj.description,task_obj.priority,task_obj.date);
    }
    tasks.push([task_object[0], task]);
}

//changes submission form depending on category chosen
function toggle_cat(){


    var categories_only = Object.values(document.getElementsByClassName("category_only"));
    categories_only.forEach(toggle_display);
        
}

//changes visibility of chosen element in the DOM
function toggle_display(element){
    element.classList.toggle("hidden");
}


//creates new Object and pushes it to the tasks list array
function addTask(){
    var task_cat = document.getElementById("cat").value;


    var task_order = tasks.length + 1;
    var task_name = document.getElementById("name").value;
    var event_desc = document.getElementById("desc").value;
    var grocery_list = document.getElementById("items").value;

    var urgent = document.getElementById("urgent");
    
    var task_priority;
    if (urgent.checked)
        task_priority = "Urgent";
    else    
        task_priority = "Not Urgent"

    var task_date = document.getElementById("date").value;

    var task;
    if (task_cat == "Grocery"){
        task = new Grocery(task_order,task_name,grocery_list,task_priority,task_date);
    }

    else if (task_cat == "Event"){
        task = new Event(task_order,task_name,event_desc,task_priority,task_date);
    }

    //task.test();

    tasks.push([task_cat,task]);
    


    
}

//changes the form shown in the DOM to the Event editing form
function show_event_form(){
    var form = document.getElementById("form");
    var event_form = document.getElementById("event_form");
    var grocery_form = document.getElementById("grocery_form");

    if (! form.classList.contains("hidden"))
        form.classList.toggle("hidden");
    
    if (event_form.classList.contains("hidden"))
        event_form.classList.toggle("hidden");

    if (! grocery_form.classList.contains("hidden"))
        grocery_form.classList.toggle("hidden");


    document.getElementById("event_task_head").innerHTML = " #" + event_to_edit.order;
}


//shows the usual add task form in the DOM
function show_add_task(){

    
    var event_form = document.getElementById("event_form");
    var grocery_form = document.getElementById("grocery_form");

    grocery_form.reset();
    event_form.reset();
    var form = document.getElementById("form");
    var event_form = document.getElementById("event_form");
    var grocery_form = document.getElementById("grocery_form");

    if (form.classList.contains("hidden"))
        form.classList.toggle("hidden");
    
    if (! event_form.classList.contains("hidden"))
        event_form.classList.toggle("hidden");

    if (! grocery_form.classList.contains("hidden"))
        grocery_form.classList.toggle("hidden");


}

//shows the Grocery task edit form in the DOM
function show_grocery_form(){
    var form = document.getElementById("form");
    var event_form = document.getElementById("event_form");
    var grocery_form = document.getElementById("grocery_form");

    if (! form.classList.contains("hidden"))
        form.classList.toggle("hidden");
    
    if (! event_form.classList.contains("hidden"))
        event_form.classList.toggle("hidden");

    if (grocery_form.classList.contains("hidden"))
        grocery_form.classList.toggle("hidden");


    document.getElementById("grocery_task_head").innerHTML = " #" + grocery_to_edit.order;
}


//called when Grocery edit form is submitted, updates the Grocery task with new attribute values from the form
function edit_grocery(){

    var task_name = document.getElementById("store_name").value;
    var task_desc = document.getElementById("grocery_items").value;

    var urgent = document.getElementById("urgent_grocery");
    
    var task_priority;
    if (urgent.checked)
        task_priority = "Urgent";
    else    
        task_priority = "Not Urgent";

    var task_date = document.getElementById("grocery_date").value;
 
    if (task_name)
        grocery_to_edit.rename(task_name);
    if (task_date)
        grocery_to_edit.edit_date(task_date);
    if (task_priority)
        grocery_to_edit.edit_priority(task_priority);
    if (task_desc)
        grocery_to_edit.edit_items(task_desc);

    show_add_task();
    update_memory();
    refresh_table();

    event.preventDefault();


}

//called when Event edit form is submitted, updates the Grocery task with new attribute values from the form
function edit_event(){

    var task_name = document.getElementById("event_name").value;
    var task_desc = document.getElementById("event_desc").value;

    var urgent = document.getElementById("urgent_event");
    
    var task_priority;
    if (urgent.checked)
        task_priority = "Urgent";
    else    
        task_priority = "Not Urgent";

    var task_date = document.getElementById("event_date").value;

    if (task_name)
        event_to_edit.rename(task_name);
    if (task_date)
        event_to_edit.edit_date(task_date);
    if (task_priority)
        event_to_edit.edit_priority(task_priority);
    if (task_desc)
        event_to_edit.edit_description(task_desc);
    

    
    show_add_task();
    update_memory();
    refresh_table();


    event.preventDefault();

}

//Deletes and reprints the task table element in the DOM, in order to show the new changes
function refresh_table(){
    var table = document.getElementById("task_table");
    if (table){
        delete_table();
    }
        

    print_table();
    
}
//deletes the task table element in the DOM
function delete_table(){
    var table = document.getElementById("task_table");
    table.remove();
}

//prints the task table element in the DOM
function print_table(){
    var table = document.createElement("table");
    table.id = "task_table";
    table.className = "task_table";



    table.addEventListener("drop", function() {drop(event);});
    table.addEventListener("dragover", function() {allowDrop(event);});




    var header_row = document.createElement("tr");
    header_row.className = "header-row";

    header_row.addEventListener("dragover", function() {highlight(event);});
    header_row.addEventListener("dragleave", function() {un_highlight(event);});
    header_row.addEventListener("drop", function() {drop(event);});

    var order = document.createElement("td");
    order.innerHTML = "Order #";

    var name = document.createElement("td");
    name.innerHTML = "Name";

    var description = document.createElement("td");
    description.innerHTML = "Description";

    var category = document.createElement("td");
    category.innerHTML = "Category";

    var priority = document.createElement("td");
    priority.innerHTML= "Priority";

    var date = document.createElement("td");
    date.innerHTML = "Date";

    var empty_cell = document.createElement("td");
    empty_cell.style = "border:none";
    var empty_cell2 = document.createElement("td");
    empty_cell2.style = "border:none";
    var empty_cell3 = document.createElement("td");
    empty_cell3.style = "border:none";



    header_row.appendChild(order);
    header_row.appendChild(name);
    header_row.appendChild(description);
    header_row.appendChild(category);
    header_row.appendChild(priority);
    header_row.appendChild(date);
    header_row.appendChild(empty_cell);
    header_row.appendChild(empty_cell2);
    header_row.appendChild(empty_cell3);

    table.appendChild(header_row);


    var table_container = document.getElementById("table_div");
    table_container.appendChild(table);
    
    for (let task=0; task < tasks.length; task++){

        tasks[task][1].add_task();
    }
    google.charts.setOnLoadCallback(drawChart);
}

//Toggles the visibility of the task table element in the DOM
function showTasks(){

    var table = document.getElementById("task_table");
    table.classList.toggle("hidden");              
}




//Get form element
var form=document.getElementById("form");
function submitForm(event){


}

//sorts the tasks list array according to task order, as defined in the task objects
function sortTasks(){
    tasks.sort(function(task1, task2){return task1[1].order - task2[1].order} );
}

//removes a task from the tasks list array
function delete_task(order){
    for (let task = 0; task < tasks.length; task++){
        if (tasks[task][1].order == order){
            tasks.splice(task, 1);
            
        }
    }

    for (let task = 0; task < tasks.length; task++){
        tasks[task][1].reorder(task+1);
    }
    update_memory();
    refresh_table();
}

//moves a task up the list in the task list array. essentially swaping it's order with the task above it
function up_task(order){
    if(order != 1){
        
        for (let task = 0; task < tasks.length; task++){
            current_order = tasks[task][1].order;
            if (tasks[task][1].order == order){
                tasks[task][1].reorder(tasks[task-1][1].order);
                tasks[task-1][1].reorder(current_order);
                break;
            }
        }
        sortTasks();
        update_memory();
        refresh_table();

    }

}

//moves a task down the list in the task list array. essentially swaping it's order with the task below it
function down_task(order){
    if (order < tasks.length){
        
        for (let task = 0; task < tasks.length; task++){
            current_order = tasks[task][1].order;
            if (tasks[task][1].order == order){
                tasks[task][1].order = tasks[task+1][1].order;
                tasks[task+1][1].order = current_order;
                break;
            }
        }
        sortTasks();
        update_memory();
        refresh_table();

    }

}

//deletes all tasks in the task list array
function clearTasks(){
    tasks = [];
    update_memory();
    refresh_table();
}



function allowDrop(ev) {
    ev.preventDefault();
  }

//adds a solid underline to the row being hovered over, to make drag and drop easier
function highlight(ev){
    //console.log("dragover");
    var element = ev.target.parentElement;
    console.log(element.tagName);
    if (element.tagName == "TR")
        element.style.borderBottom = "solid";

}
//removes underline when not hovering of row
function un_highlight(ev){
    //console.log("dragleave");
    var element = ev.target.parentElement;
    element.style.borderBottom = "none";

}

var drag_element;

function drag(ev) {
    //console.log("drag");
    drag_element = document.getElementById(ev.target.id);
    ev.dataTransfer.setData("html", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("html");
    var drop_element = ev.target.parentElement;
    var table = drop_element.parentElement;

    un_highlight(ev);
    var orignal_position = drag_element.rowIndex;
    table.insertBefore(drag_element,drop_element.nextSibling);
    var new_position = drag_element.rowIndex;
    reorder_tasks(orignal_position,new_position);
    sortTasks();
    update_memory();
    refresh_table();
}

//moves a task up or down the task list after it has been dragged and dropped there, and updates the order of the other tasks accordingly
function reorder_tasks(old_index,new_index){


    if (new_index > old_index){
        for (let task = (old_index-1); task <= (new_index-1); task++){
            if (tasks[task][1].order == old_index){
                tasks[task][1].reorder(new_index);
            }
            else {
                tasks[task][1].reorder(tasks[task][1].order-1);
            }

        }
    }

    else if (new_index < old_index){
        for (let task = (new_index-1); task <= (old_index-1); task++){
            if (tasks[task][1].order == old_index){
                tasks[task][1].reorder(new_index);
            }
            else {
                tasks[task][1].reorder(tasks[task][1].order+1);
            }

        }
    }
}


//Googe chart stuff
// google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var event_count = count_events();
    var grocery_count = count_grocery();
    console.log(event_count + " " +  grocery_count);
    var data = google.visualization.arrayToDataTable([['', ''],["Grocery",grocery_count],["Events",event_count]]);

    var options = {
    title:'Tasks Categories Breakdown'
};

var chart = new google.visualization.PieChart(document.getElementById('myChart'));
  chart.draw(data, options);
}

function count_events(){
    var count = 0;
    for (let task = 0;task < tasks.length;task++){
        var current_task = tasks[task];
        if (current_task[0] == "Event")
            count = count + 1;
    }
    return count;
}
function count_grocery(){
    var count = 0;
    for (let task = 0;task < tasks.length;task++){
        var current_task = tasks[task];
        if (current_task[0] == "Grocery")
            count = count + 1;
    }
    return count;
}

recover_memory();
refresh_table();