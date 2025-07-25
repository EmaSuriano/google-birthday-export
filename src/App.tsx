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
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="flex flex-col min-h-screen p-6 max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">🎂</span>
            </div>
            <h1 className="text-xl font-normal text-gray-800 dark:text-gray-200">
              Birthday Calendar
            </h1>
          </div>
          <DarkModeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
        </header>

        {/* Main content */}
        <main className="flex-1 flex flex-col items-center justify-center py-12">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-normal text-gray-800 dark:text-gray-200">
                Convert Google Contacts to Calendar
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Export your contacts' birthdays as a calendar file
              </p>
            </div>

            <FileUpload
              onFileSelect={handleFileSelect}
              isProcessing={isProcessing}
            />

            <ProcessingStatus isProcessing={isProcessing} message={message} />
          </div>
        </main>
      </div>

      <ScrollIndicator />

      <div className="px-8 pb-12 relative">
        <FAQ />
      </div>

      {/* Footer */}
      <footer className="py-6 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center text-xs text-gray-500 dark:text-gray-400">
          <p>
            Made by{' '}
            <a
              href="https://github.com/EmaSuriano"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Emanuel Suriano
            </a>{' '}
            • Open Source • Privacy-First
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
