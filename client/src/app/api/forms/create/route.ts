import { NextRequest, NextResponse } from "next/server";
import { readForms, writeForms } from "@/lib/form-utils/dataStorage";

export async function POST(request: NextRequest) {
  try {
    const form = await request.json();
    const forms = await readForms();

    const newForm = { id: Date.now().toString(), ...form, createdAt: new Date().toISOString() };

    forms.push(newForm);
    await writeForms(forms);

    return NextResponse.json({ success: true, form: newForm }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to save form" }, { status: 500 });
  }
}
