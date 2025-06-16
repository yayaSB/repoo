"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface ConfirmAlertProps {
  trigger: React.ReactNode
  title?: string
  description?: string
  confirmWord?: string
  confirmButtonText?: string
  confirmButtonClassName?: string
  cancelButtonText?: string
  cancelButtonClassName?: string
  onConfirm: () => void
}

export default function ConfirmAlert({
  trigger,
  title = "Êtes-vous sûr(e) ?",
  description = "Cette action est irréversible. Tapez SUPPRIMER pour confirmer.",
  confirmWord = "SUPPRIMER",
  confirmButtonText = "Supprimer",
  confirmButtonClassName = "bg-red-600 text-white hover:bg-red-700 disabled:opacity-50",
  cancelButtonText = "Annuler",
  cancelButtonClassName = "border text-gray-700 hover:bg-gray-100",
  onConfirm,
}: ConfirmAlertProps) {
  const [input, setInput] = useState("")

  const confirmed = input.trim().toUpperCase() === confirmWord.toUpperCase()

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[521px] rounded-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-[16px] text-sky-800">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={confirmWord}
          className="mt-2 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel className={cancelButtonClassName}>
            {cancelButtonText}
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={!confirmed}
            className={confirmButtonClassName}
            onClick={onConfirm}
          >
            {confirmButtonText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
