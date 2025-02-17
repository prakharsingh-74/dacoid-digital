# Interactive Quiz Platform

A modern, interactive quiz application built with React, TypeScript, and Tailwind CSS. The application features a timer-based quiz system with instant feedback, progress tracking, and persistent quiz history using IndexedDB.

![Quiz Interface](https://images.unsplash.com/photo-1606326608690-4e0281b1e588?auto=format&fit=crop&q=80&w=2000)

## Features

### 🎯 Core Features
- **Interactive Quiz Interface**: Clean and intuitive user interface for taking quizzes
- **Timer-Based Questions**: 30 seconds per question to keep users engaged
- **Instant Feedback**: Immediate visual feedback for correct and incorrect answers
- **Progress Tracking**: Track current question and overall progress
- **Quiz History**: View detailed history of all quiz attempts
- **Persistent Storage**: Quiz attempts are saved in IndexedDB for future reference

### 💡 Technical Highlights
- Built with React and TypeScript for type safety
- Styled with Tailwind CSS for modern, responsive design
- Uses IndexedDB for client-side storage
- Lucide React icons for consistent visual elements
- Vite for fast development and optimized builds

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/         # Reusable React components
│   ├── Timer.tsx      # Timer component for questions
│   └── QuizHistory.tsx# History display component
├── data/              # Static data
│   └── questions.ts   # Quiz questions
├── utils/             # Utility functions
│   └── db.ts         # IndexedDB operations
├── types.ts           # TypeScript type definitions
└── App.tsx           # Main application component
```

## Features in Detail

### Quiz Interface
- Multiple choice questions with instant feedback
- Visual indicators for correct and incorrect answers
- Timer countdown for each question
- Progress indicator showing current question number

### Quiz History
- Tracks all quiz attempts
- Shows score for each attempt
- Records date and time of attempts
- Calculates average time per question
- Persists data using IndexedDB

## Technologies Used

- **React**: UI library
- **TypeScript**: Type safety and better developer experience
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Build tool and development server
- **IndexedDB**: Client-side storage
- **Lucide React**: Icon library

## Screenshots

![{B4350A5E-2B1E-4432-9B48-CD2DC528C990}](https://github.com/user-attachments/assets/1c44cb40-55a4-4633-a5f1-5356d116978b)
![{8552CB2C-20CA-42FC-A262-0A409E4998AC}](https://github.com/user-attachments/assets/f8e68773-27cc-4c2b-b131-133355a279c9)


## Acknowledgments

- Icons provided by [Lucide React](https://lucide.dev)
- Styling powered by [Tailwind CSS](https://tailwindcss.com)
