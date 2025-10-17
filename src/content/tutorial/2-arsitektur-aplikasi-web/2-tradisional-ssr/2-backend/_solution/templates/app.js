// Form Submission
form.addEventListener("submit", function (event) {
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
    
    // Clear Form
    title.value = "";
    note.value = "";
    category.value = "";
    
  }
  
  setTimeout(function() {
    save_button.innerHTML = "Simpan";
    save_button.disabled = false;
  }, 2500)
});
