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
        const res = await fetch("/api", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const notes = await res.json();
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

      try {
        await fetch("/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newNote),
        });

        // Clear form
        this.form.title = "";
        this.form.note = "";
        this.form.category = "";

        // Reload notes
        await this.getNotes();
      } catch (error) {
        console.error("Error saving note:", error);
      } finally {
        this.isSaving = false;
      }
    },
  },

  async mounted() {
    console.log("Vue app mounted");
    await this.getNotes();
  },
}).mount("#app");
