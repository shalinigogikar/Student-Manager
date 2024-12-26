
window.onload = function() {
    fetchStudents();
};

let allStudents = [];

function fetchStudents() {
    axios.get("https://crudcrud.com/api/4c77645de78446aaad15be782ded7a8d/StudentManager")
        .then(response => {
            allStudents = response.data;

            const totalStudents = allStudents.length;

            const para = document.getElementById('count');
            para.innerHTML = `Total Students: ${totalStudents}`;

            const ul = document.querySelector("#show ul");
            ul.innerHTML = '';
            allStudents.forEach(student => {
                addStudentToList(student);
            });
        })
        .catch(error => {
            console.error("Error fetching students:", error);
        });
}

function addStudentToList(studentData) {
    const ul = document.querySelector("#show ul");
    const li = document.createElement("li");
    li.id = studentData._id;

    li.textContent = `${studentData.name} - ${studentData.phone} - ${studentData.address}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = "delete";
    deleteBtn.onclick = function () {
        deleteStudent(studentData._id);
    };

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = "edit";

    editBtn.onclick = function () {
        editStudent(studentData);
    };

    li.appendChild(deleteBtn);
    li.appendChild(editBtn);

    ul.appendChild(li);
}

function deleteStudent(studentId) {
    axios.delete(`https://crudcrud.com/api/4c77645de78446aaad15be782ded7a8d/StudentManager/${studentId}`)
        .then(response => {
            console.log("Student deleted:", response.data);
            const li = document.getElementById(studentId);
            li.remove();
            fetchStudents();
        })
        .catch(error => {
            console.error("Error deleting student:", error);
        });
}

function editStudent(studentData) {
    document.getElementById('name').value = studentData.name;
    document.getElementById('phone').value = studentData.phone;
    document.getElementById('address').value = studentData.address;

    axios.delete(`https://crudcrud.com/api/4c77645de78446aaad15be782ded7a8d/StudentManager/${studentData._id}`)
        .then(() => {
            const li = document.getElementById(studentData._id);
            li.remove();
            fetchStudents();
        })
        .catch((error) => console.log(error));
}

function handleOnSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;

    const studentData = {
        name: name,
        phone: phone,
        address: address
    };

    axios.post("https://crudcrud.com/api/4c77645de78446aaad15be782ded7a8d/StudentManager", studentData)
        .then(response => {
            console.log("Student added:", response.data);
            addStudentToList(response.data);
            fetchStudents();
        })
        .catch(error => {
            console.error("Error adding student:", error);
        });

    document.getElementById('name').value = "";
    document.getElementById('phone').value = "";
    document.getElementById('address').value = "";
}


