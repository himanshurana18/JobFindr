# JobFindr - Full Stack Job Board Application

A modern job board application built with Next.js frontend and Express.js backend, featuring Auth0 authentication and MongoDB database.

## Features

- 🔐 Auth0 Authentication
- 💼 Job posting and management
- 🔍 Advanced job search and filtering
- 👤 User profiles and job applications
- 📱 Responsive design with Tailwind CSS
- 🎨 Modern UI with shadcn/ui components

## Tech Stack

### Frontend
- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Auth0 for authentication
- CORS enabled

## Prerequisites

Before running this project, make sure you have:

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Auth0 account for authentication setup

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
# Install root dependencies
npm install

# Install all project dependencies
npm run install-deps
```

### 2. Database Setup

**Option A: Local MongoDB**
1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/jobfindr`

**Option B: MongoDB Atlas**
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Replace the MONGO_URI in your .env file

### 3. Auth0 Setup

1. Create an Auth0 account at [auth0.com](https://auth0.com)
2. Create a new application (Regular Web Application)
3. Configure the following settings in your Auth0 dashboard:

**Allowed Callback URLs:**
```
http://localhost:5000/callback
```

**Allowed Logout URLs:**
```
http://localhost:3000
```

**Allowed Web Origins:**
```
http://localhost:3000
```

4. Note down your:
   - Domain
   - Client ID
   - Client Secret

### 4. Environment Configuration

**Server Environment (.env in server folder):**
```bash
# Copy the example file
cp server/.env.example server/.env
```

Fill in your actual values:
```env
MONGO_URI=mongodb://localhost:27017/jobfindr
SECRET=your-super-secret-key-here-make-it-long-and-random
BASE_URL=http://localhost:5000
CLIENT_ID=your-auth0-client-id
ISSUER_BASE_URL=https://your-domain.auth0.com
CLIENT_URL=http://localhost:3000
PORT=5000
```

**Client Environment (.env.local in client folder):**
```bash
# Copy the example file
cp client/.env.local.example client/.env.local
```

Fill in:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 5. Run the Application

```bash
# Start both frontend and backend concurrently
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend application on http://localhost:3000

### 6. Alternative: Run Separately

```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend  
npm run client
```

## Project Structure

```
jobfindr/
├── client/                 # Next.js frontend
│   ├── app/               # App router pages
│   ├── Components/        # React components
│   ├── context/          # React context providers
│   ├── utils/            # Utility functions
│   └── types/            # TypeScript types
├── server/                # Express.js backend
│   ├── controllers/      # Route controllers
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   └── db/              # Database connection
└── package.json          # Root package.json
```

## API Endpoints

### Authentication
- `GET /api/v1/check-auth` - Check authentication status
- `GET /login` - Auth0 login
- `GET /logout` - Auth0 logout

### Jobs
- `GET /api/v1/jobs` - Get all jobs
- `POST /api/v1/jobs` - Create new job (protected)
- `GET /api/v1/jobs/:id` - Get job by ID
- `PUT /api/v1/jobs/like/:id` - Like/unlike job (protected)
- `PUT /api/v1/jobs/apply/:id` - Apply to job (protected)
- `DELETE /api/v1/jobs/:id` - Delete job (protected)
- `GET /api/v1/jobs/search` - Search jobs
- `GET /api/v1/jobs/user/:id` - Get user's jobs (protected)

### Users
- `GET /api/v1/user/:id` - Get user profile

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running locally or check Atlas connection string
   - Verify network access in MongoDB Atlas

2. **Auth0 Authentication Issues**
   - Double-check Auth0 configuration URLs
   - Ensure CLIENT_ID and ISSUER_BASE_URL are correct
   - Verify callback URLs match exactly

3. **CORS Errors**
   - Ensure CLIENT_URL in server .env matches your frontend URL
   - Check that credentials are included in requests

4. **Port Conflicts**
   - Change PORT in server/.env if 5000 is occupied
   - Update NEXT_PUBLIC_API_URL accordingly

### Development Tips

- Use browser dev tools to check network requests
- Check server logs for detailed error messages
- Ensure both frontend and backend are running
- Clear browser cache if experiencing auth issues

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.