# Getting Started with Zap

## Using Zap (Recommended)

1. Visit [zap.js.org](https://zap.js.org)
2. Sign up for a free account
3. Start creating workflows immediately

That's it! No installation required. Zap is fully hosted and ready to use.

## Self-Hosting (Optional)

If you prefer to host Zap yourself, follow these steps:

### Prerequisites

- Node.js >= 18
- npm >= 11.4.0
- Docker (optional)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/zap.git
   cd zap
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   # Copy example files
   cp apps/web/.env.example apps/web/.env
   cp apps/backend/.env.example apps/backend/.env
   ```

4. Configure Supabase:
   - Create a new project at [supabase.com](https://supabase.com)
   - Get your project URL and anon key
   - Add them to your `.env` files

5. Start the development servers:
   ```bash
   # Start the backend
   npm run backend:dev

   # Start the frontend
   npm run web:dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

### Docker Deployment

1. Build the images:
   ```bash
   docker-compose build
   ```

2. Start the containers:
   ```bash
   docker-compose up -d
   ```

## Next Steps

- [Create your first workflow](./first-workflow.md)
- [Set up authentication](./authentication.md)
- [Learn about workflows](../concepts/workflows.md) 