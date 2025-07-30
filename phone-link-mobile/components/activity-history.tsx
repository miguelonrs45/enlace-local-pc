"use client"

import { useState } from "react"
import { ArrowLeft, CheckCircle, XCircle, Clock, ImageIcon, FileText } from "lucide-react"

interface ActivityHistoryProps {
  onBack: () => void
}

interface ActivityItem {
  id: string
  fileName: string
  type: "photo" | "document"
  timestamp: string
  status: "success" | "failed" | "pending"
  size: string
}

export function ActivityHistory({ onBack }: ActivityHistoryProps) {
  const [activeFilter, setActiveFilter] = useState<"today" | "week" | "all">("all")

  const mockActivity: ActivityItem[] = [
    {
      id: "1",
      fileName: "IMG_001.jpg",
      type: "photo",
      timestamp: "2 minutes ago",
      status: "success",
      size: "2.4 MB",
    },
    {
      id: "2",
      fileName: "Document.pdf",
      type: "document",
      timestamp: "15 minutes ago",
      status: "success",
      size: "1.2 MB",
    },
    {
      id: "3",
      fileName: "IMG_002.jpg",
      type: "photo",
      timestamp: "1 hour ago",
      status: "failed",
      size: "1.8 MB",
    },
    {
      id: "4",
      fileName: "Presentation.pptx",
      type: "document",
      timestamp: "Yesterday",
      status: "success",
      size: "5.6 MB",
    },
    {
      id: "5",
      fileName: "IMG_003.jpg",
      type: "photo",
      timestamp: "2 days ago",
      status: "success",
      size: "3.1 MB",
    },
  ]

  const filters = [
    { id: "today", label: "Today" },
    { id: "week", label: "This Week" },
    { id: "all", label: "All Time" },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "failed":
        return <XCircle className="w-5 h-5 text-red-500" />
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getFileIcon = (type: string) => {
    return type === "photo" ? (
      <ImageIcon className="w-5 h-5 text-blue-500" />
    ) : (
      <FileText className="w-5 h-5 text-gray-500" />
    )
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 flex items-center space-x-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-xl font-semibold text-gray-900">Recent Activity</h1>
      </header>

      {/* Filter Tabs */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex space-x-1">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id as any)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeFilter === filter.id
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Activity List */}
      <div className="flex-1 overflow-y-auto">
        {mockActivity.length > 0 ? (
          <div className="p-4 space-y-3">
            {mockActivity.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start space-x-3">
                  {/* File Icon */}
                  <div className="flex-shrink-0 mt-0.5">{getFileIcon(item.type)}</div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{item.fileName}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {item.size} • {item.timestamp}
                        </p>
                      </div>

                      {/* Status */}
                      <div className="flex-shrink-0 ml-3">{getStatusIcon(item.status)}</div>
                    </div>

                    {/* Status Text */}
                    <div className="mt-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          item.status === "success"
                            ? "bg-green-100 text-green-700"
                            : item.status === "failed"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {item.status === "success" && "Sent successfully"}
                        {item.status === "failed" && "Failed to send"}
                        {item.status === "pending" && "Sending..."}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No activity yet</h3>
              <p className="text-gray-500 text-sm">Your file transfers will appear here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
