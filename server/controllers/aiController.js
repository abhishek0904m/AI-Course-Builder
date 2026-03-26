import { generateRoadmap, explainConcept, generateQuiz } from '../utils/aiHelper.js';
import axios from 'axios';

export const createRoadmap = async (req, res) => {
  try {
    const roadmap = await generateRoadmap(req.body);
    res.json(roadmap);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const explain = async (req, res) => {
  try {
    const explanation = await explainConcept(req.body);
    res.json({ explanation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createQuiz = async (req, res) => {
  try {
    const quiz = await generateQuiz(req.body);
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchYouTube = async (req, res) => {
  try {
    const { q, maxResults = 3 } = req.query;
    
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q,
        maxResults,
        type: 'video',
        key: process.env.YOUTUBE_API_KEY
      }
    });

    const videos = response.data.items.map(item => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.medium.url,
      description: item.snippet.description
    }));

    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
