import { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { ProcessingStatus } from './components/ProcessingStatus';
import { DarkModeToggle } from './components/DarkModeToggle';
import { FAQ } from './components/FAQ';
import { ScrollIndicator } from './components/ScrollIndicator';
import { useDarkMode } from './hooks/useDarkMode';
import { parseCSV, extractContacts } from './utils/csvParser';
import { createICS } from './utils/icsGenerator';
import { downloadFile } from './utils/fileDownload';

function App() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState('');
  const [isDark, setIsDark] = useDarkMode();

  const processFile = async (file: File) => {
    setIsProcessing(true);
    setMessage('');

    try {
      const text = await file.text();
      const csvData = parseCSV(text);
      const contacts = extractContacts(csvData);

      if (contacts.length === 0) {
        setMessage('No contacts with birthdays found');
        return;
      }

      const { content, contactsProcessed } = createICS(contacts);

      if (contactsProcessed === 0) {
        setMessage('No valid birthday dates found');
      } else {
        downloadFile(content, 'birthdays.ics');
        setMessage(`Created ${contactsProcessed} birthday events`);
      }
    } catch (error) {
      setMessage(
        `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileSelect = (file: File) => {
    if (!file.name.endsWith('.csv')) {
      setMessage('Please select a CSV file');
      return;
    }
    processFile(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950 transition-all duration-700">
      {/* Static background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative flex flex-col items-center justify-center min-h-screen p-8">
        <div className="w-full max-w-md space-y-8 animate-fadeIn">
          <div className="flex justify-between items-start">
            <div className="text-center flex-1 ">
              <div className="mb-4">
                <div className="text-4xl mb-3">🎂</div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
                  Birthday Calendar
                </h1>
              </div>
              <p className="mt-3 text-gray-600 dark:text-gray-300 font-medium">
                Convert Google Contacts to calendar
              </p>
            </div>
            <div className="animate-fadeIn">
              <DarkModeToggle
                isDark={isDark}
                onToggle={() => setIsDark(!isDark)}
              />
            </div>
          </div>

          <div className="animate-slideInUp">
            <FileUpload
              onFileSelect={handleFileSelect}
              isProcessing={isProcessing}
            />
          </div>

          <div className="animate-slideInUp">
            <ProcessingStatus isProcessing={isProcessing} message={message} />
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400 animate-fadeIn">
          <p className="backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 px-4 py-2 rounded-full border border-white/20 dark:border-gray-700/20">
            Made with ❤️ by{' '}
            <a
              href="https://github.com/EmaSuriano"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-medium"
            >
              EmaSuriano
            </a>{' '}
            • Open Source • Privacy-First • Always Free
          </p>
        </div>
      </div>

      <ScrollIndicator />

      <div className="px-8 pb-12 relative">
        <FAQ />
      </div>
    </div>
  );
}

export default App;
