import { useCallback, useState } from 'react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
}

export function FileUpload({ onFileSelect, isProcessing }: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = Array.from(e.dataTransfer.files);
      const csvFile = files.find((file) => file.name.endsWith('.csv'));

      if (csvFile) {
        onFileSelect(csvFile);
      }
    },
    [onFileSelect],
  );

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div
      className={`
        relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 transform
        backdrop-blur-sm
        ${
          isDragOver
            ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 scale-105 shadow-xl shadow-blue-500/20'
            : 'border-gray-300 dark:border-gray-600 bg-white/60 dark:bg-gray-800/60'
        }
        ${
          isProcessing
            ? 'pointer-events-none opacity-60'
            : 'hover:border-purple-400 dark:hover:border-purple-500 hover:shadow-lg hover:scale-102'
        }
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Static background pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"></div>
      </div>

      <div className={`relative z-10 ${isDragOver ? 'animate-scaleIn' : ''}`}>
        <div
          className={`text-5xl mb-4 transition-transform duration-300 ${
            isDragOver ? 'scale-110' : ''
          }`}
        >
          {isDragOver ? '🎯' : '📁'}
        </div>
        <div className="space-y-3">
          <p
            className={`font-medium transition-colors ${
              isDragOver
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            {isDragOver ? 'Drop your CSV file now!' : 'Drop CSV file here'}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">or</p>
          <label
            className={`
            inline-block px-6 py-3 text-sm font-semibold rounded-lg cursor-pointer
            bg-gradient-to-r from-blue-600 to-purple-600 text-white
            hover:from-blue-700 hover:to-purple-700
            transform transition-all duration-200
            hover:scale-105 hover:shadow-lg
            active:scale-95
            ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          >
            <input
              type="file"
              accept=".csv"
              onChange={handleFileInputChange}
              className="hidden"
              disabled={isProcessing}
            />
            <span className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              Choose CSV file
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
