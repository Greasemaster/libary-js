const myLibrary = ["hobbiten", "troll", "grisen", "hesten", "ja"];

function displayBooks() {
    const display = document.querySelector(".container-books");
    display.innerHTML = ""; // Clear previous content
    myLibrary.forEach((book, index) => {
        const myBookDiv = document.createElement("div");
        myBookDiv.classList.add("myBookDiv");
        myBookDiv.style = "background-color: red;";
        
        // Display book information
        if (typeof book === 'object') {
            myBookDiv.innerHTML = `${book.title} (${book.pages} pages, ${book.genre}) - ${book.read ? "Read" : "Not Read"}`;
        } else {
            myBookDiv.innerHTML = book; // Handle book strings
        }
        
        // Create delete button
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("deleteBtn");
        deleteButton.innerHTML = "Delete";
        deleteButton.addEventListener("click", () => deleteBook(index));
        myBookDiv.appendChild(deleteButton);
        
        display.appendChild(myBookDiv);
    });
}
displayBooks();

function addMyLibrary(book) {
    myLibrary.push(book);
    displayBooks(); // Update display
}

function Book(title, pages, genre, read) {
    this.title = title;
    this.pages = pages;
    this.genre = genre;
    this.read = read;
}

function handleFormSubmission(event) {
    event.preventDefault(); // Prevent form submission from refreshing the page
    const form = event.target;
    const title = form.title.value;
    const pages = form.pages.value;
    const genre = form.genre.value;
    const read = form.read.checked; // Get the checkbox value
    if (title && pages && genre) { // Ensure all fields are filled
        const book = new Book(title, pages, genre, read);
        addMyLibrary(book);
        form.reset(); // Clear the form
    } else {
        alert("Please fill in all fields.");
    }
}

function deleteBook(index) {
    myLibrary.splice(index, 1); // Remove book from array
    displayBooks(); // Update display
}

document.querySelector(".addBook").addEventListener("click", createForm);

function createForm() {
    const formContainer = document.querySelector(".container-form");

    const myForm = document.createElement("form");
    myForm.classList.add("myForm");
    myForm.action = ""; // Ensure no server request is made

    myForm.innerHTML = `
        <input type="text" name="title" placeholder="Book title" required>
        <input type="text" name="pages" placeholder="Pages in book" required>
        <input type="text" name="genre" placeholder="Which genre is the book in one word" required>
        <label>
            <input type="checkbox" name="read"> Read
        </label>
        <button type="submit" class="submitBtn">Add book</button>
    `;

    formContainer.appendChild(myForm);

    myForm.addEventListener("submit", handleFormSubmission);
}
