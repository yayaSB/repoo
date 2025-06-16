"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Settings, LogOut, SquareUserRound } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import Image from "next/image"

interface ProfileModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const router = useRouter()
  const [userRole, setUserRole] = useState<"creator" | "evaluator">("creator")

  const user = {
    name: "Tahir Doha",
    role: userRole,
    avatar: "/icons/profile.svg",
  }

  const [isSwitchChecked, setIsSwitchChecked] = useState(false)

  if (!isOpen) return null

  const handleRoute= () => {
    // router.push(`/${user.role}/preference`)
    router.push(`/evaluator/preference`)
  }

  const nextRole = user.role === "creator" ? "evaluator" : "creator"
  const nextRoleLabel = nextRole === "creator" ? "Créateur" : "Évaluateur"

  const handleSwitch = () => {
    const newRole = userRole === "creator" ? "evaluator" : "creator";
    setUserRole(newRole);
    
    setIsSwitchChecked(true)

    setTimeout(() => {
      router.push(`/${nextRole}/dashboard`)
      onClose()
    }, 100) 
  }

  return (
    <div className="w-[266px] bg-white border border-[#e5e7eb] shadow-xl rounded-xl overflow-hidden z-50 relative animate-in fade-in-0 zoom-in-95 duration-200">
      {/* Profile Section */}
      <div className="p-4 pt-6">
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[#d2d4d5]">
            <Image src={user.avatar} alt="Profile picture" fill className="object-cover" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#282829]">{user.name}</h2>
            <p className="text-[#929aa0] text-sm">{user.role === "creator" ? "Créateur" : "Évaluateur"}</p>
          </div>
        </div>
      </div>

      <div className="h-px bg-[#dee0e1] mx-4" />

      {/* Preferences */}
      <div className="p-4">
        <button onClick={handleRoute} className="flex items-center gap-3 mb-4">
          <Settings className="w-5 h-5 text-sky-950" />
          <h3 className="text-base font-medium text-sky-900">Préférences</h3>
        </button>

        <div className="flex items-start gap-3">
          <SquareUserRound className={`w-5 h-5 mt-1 ${isSwitchChecked ? "text-sky-950" : "text-[#b9bbbc]"}`} />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className={`font-medium ${isSwitchChecked ? "text-[#282829]" : "text-[#b9bbbc]"}`}>
                {nextRoleLabel}
              </span>
              <Switch
                checked={isSwitchChecked}
                onCheckedChange={handleSwitch}
                className="data-[state=checked]:bg-blue-500"
              />
            </div>
            <p className="text-[10px] text-[#929aa0] leading-relaxed">
              Vous souhaitez activer le mode {nextRoleLabel.toLowerCase()} ?
              Activez ce mode à tout moment.
            </p>
          </div>
        </div>
      </div>

      <div className="h-px bg-[#dee0e1] mx-4" />

      {/* Log Out */}
      <div className="p-4 pt-2">
        <button className="flex items-center gap-3 text-[#d91213] hover:bg-[#ebedee] w-full p-2 rounded-lg transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Se déconnecter</span>
        </button>
      </div>
    </div>
  )
}
