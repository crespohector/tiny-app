const submitNote = document.querySelector('.note-app-container button');
const noteInput = document.querySelector('.note-app-container textarea');
const notesWrapper = document.querySelector('.notes-wrapper');
const deleteNote = document.querySelector('.delete-note');
let totalNotesCreated = 0 // keep track of all notes

// keep notes persistent in user's web browser
readNotesInLocalStorage();

// create note
submitNote.addEventListener('click', () => {
    // check if input is empty
    if (!noteInput.value) return;

    // append new note element
    createNoteEl(noteInput.value);

    // check localstorage
    localStorage.setItem(`notes-${totalNotesCreated}`, noteInput.value)

    // reset input value
    noteInput.value = "";
})

// remove note
deleteNote.addEventListener('click', (e) => {
    // grab the note
    const parentNode = e.target.parentNode;
    console.dir(e.target.parentNode);
    // delete node
    parentNode.remove();
    // remove from localstorage
})

function readNotesInLocalStorage() {
    let length = localStorage.length;
    for (let i = 0; i < length; i++) {
        let key = localStorage.key(i);
        createNoteEl(localStorage.getItem(key));
    }
}

// helper function
function createNoteEl(val) {
    // append note element to the note wrapper
    const newNoteEl = document.createElement('div');
    const deleteBtn = document.createElement('div');
    newNoteEl.innerText = val;
    newNoteEl.classList.add('notes');
    deleteBtn.innerText = "X";
    deleteBtn.classList.add('delete-note');
    // add click event onto delete
    deleteBtn.addEventListener('click', (e) => {
        const parentNode = e.target.parentNode;
        // remove from localstorage
        const id = parentNode.dataset.notesId
        localStorage.removeItem(`notes-${id}`);
        // remove node from DOM
        parentNode.remove();
    })

    // store custom data in the html element
    totalNotesCreated += 1; // revised - collison of keys in localstorage
    newNoteEl.dataset.notesId = `${totalNotesCreated}`;
    notesWrapper.appendChild(newNoteEl);
    newNoteEl.appendChild(deleteBtn);
}
