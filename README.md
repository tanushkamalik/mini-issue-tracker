# Mini Issue Tracker

A web application built with Next.js and Supabase to manage issues through a simple interface. The project demonstrates full-stack development concepts, database integration, and CRUD operations.

## Features

- Create new issues.
- View and manage issues.
- Integrate the application with Supabase.
- Use Next.js for frontend development and backend API functionality.
- Configure database access and permissions.

## Tech Stack

- **Frontend:** Next.js, React, TypeScript
- **Backend:** Next.js API routes
- **Database:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS

## Getting Started

### Prerequisites

- Node.js and npm
- A Supabase account and project

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR-USERNAME/mini-issue-tracker.git
   ```

2. Navigate to the project directory:

   ```bash
   cd mini-issue-tracker
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env.local` file in the project root and add your Supabase configuration:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   Replace the placeholder values with your own Supabase project credentials. Never commit your `.env.local` file or expose secret keys.

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Setup

Configure your Supabase PostgreSQL database with the tables, permissions, and Row Level Security policies required by the application. Refer to your project's database schema and API code for the exact setup.

## Learning Objectives

- Understanding Next.js application structure.
- Connecting a web application to Supabase.
- Implementing issue creation and data retrieval.
- Working with database permissions and access policies.
- Practising full-stack application development.

## Future Improvements

- Add issue editing and deletion.
- Implement user authentication.
- Add issue status, priority, and filtering.
- Improve form validation and error handling.

## License

No license has been specified yet.
