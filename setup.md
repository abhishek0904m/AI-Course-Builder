# 🔧 Setup Instructions

## Automated Setup

### Windows (PowerShell)

```powershell
# 1. Install all dependencies
npm run install-all

# 2. Copy environment file
Copy-Item .env.example .env

# 3. Edit .env file with your API keys
notepad .env
```

### Mac/Linux (Bash)

```bash
# 1. Install all dependencies
npm run install-all

# 2. Copy environment file
cp .env.example .env

# 3. Edit .env file with your API keys
nano .env
```

## Manual Setup

### 1. Install Server Dependencies

```bash
cd server
npm install
```

### 2. Install Client Dependencies

```bash
cd client
npm install
```

### 3. Configure Environment

Edit the `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-course-builder
JWT_SECRET=change_this_to_a_random_secret_key

# API Keys (Required)
OPENAI_API_KEY=your_openai_api_key_here
YOUTUBE_API_KEY=your_youtube_api_key_here

# Client Configuration
VITE_API_URL=http://localhost:5000/api
```

### 4. Start MongoDB

**Option A: Local MongoDB**
```bash
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Update MONGODB_URI in .env

### 5. Run the Application

**Start Backend (Terminal 1):**
```bash
cd server
npm run dev
```

**Start Frontend (Terminal 2):**
```bash
cd client
npm run dev
```

### 6. Access the Application

Open your browser and navigate to:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Verify Installation

### Check Backend

```bash
curl http://localhost:5000/api/auth/me
```

Should return: `{"message":"Not authorized, no token"}`

### Check Frontend

Open http://localhost:3000 - you should see the landing page.

## Common Issues

### Issue: "Cannot find module"
**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules server/node_modules client/node_modules
npm run install-all
```

### Issue: "MongoDB connection failed"
**Solution:**
- Make sure MongoDB is running: `mongod`
- Check MONGODB_URI in .env
- Try using MongoDB Atlas instead

### Issue: "Port already in use"
**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill
```

### Issue: "OpenAI API error"
**Solution:**
- Verify API key is correct
- Check you have credits: https://platform.openai.com/account/usage
- Ensure you have GPT-4o access

### Issue: "YouTube API error"
**Solution:**
- Verify API key is correct
- Check API is enabled in Google Cloud Console
- Verify you haven't exceeded quota (10,000 requests/day free)

## Development Tips

### Hot Reload

Both frontend and backend support hot reload:
- Frontend: Vite automatically reloads on file changes
- Backend: Nodemon automatically restarts on file changes

### Database GUI

Use MongoDB Compass to view your database:
1. Download: https://www.mongodb.com/products/compass
2. Connect to: mongodb://localhost:27017
3. Browse the `ai-course-builder` database

### API Testing

Use tools like:
- Postman: https://www.postman.com/
- Thunder Client (VS Code extension)
- curl commands

### Debugging

**Backend:**
```bash
# Add console.log statements
console.log('Debug:', variable);

# Or use Node debugger
node --inspect server/index.js
```

**Frontend:**
```javascript
// Use React DevTools browser extension
// Add console.log in components
console.log('Component state:', state);
```

## Production Build

### Build Frontend

```bash
cd client
npm run build
```

This creates an optimized production build in `client/dist/`

### Run Production Server

```bash
cd server
npm start
```

## Environment Variables Explained

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Backend server port | 5000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/ai-course-builder |
| JWT_SECRET | Secret key for JWT tokens | random_secret_key_123 |
| OPENAI_API_KEY | OpenAI API key | sk-... |
| YOUTUBE_API_KEY | YouTube Data API key | AIza... |
| VITE_API_URL | Backend API URL for frontend | http://localhost:5000/api |

## Next Steps

1. ✅ Complete setup
2. ✅ Start both servers
3. ✅ Register a new account
4. ✅ Create your first course
5. ✅ Start learning!

For more details, see:
- README.md - Full documentation
- QUICKSTART.md - Quick start guide
- CHECKLIST.md - Feature checklist
