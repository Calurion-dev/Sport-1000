import { FIELD_LABELS, dayName, getChecks, getProgram, setCheck } from "./program.js";

const CHECKABLE = ["technique", "force", "endurance", "renforcement"];
const date = new Date();
const day = dayName(date);
const program = getProgram()[day];
const checks = getChecks(date);
const workout = document.querySelector("#workout");

document.querySelector("#day").textContent = day;
document.querySelector("#date").textContent = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
}).format(date);

const type = document.querySelector("#type");
type.textContent = program.type;
type.hidden = program.type.trim() === "";

for (const field of CHECKABLE) {
  const value = program[field].trim();
  if (!value || value === "-") continue;
  workout.append(checkRow(field, value, checks[field] === true));
}

const note = program.note.trim();
if (note && note !== "-") workout.append(noteBlock(note));

if (!workout.children.length) {
  const empty = document.createElement("p");
  empty.className = "empty";
  empty.textContent = "Rien de prévu aujourd'hui.";
  workout.append(empty);
}

document.title = `${day[0].toUpperCase()}${day.slice(1)} — Sport-1000`;

// Un autre onglet a modifié le programme : on recharge pour rester à jour.
window.addEventListener("storage", () => location.reload());

function checkRow(field, value, checked) {
  const row = document.createElement("label");
  row.className = "row";
  row.classList.toggle("done", checked);

  const input = document.createElement("input");
  input.type = "checkbox";
  input.checked = checked;
  input.setAttribute("aria-label", FIELD_LABELS[field]);
  input.addEventListener("change", () => {
    setCheck(field, input.checked);
    row.classList.toggle("done", input.checked);
  });

  const content = document.createElement("span");
  content.className = "content";
  const label = document.createElement("span");
  label.className = "label";
  label.textContent = FIELD_LABELS[field];
  const text = document.createElement("span");
  text.className = "value";
  text.textContent = value;
  content.append(label, text);

  const box = document.createElement("span");
  box.className = "box";
  box.setAttribute("aria-hidden", "true");

  row.append(input, box, content);
  return row;
}

function noteBlock(note) {
  const block = document.createElement("p");
  block.className = "note";
  const label = document.createElement("span");
  label.className = "note-label";
  label.textContent = FIELD_LABELS.note;
  const text = document.createElement("span");
  text.className = "value";
  text.textContent = note;
  block.append(label, text);
  return block;
}
