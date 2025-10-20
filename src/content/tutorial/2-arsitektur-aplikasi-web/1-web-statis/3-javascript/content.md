---
type: lesson
title: JavaScript - Interaktivitas Web
focus: /index.html
---

# JavaScript: Menghidupkan Web dengan Interaktivitas

JavaScript adalah bahasa pemrograman yang memberikan interaktivitas dan dynamic behavior pada halaman web. Sebagai bahasa scripting client-side, JavaScript memungkinkan kita untuk manipulasi halaman, event handling, dan komunikasi dengan server.

## Apa itu JavaScript?

JavaScript adalah bahasa pemrograman yang:

- **Dynamic**: Dapat mengubah konten dan style secara real-time
- **Event-driven**: Merespon interaksi user seperti on click, on load, dsb
- **Interpreted**: Dijalankan langsung oleh browser
- **Versatile**: Bisa digunakan di frontend, backend, mobile, desktop

## Cara Menerapkan JavaScript

### 1. Inline JavaScript

```html
<button type="submit" id="save_button" onclick="alert('Hello!')">Simpan</button>
```

### 2. Internal JavaScript

```html
<button type="submit" onclick="sayHello('Jude')">Simpan</button>

<script>
  function sayHello(name) {
    alert("Halo " + name + "!");
  }
</script>
```

### 3. External JavaScript (Recommended)

```html
<script src="app.js"></script>
```

```javascript
// script.js
function sayHello(name) {
  alert(`Halo ${name}!`);
}
```

## Sintaks Dasar JavaScript

### Variables

```javascript
// Modern variable declarations
let name = "John";
const age = 25;
var oldStyle = "tidak direkomendasikan";

// Data types
let string = "Menyimpan...";
let number = 42;
save_button.disabled = true;
let array = [1, 2, 3, 4, 5];
let object = {
  title: "Catatan Pertama",
  note: "Ini catatan perdana",
  category: "personal",
};
let NOTES = [
  {
    title: "Catatan Pertama",
    note: "Ini catatan perdana",
    category: "personal",
  },
  { title: "Catatan Kedua", note: "Ini catatan kedua", category: "work" },
];
let nullValue = null;
nullString = "";
let undefinedValue = undefined;
```

### Functions

```javascript
// Function declaration
function greet(name) {
  return `Hello, ${name}!`;
}

// Function expression
const greetExp = function (name) {
  return `Hello, ${name}!`;
};

// Arrow function (ES6+)
const greetArrow = (name) => {
  return `Hello, ${name}!`;
};

// Shorthand arrow function
const greetShortArrow = (name) => `Hello, ${name}!`;
```

### Control Flow

```javascript
// Conditionals
if (title.value !== "" && note.value !== "" && category.value !== "") {
  const newNote = {
    title: title.value,
    note: note.value,
    category: category.value,
    id: Date.now(),
  };
  console.log(newNote);
}

// Loops
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// Modern array iteration
const numbers = [1, 2, 3, 4, 5];
numbers.forEach((num) => console.log(num));

const notesHTML = NOTES.map((note) => console.log(note.title));
```

## DOM Manipulation

DOM adalah singkatan dari Document Object Model, yaitu representasi struktur dokumen HTML sebagai objek yang dapat dimanipulasi menggunakan JavaScript.

### Selecting Elements

```javascript
// By ID
const form = document.getElementById("form");

// By class
const container = document.getElementsByClassName("container");

// By tag
const paragraphs = document.getElementsByTagName("p");

// Query selectors (recommended)
const button = document.querySelector("#save_button");
const notes = document.querySelectorAll(".notes");
```

### Modifying Elements

```javascript
// Change content
save_button.innerHTML = "Menyimpan...";
save_button.disabled = true;

// Change attributes
element.setAttribute("notes", "notes dark");
element.src = "logo.svg";

// Change styles
element.style.color = "tomato";
element.style.fontSize = "20px";

// Add/remove classes
element.classList.add("active");
element.classList.remove("inactive");
element.classList.toggle("highlight");
```

### Creating Elements

```javascript
// Create new element
const newDiv = document.createElement("div");
newDiv.textContent = "I am a new div";
newDiv.className = "created-element";

// Append to parent
document.body.appendChild(newDiv);

// Insert at specific position
const parent = document.getElementById("container");
parent.insertBefore(newDiv, parent.firstChild);
```

## Event Handling

### Adding Event Listeners

```javascript
// Click events
button_save.addEventListener("click", function () {
  console.log("Button clicked!");
});

// Form events
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent default form submission
  console.log("Form submitted");
});

// Input events
const input = document.getElementById("textInput");
input.addEventListener("input", (event) => {
  console.log("Input value:", event.target.value);
});
```

### Common Events

```javascript
// Mouse events
element.addEventListener("click", handler);
element.addEventListener("mouseover", handler);
element.addEventListener("mouseout", handler);

// Keyboard events
document.addEventListener("keydown", (event) => {
  console.log("Key pressed:", event.key);
});

// Window events
window.addEventListener("load", () => {
  console.log("Page loaded");
});

window.addEventListener("resize", () => {
  console.log("Window resized");
});
```

## Async Programming

### Async/Await

```javascript
// Async function
async function getData() {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Call async function
getData();
```

## Peran JavaScript dalam Web Statis

Dalam arsitektur web statis, JavaScript berperan untuk:

1. **User Interaction**: Menangani click, form submissions, dll.
2. **Dynamic Content**: Mengubah konten berdasarkan user action
3. **Animations**: Memberikan feedback visual
4. **Form Validation**: Validasi input sebelum submit
5. **Local Data**: Menyimpan data di browser
6. **API Integration**: Mengambil data dari external services

## Best Practices

### 1. Organisaasi Kode

```javascript
// ✅ Modern modules (ES6)
export class MyClass {}
export function myFunction() {}
```

### 2. Menangani Kesalahan

```javascript
// ❌ No error handling
await fetch("/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(newNote),
});

// ✅ Proper error handling
try {
  await fetch("/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newNote),
  });
} catch (error) {
  console.error(error);
}
```

## JavaScript untuk aplikasi Catatan

### Menangani Form submit

```javascript
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Disable save button
  save_button.innerHTML = "Menyimpan...";
  save_button.disabled = true;

  // Enable save button afer 2.5s
  setTimeout(function () {
    save_button.innerHTML = "Simpan";
    save_button.disabled = false;
  }, 2500);
});
```

### Menyiapkan data untuk disimpan

```js
if (title.value !== "" && note.value !== "" && category.value !== "") {
  const newNote = {
    title: title.value,
    note: note.value,
    category: category.value,
    id: Date.now(),
  };
  console.log(newNote);

  // Clear Form
  title.value = "";
  note.value = "";
  category.value = "";
}
```
