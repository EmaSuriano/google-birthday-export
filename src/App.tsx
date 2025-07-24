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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="flex justify-between items-start">
            <div className="text-center flex-1">
              <h1 className="text-2xl font-medium text-gray-900 dark:text-white">
                Birthday Calendar
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Convert Google Contacts to calendar
              </p>
            </div>
            <DarkModeToggle
              isDark={isDark}
              onToggle={() => setIsDark(!isDark)}
            />
          </div>

          <FileUpload
            onFileSelect={handleFileSelect}
            isProcessing={isProcessing}
          />

          <ProcessingStatus isProcessing={isProcessing} message={message} />
        </div>
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Made with ❤️ by{' '}
            <a
              href="https://github.com/EmaSuriano"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              EmaSuriano
            </a>{' '}
            • Open Source • Privacy-First • Always Free
          </p>
        </div>
      </div>

      <ScrollIndicator />

      <div className="px-8 pb-12">
        <FAQ />
      </div>
    </div>
  );
}

export default App;
