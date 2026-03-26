import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Youtube } from 'lucide-react';
import api from '../api/axios';
import toast from 'react-hot-toast';
import SmoothLoader from './SmoothLoader';
import RevealOnScroll from './RevealOnScroll';

const YouTubeReferences = ({ course, topic }) => {
  const [videos, setVideos] = useState(topic.youtubeRefs || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!topic.youtubeRefs || topic.youtubeRefs.length === 0) {
      fetchVideos();
    }
  }, [topic.id]);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/ai/youtube/search', {
        params: {
          q: `${topic.name} ${course.topic} tutorial`,
          maxResults: 3
        }
      });
      setVideos(data);
      
      await api.put(`/course/${course._id}/topic`, {
        courseId: course._id,
        topicId: topic.id,
        youtubeRefs: data
      });
    } catch (error) {
      toast.error('Failed to load videos');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex items-center justify-center py-8">
          <SmoothLoader size="md" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <RevealOnScroll direction="down">
        <div className="flex items-center space-x-2 mb-4">
          <Youtube className="text-indigo-600" size={24} />
          <h3 className="text-xl font-outfit font-semibold">Watch & Learn</h3>
        </div>
      </RevealOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {videos.map((video, idx) => (
          <RevealOnScroll key={idx} direction="scale" delay={idx * 0.1}>
            <motion.a
              href={`https://youtube.com/watch?v=${video.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white-hover rounded-lg overflow-hidden transition block card-3d"
            >
              <img src={video.thumbnail} alt={video.title} className="w-full aspect-video object-cover" />
              <div className="p-3">
                <h4 className="font-semibold text-sm line-clamp-2 mb-1">{video.title}</h4>
                <p className="text-gray-600 text-xs">{video.channelTitle}</p>
              </div>
            </motion.a>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
};

export default YouTubeReferences;
