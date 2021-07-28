let googleUserId, editedNoteId;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUserId = user.uid;
      getNotes(googleUserId);
    } else {
      // If not logged in, navigate back to login page.
      window.location = 'index.html'; 
    };
  });
};

const getNotes = (userId) => {
  const notesRef = firebase.database().ref(`users/${userId}`);
  notesRef.on('value', (snapshot) => {
    const data = snapshot.val();
    renderDataAsHtml(data);
  });
};

const renderDataAsHtml = (data) => {
  let cards = ``;
  let list = []
  for(const noteItem in data) {
      list.push(noteItem);
  };
  list.sort();
  for(var i = 0; i < list.length; i++){
    const note = data[list[i]];
    // For each note create an HTML card
    cards += createCard(note, list[i]);
  }
  // Inject our string of HTML into our viewNotes.html page
  document.querySelector('#app').innerHTML = cards;
};

const createCard = (note, noteId) => {
return `
    <div class="column is-one-quarter">
         <div class="card">
             <header class="card-header">
                 <p class="card-header-title">${note.title}</p>
             </header>
             <div class="card-content">
                 <div class="content">${note.text}</div>
             </div>
             <footer class="card-footer">
                <a id="${noteId}" href="#" class="card-footer-item"
                    onclick="deleteNote('${noteId}')">
                    Delete
                </a>
                <a href="#" class="card-footer-item"
                    onclick="editNote('${noteId}')">
                    Edit
            </footer>
        </div>
    </div>
`;
};

const deleteNote = (noteId) =>{
    alert("Are you sure you want to delete it?");
    firebase.database().ref(`users/${googleUserId}/${noteId}`).remove();
};

const editNote = (noteId) =>{
    console.log(`Editing note: ${noteId}`)
    // Show the modal dialog
    const editNoteModal = document.querySelector("#editNoteModal");

    editedNoteId = noteId
    // Get the text from the note in the database
    const noteRef = firebase.database().ref(`user/${googleUserId}/${noteId}`);
    noteRef.on('value', snapshot =>{
        const data = snapshot.val();
        console.log(data)
    
        document.querySelector("#editTitleInput").value = data.title;
        document.querySelector("#editTextInput").value = data.text
        // Show the text from the database in the modal
        
        // Set the text into an editable form.
        const saveButton = document.querySelector("#save-note");
        saveButton.onclick =() => {
            saveEditedNote(noteId);
        }
    });


    // Save the updated text to the database
    editNoteModal.classList.toggle(`is-active`);
    // Hide the modal box... once the user has made thier changed
};

const closeEditModal = () =>{
    const editNoteModal = document.querySelector("#editNoteModal");
    editNoteModal.classList.toggle(`is-active`)
}

const saveEditedNote = (noteId) => {
    const newTitle = document.querySelector("#editTitleInput").value
    const newNote = document.querySelector("#editTextInput").value
    firebase.database().ref(`users/${googleUserId}/${editedNoteId}`)
        .update({
            title: newTitle,
            text: newNote
        })
    closeEditModal();
};