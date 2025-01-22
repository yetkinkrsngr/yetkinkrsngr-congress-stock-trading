import React from 'react';

interface Statistics {
  topRepresentatives: [string, number][];
  topStocks: [string, number][];
  partyDistribution: { [key: string]: number };
  totalVolume: number;
}

interface StatisticsPanelProps {
  statistics: Statistics;
  showStats: boolean;
  setShowStats: (show: boolean) => void;
}

export const StatisticsPanel: React.FC<StatisticsPanelProps> = ({
  statistics,
  showStats,
  setShowStats,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Statistics</h2>
        <button
          onClick={() => setShowStats(!showStats)}
          className="text-blue-500 hover:text-blue-700"
        >
          {showStats ? 'Hide' : 'Show'}
        </button>
      </div>
      
      {showStats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Most Active Representatives</h3>
            <ul>
              {statistics.topRepresentatives.map(([name, count]) => (
                <li key={name} className="flex justify-between items-center mb-1">
                  <span>{name}</span>
                  <span className="text-gray-600">{count} trades</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Most Popular Stocks</h3>
            <ul>
              {statistics.topStocks.map(([ticker, count]) => (
                <li key={ticker} className="flex justify-between items-center mb-1">
                  <span>{ticker}</span>
                  <span className="text-gray-600">{count} trades</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Party Distribution</h3>
            {Object.entries(statistics.partyDistribution).map(([party, count]) => (
              <div key={party} className="flex justify-between items-center mb-1">
                <span>{party}</span>
                <span className="text-gray-600">{count} trades</span>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Total Trading Volume</h3>
            <div className="text-2xl font-bold text-green-600">
              ${new Intl.NumberFormat().format(statistics.totalVolume)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 