"use strict";
function addNote() {
    console.log("Adding a new note");
    var title = document.getElementById("title");
    var description = document.getElementById("description");
    if (title && description) {
        title.value = "";
        description.value = "";
    }
}
function removeNote(id) {
    var confirmed = confirm("¿Seguro que desea eliminar la nota?");
    if (!confirmed)
        return;
    var newNotes = notes.filter(function (e) { return e.id != id; });
    //array que contiene todos los elementos, excepto aquellos cuyo id es = a id
    notes = newNotes;
    drawTable();
    console.log(notes);
    //persistir la nueva lista
    localStorage.setItem('notes', JSON.stringify(notes));
    //fin persistencia
}
function save() {
    console.log("Saving a note");
    var title = document.getElementById("title");
    var description = document.getElementById("description");
    if (title && description) {
        title.value = title.value.trim();
        description.value = description.value.trim();
        if (title.value.length > 0 && description.value.length > 0) {
            //guardo
            var newNote = {
                title: title.value,
                description: description.value,
                id: Math.floor(Math.random() * 10000) + 1
            };
            notes.push(newNote);
            var closeModal = document.getElementById('closeModal');
            closeModal.click();
            drawTable();
            console.log(notes);
            //persistir la nueva lista
            localStorage.setItem('notes', JSON.stringify(notes));
            //fin persistencia
        }
        else {
            alert("El campo título y descripción deben contener información.");
        }
    }
}
function drawTable() {
    var table = document.getElementById('tableNotes');
    table.innerHTML = "";
    notes.forEach(function (note) {
        var row = drawRow(note);
        table.appendChild(row);
    });
}
function drawRow(note) {
    var row = document.createElement("tr");
    row.className = "table-striped";
    var td1 = document.createElement("td");
    td1.innerHTML = note.title;
    row.appendChild(td1);
    var td2 = document.createElement("td");
    td2.innerHTML = note.description;
    row.appendChild(td2);
    var td3 = document.createElement("td");
    var button = document.createElement("button");
    button.className = "btn btn-secondary";
    button.onclick = function () {
        removeNote(note.id);
    };
    button.innerHTML = "\n    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-trash3-fill\" viewBox=\"0 0 16 16\">\n                    <path d=\"M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z\"></path>\n                    </svg>\n    ";
    td3.appendChild(button);
    row.appendChild(td3);
    return row;
}
/**
 *  Cargo la lista de persistence
 */
var notesString = localStorage.getItem('notes');
var notes;
if (notesString == null) {
    notes = [];
}
else {
    notes = JSON.parse(notesString);
}
console.log(notesString);
/**
 * Pinto la tabla
 */
drawTable();
