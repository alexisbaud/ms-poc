# Microstory Server

A Node.js Express server for the Microstory application.

## Setup

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Configure environment variables:
   - Rename `.env.example` to `.env` (or create a new `.env` file)
   - Update the values as needed, especially the `JWT_SECRET`

3. Start the server:
```bash
# Development mode (with auto-reload)
npm run dev
# or
yarn dev

# Production mode
npm start
# or
yarn start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user profile (requires authentication)

## File Structure
- `server.js` - Main application file
- `config/` - Configuration files
- `routes/` - API routes
- `controllers/` - Request handlers
- `models/` - Data models
- `middleware/` - Custom middleware
- `audio/` - TTS audio files directory 