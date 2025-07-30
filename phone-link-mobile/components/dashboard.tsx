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
        <div className="relative bg-gradient-to-br from-white via-white to-blue-50/30 rounded-2xl shadow-lg border border-gray-100 p-6 overflow-hidden hover:shadow-xl transition-all duration-500 group">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-green-500/5 to-transparent rounded-full translate-y-12 -translate-x-12"></div>

          {/* Connection visualization */}
          <div className="relative flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              {/* Device connection animation */}
              <div className="relative flex items-center space-x-3">
                <div className="relative">
                  <Smartphone className="w-6 h-6 text-blue-600 transform group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute -inset-1 bg-blue-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Animated connection line */}
                <div className="relative flex items-center">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-blue-400 to-green-400 rounded-full"></div>
                  {isConnected && (
                    <>
                      <div className="absolute inset-0 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-green-400 rounded-full animate-pulse"></div>
                      <div className="absolute left-0 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-75"></div>
                      <div className="absolute right-0 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-75 animation-delay-500"></div>
                    </>
                  )}
                </div>

                <div className="relative">
                  <Monitor className="w-6 h-6 text-green-600 transform group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute -inset-1 bg-green-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>

            {/* Status indicator with pulse animation */}
            <div className="relative">
              <div className={`w-4 h-4 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"} shadow-lg`}></div>
              {isConnected && (
                <>
                  <div className="absolute inset-0 w-4 h-4 bg-green-500 rounded-full animate-ping opacity-30"></div>
                  <div className="absolute inset-0.5 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </>
              )}
              {!isConnected && (
                <div className="absolute inset-0 w-4 h-4 bg-red-500 rounded-full animate-pulse opacity-60"></div>
              )}
            </div>
          </div>

          {/* Content with slide-in animation */}
          <div className="relative space-y-3 transform group-hover:translate-y-[-2px] transition-transform duration-300">
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
                {isConnected ? `Connected to ${pcName}` : "Not Connected"}
              </h2>
              {isConnected && (
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-green-500 rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-green-500 rounded-full animate-bounce animation-delay-100"></div>
                  <div className="w-1 h-1 bg-green-500 rounded-full animate-bounce animation-delay-200"></div>
                </div>
              )}
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              {isConnected ? "Your phone is connected to your PC" : "Connect your phone to get started"}
            </p>

            {/* Connection details */}
            {isConnected && (
              <div className="flex items-center space-x-4 pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center space-x-1 text-xs text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Secure Connection</span>
                </div>
                <div className="flex items-center space-x-1 text-xs text-blue-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span>Real-time Sync</span>
                </div>
              </div>
            )}
          </div>

          {/* Hover effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
        </div>

        {/* Welcome Message */}
        {isConnected && (
          <div className="relative bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-6 border border-blue-100 overflow-hidden group hover:shadow-lg transition-all duration-500">
            {/* Animated background elements */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-purple-400/10 to-transparent rounded-full animate-pulse animation-delay-1000"></div>

            {/* Floating particles */}
            <div className="absolute top-4 right-8 w-1 h-1 bg-blue-400 rounded-full animate-bounce animation-delay-300"></div>
            <div className="absolute top-8 right-12 w-1 h-1 bg-purple-400 rounded-full animate-bounce animation-delay-700"></div>
            <div className="absolute bottom-6 left-8 w-1 h-1 bg-indigo-400 rounded-full animate-bounce animation-delay-500"></div>

            <div className="relative z-10 transform group-hover:scale-[1.02] transition-transform duration-300">
              <div className="flex items-center space-x-2 mb-3">
                <h3 className="text-xl font-semibold text-gray-900">Welcome back!</h3>
                <div className="text-2xl animate-bounce">👋</div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                Share files, photos, and stay connected across your devices seamlessly.
              </p>

              {/* Progress bar animation */}
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="flex items-center space-x-2 text-xs text-gray-600">
                  <span>Connection strength:</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-1.5 max-w-24">
                    <div className="bg-gradient-to-r from-green-400 to-blue-500 h-1.5 rounded-full w-5/6 animate-pulse"></div>
                  </div>
                  <span className="text-green-600 font-medium">Excellent</span>
                </div>
              </div>
            </div>
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
