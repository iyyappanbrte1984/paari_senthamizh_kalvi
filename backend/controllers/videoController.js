import Video from '../models/Video.js';
import { uploadVideo } from '../utils/upload.js';
import logger from '../utils/logger.js';

export const getVideos = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const courseId = req.query.courseId;

    const query = {};
    if (courseId) {
      query.courseId = courseId;
    }

    const videos = await Video.find(query)
      .populate('courseId', 'title')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Video.countDocuments(query);

    res.json({
      videos,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalVideos: total
    });
  } catch (error) {
    logger.error('Error fetching videos:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createVideo = async (req, res) => {
  uploadVideo(req, res, async (err) => {
    if (err) {
      logger.error('File upload error:', err);
      return res.status(400).json({ message: 'File upload failed', error: err.message });
    }

    try {
      const videoData = {
        ...req.body,
        url: req.file ? req.file.path : req.body.url
      };

      const video = await Video.create(videoData);
      logger.info(`Video created: ${video._id}`);
      res.status(201).json(video);
    } catch (error) {
      logger.error('Error creating video:', error);
      if (error.name === 'ValidationError') {
        return res.status(400).json({ message: 'Validation error', error: error.message });
      }
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
};

export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate('courseId', 'title');
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json(video);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid video ID' });
    }
    logger.error('Error fetching video:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    logger.info(`Video updated: ${video._id}`);
    res.json(video);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', error: error.message });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid video ID' });
    }
    logger.error('Error updating video:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    logger.info(`Video deleted: ${video._id}`);
    res.json({ message: 'Video deleted successfully' });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid video ID' });
    }
    logger.error('Error deleting video:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
