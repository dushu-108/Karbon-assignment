# Karbon Notes App

A simple notes app with Google OAuth authentication.

## Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB (local or Atlas)
- Google Cloud Project with OAuth 2.0 credentials

## Backend Setup

1. **Install dependencies:**

   ```bash
   cd backend
   npm install
   ```

2. **Environment variables:**

   Create a `.env` file in the `backend` folder:

   ```
   PORT=4000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=1d
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_REDIRECT_URI=http://localhost:4000/auth/google/callback
   ```

3. **Start the backend:**

   ```bash
   npm start
   ```

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project (or use an existing one).
3. Go to **APIs & Services > Credentials**.
4. Create **OAuth 2.0 Client ID**:
   - Application type: Web application
   - Authorized redirect URI: `http://localhost:4000/auth/google/callback`
5. Copy your **Client ID** and **Client Secret** into your `.env`.

## Frontend Setup

1. **Install dependencies:**

   ```bash
   cd frontend
   npm install
   ```

2. **Configure Google OAuth:**

   In `frontend/src/index.js` (or wherever you wrap your app), set up the Google OAuth provider:

   ```javascript
   import { GoogleOAuthProvider } from '@react-oauth/google';

   <GoogleOAuthProvider clientId="your_google_client_id">
     <App />
   </GoogleOAuthProvider>
   ```

3. **Start the frontend:**

   ```bash
   npm start
   ```

## Usage

- Visit `http://localhost:3000` in your browser.
- Click **Sign in with Google** to authenticate.
- Create, edit, and delete notes.
- Your profile picture and name will show in the header when logged in.

## Troubleshooting

- Make sure MongoDB is running and accessible.
- Ensure your Google OAuth credentials and redirect URIs are correct.
- Check browser console and backend logs for errors.

##