/**
 * Created by sunil.jhamnani on 3/17/17.
 */
var App = {
    idLimit: {
        MAX: 9999,
        MIN: 1111
    },
    constants: {
        ASC: 0,
        DSC: 1
    }

};

(function (App) {
    $("#dueDate").datepicker({ minDate: 0});
    $('#submit').click(function (e) {
        e.preventDefault();
        var newTask = new Task({
            id: getRandomId(),
            heading: $('#heading').val(),
            createDate: getCurrentDate(),
            dueDate: $('#dueDate').val(),
            status: $('#status').val(),
            priority: $('#priority').val(),
            isCompeleted: false
        });

        addTask(newTask);
    });

    loadList();

})(App);

function loadList(tasks) {
    tasks = tasks || TaskFactory.getAllTask();
    $('#allTasks > tbody:last-child').empty();
    tasks.forEach(function (elem) {
        $('#allTasks > tbody:last-child').append(new_task_row(elem));
    })
}

function addTask(task) {
    TaskFactory.addTask(task);
    var newRow = new_task_row(task);
    newRow.hide();
    $('#allTasks > tbody:last-child').append(newRow);
    newRow.fadeIn("slow");
}

function sortByDueDate() {
    App.date_dir = !App.date_dir || App.constants.ASC;
    if (App.date_dir) {
        var sortedTasks = TaskFactory.sortTask(sortByDueDateCallbackAsc);
    }
    else {
        var sortedTasks = TaskFactory.sortTask(sortByDueDateCallbackDsc);
    }
    loadList(sortedTasks)
}

function sortByDueDateCallbackAsc(taskA, taskB) {
    return (new Date(taskA.dueDate)).getDate() - (new Date(taskB.dueDate)).getDate();
}

function sortByDueDateCallbackDsc(taskA, taskB) {
    return (new Date(taskB.dueDate)).getDate() - (new Date(taskA.dueDate)).getDate();
}

function getRandomId() {
    min = Math.ceil(App.idLimit.MIN);
    max = Math.floor(App.idLimit.MAX);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getCurrentDate() {
    var date = new Date();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var currentDate = date.getDate();
    return '' + month + '/' + currentDate + '/' + year;

}

function new_task_row(task) {
    if (task.isCompeleted) {
        var newRow = '<tr class="completed" id="' + task.id + '">' +
            '<td><input type="checkbox" checked onchange="onChange(' + task.id + ')"></td>';
    }
    else {
        var newRow = '<tr class="pending" id="' + task.id + '">' +
            '<td><input type="checkbox" onchange="onChange(' + task.id + ')"></td>';
    }
    newRow += '<td>' + task.heading + '</td>' +
        '<td>' + task.dueDate + '</td>' +
        '<td>' + TaskFactory.getStatus(task.status) + '</td>' +
        '<td>' + task.priority + '</td>' +
        '<td><button class="btn btn-default delete" onclick="deleteTask(' + task.id + ')">Delete</button></td>' +
        '</tr>';
    newRow = $(newRow);
    return newRow
}

function deleteTask(id) {
    TaskFactory.deleteTask(id);
    $("#" + id).fadeOut("slow", function () {
        this.remove();
    });
}

function onChange(id) {
    if (TaskFactory.updateProgress(id)) {
        $("#" + + id).removeClass("pending").addClass("completed");
    }
    else {
        $("#" + id).removeClass("completed").addClass("pending");
    }
}
