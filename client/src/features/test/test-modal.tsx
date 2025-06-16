"use client"

import { useState } from "react"
import InviteModal from "@/components/modal/invite-modal"
import { z } from "zod"
import { Button } from "@/components/ui/button"

export default function TestModal() {
  const [open, setOpen] = useState(false)

  const formSchema = z.object({
    email: z.string().email("Email invalide"),
    role: z.string().min(1, "Rôle requis"),
  })

  const formFields = [
    {
      name: "role",
      label: "Rôle à attribuer",
      type: "select" as const,
      options: [
        { label: "Admin", value: "admin" },
        { label: "Utilisateur", value: "user" },
      ],
      placeholder: "Choisir un rôle",
      labelClassName: "text-body",
      inputClassName: "text-sky-800 data-[placeholder=false]:text-black h-[56px] border  border-sky-500",
    },
    {
      name: "email",
      label: "À",
      type: "email" as const,
      placeholder: "exemple@domaine.com",
      labelClassName: "text-body",
      inputClassName: "placeholder:text-sky-800 h-[56px] border  border-sky-500",
    },
  ]

  return (
    <main className="flex justify-center items-center min-h-screen">
      <Button onClick={() => setOpen(true)}>Ouvrir modal</Button>

      {open && (
        <InviteModal
          title="Inviter un membre à la plateforme"
          description="Envoyez une invitation par email ou lien."
          linkValue="https://diagnosis.com/invite/ABC123"
          formSchema={formSchema}
          formFields={formFields}
          onClose={() => setOpen(false)}
          onInvite={(values) => {
            console.log("✅ Données soumises :", values)
            setOpen(false)
          }}
          
        />
      )}
    </main>
  )
}
