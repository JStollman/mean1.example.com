function viewIndex(){
    var url = 'http://localhost:3000/api/users';

    var xhr = new XMLHttpRequest();
    xhr.open('Get', url);
    xhr.send();

    xhr.onload = function(){
        let data = JSON.parse(xhr.response);

        var rows = '';

        for(var i=0; i<data['users'].length; i++){
            let x = data['users'][i];
            let name = `${x.first_name} ${x.last_name}`
            rows = rows + `<tr>
                    <td><a href="#edit-${x._id}"
                        onclick="viewUser('${x._id}')">
                        ${name}
                        </a>
                    </td>               
                    <td>${x.username}</td>               
                    <td>${x.email}</td>               
            </tr>`;
        }
        var app = document.getElementById('app');
        app.innerHTML = `<table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>`;
    }

    
}
function viewUser(id){
    var url = 'http://localhost:3000/api/users/' + id;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();

    xhr.onload = function(){
        var data = JSON.parse(xhr.response);
        var user = data.user;
        var app = document.getElementById('app');

        app.innerHTML=`
            <h2>${user.last_name}, ${user.first_name}</h2>    
            <table class="table">
                <tbody>
                    <tr><th><td>${user._id}</td></th></tr>
                    <tr><th><td>${user.first_name}</td></th></tr>
                    <tr><th><td>${user.last_name}</td></th></tr>
                    <tr><th><td>${user.username}</td></th></tr>
                    <tr><th><td>${user.email}</td></th></tr>
                </tbody>
            </table>
            
            <h3>Edit the User Record</h3>
            <form id="editUser" action="/api/users" method="put">
                <input type="hidden" name="_id" value="${user._id}">
                <div>
                    <label for="username">Username</label>
                    <input 
                        type="text" 
                        name="username" 
                        id="username" 
                        value="${user.username}">
                </div>
                <div>
                    <label for="email">Email</label>
                    <input 
                        type="text" 
                        name="email" 
                        id="email" 
                        value="${user.email}">
                </div>
                <div>
                    <label for="first_name">First Name</label>
                    <input 
                        type="text" 
                        name="first_name" 
                        id="first_name" 
                        value="${user.first_name}">
                </div>
                <div>
                    <label for="last_name">Last Name</label>
                    <input 
                        type="text" 
                        name="last_name" 
                        id="last_name" 
                        value="${user.last_name}">
                </div>

                <input type="submit" value="Submit">
            </form>
            `;

        var editUser = document.getElementById('editUser')
        editUser.addEventListener('submit', function(e){
            e.preventDefault();
            var formData = new FormData(editUser);
            var url = 'http://localhost:3000/api/users';
            var xhr = new XMLHttpRequest();
            xhr.open('Put', url);
            xhr.setRequestHeader(
                'Content-Type', 
                'application/json; charset=UTF-8');

            var object={};
            formData.forEach(function(value, key){

                object[key] = value;
            });
            xhr.send(JSON.stringify(object));
            
            xhr.onload = function(){
                let data = JSON.parse(xhr.response);
                if(data.success===true){
                    viewIndex();
                }
            }
        });

    }
}
function createUser(){
    var app = document.getElementById('app');
    app.innerHTML = `<h2>Create a New User</h2>
    <form id="createUser" action="/api/users" method="post">
    <div>
        <label for="username">Username</label>
        <input 
            type="text" 
            name="username" 
            id="username" >
    </div>
    <div>
        <label for="email">Email</label>
        <input 
            type="text" 
            name="email" 
            id="email" >
    </div>
    <div>
        <label for="first_name">First Name</label>
        <input 
            type="text" 
            name="first_name" 
            id="first_name" >
    </div>
    <div>
        <label for="last_name">Last Name</label>
        <input 
            type="text" 
            name="last_name" 
            id="last_name" >
    </div>

    <input type="submit" value="Submit">
    </form>
    `;
    
    var createUser = document.getElementById('createUser');
    createUser.addEventListener('submit', function(e){
        e.preventDefault();

        var formData = new FormData(createUser);
        var url = 'http://localhost:3000/api/users';
        var xhr = new XMLHttpRequest();
        xhr.open('Post', url);

        xhr.setRequestHeader(
            'Content-Type',
            'application/json; charset=UTF-8'
        );

        var object = {};
        formData.forEach(function(value, key){
            object[key]=value;
        });

        xhr.send(JSON.stringify(object));
        xhr.onload = function(){
            let data = JSON.parse(xhr.response);
            if(data.success===true){
                viewIndex();
            }
        }

    });
}

viewIndex();

var hash = window.location.hash.substr(1);
if(hash){
    let chunks = hash.split('-');

    if(chunks[0]=='edit'){
        viewUser(chunks[1])
    }

    if(chunks[0]=='createUser'){
        createUser();
    }
}

