---
type: lesson
title: JavaScript - Interaktivitas Web
---

# JavaScript: Menghidupkan Web dengan Interaktivitas 💫

JavaScript adalah bahasa pemrograman yang memberikan interaktivitas dan dynamic behavior pada halaman web. Sebagai bahasa scripting client-side, JavaScript memungkinkan manipulasi DOM, event handling, dan komunikasi dengan server.

## Apa itu JavaScript?

JavaScript adalah bahasa pemrograman yang:

- **Dynamic**: Dapat mengubah konten dan style secara real-time
- **Event-driven**: Merespons interaksi user
- **Interpreted**: Dijalankan langsung oleh browser
- **Versatile**: Bisa digunakan di frontend, backend, mobile, desktop

## Cara Menerapkan JavaScript

### 1. Inline JavaScript
```html
<button onclick="alert('Hello!')">Klik saya</button>
```

### 2. Internal JavaScript
```html
<script>
    function sayHello() {
        alert('Hello dari JavaScript!');
    }
</script>
```

### 3. External JavaScript (Recommended)
```html
<script src="script.js"></script>
```

```javascript
// script.js
function sayHello() {
    alert('Hello dari JavaScript!');
}
```

## Sintaks Dasar JavaScript

### Variables
```javascript
// Modern variable declarations
let name = 'John';
const age = 25;
var oldStyle = 'tidak direkomendasikan';

// Data types
let string = 'Hello World';
let number = 42;
let boolean = true;
let array = [1, 2, 3, 4, 5];
let object = { name: 'John', age: 25 };
let nullValue = null;
let undefinedValue = undefined;
```

### Functions
```javascript
// Function declaration
function greet(name) {
    return `Hello, ${name}!`;
}

// Function expression
const greet2 = function(name) {
    return `Hello, ${name}!`;
};

// Arrow function (ES6+)
const greet3 = (name) => {
    return `Hello, ${name}!`;
};

// Shorthand arrow function
const greet4 = name => `Hello, ${name}!`;
```

### Control Flow
```javascript
// Conditionals
if (age >= 18) {
    console.log('Dewasa');
} else if (age >= 13) {
    console.log('Remaja');
} else {
    console.log('Anak-anak');
}

// Loops
for (let i = 0; i < 5; i++) {
    console.log(i);
}

// Modern array iteration
const numbers = [1, 2, 3, 4, 5];
numbers.forEach(num => console.log(num));
```

## DOM Manipulation

### Selecting Elements
```javascript
// By ID
const element = document.getElementById('myId');

// By class
const elements = document.getElementsByClassName('myClass');

// By tag
const paragraphs = document.getElementsByTagName('p');

// Query selectors (recommended)
const element2 = document.querySelector('#myId');
const elements2 = document.querySelectorAll('.myClass');
```

### Modifying Elements
```javascript
// Change content
element.textContent = 'New text content';
element.innerHTML = '<strong>Bold text</strong>';

// Change attributes
element.setAttribute('class', 'new-class');
element.src = 'new-image.jpg';

// Change styles
element.style.color = 'blue';
element.style.fontSize = '20px';

// Add/remove classes
element.classList.add('active');
element.classList.remove('inactive');
element.classList.toggle('highlight');
```

### Creating Elements
```javascript
// Create new element
const newDiv = document.createElement('div');
newDiv.textContent = 'I am a new div';
newDiv.className = 'created-element';

// Append to parent
document.body.appendChild(newDiv);

// Insert at specific position
const parent = document.getElementById('container');
parent.insertBefore(newDiv, parent.firstChild);
```

## Event Handling

### Adding Event Listeners
```javascript
// Click events
button.addEventListener('click', function() {
    console.log('Button clicked!');
});

// Using arrow functions
button.addEventListener('click', () => {
    console.log('Button clicked with arrow function!');
});

// Form events
const form = document.getElementById('myForm');
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission
    console.log('Form submitted');
});

// Input events
const input = document.getElementById('textInput');
input.addEventListener('input', (event) => {
    console.log('Input value:', event.target.value);
});
```

### Common Events
```javascript
// Mouse events
element.addEventListener('click', handler);
element.addEventListener('mouseover', handler);
element.addEventListener('mouseout', handler);

// Keyboard events
document.addEventListener('keydown', (event) => {
    console.log('Key pressed:', event.key);
});

// Window events
window.addEventListener('load', () => {
    console.log('Page loaded');
});

window.addEventListener('resize', () => {
    console.log('Window resized');
});
```

## Async Programming

### Promises
```javascript
// Creating a promise
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Data fetched successfully');
        }, 1000);
    });
};

// Using promises
fetchData()
    .then(data => console.log(data))
    .catch(error => console.error(error));
```

