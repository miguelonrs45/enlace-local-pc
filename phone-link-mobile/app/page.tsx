"use client"

import { useState } from "react"
import { Dashboard } from "@/components/dashboard"
import { FileTransfer } from "@/components/file-transfer"
import { ActivityHistory } from "@/components/activity-history"
import { Toast } from "@/components/toast"

export default function PhoneLinkApp() {
  const [currentScreen, setCurrentScreen] = useState<"dashboard" | "files" | "activity">("dashboard")
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null)

  const showToast = (message: string, type: "success" | "error" | "info" = "info") => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "files":
        return <FileTransfer onBack={() => setCurrentScreen("dashboard")} showToast={showToast} />
      case "activity":
        return <ActivityHistory onBack={() => setCurrentScreen("dashboard")} />
      default:
        return <Dashboard onNavigate={setCurrentScreen} showToast={showToast} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-md mx-auto bg-white min-h-screen relative overflow-hidden">
        {renderScreen()}
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    </div>
  )
}
