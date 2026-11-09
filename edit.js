import { DAYS, FIELDS, FIELD_LABELS, getProgram, resetProgram, saveProgram } from "./program.js";

const LONG_FIELDS = new Set(["technique", "force", "endurance", "renforcement", "note"]);
const form = document.querySelector("#editor");
const fields = document.querySelector("#fields");
const status = document.querySelector("#status");
const program = getProgram();

for (const day of DAYS) {
  const fieldset = document.createElement("fieldset");
  const legend = document.createElement("legend");
  legend.textContent = `${day[0].toUpperCase()}${day.slice(1)}`;
  fieldset.append(legend);

  for (const field of FIELDS) {
    const id = `${day}-${field}`;
    const label = document.createElement("label");
    label.htmlFor = id;
    label.textContent = FIELD_LABELS[field];

    const control = document.createElement(LONG_FIELDS.has(field) ? "textarea" : "input");
    control.id = id;
    control.name = `${day}.${field}`;
    control.value = program[day][field];
    if (control.tagName === "TEXTAREA") control.rows = 2;

    fieldset.append(label, control);
  }
  fields.append(fieldset);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const updated = {};
  for (const day of DAYS) {
    updated[day] = {};
    for (const field of FIELDS) {
      updated[day][field] = form.elements[`${day}.${field}`].value.trim();
    }
  }
  status.textContent = saveProgram(updated)
    ? "Enregistré."
    : "Impossible d'enregistrer dans ce navigateur.";
});

form.addEventListener("input", () => {
  status.textContent = "";
});

document.querySelector("#reset").addEventListener("click", () => {
  if (confirm("Remettre le programme d'origine ?")) {
    resetProgram();
    location.reload();
  }
});
