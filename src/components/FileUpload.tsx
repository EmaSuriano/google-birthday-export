import { useCallback, useState } from 'react'

interface FileUploadProps {
  onFileSelect: (file: File) => void
  isProcessing: boolean
}

export function FileUpload({ onFileSelect, isProcessing }: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    const csvFile = files.find(file => file.name.endsWith('.csv'))
    
    if (csvFile) {
      onFileSelect(csvFile)
    }
  }, [onFileSelect])

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onFileSelect(file)
    }
  }

  return (
    <div 
      className={`
        relative border-2 border-dashed rounded-lg p-12 text-center transition-colors
        ${isDragOver 
          ? 'border-blue-400 bg-blue-50 dark:border-blue-500 dark:bg-blue-900/20' 
          : 'border-gray-300 dark:border-gray-600'
        }
        ${isProcessing 
          ? 'pointer-events-none opacity-60' 
          : 'hover:border-gray-400 dark:hover:border-gray-500'
        }
        bg-white dark:bg-gray-800
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="text-4xl mb-4">📁</div>
      <div className="space-y-2">
        <p className="text-gray-600 dark:text-gray-300">Drop CSV file here</p>
        <p className="text-sm text-gray-400 dark:text-gray-500">or</p>
        <label className={`
          inline-block px-4 py-2 text-sm font-medium text-white 
          bg-gray-900 dark:bg-gray-700 rounded cursor-pointer
          hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors
          ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
        `}>
          <input 
            type="file" 
            accept=".csv" 
            onChange={handleFileInputChange}
            className="hidden"
            disabled={isProcessing}
          />
          Choose file
        </label>
      </div>
    </div>
  )
}