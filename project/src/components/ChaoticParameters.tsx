import React from 'react';
import { Activity } from 'lucide-react';

interface ChaoticParametersProps {
  seed: number;
  r: number;
  iterations: number;
}

const ChaoticParameters: React.FC<ChaoticParametersProps> = ({ seed, r, iterations }) => {
  return (
    <div className="bg-gray-700/50 p-6 rounded-lg backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="text-blue-400" />
        <h3 className="text-lg font-semibold">Chaotic Parameters</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-sm text-gray-400">Initial Seed</p>
          <p className="text-lg font-mono">{seed.toFixed(6)}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-sm text-gray-400">R Parameter</p>
          <p className="text-lg font-mono">{r.toFixed(6)}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="text-sm text-gray-400">Iterations</p>
          <p className="text-lg font-mono">{iterations}</p>
        </div>
      </div>
    </div>
  );
}

export default ChaoticParameters;