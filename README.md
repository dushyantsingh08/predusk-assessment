# Candidate Profile Playground

A full-stack candidate profile application built with Next.js (App Router), Mongoose, and Tailwind CSS.

## Features

- **Profile Management**: View and update candidate profile details.
- **Project Gallery**: Browse projects with a "Bento-grid" layout.
- **Skill Filtering**: Filter projects by associated skills.
- **Real-time Search**: Search projects by title and description.
- **Responsive Design**: Mobile-first UI with Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Database**: MongoDB with Mongoose
- **Styling**: Tailwind CSS + custom UI components
- **Language**: TypeScript

## Architecture

This project uses the Next.js App Router for both frontend pages and backend API routes.

- `app/api/*`: API Route Handlers.
- `models/*`: Mongoose schema definitions.
- `components/*`: React UI components.
- `lib/dbConnect.ts`: Singleton MongoDB connection.

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment**:
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI="mongodb://127.0.0.1:27017/candidate-playground"
   ```

3. **Seed Database**:
   Populate the database with initial data:
   ```bash
   npm run seed
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

## API Endpoints

- `GET /api/health`: Health check.
- `GET /api/profile`: Get profile details.
- `POST /api/profile`: Create profile.
- `PATCH /api/profile`: Update profile.
- `GET /api/search?q=query`: Search projects (regex).
- `GET /api/projects/skill/:skillName`: Get projects by skill.
- `GET /api/skills/top`: Get top skills by usage count.

## Deployment

### Vercel + MongoDB Atlas

1. Push code to GitHub.
2. Import project into Vercel.
3. Add `MONGODB_URI` to Vercel Environment Variables (use connection string from MongoDB Atlas).
4. Redeploy.

## Testing

See `test-requests.http` for sample API requests.
