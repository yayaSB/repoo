import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Globe, Bell } from "lucide-react"

interface Props {
  emailNotifications: boolean
  setEmailNotifications: (value: boolean) => void
  weeklyDigest: boolean
  setWeeklyDigest: (value: boolean) => void
}

export default function Preferences({
  emailNotifications,
  setEmailNotifications,
  weeklyDigest,
  setWeeklyDigest,
}: Props) {
  return (
    <section>
      <h2 className="text-body font-semibold text-[#1c5df3] mb-4">Préférences générales</h2>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Globe className="w-5 h-5 text-[#737475]" />
            <span className="text-[#282829] text-title">Langue de l'interface</span>
          </div>
          <Select defaultValue="fr">
            <SelectTrigger className="w-[154px] h-[56px] text-body border-sky-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fr">Français FR</SelectItem>
              <SelectItem value="en">English EN</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="flex items-center space-x-3 mb-4">
            <Bell className="w-5 h-5 text-[#737475]" />
            <span className="text-[#282829] text-title">Notifications email</span>
          </div>
          <div className="space-y-4 ml-8">
            <div className="flex items-center justify-between">
              <span className="text-[#282829] text-title">Recevoir des rappels par email</span>
              <div className="flex items-center space-x-10">
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} className="data-[state=checked]:bg-[#1c5df3]" />
                <span className={`text-sm w-[80px] ${emailNotifications ? "text-[#1c5df3] text-[20px] " : "text-[#9d9e9f] text-[20px] "}`}>
                {emailNotifications ? "Active" : "Désactivé"}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#282829] text-title">Recevoir un résumé hebdomadaire</span>
              <div className="flex items-center space-x-10">
                <Switch checked={weeklyDigest} onCheckedChange={setWeeklyDigest} className="data-[state=checked]:bg-[#1c5df3]" />
                <span className={`text-sm w-[80px]  ${weeklyDigest ? "text-[#1c5df3] text-[20px]" : "text-[#9d9e9f] text-[20px]"}`}>
                {weeklyDigest ? "Active" : "Désactivé"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
