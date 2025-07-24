# 🎂 Birthday Calendar - Google Contacts Exporter

A privacy-first, client-side web application that converts Google Contacts CSV exports into ICS calendar files for birthday reminders.

## ✨ Features

- **🔒 100% Privacy**: All processing happens in your browser - no data sent to servers
- **🎨 Modern UI**: Clean, minimalistic design with dark/light mode support
- **📱 Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **🎯 Simple Process**: Drag & drop CSV → Get ICS calendar file
- **⚡ Fast**: Instant processing with no loading times
- **🆓 Free Forever**: No subscriptions, accounts, or hidden costs
- **🔓 Open Source**: Transparent code you can inspect and trust

## 🚀 How It Works

1. **Export** your contacts from Google Contacts as a CSV file
2. **Drag & drop** the CSV file into the app (or click to browse)
3. **Download** the generated ICS calendar file
4. **Import** the ICS file into Google Calendar, Apple Calendar, or any calendar app

## 🛠️ Technical Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS v3 with dark mode support
- **Build Tool**: Vite 7
- **File Processing**: Client-side CSV parsing and ICS generation
- **Deployment**: Static hosting (no backend required)

## 📋 Supported Formats

- **Input**: CSV files from Google Contacts export
- **Output**: ICS (iCalendar) files compatible with:
  - Google Calendar
  - Apple Calendar
  - Microsoft Outlook
  - Any standard calendar application

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js 18+ and Yarn
- Modern web browser

### Development

```bash
# Clone the repository
git clone https://github.com/EmaSuriano/google-birthday-export

# Navigate to project directory
cd google-birthday-export

# Install dependencies
yarn install

# Start development server
yarn dev

# Open http://localhost:5173
```

### Build for Production

```bash
# Build the application
yarn build

# Preview the build
yarn preview
```

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── FileUpload.tsx   # Drag & drop file interface
│   ├── ProcessingStatus.tsx # Loading and status messages
│   ├── DarkModeToggle.tsx   # Theme switcher
│   ├── FAQ.tsx          # Frequently asked questions
│   └── ScrollIndicator.tsx  # Scroll hint indicator
├── hooks/               # Custom React hooks
│   └── useDarkMode.ts   # Dark mode state management
├── utils/               # Utility functions
│   ├── csvParser.ts     # CSV parsing logic
│   ├── icsGenerator.ts  # ICS calendar generation
│   └── fileDownload.ts  # File download helper
├── App.tsx              # Main application component
└── main.tsx             # Application entry point
```

## 🔧 Configuration

The app uses Tailwind CSS for styling with the following key features:

- **Dark Mode**: Class-based theme switching
- **Responsive Design**: Mobile-first approach
- **Custom Colors**: Consistent gray-scale palette
- **Smooth Transitions**: Enhanced user experience

## 🤝 Contributing

This is an open-source project created to help the community. Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
