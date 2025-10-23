---
type: lesson
title: Frontend Framework
focus: /templates/index.html
---

## Frontend Framework

Sebagai simulasi mari kita lihat implementasi SPA dengan frontend framework. Disini saya contohkan dengan Vue. Kenapa Vue? Karena Vue, selain cukup populer dan mudah digunakan, untuk proyek catatan kita ini lebih cocok.

## Instalasi Vue

Vue adalah salah satu frontend framework yang tidak membutuhkan instalasi via npm di sisi client.

Cukup sematkan script dari CDN. Vue juga tidak membutuhkan transpilasi, build step dll sehingga menurut saya cocok digunakan untuk proyek ini.

Lalu tambahkan sebuah `<div id="app">` sebagai tempat untuk vue melakukan rendering.

```html
<!doctype html>
<html>
  <head>
    <title>Aplikasi Catatan</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div id="app" style="display: contents">
      <main class="container">
        <h1>Catatan</h1>
        <h3>Buat catatan baru</h3>
        <form @submit.prevent="handleSubmit">
          <label for="title"
            >Judul
            <input
              type="text"
              id="title"
              v-model="form.title"
              placeholder="Judul catatan"
              required
            />
          </label>
          <label for="note"
            >Catatan
            <textarea
              id="note"
              v-model="form.note"
              cols="30"
              rows="10"
              placeholder="Tulis catatan kamu disini..."
              required
            ></textarea>
          </label>
          <label for="category"
            >Kategori
            <select id="category" v-model="form.category" required>
              <option value="">-- Pilih Kategori --</option>
              <option value="personal">Pribadi</option>
              <option value="work">Kerjaan</option>
              <option value="other">Lainnya</option>
            </select>
          </label>

          <button type="submit" :disabled="isSaving">
            {{ isSaving ? 'Menyimpan...' : 'Simpan' }}
          </button>
        </form>
      </main>
      <aside>
        <h3>Catatan</h3>
        <div class="notes">
          <div v-for="note in notes" :key="note.id" class="note">
            <h2 class="note__title">{{ note.title }}</h2>
            <p class="note__body">{{ note.note }}</p>
            <div class="note__actions">
              <button class="note__btn note__view" @click="viewDetail(note)">
                View Detail
              </button>
              <button
                class="note__btn note__delete"
                @click="deleteNote(note.id)"
              >
                Delete Note
              </button>
            </div>
          </div>
        </div>
      </aside>
      <footer>&copy; 2025 Made with love for Domainesia</footer>
    </div>

    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script src="/app.js"></script>
  </body>
</html>
```

Kemudian di `app.js` ubah agar menggunakan vue.

```javascript
const { createApp } = Vue;

createApp({
  data() {
    return {
      notes: [],
      form: {
        title: "",
        note: "",
        category: "",
      },
      isSaving: false,
    };
  },

  methods: {
    async getNotes() {
      try {
        const notes = await getNotes();
        this.notes = notes;
        console.log("Notes loaded:", notes);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    },

    async handleSubmit() {
      this.isSaving = true;

      const newNote = {
        title: this.form.title,
        note: this.form.note,
        category: this.form.category,
        id: Date.now(),
      };

      console.log("Saving note:", newNote);

      await saveNote(newNote);

      // Clear form
      this.form.title = "";
      this.form.note = "";
      this.form.category = "";

      // Reload notes
      await this.getNotes();
      this.isSaving = false;
    },
  },

  async mounted() {
    console.log("Vue app mounted");
    await this.getNotes();
  },
}).mount("#app");

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

## Kesimpulan

Frontend framework seperti Vue, React atau Svelte dapat membantu kita membangun aplikasi web dengan lebih mudah dan terstruktur. Dengan menggunakan framework, kita dapat memanfaatkan fitur-fitur seperti komponen, state management, dan reaktivitas untuk membuat aplikasi yang dinamis dan interaktif.

Karena aplikasi kita masih cukup sederhana, penggunaan framework atau tanpa framework hampir tidak ada perbedaan signifikan secara developer experience (DX). Sehingga penggunaan vanilla js menjadi pilihan yang lebih baik dalam hal ini.

Lain halnya jika aplikasi kita lebih kompleks. Misalnya butuh fitur realtime, halaman lebih dari satu, ataupun butuh pengelolaan data (state) terpusat.
