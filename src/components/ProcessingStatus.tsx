interface ProcessingStatusProps {
  isProcessing: boolean
  message: string
}

export function ProcessingStatus({ isProcessing, message }: ProcessingStatusProps) {
  if (isProcessing) {
    return (
      <div className="flex flex-col items-center space-y-3">
        <div className="w-6 h-6 border-2 border-gray-300 dark:border-gray-600 border-t-gray-900 dark:border-t-white rounded-full animate-spin"></div>
        <p className="text-sm text-gray-600 dark:text-gray-400">Processing...</p>
      </div>
    )
  }

  if (message) {
    const isError = message.includes('Error') || message.includes('Please select')
    return (
      <div className={`
        p-3 rounded text-sm text-center transition-colors
        ${isError 
          ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800' 
          : 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
        }
      `}>
        {message}
      </div>
    )
  }

  return null
}