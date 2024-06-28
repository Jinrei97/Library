const library = [
    new Book("The Lord of the Rings", "Tolkien", 1077, "yes"),
    new Book("The Lord of the Rings", "Tolkien", 1077, "yes"),
    new Book("Rospo fa strada", "Tolkien", 1077, "yes")
];

function Book(name, author, length, read) {
    this.name = name;
    this.author = author;
    this.length = length;
    this.read = read;
}

function addBookToLibrary(book) {
    library.push(book);
}

function resetTable(table) {
    while (table.children.length >= 2) {
        table.removeChild(table.lastChild);
    }
}

function showOnTable() {
    const table = document.querySelector("table");
    resetTable(table);
    for (let book of library) {
        console.log(book)
        let row = document.createElement("tr");
        for (let property of Object.values(book)) {
            console.log(property);
            let td = document.createElement("td");
            td.textContent = property;
            row.appendChild(td);
        }
        table.appendChild(row);
    }
}
showOnTable();
