# 🚀 Quick Start Guide

Get your AI Course Builder up and running in 5 minutes!

## Prerequisites Checklist

- [ ] Node.js v18+ installed
- [ ] MongoDB installed (or MongoDB Atlas account)
- [ ] OpenAI API key
- [ ] YouTube Data API key

## Step-by-Step Setup

### 1. Install Dependencies (2 minutes)

```bash
# Install all dependencies at once
npm run install-all
```

### 2. Configure Environment (1 minute)

Copy `.env` file and add your API keys:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-course-builder
JWT_SECRET=my_super_secret_key_12345

OPENAI_API_KEY=sk-your-openai-key-here
YOUTUBE_API_KEY=your-youtube-api-key-here

VITE_API_URL=http://localhost:5000/api
```

### 3. Start MongoDB (30 seconds)

```bash
# Local MongoDB
mongod

# Or use MongoDB Atlas - just update MONGODB_URI
```

### 4. Run the App (1 minute)

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

### 5. Open Browser

Navigate to: **http://localhost:3000**

## First Time Usage

1. Click **"Get Started"** or **"Register"**
2. Create account with:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
3. Click **"Build Course"**
4. Fill in:
   - Topic: "JavaScript Basics"
   - Hours per day: 2
   - Total weeks: 4
   - Level: Beginner
   - Goal: "Learn web development"
5. Click **"Generate Roadmap"**
6. Wait 10-15 seconds for AI to create your course
7. Start learning! 🎉

## Getting API Keys

### OpenAI API Key (Free $5 credit for new accounts)
1. Visit: https://platform.openai.com/
2. Sign up / Login
3. Go to: API Keys section
4. Click: "Create new secret key"
5. Copy and save the key

### YouTube Data API Key (Free - 10,000 requests/day)
1. Visit: https://console.cloud.google.com/
2. Create new project
3. Enable: "YouTube Data API v3"
4. Go to: Credentials
5. Create: API Key
6. Copy and save the key

## Troubleshooting

### "Cannot connect to MongoDB"
```bash
# Start MongoDB
mongod

# Or use MongoDB Atlas cloud database
```

### "OpenAI API Error"
- Check your API key is correct
- Verify you have credits in your account
- Make sure you have GPT-4o access

### "Port 3000 already in use"
```bash
# Kill the process
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill
```

### "Module not found"
```bash
# Reinstall dependencies
cd server && npm install
cd ../client && npm install
```

## Next Steps

- Explore the dashboard
- Create multiple courses
- Take quizzes
- Add notes to concepts
- Bookmark important topics
- Track your progress

## Need Help?

- Check the main README.md for detailed documentation
- Review the API endpoints
- Check the troubleshooting section

Happy Learning! 🎓
