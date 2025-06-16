"use client"

import { Button } from "@/components/ui/button"
import ConfirmAlert from "@/components/modal/confirm-alert-modal"
import { Trash2, LogOut, AlertTriangle } from "lucide-react"

export default function SensitiveZone() {
  return (
    <section>
      <h2 className="text-body font-semibold text-blue-500 mb-4">Zone sensible</h2>
      <div className="space-y-4">
        <div className="flex space-x-3">
            {/* Delete account button with confirmation dialog */}
          <ConfirmAlert
            title="Êtes-vous sûr(e) ?"
            description="Cette action est irréversible. Tapez SUPPRIMER pour confirmer."
            confirmWord="SUPPRIMER"
            confirmButtonText="Supprimer"
            cancelButtonText="Annuler"
            confirmButtonClassName="bg-[#FFE2E2] text-[#D91213] border border-[#D91213] h-[42px] text-[16px]"
            cancelButtonClassName="border border-sky-600 text-sky-900 hover:bg-gray-100 h-[42px] text-[16px]"
            onConfirm={() => {
              console.log("Compte supprimé !")
            }}
            trigger={
              <Button
                variant="outline"
                className="border-red-600 border-2 bg-[#FFE2E2] h-[58px] w-[282px] text-red-600 text-[20px]"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Supprimer mon compte
              </Button>
            }
          />
          {/* Logout button*/}
          <Button
            variant="outline"
            className="border-sky-600 border-2 h-[58px] w-[282px] text-sky-900 text-[20px]"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Déconnexion
          </Button>
        </div>
        {/* Warning message */}
        <div className="flex items-start space-x-2 rounded-md">
          <AlertTriangle className="w-4 h-4 text-[#d91213] mt-0.5 flex-shrink-0" />
          <p className="text-sky-900">
            Une fois votre compte supprimé, toutes vos informations et historiques d'évaluations seront effacés de manière permanente.
          </p>
        </div>
      </div>
    </section>
  )
}
