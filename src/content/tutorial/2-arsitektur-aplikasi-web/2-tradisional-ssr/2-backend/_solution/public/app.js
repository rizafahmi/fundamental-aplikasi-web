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
    console.log(newNote);

    // Save data

    // Clear Form
    title.value = "";
    note.value = "";
    category.value = "";
  }
  save_button.innerHTML = "Simpan";
  save_button.disabled = false;
});
