import fs from "fs/promises";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "forms.json");

export async function readForms() {
  try {
    const data = await fs.readFile(DATA_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function writeForms(forms: any[]) {
  await fs.writeFile(DATA_PATH, JSON.stringify(forms, null, 2));
}
