"use client";

import { useState, useRef } from "react";
import { X, Mail, LinkIcon, UserPlus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ZodTypeAny } from "zod";
import BaseFormComponent from "@/components/form-component"; 

interface InviteModalProps {
  title: string;
  description?: string;
  linkValue?: string;
  onClose: () => void;
  onInvite?: (values: any) => void;
  onAddEditor?: () => void;
  formSchema: ZodTypeAny;
  formFields: {
    name: string;
    label: string;
    type: "text" | "email" | "password" | "select" | "number" | "checkbox";
    options?: { label: string; value: string }[];
    placeholder?: string;
    inputClassName?: string;
    labelClassName?: string;
    wrapperClassName?: string;
  }[];
}

export default function InviteModal({
  title,
  description = "Choisissez une méthode d'invitation.",
  linkValue = "",
  onClose,
  onInvite,
  onAddEditor,
  formSchema,
  formFields,
}: InviteModalProps) {
  const [inviteMethod, setInviteMethod] = useState<"email" | "link">("email");
  const [copied, setCopied] = useState(false);
  const linkRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null!);


const copyLink = async () => {
  if (linkRef.current) {
    try {
      await navigator.clipboard.writeText(linkRef.current.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Échec de la copie :", err);
    }
  }
};

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[669px] mx-4">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sky-950 text-title-1 font-medium">{title}</h2>
            <button
              className="text-sky-950"
              onClick={onClose}
            >
              <X size={24} />
            </button>
          </div>

          <p className="text-sky-700 mb-4">{description}</p>
          <div className="-mx-6 border-t border-[#e2e4e9] my-4" />

          {/* Method selector */}
         <div className="flex items-center justify-start gap-6 border-b border-[#e2e4e9] mb-6">
          <p className="text-sky-950 text-body-2 py-2">Invite par</p>
          <div className="flex">
            {["email", "link"].map((method) => (
              <button
                key={method}
                className={`flex items-center px-4 relative py-2 ${
                  inviteMethod === method
                    ? "text-sky-950"
                    : "text-sky-700"
                }`}
                onClick={() => setInviteMethod(method as "email" | "link")}
              >
                {method === "email" ? (
                  <Mail className="mr-2" size={20} />
                ) : (
                  <LinkIcon className="mr-2" size={20} />
                )}
                {inviteMethod === method && (
                  <div className="absolute -bottom-[4px] -left-1 w-full h-1 bg-blue-500" />
                )}
              </button>
            ))}
          </div>
        </div>

          {/* Form or Link */}
          {inviteMethod === "email" ? (
            <div className="mb-6">
              <BaseFormComponent
                schema={formSchema}
                fields={formFields}
                onSubmit={onInvite!}
                className="space-y-4"
                key="invite-form-wrapper"
                showSubmitButton={false}
                formRef={formRef}
              />
            </div>
          ) : (
            <div className="mb-6">
              <label className="block text-body-2 text-sky-900 mb-2">
                Copier le lien pour les répondants
              </label>
              <Input
                ref={linkRef}
                readOnly
                value={linkValue}
                className="w-full h-[56px] border border-sky-500 rounded-lg p-3 text-body-2 text-sky-800"
              />
            </div>
          )}

          <div className="-mx-6 border-t border-[#e2e4e9] my-4" />

          {/* Footer */}
          <div className="flex items-center justify-between mt-4">
            <Button
              variant="ghost"
              className="text-small text-blue-500 h-[41px] flex items-center gap-2"
              onClick={onAddEditor}
            >
              <UserPlus size={20} />
              Ajouter un éditeur
            </Button>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="text-sky-800 border-none shadow-none h-[41px]"
                onClick={onClose}
              >
                Annuler
              </Button>
              {inviteMethod === "email" ? (
               <Button
  className="bg-[#1c5df3] h-[41px] text-white"
  onClick={() => {
    formRef.current?.requestSubmit();
  }}
>
  Envoyer l’invitation
</Button>
              ) : (
                <Button
                  className="h-[41px] w-[150px] bg-blue-500 flex items-center gap-2 text-body text-white"
                  onClick={copyLink}
                >
                  {copied && <Check size={16} />}
                  Copier
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
