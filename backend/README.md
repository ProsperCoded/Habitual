# Backend (NestJS + Postgres)

Habitual an app catering for providing services for users to effectively craft habits that shapes thier lives. It features ability to create and manage habit and habit gorups, execute habits at specific times and intervals. containing a suit of tools to find and join communities practicing a specific habit.

## Getting Started

1. **Install Dependencies**pnpm install
2. **Set Environment Variables**Make sure to provide DATABASE_URL, DATABASE_URL_DEV, and FRONTEND_URL in your .env file.
3. **Run in Development**
   pnpm dev

## Drizzle ORM

- Configuration located in drizzle.config.ts
- Run migrations, seeds, etc. via drizzle-kit commands

## API Overview

- Auth Routes: /auth
- User Routes: /user
- Habit Group Routes: /habit-group
- Check main.ts for global configuration and CORS settings

## Interacting with the App

1. Navigate to http://localhost:3000 to reach the backend server.
2. Use tools like Postman or fetch in your frontend to make requests.
3. Endpoints require authentication where applicable.
