import test from "node:test";
import assert from "node:assert/strict";
import {
  DAYS,
  DEFAULT_PROGRAM,
  FIELDS,
  dayKey,
  dayName,
  mergeProgram,
} from "./program.js";

test("chaque jour a toutes ses cases", () => {
  for (const day of DAYS) {
    for (const field of FIELDS) {
      assert.equal(typeof DEFAULT_PROGRAM[day][field], "string", `${day}.${field}`);
    }
  }
});

test("le jour et la clé suivent la date locale", () => {
  assert.equal(dayName(new Date(2026, 10, 9)), "lundi");
  assert.equal(dayName(new Date(2026, 10, 15)), "dimanche");
  assert.equal(dayKey(new Date(2026, 0, 5)), "2026-01-05");
});

test("les modifications écrasent le programme par défaut", () => {
  const merged = mergeProgram({ mardi: { force: "Pompes lestées" } });
  assert.equal(merged.mardi.force, "Pompes lestées");
  assert.equal(merged.mardi.technique, DEFAULT_PROGRAM.mardi.technique);
  assert.equal(merged.lundi.force, DEFAULT_PROGRAM.lundi.force);
});

test("une case vidée reste vide", () => {
  assert.equal(mergeProgram({ vendredi: { note: "" } }).vendredi.note, "");
});
