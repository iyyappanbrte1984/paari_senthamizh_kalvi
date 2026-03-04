import { useEffect, useState } from 'react';
import api from '../services/api';

const MaterialsPage = () => {
  const [materials, setMaterials] = useState([]);
  const [q, setQ] = useState('');

  const load = async (query = '') => {
    const { data } = await api.get(`/materials?q=${query}`);
    setMaterials(data);
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Study Materials</h1>
      <div className="my-4 flex gap-2">
        <input className="border rounded p-2 w-full" placeholder="Search materials" value={q} onChange={(e) => setQ(e.target.value)} />
        <button className="bg-secondary text-white px-4 rounded" onClick={() => load(q)}>Search</button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {materials.map((m) => (
          <div key={m._id} className="bg-white border rounded-xl p-4">
            <h3 className="font-semibold">{m.title}</h3>
            <p className="text-sm">Course: {m.courseId?.title}</p>
            <a href={m.fileUrl} className="text-primary text-sm">Download</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaterialsPage;
