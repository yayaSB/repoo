"use client"

import { useState } from "react"
import Header from "@/components/header"
import PersonalInfoSection from "./personal-info"
import AccountInfoSection from "./account-info"
import GeneralPreferencesSection from "./preferences"
import SensitiveZoneSection from "./sensitive-zone"

interface ProfilViewProps {
  role: "creator" | "evaluator";
}

export default function AccountSettings({ role }: ProfilViewProps) {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [weeklyDigest, setWeeklyDigest] = useState(false)

  return (
    <div className="max-h-screen overflow-y-auto  bg-[#f7f9fa]">
      <Header
        withMenu={true}
        withLinks={false}
        showLogoLink={true}
        showProfile={true}
        role={role}
       />

      <main className="container px-6 py-22">
        <h1 className="text-2xl font-semibold text-[#282829] mb-5">Paramètres du compte</h1>

        <div className="bg-white border border-[#ebedee] rounded-lg p-6 space-y-8">
          <PersonalInfoSection />
          <hr className="border-[#ebedee]" />
          <AccountInfoSection />
          <hr className="border-[#ebedee]" />
          <GeneralPreferencesSection
            emailNotifications={emailNotifications}
            setEmailNotifications={setEmailNotifications}
            weeklyDigest={weeklyDigest}
            setWeeklyDigest={setWeeklyDigest}
          />
          <hr className="border-[#ebedee]" />
          <SensitiveZoneSection />
        </div>
      </main>
    </div>
  )
}
