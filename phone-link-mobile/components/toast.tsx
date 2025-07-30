"use client"

import { useEffect } from "react"
import { CheckCircle, XCircle, Info, X } from "lucide-react"

interface ToastProps {
  message: string
  type: "success" | "error" | "info"
  onClose: () => void
}

export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "error":
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <Info className="w-5 h-5 text-blue-500" />
    }
  }

  const getBgColor = () => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200"
      case "error":
        return "bg-red-50 border-red-200"
      default:
        return "bg-blue-50 border-blue-200"
    }
  }

  return (
    <div className="fixed top-4 left-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
      <div className={`rounded-xl border p-4 shadow-lg ${getBgColor()}`}>
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">{getIcon()}</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">{message}</p>
          </div>
          <button onClick={onClose} className="flex-shrink-0 p-1 hover:bg-white/50 rounded-lg transition-colors">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  )
}
