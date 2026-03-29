# PortfolioGen X

An AI-powered personal brand builder that creates stunning portfolios, professional bios, resumes, and career roadmaps in seconds. Just speak or type — your digital identity, powered by AI.

## Features

- **AI Branding Engine** - Generate professional bios, taglines, and elevator pitches instantly
- **GitHub Analyzer** - Auto-analyze repositories to detect skills and auto-fill your portfolio
- **Premium Themes** - Cyberpunk, glass, neon, gradient themes with real-time switching
- **AI Resume Generator** - Create ATS-friendly resumes and download as PDF
- **Analytics Dashboard** - Track profile views and engagement with real-time stats
- **Shareable Links** - Get a custom public URL for your portfolio
- **Voice Creation** - Speak and let AI fill your entire portfolio
- **AI Mentor** - Get career advice, skill suggestions, and interview preparation

## Tech Stack

- React 18 with TypeScript
- Vite
- Tailwind CSS
- Radix UI (ShadCN)
- TanStack Query
- React Router
- Framer Motion
- Vitest + Playwright
- **Firebase** (Authentication, Firestore, Storage)

## Getting Started

### Prerequisites
- Node.js 18+ or Bun
- A Firebase project

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Google, GitHub, and Email/Password providers
4. Enable Firestore Database:
   - Go to Firestore Database > Create database
   - Start in test mode (you can configure security rules later)
5. Enable Storage (optional, for file uploads):
   - Go to Storage > Get started

6. Get your Firebase config:
   - Go to Project settings > General > Your apps
   - Click "Add app" > Web app
   - Copy the config object

### 2. Environment Setup

1. Copy the environment template:
   ```bash
   cp .env.example .env
   ```

2. Fill in your Firebase config in `.env`:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id

   # Optional: For AI features
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   VITE_GITHUB_TOKEN=your_github_token_here
   ```

### 3. Install and Run

```bash
# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Firebase Security Rules

### Firestore Rules (firestore.rules)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own portfolios
    match /portfolios/{portfolioId} {
      allow read, write: if request.auth != null && resource.data.userId == request.auth.uid;
    }

    // Public portfolios can be read by anyone
    match /portfolios/{portfolioId} {
      allow read: if resource.data.isPublic == true;
    }

    // Users can read their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Storage Rules (storage.rules)
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Available Scripts

- `dev` - Start development server
- `build` - Build for production
- `lint` - Run ESLint
- `test` - Run tests
- `preview` - Preview production build

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # ShadCN UI components
├── pages/              # Route components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
│   ├── firebase.ts     # Firebase configuration
│   ├── authService.ts  # Authentication service
│   └── portfolioService.ts # Portfolio CRUD operations
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication context
├── types/              # TypeScript definitions
└── test/               # Test files
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if needed
5. Submit a pull request

## License

MIT License
