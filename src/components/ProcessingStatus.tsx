interface ProcessingStatusProps {
  isProcessing: boolean
  message: string
}

export function ProcessingStatus({ isProcessing, message }: ProcessingStatusProps) {
  if (isProcessing) {
    return (
      <div className="flex flex-col items-center space-y-4">
        <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-sm text-gray-600 dark:text-gray-400">Processing your contacts...</p>
      </div>
    )
  }

  if (message) {
    const isError = message.includes('Error') || message.includes('Please select')
    return (
      <div className={`
        p-4 rounded-lg text-sm border transition-colors duration-200
        ${isError 
          ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800' 
          : 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800'
        }
      `}>
        <div className="flex items-center gap-2">
          {isError ? (
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          <span>{message}</span>
        </div>
      </div>
    )
  }

  return null
}