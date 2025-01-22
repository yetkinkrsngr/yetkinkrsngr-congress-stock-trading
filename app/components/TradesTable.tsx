import React from 'react';
import type { Trade } from '@/app/types/trade';

interface TradesTableProps {
  trades: Trade[];
  sortField: keyof Trade;
  sortDirection: 'asc' | 'desc';
  handleSort: (field: keyof Trade) => void;
  expandedRow: number | null;
  setExpandedRow: (index: number | null) => void;
  favorites: string[];
  toggleFavorite: (representative: string) => void;
  watchlist: string[];
  toggleWatchlist: (ticker: string) => void;
}

interface SortIconProps {
  field: string;
  currentSortField: keyof Trade;
  sortDirection: 'asc' | 'desc';
}

const SortIcon: React.FC<SortIconProps> = ({ field, currentSortField, sortDirection }) => {
  if (currentSortField !== field) return <span className="ml-1 text-gray-400">↕</span>;
  return <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>;
};

const TradeTypeLabel: React.FC<{ type: string }> = ({ type }) => (
  <span className={`px-2 py-1 rounded-full text-xs ${
    type === 'purchase' ? 'bg-green-100 text-green-800' : 
    'bg-red-100 text-red-800'
  }`}>
    {type === 'purchase' ? 'Purchase' :
     type === 'sale_full' ? 'Full Sale' :
     type === 'sale_partial' ? 'Partial Sale' :
     type}
  </span>
);

const PartyLabel: React.FC<{ party: string }> = ({ party }) => (
  <span className={`px-2 py-1 rounded-full text-xs ${
    party === 'Democrat' ? 'bg-blue-100 text-blue-800' : 
    party === 'Republican' ? 'bg-red-100 text-red-800' : 
    'bg-gray-100 text-gray-800'
  }`}>
    {party}
  </span>
);

const ExpandedRow: React.FC<{ trade: Trade }> = ({ trade }) => (
  <tr className="bg-gray-50">
    <td colSpan={7} className="px-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold mb-2">Detailed Information</h4>
          <p><span className="font-medium">Description:</span> {trade.asset_description}</p>
          <p><span className="font-medium">Disclosure Date:</span> {new Date(trade.disclosure_date).toLocaleDateString('en-US')}</p>
          <p><span className="font-medium">District:</span> {trade.district}</p>
          <p><span className="font-medium">State:</span> {trade.state}</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Sector Information</h4>
          <p><span className="font-medium">Sector:</span> {trade.sector || 'Not specified'}</p>
          <p><span className="font-medium">Industry:</span> {trade.industry || 'Not specified'}</p>
          {trade.ptr_link && (
            <a
              href={trade.ptr_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 mt-2 inline-block"
            >
              View Official Document →
            </a>
          )}
        </div>
      </div>
    </td>
  </tr>
);

export const TradesTable: React.FC<TradesTableProps> = ({
  trades,
  sortField,
  sortDirection,
  handleSort,
  expandedRow,
  setExpandedRow,
  favorites,
  toggleFavorite,
  watchlist,
  toggleWatchlist,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th onClick={() => handleSort('transaction_date')} className="px-4 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                Date <SortIcon field="transaction_date" currentSortField={sortField} sortDirection={sortDirection} />
              </th>
              <th onClick={() => handleSort('representative')} className="px-4 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                Representative <SortIcon field="representative" currentSortField={sortField} sortDirection={sortDirection} />
              </th>
              <th onClick={() => handleSort('party')} className="px-4 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                Party <SortIcon field="party" currentSortField={sortField} sortDirection={sortDirection} />
              </th>
              <th onClick={() => handleSort('ticker')} className="px-4 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                Stock <SortIcon field="ticker" currentSortField={sortField} sortDirection={sortDirection} />
              </th>
              <th onClick={() => handleSort('type')} className="px-4 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                Type <SortIcon field="type" currentSortField={sortField} sortDirection={sortDirection} />
              </th>
              <th onClick={() => handleSort('amount')} className="px-4 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                Amount <SortIcon field="amount" currentSortField={sortField} sortDirection={sortDirection} />
              </th>
              <th className="px-4 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {trades.map((trade, index) => (
              <React.Fragment key={`${trade.representative}-${trade.transaction_date}-${index}`}>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    {new Date(trade.transaction_date).toLocaleDateString('en-US')}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {trade.representative}
                      <button
                        onClick={() => toggleFavorite(trade.representative)}
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          favorites.includes(trade.representative)
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        ★
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <PartyLabel party={trade.party} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{trade.ticker}</span>
                      <button
                        onClick={() => toggleWatchlist(trade.ticker)}
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          watchlist.includes(trade.ticker)
                            ? 'bg-green-100 text-green-600'
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        👁
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <TradeTypeLabel type={trade.type} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{trade.amount}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <button
                      onClick={() => setExpandedRow(expandedRow === index ? null : index)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      {expandedRow === index ? 'Hide' : 'Show'}
                    </button>
                  </td>
                </tr>
                {expandedRow === index && <ExpandedRow trade={trade} />}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}; 