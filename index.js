const API_URL = 'https://crudcrud.com/api/221e00a59c6045ee9efe86fd2e8c1900/StudentManager';
const form = document.getElementById('studentForm');
const studentList = document.getElementById('studentList');

// Fetch and display students
async function fetchStudents() {
    try {
        const response = await fetch(API_URL);
        const students = await response.json();
       renderStudents(students);
       updateStudentCount(students);
    } catch (error) {
        console.error('Error fetching students:', error);
    }
}

// Render students
function renderStudents(students) {
    studentList.innerHTML = ''; 
    students.forEach(student => {
        const li = document.createElement('li');
        li.className = 'student-item';
        li.dataset.id = student._id;
        li.innerHTML = `
            <span>${student.name} - ${student.phone} - ${student.address}</span>
            <div class="actions">
                <button onclick="editStudent('${student._id}')">Edit</button>
                <button onclick="deleteStudent('${student._id}')">Delete</button>
            </div>
        `;
        studentList.appendChild(li);
    });
}
function updateStudentCount(students) {
  studentCount.textContent = students.length; 
}
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;

    const newStudent = { name, phone, address };

    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newStudent),
        });
        form.reset();
        fetchStudents(); 
    } catch (error) {
        console.error('Error adding student:', error);
    }
});


async function deleteStudent(id) {
    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchStudents(); 
    } catch (error) {
        console.error('Error deleting student:', error);
    }
}

async function editStudent(id) {
    const studentElement = document.querySelector(`li[data-id="${id}"]`);
    const [name, phone, address] = studentElement
        .querySelector('span')
        .textContent.split(' - ');

    const newName = prompt('Edit Name:', name) || name;
    const newPhone = prompt('Edit Phone:', phone) || phone;
    const newAddress = prompt('Edit Address:', address) || address;
    const updatedStudent = { name: newName, phone: newPhone, address: newAddress };

    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedStudent),
        });
        fetchStudents(); 
    } catch (error) {
        console.error('Error editing student:', error);
    }
}

fetchStudents();
