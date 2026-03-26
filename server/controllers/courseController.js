import Course from '../models/Course.js';

export const createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      ...req.body,
      userId: req.user._id
    });
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({ userId: req.user._id }).sort({ lastAccessed: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ _id: req.params.id, userId: req.user._id });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    course.lastAccessed = Date.now();
    await course.save();
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTopicStatus = async (req, res) => {
  try {
    const { courseId, topicId, status, explanation, youtubeRefs, notes, bookmarked } = req.body;
    
    const course = await Course.findOne({ _id: courseId, userId: req.user._id });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    let topic;
    for (const module of course.modules) {
      topic = module.topics.find(t => t.id === topicId);
      if (topic) break;
    }

    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }

    if (status) topic.status = status;
    if (explanation) topic.explanation = explanation;
    if (youtubeRefs) topic.youtubeRefs = youtubeRefs;
    if (notes !== undefined) topic.notes = notes;
    if (bookmarked !== undefined) topic.bookmarked = bookmarked;

    // Calculate progress
    let totalTopics = 0;
    let completedTopics = 0;
    course.modules.forEach(module => {
      totalTopics += module.topics.length;
      completedTopics += module.topics.filter(t => t.status === 'completed').length;
    });
    course.progress = Math.round((completedTopics / totalTopics) * 100);

    await course.save();
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json({ message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
