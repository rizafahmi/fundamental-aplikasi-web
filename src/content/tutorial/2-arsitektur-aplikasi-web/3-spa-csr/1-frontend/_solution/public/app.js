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

function renderNotes(data) {
  const notesHTML = data.map((note) => noteComponent(note)).join("");

  notes.innerHTML = notesHTML;
}

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
