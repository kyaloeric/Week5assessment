type Note = {
    id: string;
    title: string;
    content: string;
    createdAt: string;
};


let titleInput = document.getElementById("title") as HTMLInputElement;
let contentInput = document.getElementById("content") as HTMLTextAreaElement;
let cancelButton = document.getElementById("cancelButton") as HTMLButtonElement;
let addNoteButton = document.getElementById("addNoteButton") as HTMLButtonElement;


function clearFormFields() {
    titleInput.value = "";
    contentInput.value = "";
}

// add a new note
function addNote() {
    
    const newNote: Note = {
        id: "", 
        title: titleInput.value,
        content: contentInput.value,
        createdAt: "", 
    };

    // POST request to add the new note
    fetch("http://localhost:4400/note/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
    })
        .then((response) => response.json())
        .then(() => {
            clearFormFields();
            fetchNotes();
        })
        .catch((error) => {
            console.error("Error adding a new note:", error);
        });
}

function CancelButton() {
    clearFormFields();
}

addNoteButton.addEventListener("click", addNote);

cancelButton.addEventListener("click", CancelButton);

function fetchNotes() {
    // GET request to fetch all notes
    fetch("http://localhost:4400/note/notes")
        .then((response) => response.json())
        .then((data: Note[]) => {
            let notesList = document.getElementById("notesList") as HTMLUListElement;
            notesList.innerHTML = "";

            data.forEach((note) => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                    <h3>Title: ${note.title}</h3>
                    <p>Content: ${note.content}</p>
                    <p>ID: ${note.id}</p>
                    <p>Created At: ${note.createdAt}</p>
                `;
                notesList.appendChild(listItem);
            });
        })
        .catch((error) => {
            console.error("Error fetching notes:", error);
        });
}

fetchNotes();
