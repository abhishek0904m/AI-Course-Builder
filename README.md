# 🎓 AI Course Builder - MERN Stack

A complete, production-ready AI-Powered Course Builder web application using the MERN stack (MongoDB, Express.js, React.js, Node.js) with OpenAI GPT-4o integration.

## ✨ Features

- 🤖 **AI-Powered Roadmap Generation** - Create personalized learning paths with GPT-4o
- 📚 **Concept-by-Concept Teaching** - Structured AI explanations for every topic
- 🎯 **Smart Quizzes** - AI-generated assessments with instant feedback
- 📺 **YouTube Integration** - Curated video resources for each concept
- 📝 **Notes & Bookmarks** - Save notes and bookmark important topics
- 📊 **Progress Tracking** - Visual progress bars and completion tracking
- 🔐 **JWT Authentication** - Secure user authentication and authorization
- 🎨 **Modern Dark UI** - Sleek dark mode with amber/gold accents (NO PURPLE!)

## 🎨 Design System

- **Color Palette**: Dark navy + deep teal + amber/gold accents
- **Primary Background**: #0A0F1E
- **Cards**: #111827
- **Accent**: #F59E0B (amber)
- **Fonts**: 'Outfit' for headings, 'Inter' for body text
- **Style**: Modern SaaS aesthetic inspired by Notion + Linear

## 📁 Project Structure

```
ai-course-builder/
├── client/                    # React Frontend (Vite)
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   ├── pages/            # Page components
│   │   ├── context/          # React Context (Auth)
│   │   ├── api/              # Axios configuration
│   │   ├── App.jsx           # Main App component
│   │   └── main.jsx          # Entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/                    # Node + Express Backend
│   ├── controllers/          # Route controllers
│   ├── models/               # MongoDB models
│   ├── routes/               # API routes
│   ├── middleware/           # Auth middleware
│   ├── utils/                # AI helper functions
│   ├── index.js              # Server entry point
│   └── package.json
├── .env                       # Environment variables
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- OpenAI API Key
- YouTube Data API Key

### Step 1: Clone and Install Dependencies

```bash
# Install all dependencies (root, server, and client)
npm run install-all
```

Or install manually:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Step 2: Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Server
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-course-builder
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production

# AI
OPENAI_API_KEY=your_openai_api_key

# YouTube
YOUTUBE_API_KEY=your_youtube_data_api_key

# Client
VITE_API_URL=http://localhost:5000/api
```

### Step 3: Get API Keys

**OpenAI API Key:**
1. Go to https://platform.openai.com/
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy and paste into `.env`

**YouTube Data API Key:**
1. Go to https://console.cloud.google.com/
2. Create a new project
3. Enable YouTube Data API v3
4. Create credentials (API Key)
5. Copy and paste into `.env`

### Step 4: Start MongoDB

Make sure MongoDB is running:

```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas (cloud) - update MONGODB_URI in .env
```

### Step 5: Run the Application

Open two terminal windows:

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

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 📖 Usage Guide

### 1. Register/Login
- Navigate to http://localhost:3000
- Click "Get Started" or "Register"
- Create an account with name, email, and password
- Login with your credentials

### 2. Create a Course
- Click "Build Course" or "New Course" from dashboard
- Fill in the form:
  - **Topic**: What you want to learn (e.g., "Machine Learning")
  - **Hours per day**: Available study time
  - **Total weeks**: Course duration
  - **Skill level**: Beginner, Intermediate, or Advanced
  - **Goal**: Your learning objective
- Click "Generate Roadmap"
- AI will create a personalized learning path

### 3. Learn
- View your roadmap with all topics organized by week
- Click on any topic to start learning
- Read AI-generated explanations
- Watch curated YouTube videos
- Take notes (auto-saved)
- Bookmark important topics

### 4. Take Quizzes
- After studying a concept, click "Take Quiz"
- Answer 5 AI-generated multiple choice questions
- Get instant feedback with explanations
- Pass with 60% or higher to mark topic as complete

