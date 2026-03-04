import { useEffect, useState } from 'react';

const useFetch = (fetcher, deps = []) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetcher()
      .then((res) => mounted && setData(res.data || res))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, deps);

  return { data, loading };
};

export default useFetch;
