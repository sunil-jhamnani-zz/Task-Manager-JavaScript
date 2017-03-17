/**
 * Created by sunil.jhamnani on 3/17/17.
 */


var App = {
    idLimit: {
        MAX: 9999,
        MIN: 1111
    }
};


function sortByCreateDate() {
    var sortedTasks = TaskFactory.sortTask(sortByCreatedDateCallback);
    MainApp.updateList(sortedTasks)
}

function sortByCreatedDateCallback(taskA, taskB) {
    return (new Date(taskA.createdDate)).getDate() - (new Date(taskB.createDate)).getDate();
}

function sortByDueDate() {
    var sortedTasks = TaskFactory.sortTask(sortByDueDateCallback);
    MainApp.updateList(sortedTasks)
}
function sortByDueDateCallback(taskA, taskB) {
    return (new Date(taskA.dueDate)).getDate() - (new Date(taskB.dueDate)).getDate();
}

var MainApp = (function (App) {

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

        TaskFactory.addTask(newTask);
        updateList();
    });

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

    function updateList(tasks) {
        tasks = tasks || TaskFactory.getAllTask();
        //var tasks = TaskFactory.getAllTask();
        $('#allTasks > tbody:last-child').empty();
        tasks.forEach(function (elem) {
            var newRow = '<tr>' +
                '<td>' + elem.heading + '</td>' +
                '<td>' + elem.createDate + '</td>'+
                '<td>' + elem.dueDate + '</td>' +
                '<td>' + TaskFactory.getStatus(elem.status) + '</td>' +
                '<td>' + elem.priority + '</td>';
            if (elem.isCompeleted) {
                newRow += '<td><input type="checkbox" checked onchange="TaskFactory.markAsComplete(' + elem.id + ')"></td>';
            }
            else {
                newRow += '<td><input type="checkbox" onchange="TaskFactory.markAsComplete(' + elem.id + ')"></td>';
            }
            newRow += '<td><button class="btn btn-primary" onclick="TaskFactory.deleteTask(' + elem.id + ')">Delete</button></td>' +
                '</tr>';
            $('#allTasks > tbody:last-child').append(newRow);
        })
    }
    updateList();

    return {
        updateList:updateList
    }

}(App));
