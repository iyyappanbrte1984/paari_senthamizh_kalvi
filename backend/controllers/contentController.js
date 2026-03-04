import Material from '../models/Material.js';
import Video from '../models/Video.js';

export const getMaterials = async (req, res) => {
  const q = req.query.q;
  const filter = q ? { title: { $regex: q, $options: 'i' } } : {};
  const materials = await Material.find(filter).populate('courseId', 'title');
  res.json(materials);
};

export const createMaterial = async (req, res) => {
  const material = await Material.create(req.body);
  res.status(201).json(material);
};

export const getVideos = async (req, res) => {
  const videos = await Video.find().populate('courseId', 'title');
  res.json(videos);
};

export const createVideo = async (req, res) => {
  const video = await Video.create(req.body);
  res.status(201).json(video);
};
