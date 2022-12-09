const api_url_get = 'http://localhost:8080/students';

async function getapi(url) {
    const response = await fetch(url);

    var data = await response.json();
    if (response) {
        hideloader();
    }
    show(data);
}

function sendData () {
    let name = document.getElementById('name').value;
    let lastName = document.getElementById('lastName').value;
    let average = document.getElementById('average').value;

    fetch('http://localhost:8080/addStudent', {
        method: "POST",
        body: JSON.stringify({
            name: name,
            lastName: lastName,
            average: average,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then((response) => {
            window.location.reload();
        })
        .catch((error) => { console.log(error); });

    return false;
}

function editform (id) {
    fetch('http://localhost:8080/student/' + id)
        .then(response => response.json())
        .then(data => {
            let form = '<form method="PUT" onsubmit="return editapi(' + data.id + ')">' +
                '<label>' +
                '<input id="name2" value="' + data.name + '" name="name2" type="text" placeholder="Name"/>' +
                '</label>' +
                '<label>' +
                '<input id="lastName2" value="' + data.lastName + '" name="lastName2" type="text" placeholder="Surname"/>' +
                '</label>' +
                '<label>' +
                '<input id="average2" value="' + data.average + '" name="average2" min="1" max="5" step="0.01" type="number" placeholder="Average"/>' +
                '</label><br>' +
                '<button id="button-edit" type="submit">Edit</button>' +
                '</form>'

            document.getElementById('delete-edit-form').hidden = false
            document.getElementById('edit-title').innerHTML = '<h2>Edit user data</h2>'
            document.getElementById('edit-form').innerHTML = form;

            document.getElementById('edit-title').hidden = false;
            document.getElementById('edit-form').hidden = false;
        });
}

function deletebutton() {
    document.getElementById('delete-edit-form').hidden = true;
    document.getElementById('edit-title').hidden = true;
    document.getElementById('edit-form').hidden = true;
}

function editapi(id) {
    let name = document.getElementById('name2').value;
    let lastName = document.getElementById('lastName2').value;
    let average = document.getElementById('average2').value;

    console.log(id)
    console.log(name)
    console.log(lastName)
    console.log(average)
    fetch('http://localhost:8080/updateStudent', {
        method: "PUT",
        body: JSON.stringify({
            id: id,
            name: name,
            lastName: lastName,
            average: average,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then((response) => {
            window.location.reload();
        })
        .catch((error) => { console.log(error); });
}

function deleteapi (id) {
    fetch('http://localhost:8080/deleteStudent/' + id, {
        method: "DELETE"
    })
        .then((response) => {
            window.location.reload();
        })
        .catch((error) => { console.log(error); });

    return false;
}

getapi(api_url_get);

function hideloader() {
    document.getElementById('loading').style.display = 'none';
}

function show(data) {
    let tab =
        `<tr>
          <th>Id</th>
          <th>Name</th>
          <th>Surname</th>
          <th>Average</th>
          <th>Edit</th>
          <th>Delete</th>
         </tr>`;

    for (let r of data) {
        tab += `<tr>
        <td>${r.id} </td>
        <td>${r.name}</td>
        <td>${r.lastName}</td>
        <td>${r.average}</td>
        <td><button onclick="return editform(${r.id})">Edit</button></td>
        <td><button onclick="return deleteapi(${r.id})">Delete</button></td>
        </tr>`;
    }
    document.getElementById('students').innerHTML = tab;
}