"use client"

import { useRef, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Edit2, Camera } from "lucide-react"

export default function PersonalInfo() {
  const initialUser = {
    name: "LOKMAN imad",
    role: "Évaluateur",
    avatar: "/placeholder.svg",
  }

  const [user, setUser] = useState(initialUser)
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(user.name)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const newImage = reader.result as string
        setUser((prev) => ({ ...prev, avatar: newImage }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    setUser((prev) => ({
      ...prev,
      name: editedName,
    }))
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedName(user.name)
    setIsEditing(false)
  }

  return (
    <section>
      <h2 className="text-body font-semibold text-[#1c5df3] mb-4">Informations personnelles</h2>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <label htmlFor="avatar-upload" className="relative cursor-pointer">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user.avatar} alt="Photo de profil" />
              <AvatarFallback className="bg-[#dee0e1] text-[#5c6770]">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow">
              <Camera className="w-4 h-4 text-gray-600" />
            </div>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </label>

          <div>
            {isEditing ? (
              <div className="space-y-1">
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="border border-gray-300 h-[56px] rounded px-2 py-1 text-[20px] w-[250px]"
                />
                <p className="text-title text-[#9d9e9f]">{user.role}</p>
              </div>
            ) : (
              <>
                <h3 className="font-medium text-display-3 text-[#282829]">{user.name}</h3>
                <p className="text-title text-[#9d9e9f]">{user.role}</p>
              </>
            )}
          </div>
        </div>

        <div className="ml-4">
          {isEditing ? (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="ghost"
                className="text-blue-500 text-[20px]"
                onClick={handleSave}
              >
                Enregistrer
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-gray-500 text-[20px]"
                onClick={handleCancel}
              >
                Annuler
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="text-[20px] text-blue-500"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Modifier
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
