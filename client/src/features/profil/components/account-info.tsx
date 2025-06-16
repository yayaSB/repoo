"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Edit2, Info, Lock, Eye, EyeOff } from "lucide-react"

const INITIAL_USER = {
  email: "lokmanImad@gmail.com",
  password: "ascac",
};
 const fields = [
    { label: "Email", key: "email" },
    { label: "Mot de passe", key: "password" },
  ]

export default function AccountInfo() {
  const [userData, setUserData] = useState(INITIAL_USER)
  const [formValues, setFormValues] = useState({ email: "", password: "" })
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [tempValue, setTempValue] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    setFormValues(userData)
  }, [userData])

 

  const handleChange = ()=>{
    alert("Mode Créateur activé !")
  }
  const handleEdit = (index: number) => {
    const key = fields[index].key as keyof typeof formValues
    setTempValue(formValues[key])
    setEditIndex(index)
    if (key === "password") setShowPassword(false)
  }

  const handleCancel = () => {
    setEditIndex(null)
    setTempValue("")
    setShowPassword(false)
  }

  const handleSave = (index: number) => {
    const key = fields[index].key as keyof typeof formValues
    const updated = { ...formValues, [key]: tempValue }
    setFormValues(updated)
    setUserData(updated)
    setEditIndex(null)
    setShowPassword(false)
  }

  return (
    <section>
      <h2 className="text-body font-semibold text-[#1c5df3] mb-4">Mon Compte</h2>
      <div className="space-y-6">
        {fields.map((item, index) => {
          const key = item.key as keyof typeof formValues
          const isPassword = key === "password"

          return (
            <div key={index} className="flex items-center justify-between">
              <div className="max-w-[300px] w-full">
                <p className="text-title text-sky-900 mb-1">{item.label}</p>

                {editIndex === index ? (
                  <div className="relative w-full">
                    <input
                      type={isPassword && !showPassword ? "password" : "text"}
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 h-[56px] text-[16px] w-full pr-10"
                    />
                    {isPassword && (
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                    )}
                  </div>
                ) : (
                  <p className="text-title text-sky-900">
                    {isPassword ? "••••••••" : formValues[key]}
                  </p>
                )}
              </div>

              <div className="ml-4">
                {editIndex === index ? (
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-500 font-medium text-[20px]"
                      onClick={() => handleSave(index)}
                    >
                      Enregistrer
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-500 font-medium text-[20px]"
                      onClick={handleCancel}
                    >
                      Annuler
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-500 font-medium text-[20px]"
                    onClick={() => handleEdit(index)}
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Modifier
                  </Button>
                )}
              </div>
            </div>
          )
        })}

        {/* Creator mode button */}
        <div className="pt-4">
          <Button className="p-4 h-[58px] w-[293px] bg-blue-500 text-white text-[20px]" onClick={handleChange}>
            <Lock className="w-4 h-4 mr-2" />
            Activer le mode Créateur
          </Button>
          <div className="flex items-start mt-3 text-body text-sky-900">
            <Info className="w-4 h-4 text-blue-300 mr-2 mt-1" />
            <p>
              Vous souhaitez créer des évaluations ?{" "}
              <span className="text-sky-950">Activez le mode Créateur à tout moment.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
