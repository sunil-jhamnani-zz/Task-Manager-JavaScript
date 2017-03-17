/**
 * Created by sunil.jhamnani on 3/17/17.
 */


var App = {
    idLimit: {
        MAX: 9999,
        MIN: 1111
    }
};

(function (App) {

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

    function updateList() {
        var tasks = TaskFactory.getAllTask();
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

    function sortByCreateDate() {
        TaskFactory.sortTask(sortByCreatedDateCallback);
    }

    //function sortByCreatedDate(taskA, taskB) {
    //    return toDate(taskA.createdDate).getDate() - toDate(taskB.createDate).getDate();
    //}
    //
    //function sortByDueDate(taskA, taskB) {
    //    return toDate(taskA.dueDate).getDate() - toDate(taskB.dueDate).getDate();
    //}
    //
    //
    //
    //function toDate(date) {
    //    return new Date(date);
    //}
    updateList();

}(App));
