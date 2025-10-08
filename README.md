# TimeVault - Digital Time Capsule

A beautifully crafted web application for creating and managing digital time capsules. Write messages to your future self, attach memories, and have them delivered at the perfect moment.

## Features

- **Storytelling Experience**: Immersive narrative-driven interface
- **Custom Unlock Times**: Choose preset periods or set custom dates
- **Multi-Format Support**: Text, images, videos, audio, and documents
- **Secure Delivery**: Automated delivery via email or SMS
- **Dark Mode**: Full support for light and dark themes
- **Premium Design**: Elegant typography with Playfair Display, Cormorant Garamond, and Inter

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Deployment**: Vercel-ready
- **Styling**: CSS with CSS Custom Properties

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd timevault
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables

Create a `.env` file in the root directory:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

## Deploying to Vercel

### Method 1: Vercel CLI

1. Install Vercel CLI
```bash
npm install -g vercel
```

2. Deploy
```bash
vercel
```

3. Add environment variables in Vercel Dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### Method 2: GitHub Integration

1. Push your code to GitHub
2. Import the project in Vercel Dashboard
3. Add environment variables
4. Deploy

## Environment Variables

### Required Variables

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous/public key

### Getting Supabase Credentials

1. Go to [supabase.com](https://supabase.com)
2. Create a new project or use existing one
3. Go to Project Settings > API
4. Copy the Project URL and anon/public key

## Database Setup

The database schema is automatically created via Supabase migrations. The `time_capsules` table includes:

- User messages and metadata
- File storage references
- Delivery configuration
- Unlock scheduling
- Row Level Security (RLS) policies

## Project Structure

```
timevault/
├── src/
│   ├── components/      # React components
│   ├── context/         # React context (theme)
│   ├── lib/            # Utilities and Supabase client
│   ├── pages/          # Page components
│   ├── App.tsx         # Main app component
│   ├── App.css         # Global styles
│   └── main.tsx        # App entry point
├── supabase/
│   ├── migrations/     # Database migrations
│   └── functions/      # Edge functions
├── public/             # Static assets
└── dist/              # Production build output
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions, please open an issue on GitHub.
