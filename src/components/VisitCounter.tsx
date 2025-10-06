import React, { useEffect, useState } from 'react';

const VisitCounter = () => {
  const [visits, setVisits] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;
    const host = (
      typeof window !== 'undefined' ? window.location.host : 'local'
    )
      .replace(/[^a-z0-9-]/gi, '-')
      .toLowerCase();
    const namespace = `jps-${host}`;
    const url = `https://api.countapi.xyz/hit/${namespace}/site_visits`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (mounted && typeof data?.value === 'number') setVisits(data.value);
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  if (visits === null) return null;

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="glass-panel gradient-border rounded-xl p-4 flex items-center justify-between">
        <p className="text-sm text-gray-700">Total site visits</p>
        <p className="text-xl font-semibold">{visits.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default VisitCounter;
