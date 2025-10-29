---
type: lesson
title: Frontend dalam SPA - Client-Side Rendering
focus: /public/app.js
---

<video src="/csr.m4v" autoplay loop muted></video>

Single Page Application (SPA) menggunakan Client-Side Rendering (CSR) sehingga frontend bertanggung jawab penuh untuk rendering UI, routing, dan state management. Semua logika presentasi berjalan di browser menggunakan JavaScript.

## Apa itu Frontend SPA?

Frontend SPA adalah:

- **Client-Side Rendering**: Rendering terjadi di browser
- **Dynamic Routing**: Navigasi tanpa page reload
- **State Management**: Mengelola application state di client
- **API Communication**: Berkomunikasi dengan backend via API
- **Component-Based**: UI dibuat dari komponen yang reusable

## Rendering di sisi client

```javascript
// onload
window.addEventListener("DOMContentLoaded", async function () {
  console.log("Page loaded");

  const data = await getNotes();
  renderNotes(data);
});

// Form Submission
form.addEventListener("submit", async function (event) {
  event.preventDefault();

  save_button.innerHTML = "Menyimpan...";
  save_button.disabled = true;

  if (title.value !== "" && note.value !== "" && category.value !== "") {
    const newNote = {
      title: title.value,
      note: note.value,
      category: category.value,
      id: Date.now(),
    };
    saveNote(newNote);

    // Clear Form
    title.value = "";
    note.value = "";
    category.value = "";
  }
  save_button.innerHTML = "Simpan";
  save_button.disabled = false;

  const data = await getNotes();
  renderNotes(data);
});

function renderNotes(data) {
  const notesHTML = data.map((note) => noteComponent(note)).join("");

  notes.innerHTML = notesHTML;
}
```

## Component Architecture

Kita sudah pernah membuat komponen note di sisi server dari bagian sebelumnya. Pindahkan saja ke JavaScript di sisi client untuk dapat digunakan.

```javascript
function noteComponent({ title, note }) {
  return `<div class="note">
    <h2 class="note__title">${title}</h2>
    <p class="note__body">
      ${note}
    </p>
    <div class="note__actions">
      <button class="note__btn note__view">View Detail</button>
      <button class="note__btn note__delete">Delete Note</button>
    </div>
  </div>`;
}
```

Dan di `public/index.html` bagian menampilkan notes diubah agar rendering di sisi client, bukan lagi menggunakan string replace seperti sebelumnya.

```html
<div class="notes" id="notes"></div>
```

## API Communication

```javascript
async function getNotes() {
  const res = await fetch("/api", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const notes = await res.json();
  console.log(notes);
  return notes;
}

async function saveNote(note) {
  // Save data
  try {
    await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  } catch (error) {
    console.error(error);
  }
}
```

## Beberapa Fitur SPA lainnya

- Client-Side Routing
- State Management
- Keuntungan Frontend SPA

## Keuntungan SPA

### 1. Rich User Experience

- **Smooth Navigation**: Tidak ada page reload
- **Instant Feedback**: Real-time updates
- **Interactive UI**: Complex interactions
- **App-like Feel**: Native app experience

### 2. Performa\*

- **Faster Navigation**: Setelah initial load
- **Caching**: Client-side caching
- **Optimistic Updates**: UI updates before server response
- **Background Loading**: Pre-fetch data
- **Bergantung kepada pengguna**: Performa tergantung kepada perangkat pengguna

### 3. Development Efficiency

- **Component Reusability**: DRY principle
- **Modern Tooling**: Rich ecosystem
- **Hot Reloading**: Fast development cycle
- **Testing**: Component-based testing

## Kesimpulan

Frontend SPA menawarkan:

- **Rich user experience** dengan interaktivitas tinggi
- **Component-based development** yang maintainable
- **Client-side routing** untuk smooth navigation
- **Real-time updates** dan dynamic content
