class App {
  constructor() {
    this.notes = JSON.parse(localStorage.getItem('notes')) || [];
    this.title = '';
    this.text = '';
    this.id = '';

    this.$form = document.querySelector('#form');
    this.$notes = document.querySelector('#notes');
    this.$noteTitle = document.querySelector('#note-title');
    this.$noteText = document.querySelector('#note-text');
    this.$formButtons = document.querySelector('#form-buttons');
    this.$formCloseButton = document.querySelector('#form-close-button');
    this.$placeHolder = document.querySelector('#placeholder');
    this.$modal = document.querySelector('.modal');
    this.$modalTitle = document.querySelector('.modal-title');
    this.$modalText = document.querySelector('.modal-text');
    this.$modalCloseButton = document.querySelector('.modal-close-button');
    this.$colorTooltip = document.querySelector('#color-tooltip');

    this.render();
    console.log(this.notes);
    this.addEventListeners();
  }

  addEventListeners() {
    document.body.addEventListener('click', (e) => {
      this.handleFormClick(e);
      this.selectNote(e);
      this.openModal(e);
      this.deleteNote(e);
    });

    document.body.addEventListener('mouseover', (e) => {
      this.openToolTip(e);
    });

    document.body.addEventListener('mouseout', (e) => {
      this.closeToolTip(e);
    });

    this.$colorTooltip.addEventListener('mouseover', function () {
      this.style.display = 'flex';
    });

    this.$colorTooltip.addEventListener('mouseout', function () {
      this.style.display = 'none';
    });

    this.$colorTooltip.addEventListener('click', (e) => {
      const color = e.target.dataset.color;
      if (color) {
        this.editNoteColor(color);
      }
    });

    this.$form.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = this.$noteTitle.value;
      const text = this.$noteText.value;
      const hasNote = title || text;
      if (hasNote) {
        this.addNote({ title, text });
      }
    });

    this.$formCloseButton.addEventListener('click', (e) => {
      e.stopPropagation();
      this.closeForm();
    });

    this.$modalCloseButton.addEventListener('click', (e) => {
      this.closeModal();
    });
  }

  handleFormClick(e) {
    const isFormClicked = this.$form.contains(e.target);

    const title = this.$noteTitle.value;
    const text = this.$noteText.value;
    const hasNote = title || text;

    if (isFormClicked) {
      this.openForm();
    } else if (hasNote) {
      this.addNote({ title, text });
    } else {
      this.closeForm();
    }
  }

  openForm() {
    this.$form.classList.add('form-open');
    this.$noteTitle.style.display = 'block';
    this.$formButtons.style.display = 'block';
  }

  openModal(e) {
    if (e.target.matches('.toolbar-delete')) return;

    if (e.target.closest('.note')) {
      this.$modal.classList.toggle('open-modal');
      this.$modalTitle.value = this.title;
      this.$modalText.value = this.text;
    }
  }

  closeForm() {
    this.$form.classList.remove('form-open');
    this.$noteTitle.style.display = 'none';
    this.$formButtons.style.display = 'none';
    this.title = this.$noteTitle.value = '';
    this.text = this.$noteText.value = '';
  }

  closeModal(e) {
    this.editNote();
    this.$modal.classList.toggle('open-modal');
  }

  openToolTip(e) {
    if (!e.target.matches('.toolbar-color')) return;

    this.id = e.target.dataset.id;
    const noteCoords = e.target.getBoundingClientRect();
    const horizontal = noteCoords.left + window.scrollX;
    const vertical = window.scrollY - 20;
    this.$colorTooltip.style.transform = `translate(${horizontal}px, ${vertical}px)`;
    this.$colorTooltip.style.display = 'flex';
  }

  closeToolTip(e) {
    if (!e.target.matches('.toolbar-color')) return;
    this.$colorTooltip.style.display = 'none';
  }

  addNote({ title, text }) {
    const newNote = {
      title,
      text,
      color: 'white',
      id: this.notes.length > 0 ? this.notes[this.notes.length - 1].id + 1 : 1,
    };
    this.notes = [...this.notes, newNote];
    console.log(this.notes);
    this.render();
    this.closeForm();
  }

  editNote() {
    const title = this.$modalTitle.value;
    const text = this.$modalText.value;

    this.notes = this.notes.map((note) =>
      note.id === Number(this.id) ? { ...note, title, text } : note
    );
    this.render();
  }

  editNoteColor(color) {
    this.notes = this.notes.map((note) =>
      note.id === Number(this.id) ? { ...note, color } : note
    );
    this.render();
  }

  selectNote(e) {
    const $selectedNote = e.target.closest('.note');

    if (!$selectedNote) return;

    const [$noteTitle, $noteText] = $selectedNote.children;
    this.title = $noteTitle.textContent;
    this.text = $noteText.textContent;
    this.id = $selectedNote.dataset.id;
  }

  deleteNote(e) {
    e.stopPropagation();
    if (!e.target.matches('.toolbar-delete')) return;
    const id = e.target.dataset.id;
    this.notes = this.notes.filter((note) => note.id !== Number(id));
    this.displayNotes();
  }

  saveNotes() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  render() {
    this.saveNotes();
    this.displayNotes();
  }

  displayNotes() {
    const hasNotes = this.notes.length > 0;
    this.$placeHolder.style.display = hasNotes ? 'none' : 'flex';

    this.$notes.innerHTML = this.notes
      .map(
        (note) => `
	  <div style="background: ${note.color};" class="note" data-id=${note.id}>
	  <div class="${note.title && 'note-title'}">${note.title}</div>
	  <div class="note-text">${note.text}</div>
	  <div class="toolbar-container">
		<div class="toolbar">
			<i class="fa-thin fa-palette toolbar-color" data-id="${note.id}"></i>
			<img class="toolbar-delete" data-id="${note.id}" src="">
		</div>
	  </div>
	</div>
   `
      )
      .join('');
  }
}

new App();