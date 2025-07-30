"use client"

import { useState } from "react"
import { ImageIcon, FileText, Clock, Settings, Smartphone, Monitor } from "lucide-react"

interface DashboardProps {
  onNavigate: (screen: "dashboard" | "files" | "activity") => void
  showToast: (message: string, type?: "success" | "error" | "info") => void
}

export function Dashboard({ onNavigate, showToast }: DashboardProps) {
  const [isConnected, setIsConnected] = useState(true)
  const [pcName] = useState("DESKTOP-PC123")

  const quickActions = [
    {
      title: "Send Photos",
      icon: ImageIcon,
      action: () => onNavigate("files"),
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Send Files",
      icon: FileText,
      action: () => onNavigate("files"),
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Recent Activity",
      icon: Clock,
      action: () => onNavigate("activity"),
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Settings",
      icon: Settings,
      action: () => showToast("Settings coming soon!"),
      color: "bg-gray-50 text-gray-600",
    },
  ]

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-900">Phone Link</h1>
      </header>

      {/* Content */}
      <div className="flex-1 px-6 py-6 space-y-6">
        {/* Connection Status Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex items-center space-x-2">
              <Smartphone className="w-5 h-5 text-gray-600" />
              <div className="w-4 h-0.5 bg-gray-300"></div>
              <Monitor className="w-5 h-5 text-gray-600" />
            </div>
            <div className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}></div>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-medium text-gray-900">
              {isConnected ? `Connected to ${pcName}` : "Not Connected"}
            </h2>
            <p className="text-gray-600 text-sm">
              {isConnected ? "Your phone is connected to your PC" : "Connect your phone to get started"}
            </p>
          </div>
        </div>

        {/* Welcome Message */}
        {isConnected && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Welcome back!</h3>
            <p className="text-gray-600 text-sm">Share files, photos, and stay connected across your devices.</p>
          </div>
        )}

        {/* Quick Actions Grid */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-left hover:shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                disabled={!isConnected && action.title !== "Settings"}
              >
                <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-4`}>
                  <action.icon className="w-6 h-6" />
                </div>
                <h4 className="font-medium text-gray-900 mb-1">{action.title}</h4>
                <p className="text-xs text-gray-500">
                  {action.title === "Send Photos" && "Share images instantly"}
                  {action.title === "Send Files" && "Transfer documents"}
                  {action.title === "Recent Activity" && "View transfer history"}
                  {action.title === "Settings" && "App preferences"}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
