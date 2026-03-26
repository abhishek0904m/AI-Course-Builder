import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  topic: { type: String, required: true },
  description: { type: String },
  level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  goal: { type: String },
  totalWeeks: { type: Number },
  hoursPerDay: { type: Number },
  modules: [{
    week: Number,
    title: String,
    topics: [{
      id: String,
      name: String,
      estimatedHours: Number,
      difficulty: String,
      description: String,
      status: { type: String, enum: ['not_started', 'in_progress', 'completed'], default: 'not_started' },
      explanation: String,
      youtubeRefs: [{ videoId: String, title: String, channelTitle: String, thumbnail: String, duration: String }],
      notes: String,
      bookmarked: { type: Boolean, default: false }
    }]
  }],
  progress: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  lastAccessed: { type: Date, default: Date.now }
});

export default mongoose.model('Course', courseSchema);
