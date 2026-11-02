const ACCESS_CODE = "EVENT131";

const form = document.querySelector("#eventForm");
const typeSelect = document.querySelector("#ticketType");
const codeArea = document.querySelector("#codeArea");
const codeLabel = document.querySelector("#codeLabel");
const codeInput = document.querySelector("#code");
const errorsDiv = document.querySelector("#errors");
const ticketDiv = document.querySelector("#ticket");

// Show the hidden field once a type is chosen and set its label
typeSelect.addEventListener("change", () => {
  codeArea.classList.remove("hide");
  codeInput.required = true;
  codeInput.value = "";

  if (typeSelect.value === "student") {
    codeLabel.textContent = "Student I#";
    codeInput.inputMode = "numeric";
    codeInput.maxLength = 9;
  } else {
    codeLabel.textContent = "Access Code";
    codeInput.inputMode = "text";
    codeInput.maxLength = 8;
  }
});

// Today's date as YYYY-MM-DD in local time (same format as the date input)
function getToday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function validate() {
  const errors = [];
  const date = form.eventDate.value;
  const type = typeSelect.value;
  const code = codeInput.value.trim();

  if (date === "") {
    errors.push("Please choose an event date");
  } else if (date <= getToday()) {
    errors.push("Event date must be after today");
  }

  if (type === "student" && !/^\d{9}$/.test(code)) {
    errors.push("Student I# must be 9 digits");
  } else if (type === "guest" && code !== ACCESS_CODE) {
    errors.push("Access code is not valid");
  }

  return errors;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  errorsDiv.innerHTML = "";
  ticketDiv.innerHTML = "";

  const errors = validate();

  if (errors.length > 0) {
    errors.forEach((message) => {
      const p = document.createElement("p");
      p.textContent = message;
      errorsDiv.appendChild(p);
    });
    return;
  }

  showTicket();

  // Clear the form for the next ticket
  form.reset();
  codeArea.classList.add("hide");
  codeInput.required = false;
});

function showTicket() {
  const fullName = `${form.firstName.value.trim()} ${form.lastName.value.trim()}`;

  ticketDiv.innerHTML = `
    <h2>Ticket Created</h2>
    <p></p>
    <p></p>
    <p></p>
  `;

  // textContent keeps user input from being treated as HTML
  const lines = ticketDiv.querySelectorAll("p");
  lines[0].textContent = fullName;
  lines[1].textContent = typeSelect.value;
  lines[2].textContent = form.eventDate.value;
}
