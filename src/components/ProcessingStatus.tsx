interface ProcessingStatusProps {
  isProcessing: boolean
  message: string
}

export function ProcessingStatus({ isProcessing, message }: ProcessingStatusProps) {
  if (isProcessing) {
    return (
      <div className="flex flex-col items-center space-y-4 animate-fadeIn">
        <div className="relative">
          {/* Outer ring */}
          <div className="w-12 h-12 border-4 border-purple-200 dark:border-purple-800 rounded-full animate-spin"></div>
          {/* Inner spinning element */}
          <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-purple-600 dark:border-t-purple-400 rounded-full animate-spin"></div>
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full"></div>
          </div>
        </div>
        <div className="text-center space-y-1">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Processing your contacts...</p>
          <div className="flex justify-center space-x-1">
            <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
            <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
            <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
          </div>
        </div>
      </div>
    )
  }

  if (message) {
    const isError = message.includes('Error') || message.includes('Please select')
    return (
      <div className={`
        p-4 rounded-xl text-sm text-center transition-all duration-500 transform animate-scaleIn
        backdrop-blur-sm border shadow-lg
        ${isError 
          ? 'bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800 shadow-red-500/20' 
          : 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800 shadow-green-500/20'
        }
      `}>
        <div className="flex items-center justify-center gap-2">
          {isError ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          <span className="font-medium">{message}</span>
        </div>
      </div>
    )
  }

  return null
}