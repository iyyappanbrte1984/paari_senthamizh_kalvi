import Material from '../models/Material.js';

export const getMaterials = async (req, res) => {
  const query = req.query.search ? { title: { $regex: req.query.search, $options: 'i' } } : {};
  const materials = await Material.find(query).populate('courseId', 'title');
  res.json(materials);
};

export const createMaterial = async (req, res) => {
  const material = await Material.create(req.body);
  res.status(201).json(material);
};
