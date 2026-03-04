import Video from '../models/Video.js';

export const getVideos = async (req, res) => {
  const videos = await Video.find().populate('courseId', 'title');
  res.json(videos);
};

export const createVideo = async (req, res) => {
  const video = await Video.create(req.body);
  res.status(201).json(video);
};