### 5. Track Progress
- View progress bars on each course
- See completion percentage
- Track your learning streak
- Monitor concepts completed

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js (Vite), React Router v6, Axios, TailwindCSS |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose |
| Auth | JWT (JSON Web Tokens) + bcryptjs |
| AI | OpenAI API (GPT-4o) |
| YouTube | YouTube Data API v3 |
| State Management | React Context API |
| Animations | Framer Motion |
| Icons | Lucide React |
| Notifications | React Hot Toast |

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Courses
- `POST /api/course` - Create course (protected)
- `GET /api/course` - Get all user courses (protected)
- `GET /api/course/:id` - Get single course (protected)
- `PUT /api/course/:id` - Update course (protected)
- `PUT /api/course/:id/topic` - Update topic status (protected)
- `DELETE /api/course/:id` - Delete course (protected)

### AI
- `POST /api/ai/roadmap` - Generate learning roadmap (protected)
- `POST /api/ai/explain` - Get concept explanation (protected)
- `POST /api/ai/quiz` - Generate quiz (protected)
- `GET /api/ai/youtube/search` - Search YouTube videos (protected)

### Quizzes
- `POST /api/quiz` - Save quiz results (protected)
- `GET /api/quiz` - Get user quizzes (protected)

## 🗄️ Database Schemas

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  avatar: String,
  streak: Number,
  lastActive: Date,
  createdAt: Date
}
```

### Course
```javascript
{
  userId: ObjectId,
  title: String,
  topic: String,
  description: String,
  level: String,
  goal: String,
  totalWeeks: Number,
  hoursPerDay: Number,
  modules: [{
    week: Number,
    title: String,
    topics: [{
      id: String,
      name: String,
      estimatedHours: Number,
      difficulty: String,
      description: String,
      status: String,
      explanation: String,
      youtubeRefs: Array,
      notes: String,
      bookmarked: Boolean
    }]
  }],
  progress: Number,
  createdAt: Date,
  lastAccessed: Date
}
```

### Quiz
```javascript
{
  userId: ObjectId,
  courseId: ObjectId,
  topicId: String,
  topicName: String,
  questions: Array,
  score: Number,
  totalQuestions: Number,
  takenAt: Date
}
```

## 🎯 Key Features Implementation

### AI Roadmap Generation
- Uses GPT-4o to create structured learning paths
- Considers user's time availability, skill level, and goals
- Generates week-by-week breakdown with topics

### Concept Explanation
- AI provides structured explanations with:
  - Simple definition
  - Why it matters
  - Deep explanation with examples
  - Code examples (when applicable)
  - Key takeaways

### Smart Quizzes
- AI generates 5 multiple choice questions per concept
- Includes explanations for correct answers
- 60% passing score required
- Results saved to database

### YouTube Integration
- Searches YouTube Data API for relevant videos
- Displays 3 curated videos per concept
- Shows thumbnail, title, channel, and duration
- Caches results to avoid repeated API calls

### Progress Tracking
- Real-time progress calculation
- Visual progress bars
- Topic status: not_started, in_progress, completed
- Course completion percentage

## 🔒 Security

- Passwords hashed with bcryptjs (12 salt rounds)
- JWT tokens expire in 7 days
- Protected routes require valid JWT
- API keys stored in environment variables
- CORS enabled for frontend-backend communication

## 🎨 UI Components

### Buttons
- **Primary**: Amber background, dark text, hover effects
- **Secondary**: Transparent with amber border

### Cards
- Glass morphism effect
- Subtle backdrop blur
- Hover animations (scale + border color)

### Loading States
- Skeleton screens for content
- Animated spinners for AI operations
- Smooth transitions

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm, md, lg
- Grid layouts adapt to screen size
- Touch-friendly buttons and interactions

## 🚧 Troubleshooting

### MongoDB Connection Error
```bash
# Make sure MongoDB is running
mongod

# Or check your MONGODB_URI in .env
```

### OpenAI API Error
- Verify your API key is correct
- Check you have credits in your OpenAI account
- Ensure you're using GPT-4o model access

### YouTube API Error
- Verify your API key is correct
- Check API is enabled in Google Cloud Console
- Ensure you haven't exceeded quota limits

### Port Already in Use
```bash
# Change PORT in .env file
PORT=5001
```

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

Built with ❤️ using MERN Stack + AI
