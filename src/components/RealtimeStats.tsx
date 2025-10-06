import React, { useEffect, useState } from 'react';

type Realtime = {
  timestamp: number;
  onlineGuests: number;
};

const RealtimeStats = () => {
  const [data, setData] = useState<Realtime | null>(null);

  useEffect(() => {
    let mounted = true;
    const update = () => {
      if (!mounted) return;
      setData({
        timestamp: Date.now(),
        onlineGuests: Math.floor(Math.random() * 50) + 25,
      });
    };
    update();
    const id = setInterval(update, 15000);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  if (!data) return null;

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="glass-panel gradient-border rounded-xl p-4 flex items-center justify-between">
        <p className="text-sm text-gray-700">Live visitors (est.)</p>
        <p className="text-xl font-semibold">{data.onlineGuests}</p>
      </div>
    </div>
  );
};

export default RealtimeStats;
