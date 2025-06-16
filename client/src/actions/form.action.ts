import fs from "fs/promises";
import path from "path";
import { FormType, FormSettings, FormResponse, FormStats } from "@/@types/form.type";
import { defaultBackgroundColor, defaultPrimaryColor } from "@/constants/form-builder";
import { generateUniqueId } from "@/lib/form-utils/helper";

const DATA_PATH = path.join(process.cwd(), "data", "forms.json");

type DataFile = {
  forms: FormType[];
  formSettings: FormSettings[];
  formResponses: FormResponse[];
};

async function readDataFile(): Promise<DataFile> {
  try {
    const json = await fs.readFile(DATA_PATH, "utf-8");
    return JSON.parse(json);
  } catch {
    return { forms: [], formSettings: [], formResponses: [] };
  }
}

async function writeDataFile(data: DataFile) {
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2));
}

export async function fetchFormStats(): Promise<{ success: boolean } & Partial<FormStats>> {
  try {
    const { forms } = await readDataFile();

    const views = forms.reduce((acc, f) => acc + (f.views || 0), 0);
    const totalResponses = forms.reduce((acc, f) => acc + (f.responses || 0), 0);
    const totalForms = forms.length;

    const conversionRate = views > 0 ? (totalResponses / views) * 100 : 0;
    const engagementRate = totalForms > 0 ? (totalResponses / totalForms) * 100 : 0;

    return { success: true, views, totalForms, totalResponses, conversionRate, engagementRate };
  } catch {
    return { success: false };
  }
}

export async function createFormServer(data: { name: string; description: string }) {
  try {
    const fileData = await readDataFile();

    const settingsId = generateUniqueId();
    const settings: FormSettings = {
      id: settingsId,
      primaryColor: defaultPrimaryColor,
      backgroundColor: defaultBackgroundColor,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    fileData.formSettings.push(settings);

    const jsonBlocks = JSON.stringify([
      {
        id: generateUniqueId(),
        blockType: "RowLayout",
        attributes: {},
        isLocked: true,
        childblocks: [
          {
            id: generateUniqueId(),
            blockType: "Heading",
            attributes: {
              label: data.name || "Untitled form",
              level: 1,
              fontSize: "4x-large",
              fontWeight: "normal",
            },
          },
          {
            id: generateUniqueId(),
            blockType: "Paragraph",
            attributes: {
              label: "Paragraph",
              text: data.description || "Add a description here.",
              fontSize: "small",
              fontWeight: "normal",
            },
          },
        ],
      },
    ]);

    const formId = generateUniqueId();
    const newForm: FormType = {
      id: formId,
      formId,
      name: data.name,
      description: data.description,
      jsonBlocks,
      views: 0,
      responses: 0,
      published: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: "local-user",
      creatorName: "Local User",
      settingsId,
      settings,
      formResponses: [],
    };

    fileData.forms.push(newForm);

    await writeDataFile(fileData);

    return { success: true, message: "Form created successfully", form: newForm };
  } catch {
    return { success: false, message: "Something went wrong" };
  }
}

export async function fetchAllForms() {
  const { forms } = await readDataFile();
  return {
    success: true,
    message: "Forms fetched successfully",
    form: forms,
  };
}

export async function saveForm(data: { formId: string; name?: string; description?: string; jsonBlocks: string }) {
  try {
    const fileData = await readDataFile();
    const form = fileData.forms.find((f) => f.id === data.formId);
    if (!form) return { success: false, message: "Form not found" };

    if (data.name) form.name = data.name;
    if (data.description) form.description = data.description;
    form.jsonBlocks = data.jsonBlocks;
    form.updatedAt = new Date();

    await writeDataFile(fileData);

    return {
      success: true,
      message: "Form updated successfully",
      form,
    };
  } catch {
    return { success: false, message: "Failed to update form" };
  }
}

export async function updatePublish(formId: string, published: boolean) {
  try {
    const fileData = await readDataFile();
    const form = fileData.forms.find((f) => f.id === formId);
    if (!form) return { success: false, message: "Form not found" };

    form.published = published;
    form.updatedAt = new Date();

    await writeDataFile(fileData);

    return {
      success: true,
      message: `Form ${published ? "published" : "unpublished"}`,
      published: form.published,
    };
  } catch {
    return { success: false, message: "Failed to update publish status" };
  }
}

export async function fetchPublishFormById(formId: string) {
  const { forms } = await readDataFile();
  const form = forms.find((f) => f.id === formId && f.published);
  if (!form) return { success: false, message: "Form not found" };

  return {
    success: true,
    message: "Form fetched successfully",
    form,
  };
}

export async function submitResponse(formId: string, response: string) {
  try {
    const fileData = await readDataFile();
    const form = fileData.forms.find((f) => f.id === formId && f.published);
    if (!form) return { success: false, message: "Form not found or unpublished" };

    const newResponse: FormResponse = {
      id: generateUniqueId(),
      formId,
      jsonReponse: response,
      createdAt: new Date(),
    };

    fileData.formResponses.push(newResponse);
    form.responses++;
    form.formResponses.push(newResponse);
    form.updatedAt = new Date();

    await writeDataFile(fileData);

    return { success: true, message: "Response submitted" };
  } catch {
    return { success: false, message: "Failed to submit response" };
  }
}

export async function fetchAllResponseByFormId(formId: string) {
  const { forms } = await readDataFile();
  const form = forms.find((f) => f.id === formId);
  if (!form) return { success: false, message: "Form not found" };

  return {
    success: true,
    message: "Form fetched successfully",
    form,
  };
}
