// Retrieve tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Display tasks on page load
displayTasks();

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    const deadlineInput = document.getElementById('deadlineInput');
    const deadline = deadlineInput.value;

    if (taskText !== '') {
        const newTask = {
            id: Date.now(),
            text: taskText,
            deadline: deadline,
            completed: false
        };

        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        displayTasks();
        taskInput.value = ''; // Clear input field
        deadlineInput.value = ''; // Clear deadline input

        showAlert('Task added', 'success');
    } else {
        showAlert('Task cannot be empty', 'danger');
    }
}

// Function to display tasks
function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = `${task.text} - Deadline: ${task.deadline}`;
        li.className = task.completed ? 'list-group-item list-group-item-danger' : 'list-group-item';
        li.addEventListener('click', () => toggleTaskCompletion(task.id));
        taskList.appendChild(li);
    });
}

// Function to toggle task completion status
function toggleTaskCompletion(taskId) {
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            task.completed = !task.completed;
        }
        return task;
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

// Function to filter tasks
function filterTasks() {
    const filter = document.getElementById('filterSelect').value;

    if (filter === 'all') {
        displayTasks();
    } else {
        const filteredTasks = tasks.filter(task => {
            if (filter === 'active') {
                return !task.completed;
            } else if (filter === 'completed') {
                return task.completed;
            }
        });

        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';

        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = `${task.text} - Deadline: ${task.deadline}`;
            li.className = task.completed ? 'list-group-item list-group-item-danger' : 'list-group-item';
            li.addEventListener('click', () => toggleTaskCompletion(task.id));
            taskList.appendChild(li);
        });
    }
}

// Function to show alert message
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.appendChild(document.createTextNode(message));

    const container = document.querySelector('.container');
    const form = document.querySelector('.input-group');
    container.insertBefore(alertDiv, form);

    // Remove alert after 3 seconds
    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 3000);
}
