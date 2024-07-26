class Book {
  constructor(name, author, length, read) {
    this.name = name;
    this.author = author;
    this.length = length;
    this.read = read;
  }
}

class Library {
  constructor() {
    this.library = [
      new Book("The Lord of the Rings", "Tolkien", 1077, "yes"),
      new Book("The Lord of the Rings", "Tolkien", 1077, "yes"),
      new Book("Rospo fa strada", "Tolkien", 1077, "yes"),
      new Book("a", "Tolkien", 1077, "no"),
      new Book("b", "Tolkien", 1077, "no"),
      new Book("c", "Tolkien", 1077, "no"),
    ];
  }

  addBookToLibrary(book) {
    this.library.push(book);
  }

  changeReadStatus(event) {
    let book_index = event.target.className.slice(-1);
    this.library[book_index]["read"] =
      this.library[book_index]["read"] === "no" ? "yes" : "no";
    this.showOnTable();
  }

  removeFromTable(event, row) {
    row.remove();
    let book_index = Number(event.target.id);
    this.library.splice(book_index, 1);
    this.showOnTable();
  }
  resetTable(table) {
    while (table.children.length >= 2) {
      table.removeChild(table.lastChild);
    }
  }

  showOnTable() {
    const table = document.querySelector("table");
    let row_number = 0;
    this.resetTable(table);
    console.log(library);
    for (let book of this.library) {
      let row = document.createElement("tr");
      for (let [key, property] of Object.entries(book)) {
        let td = document.createElement("td");
        td.textContent = property;
        if (key === "read") {
          let btn = document.createElement("button");
          btn.className = `read_change_${row_number}`;
          btn.addEventListener("click", (e) => {
            this.changeReadStatus.call(this, e);
          });
          if (row_number === 0) {
            td.id = "read_cell_first";
          }
          td.appendChild(btn);
          td.className = "read_cell";
        }
        row.appendChild(td);
      }
      let btn = document.createElement("button");
      btn.className = "delete_row";
      btn.id = String(row_number);
      btn.textContent = "Remove";
      btn.addEventListener("click", (e) => {
        this.removeFromTable.call(this, e, row);
      });
      let td = document.createElement("td");
      td.appendChild(btn);
      row.appendChild(td);
      table.appendChild(row);

      row_number++;
    }
  }
}

class DisplayController {
  constructor(library) {
    this.body = document.querySelector("body");
    this.add = document.querySelector(".add");
    this.library = library;
    this.setupAddButton(this.add);
  }

  changeBodyState(type) {
    this.body.className = type;
  }

  formSubmitChange(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.changeBodyState("normal");
      form.remove();
    });
  }

  createInput(type, id, placeholder = "", label_text, container) {
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
      input.addEventListener("change", (e) => {
        input.value = input.value === "no" ? "yes" : "no";
      });
    }
    div.appendChild(label);
    div.appendChild(input);
    container.appendChild(div);
  }

  createSubmitButton(form) {
    let submit = document.createElement("button");
    submit.addEventListener("click", (e) => {
      let inputs = document.querySelectorAll("input");
      let properties = {};
      for (let prop of inputs) {
        properties[prop.getAttribute("id")] = prop.value;
      }
      console.log(properties);
      let book = new Book(
        properties["book_name"],
        properties["author"],
        properties["book_length"],
        properties["read"]
      );
      this.library.addBookToLibrary(book);
      this.library.showOnTable();
    });
    submit.textContent = "Add book to library";
    form.appendChild(submit);
  }

  closeForm = (form) => {
    this.changeBodyState("normal");
    form.remove();
  };

  createCloseButton(form) {
    const btn = document.createElement("button");
    btn.className = "closeForm";
    btn.addEventListener("click", (e) => {
      this.closeForm(form);
    });
    return btn;
  }

  setupAddButton(add) {
    add.addEventListener("click", (e) => {
      /* allow only one form at a time */
      if (document.querySelector("form") !== null) {
        return;
      }

      this.changeBodyState("form");
      const form = document.createElement("form");
      let form_title = document.createElement("h2");
      form_title.textContent = "Book data:";
      form.appendChild(form_title);

      const closeButton = this.createCloseButton(form);
      form.appendChild(closeButton);

      const grid = document.createElement("div");
      grid.className = "form_grid";

      this.createInput("text", "book_name", "", "Title:", grid);
      this.createInput("text", "author", "", "Author:", grid);
      this.createInput("number", "book_length", "", "Number of Pages:", grid);
      this.createInput("checkbox", "read", "", "Already read?", grid);
      form.appendChild(grid);

      this.createSubmitButton.call(this, form);

      document.querySelector("body").appendChild(form);

      this.formSubmitChange(form);
    });
  }
}

const library = new Library();
const display = new DisplayController(library);
library.showOnTable();
