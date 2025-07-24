import { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <button
        onClick={onToggle}
        className="w-full py-4 text-left flex justify-between items-center p-1 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <span className="font-medium text-gray-900 dark:text-white">
          {question}
        </span>
        <svg
          className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="pb-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

export function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const faqData = [
    {
      question: 'How does this tool work?',
      answer:
        'This tool reads your Google Contacts CSV export file, extracts contacts with birthday information, and generates a standard ICS calendar file. The ICS file contains recurring yearly events for each birthday that you can import into any calendar application like Google Calendar, Apple Calendar, or Outlook.',
    },
    {
      question: 'Is my data safe and private?',
      answer:
        'Absolutely! Your data never leaves your device. Everything is processed entirely in your browser using JavaScript - no data is sent to any server. Your CSV file and the generated calendar file remain completely private on your local machine.',
    },
    {
      question: 'Is this tool free to use?',
      answer:
        'Yes, this tool is completely free to use. There are no hidden costs, subscriptions, or premium features. It was created to help the community solve a common problem with Google Contacts and birthday management.',
    },
    {
      question: 'Is the source code available?',
      answer:
        'Yes! This is an open-source project created by EmaSuriano and shared with the community. You can view, modify, and contribute to the source code. The transparency ensures you can see exactly how your data is being processed.',
    },
    {
      question: 'What file formats are supported?',
      answer:
        'This tool accepts CSV files exported from Google Contacts and generates ICS (iCalendar) files. The ICS format is a standard calendar format supported by all major calendar applications including Google Calendar, Apple Calendar, Outlook, and many others.',
    },
    {
      question: "What if some birthdays don't appear?",
      answer:
        "The tool only processes contacts that have birthday information in your Google Contacts. If a birthday doesn't appear, check that the birthday is properly set in the original contact in Google Contacts, then re-export and try again.",
    },
  ];

  return (
    <div className="mt-12 max-w-2xl mx-auto">
      <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-6 text-center">
        Frequently Asked Questions
      </h2>

      <div className="space-y-0">
        {faqData.map((item, index) => (
          <FAQItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openItems.includes(index)}
            onToggle={() => toggleItem(index)}
          />
        ))}
      </div>
    </div>
  );
}
