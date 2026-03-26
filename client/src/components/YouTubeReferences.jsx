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
      <div className="bg-white border border-[#E2E8F0] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center justify-center py-12">
          <SmoothLoader size="md" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#161F32] border border-[#1E293B] rounded-3xl p-8 shadow-2xl">
      <RevealOnScroll direction="down">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-[#FF0000]/10 rounded-xl flex items-center justify-center">
            <Youtube className="text-[#FF0000]" size={24} />
          </div>
          <h3 className="text-xl font-outfit font-bold text-[#0F172A]">Recommended Resources</h3>
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
              className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl overflow-hidden transition-all duration-300 block hover:border-[#F59E0B]/30 hover:shadow-md"
            >
              <img src={video.thumbnail} alt={video.title} className="w-full aspect-video object-cover" />
              <div className="p-4">
                <h4 className="font-bold text-sm text-[#0F172A] line-clamp-2 mb-2 leading-relaxed">{video.title}</h4>
                <p className="text-[#64748B] text-xs font-semibold">{video.channelTitle}</p>
              </div>
            </motion.a>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  );
};

export default YouTubeReferences;
