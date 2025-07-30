"use client"

import { useState } from "react"
import { ArrowLeft, ImageIcon, FileText, FolderOpen, Check, Upload } from "lucide-react"

interface FileTransferProps {
  onBack: () => void
  showToast: (message: string, type?: "success" | "error" | "info") => void
}

interface FileItem {
  id: string
  name: string
  type: "photo" | "document" | "other"
  size: string
  thumbnail?: string
}

export function FileTransfer({ onBack, showToast }: FileTransferProps) {
  const [activeTab, setActiveTab] = useState<"photos" | "documents" | "all">("photos")
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [isTransferring, setIsTransferring] = useState(false)
  const [transferProgress, setTransferProgress] = useState(0)

  const mockFiles: FileItem[] = [
    { id: "1", name: "IMG_001.jpg", type: "photo", size: "2.4 MB", thumbnail: "/placeholder.svg?height=80&width=80" },
    { id: "2", name: "IMG_002.jpg", type: "photo", size: "1.8 MB", thumbnail: "/placeholder.svg?height=80&width=80" },
    { id: "3", name: "Document.pdf", type: "document", size: "1.2 MB" },
    { id: "4", name: "IMG_003.jpg", type: "photo", size: "3.1 MB", thumbnail: "/placeholder.svg?height=80&width=80" },
    { id: "5", name: "Presentation.pptx", type: "document", size: "5.6 MB" },
    { id: "6", name: "IMG_004.jpg", type: "photo", size: "2.9 MB", thumbnail: "/placeholder.svg?height=80&width=80" },
  ]

  const filteredFiles = mockFiles.filter((file) => {
    if (activeTab === "photos") return file.type === "photo"
    if (activeTab === "documents") return file.type === "document"
    return true
  })

  const tabs = [
    { id: "photos", label: "Photos", icon: ImageIcon },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "all", label: "All Files", icon: FolderOpen },
  ]

  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles((prev) => (prev.includes(fileId) ? prev.filter((id) => id !== fileId) : [...prev, fileId]))
  }

  const handleSendFiles = async () => {
    if (selectedFiles.length === 0) return

    setIsTransferring(true)
    setTransferProgress(0)

    // Simulate file transfer progress
    const interval = setInterval(() => {
      setTransferProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsTransferring(false)
          setSelectedFiles([])
          showToast(`${selectedFiles.length} file(s) sent successfully!`, "success")
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 flex items-center space-x-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-xl font-semibold text-gray-900">Send Files</h1>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-4">
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* File Grid */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="grid grid-cols-2 gap-3">
          {filteredFiles.map((file) => (
            <div
              key={file.id}
              className={`relative bg-white rounded-xl border-2 transition-all duration-200 ${
                selectedFiles.includes(file.id) ? "border-blue-500 shadow-md" : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <button onClick={() => toggleFileSelection(file.id)} className="w-full p-4 text-left">
                {/* Thumbnail/Icon */}
                <div className="aspect-square bg-gray-50 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                  {file.thumbnail ? (
                    <img
                      src={file.thumbnail || "/placeholder.svg"}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FileText className="w-8 h-8 text-gray-400" />
                  )}
                </div>

                {/* File Info */}
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{file.size}</p>
                </div>
              </button>

              {/* Selection Checkbox */}
              <div
                className={`absolute top-2 right-2 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedFiles.includes(file.id) ? "bg-blue-500 border-blue-500" : "bg-white border-gray-300"
                }`}
              >
                {selectedFiles.includes(file.id) && <Check className="w-4 h-4 text-white" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transfer Progress */}
      {isTransferring && (
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center space-x-3 mb-2">
            <Upload className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-900">Sending {selectedFiles.length} file(s)...</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${transferProgress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">{transferProgress}% complete</p>
        </div>
      )}

      {/* Bottom Action Bar */}
      {selectedFiles.length > 0 && !isTransferring && (
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{selectedFiles.length} file(s) selected</span>
            <button
              onClick={handleSendFiles}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Upload className="w-4 h-4" />
              <span>Send Selected</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
