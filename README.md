# JobFindr - Supabase Job Board Application

A modern job board application built with Next.js frontend and Supabase backend, featuring email/password authentication and real-time data management.

## Features

- 🔐 Supabase Authentication (Email/Password)
- 💼 Job posting and management
- 🔍 Advanced job search and filtering
- 👤 User profiles and job applications
- 📱 Responsive design with Tailwind CSS
- 🎨 Modern UI with shadcn/ui components
- ⚡ Real-time updates with Supabase

## Tech Stack

### Frontend
- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Supabase Client

### Backend
- Supabase (Database + Authentication + Real-time)
- PostgreSQL
- Row Level Security (RLS)

## Prerequisites

Before running this project, make sure you have:

- Node.js (v18 or higher)
- A Supabase account

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
# Install dependencies
npm run install-deps
```

### 2. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Go to SQL Editor and run the migration file from `supabase/migrations/001_initial_schema.sql`

### 3. Environment Configuration

**Client Environment (.env.local in client folder):**
```bash
# Copy the example file
cp client/.env.local.example client/.env.local
```

Fill in your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Database Setup

The database schema is automatically created when you run the migration file. It includes:

- **profiles** table for user information
- **jobs** table for job listings
- Row Level Security (RLS) policies
- Automatic profile creation on user signup

### 5. Run the Application

```bash
# Start the development server
npm run dev
```

This will start the frontend application on http://localhost:3000

## Project Structure

```
jobfindr/
├── client/                 # Next.js frontend
│   ├── app/               # App router pages
│   ├── Components/        # React components
│   ├── context/          # React context providers
│   ├── lib/              # Supabase client
│   ├── types/            # TypeScript types
│   └── utils/            # Utility functions
├── supabase/              # Database migrations
│   └── migrations/       # SQL migration files
└── package.json          # Root package.json
```

## Database Schema

### Profiles Table
- User information and preferences
- Linked to Supabase Auth users
- Supports job seekers and recruiters

### Jobs Table
- Job listings with full details
- Support for multiple job types and tags
- Like and application tracking
- Salary information with different types

## Authentication

The app uses Supabase Auth with:
- Email/password authentication
- Automatic profile creation on signup
- Session management
- Protected routes

## API Operations

All data operations are handled through Supabase client:

### Jobs
- Create, read, update, delete jobs
- Search and filter functionality
- Like/unlike jobs
- Apply to jobs
- Real-time updates

### Profiles
- User profile management
- Role-based access (job seeker/recruiter)
- Profile picture and bio support

## Security

- Row Level Security (RLS) enabled on all tables
- Users can only modify their own data
- Public read access for job listings
- Authenticated access for applications and likes

## Deployment

### Frontend (Vercel/Netlify)
1. Connect your repository
2. Set environment variables
3. Deploy

### Database
- Supabase handles all backend infrastructure
- No additional deployment needed

## Environment Variables

### Required
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key

## Troubleshooting

### Common Issues

1. **Supabase Connection Error**
   - Verify your project URL and anon key
   - Check if the project is paused (free tier limitation)

2. **Authentication Issues**
   - Ensure email confirmation is disabled in Supabase Auth settings for development
   - Check RLS policies if data access is denied

3. **Database Errors**
   - Verify the migration was run successfully
   - Check Supabase logs for detailed error messages

### Development Tips

- Use Supabase Studio to view and manage your data
- Check the Network tab in browser dev tools for API calls
- Enable real-time subscriptions for live updates
- Use Supabase CLI for local development (optional)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.