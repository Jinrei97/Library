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
        let row = document.createElement("tr");
        for (let property of Object.values(book)) {
            let td = document.createElement("td");
            td.textContent = property;
            row.appendChild(td);
        }
        table.appendChild(row);
    }
}
showOnTable();

function changeBodyState(type) {
   document.querySelector("body").className = type;
}

function preventDefault(form) {
    form.addEventListener("submit", e => {
        e.preventDefault();
    });
};

const add = document.querySelector(".add");
add.addEventListener("click", e => {
    changeBodyState("form");

    const form = document.createElement("form");
    let form_title = document.createElement("h2");
    form_title.textContent = "Book data:";
    form.appendChild(form_title);

    const grid = document.createElement("div");
    grid.className = "form_grid";

    function createInput(type, id, placeholder="", label_text, value="") {
        let div = document.createElement("div");
        div.className = "container";        
        let label = document.createElement("label");
        let input = document.createElement("input");
        label.textContent = label_text;
        label.setAttribute("for", id);
        input.setAttribute("type", type);
        input.setAttribute("id", id);
        input.setAttribute("name", id);
        input.setAttribute("placeholder", placeholder);
        if (type === "checkbox") {
            input.value = "no";
            input.addEventListener("change", e => {
                input.value = (input.value === "no") ? "yes" : "no";
            });
        };

        div.appendChild(label);     
        div.appendChild(input);
        grid.appendChild(div);
    }

    createInput("text", "book_name", "", "Title:");
    createInput("text", "author", "", "Author:");
    createInput("number", "book_length", "", "Number of Pages:");
    createInput("checkbox", "read", "", "Already read?");
    form.appendChild(grid);

    let submit = document.createElement("button");
    submit.addEventListener("click", e => {
        let inputs = document.querySelectorAll("input");
        let properties = {};
        for (let prop of inputs) {
            properties[prop.getAttribute("id")] = prop.value;
        }
        console.log(properties);
        let book = new Book(properties["book_name"],
            properties["author"],
            properties["book_length"],
            properties["read"]
        );
        addBookToLibrary(book);
        showOnTable();
    });
    submit.textContent = "Add book to library";
    form.appendChild(submit);

    document.querySelector("body").appendChild(form);

    preventDefault(form);
});