### Async/Await
```javascript
// Async function
async function getData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call async function
getData();
```

## Working with APIs

### Fetch API
```javascript
// GET request
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

// POST request
fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        title: 'New Post',
        body: 'This is the post content',
        userId: 1
    })
})
.then(response => response.json())
.then(data => console.log(data));
```

## Local Storage

### Storing Data
```javascript
// Store data
localStorage.setItem('username', 'john_doe');
localStorage.setItem('preferences', JSON.stringify({
    theme: 'dark',
    language: 'id'
}));

// Retrieve data
const username = localStorage.getItem('username');
const preferences = JSON.parse(localStorage.getItem('preferences'));

// Remove data
localStorage.removeItem('username');
localStorage.clear(); // Remove all
```

## Modern JavaScript Features (ES6+)

### Template Literals
```javascript
const name = 'John';
const age = 25;
const message = `Hello, my name is ${name} and I'm ${age} years old.`;
```

### Destructuring
```javascript
// Array destructuring
const [first, second, third] = [1, 2, 3];

// Object destructuring
const person = { name: 'John', age: 25, city: 'Jakarta' };
const { name, age } = person;
```

### Spread Operator
```javascript
// Array spread
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];

// Object spread
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 };
```

## Peran JavaScript dalam Web Statis

Dalam arsitektur web statis, JavaScript berperan untuk:

1. **User Interaction**: Handling clicks, form submissions, etc.
2. **Dynamic Content**: Mengubah konten berdasarkan user action
3. **Animations**: Memberikan feedback visual
4. **Form Validation**: Validasi input sebelum submit
5. **Local Data**: Menyimpan data di browser
6. **API Integration**: Mengambil data dari external services

## Contoh Praktis: Interactive To-Do App

```javascript
class TodoApp {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.init();
    }

    init() {
        this.render();
        this.bindEvents();
    }

    bindEvents() {
        const form = document.getElementById('todoForm');
        const input = document.getElementById('todoInput');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (input.value.trim()) {
                this.addTodo(input.value.trim());
                input.value = '';
            }
        });
    }

    addTodo(text) {
        const todo = {
            id: Date.now(),
            text: text,
            completed: false
        };

        this.todos.push(todo);
        this.saveTodos();
        this.render();
    }

    toggleTodo(id) {
        this.todos = this.todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        this.saveTodos();
        this.render();
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveTodos();
        this.render();
    }

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    render() {
        const todoList = document.getElementById('todoList');
        todoList.innerHTML = '';

        this.todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = todo.completed ? 'completed' : '';
            li.innerHTML = `
                <span onclick="app.toggleTodo(${todo.id})">${todo.text}</span>
                <button onclick="app.deleteTodo(${todo.id})">Delete</button>
            `;
            todoList.appendChild(li);
        });
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new TodoApp();
});
```

## Best Practices

### 1. Code Organization
```javascript
// ❌ All in global scope
function doSomething() { }
var globalVar = 'bad';

// ✅ Module pattern or classes
const MyModule = {
    init() { },
    doSomething() { }
};

// ✅ Modern modules (ES6)
export class MyClass { }
export function myFunction() { }
```

### 2. Error Handling
```javascript
// ❌ No error handling
const data = JSON.parse(response);

// ✅ Proper error handling
try {
    const data = JSON.parse(response);
    processData(data);
} catch (error) {
    console.error('Failed to parse JSON:', error);
    showErrorMessage('Invalid data received');
}
```

### 3. Performance
```javascript
// ❌ Repeated DOM queries
for (let i = 0; i < 1000; i++) {
    document.getElementById('list').innerHTML += `<li>Item ${i}</li>`;
}

// ✅ Cache DOM elements and batch updates
const list = document.getElementById('list');
const items = [];
for (let i = 0; i < 1000; i++) {
    items.push(`<li>Item ${i}</li>`);
}
list.innerHTML = items.join('');
```

## Limitasi JavaScript dalam Web Statis

- **No Server Communication**: Terbatas pada client-side operations
- **SEO Limitations**: Content yang di-generate JavaScript sulit di-crawl
- **Performance**: Semua logic berjalan di browser
- **Security**: Semua kode terlihat oleh user
- **Browser Compatibility**: Harus mempertimbangkan berbagai browser

## Next Steps

Setelah memahami JavaScript:
1. **ES6+ Features**: Modern JavaScript syntax
2. **Frontend Frameworks**: React, Vue, Angular
3. **Build Tools**: Webpack, Vite, Rollup
4. **Testing**: Jest, Cypress
5. **Node.js**: JavaScript di server-side

JavaScript adalah jembatan antara web statis dan web dinamis - kuasai fundamentalnya untuk membuka peluang tak terbatas! 🚀⚡
