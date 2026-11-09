export const DAYS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];

export const FIELDS = ["type", "technique", "force", "endurance", "renforcement", "note"];

export const FIELD_LABELS = {
  type: "Type",
  technique: "Technique",
  force: "Force",
  endurance: "Endurance de force",
  renforcement: "Renforcement",
  note: "Note",
};

export const DEFAULT_PROGRAM = {
  lundi: {
    type: "Repos + pompes",
    technique: "-",
    force: "-",
    endurance: "100-200 pompes sur la journée",
    renforcement: "Renfo grip (dead hang 3x1min)",
    note: "-",
  },
  mardi: {
    type: "HDC",
    technique: "Progressions HSPU",
    force: "Pompes - 3x15 avec 2min repos",
    endurance: "Pyramide traction",
    renforcement: "Renfo Abdos - Pgrm 1",
    note: "Technique - Si pas assez de time juste un escalier",
  },
  mercredi: {
    type: "Jambes + gtg / figures",
    technique: "Dips - x5 en GTG + Progressions HSPU",
    force: "Jambes 1",
    endurance: "Burpees - EMOM 4 + Corde",
    renforcement: "Renfo Abdos - Pgrm 2",
    note: "-",
  },
  jeudi: {
    type: "HDC",
    technique: "Progressions Front-Lever",
    force: "Dips - 3 séries 80% (~5min repos)",
    endurance: "Traction - EMOM 4",
    renforcement: "Renfo Abdos - Pgrm 1",
    note: "-",
  },
  vendredi: {
    type: "Jambes",
    technique: "-",
    force: "Jambes 2",
    endurance: "Corde + Gammes",
    renforcement: "Renfo Abdos - Pgrm 2",
    note: "Gammes si possible sinon balec",
  },
  samedi: {
    type: "Intensité (traction)",
    technique: "GTG 5 tractions + Progressions HSPU",
    force: "Tractions - 5x4 +2kg",
    endurance: "Dips - 3 séries 80% (~5min repos)",
    renforcement: "Renfo Abdos - Pgrm 1",
    note: "-",
  },
  dimanche: {
    type: "Jambes + gtg / figures",
    technique: "Progressions HSPU - GTG",
    force: "Tractions - 3 séries 80% (~5min repos)",
    endurance: "Fractionné + Corde",
    renforcement: "Renfo Abdos - Pgrm 2",
    note: "-",
  },
};

export const PROGRAM_KEY = "sport1000.program";
const CHECKS_KEY = "sport1000.checks";

export function dayName(date = new Date()) {
  return DAYS[(date.getDay() + 6) % 7];
}

export function dayKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function mergeProgram(stored) {
  const program = structuredClone(DEFAULT_PROGRAM);
  if (!stored || typeof stored !== "object") return program;
  for (const day of DAYS) {
    for (const field of FIELDS) {
      const value = stored[day]?.[field];
      if (typeof value === "string") program[day][field] = value;
    }
  }
  return program;
}

export function getProgram() {
  return mergeProgram(readJSON(PROGRAM_KEY));
}

export function saveProgram(program) {
  try {
    localStorage.setItem(PROGRAM_KEY, JSON.stringify(program));
    return true;
  } catch {
    return false;
  }
}

export function resetProgram() {
  localStorage.removeItem(PROGRAM_KEY);
}

export function getChecks(date = new Date()) {
  const stored = readJSON(CHECKS_KEY);
  if (!stored || stored.date !== dayKey(date) || typeof stored.items !== "object") return {};
  return stored.items;
}

export function setCheck(field, checked, date = new Date()) {
  const items = getChecks(date);
  if (checked) items[field] = true;
  else delete items[field];
  try {
    localStorage.setItem(CHECKS_KEY, JSON.stringify({ date: dayKey(date), items }));
  } catch {
    // Sans stockage, la case fonctionne quand même pour la session en cours.
  }
}

function readJSON(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
