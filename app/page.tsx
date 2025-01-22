'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Trade } from './types/trade';
import { StatisticsPanel } from './components/StatisticsPanel';
import { FiltersPanel } from './components/FiltersPanel';
import { TradesTable } from './components/TradesTable';
import { Pagination } from './components/Pagination';

function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

interface StatsAccumulator {
  [key: string]: number;
}

function calculateStatistics(trades: Trade[]) {
  // Most active representatives
  const representativeStats = trades.reduce((acc: StatsAccumulator, trade) => {
    acc[trade.representative] = (acc[trade.representative] || 0) + 1;
    return acc;
  }, {});

  // Most popular stocks
  const stockStats = trades.reduce((acc: StatsAccumulator, trade) => {
    acc[trade.ticker] = (acc[trade.ticker] || 0) + 1;
    return acc;
  }, {});

  // Party distribution
  const partyStats = trades.reduce((acc: StatsAccumulator, trade) => {
    acc[trade.party] = (acc[trade.party] || 0) + 1;
    return acc;
  }, {});

  // Total trading volume
  const totalVolume = trades.reduce((acc: number, trade) => {
    const amount = trade.amount?.match(/\$([\\d,]+)/)?.[1]?.replace(/,/g, '');
    return acc + (amount ? parseInt(amount) : 0);
  }, 0);

  return {
    topRepresentatives: Object.entries(representativeStats)
      .sort(([,a], [,b]) => (b as number) - (a as number))
      .slice(0, 5),
    topStocks: Object.entries(stockStats)
      .sort(([,a], [,b]) => (b as number) - (a as number))
      .slice(0, 5),
    partyDistribution: partyStats,
    totalVolume
  };
}

export default function Home() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedParty, setSelectedParty] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortField, setSortField] = useState<keyof Trade>('transaction_date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [amountFilter, setAmountFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedState, setSelectedState] = useState('all');
  const [selectedSector, setSelectedSector] = useState('all');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [showStats, setShowStats] = useState(false);
  const itemsPerPage = 10;

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const response = await axios.get('https://house-stock-watcher-data.s3-us-west-2.amazonaws.com/data/all_transactions.json');
        setTrades(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error loading data');
        setLoading(false);
      }
    };

    fetchTrades();
  }, []);

  const handleSort = (field: keyof Trade) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const toggleFavorite = (representative: string) => {
    setFavorites(prev => 
      prev.includes(representative) 
        ? prev.filter(r => r !== representative)
        : [...prev, representative]
    );
  };

  const toggleWatchlist = (ticker: string) => {
    setWatchlist(prev => 
      prev.includes(ticker) 
        ? prev.filter(t => t !== ticker)
        : [...prev, ticker]
    );
  };

  const getAmountValue = (amount: string | undefined): number => {
    if (!amount) return 0;
    const match = amount.match(/\$([\\d,]+)/);
    return match ? parseInt(match[1].replace(/,/g, '')) : 0;
  };

  const filteredTrades = trades.filter(trade => {
    const matchesSearch = 
      trade.representative?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      trade.ticker?.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      trade.asset_description?.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
    
    const matchesParty = selectedParty === 'all' || trade.party === selectedParty;
    const matchesType = selectedType === 'all' || trade.type === selectedType;
    const matchesState = selectedState === 'all' || trade.state === selectedState;
    const matchesSector = selectedSector === 'all' || trade.sector === selectedSector;
    
    const matchesDateRange = (!dateRange.start || new Date(trade.transaction_date) >= new Date(dateRange.start)) &&
                           (!dateRange.end || new Date(trade.transaction_date) <= new Date(dateRange.end));
    
    let matchesAmount = true;
    if (amountFilter === 'under15k') {
      matchesAmount = getAmountValue(trade.amount) <= 15000;
    } else if (amountFilter === '15k-50k') {
      matchesAmount = getAmountValue(trade.amount) > 15000 && getAmountValue(trade.amount) <= 50000;
    } else if (amountFilter === 'over50k') {
      matchesAmount = getAmountValue(trade.amount) > 50000;
    }

    return matchesSearch && matchesParty && matchesType && matchesAmount && 
           matchesState && matchesSector && matchesDateRange;
  }).sort((a, b) => {
    let comparison = 0;
    if (sortField === 'transaction_date') {
      comparison = new Date(a.transaction_date).getTime() - new Date(b.transaction_date).getTime();
    } else if (sortField in a) {
      const aVal = a[sortField] || '';
      const bVal = b[sortField] || '';
      comparison = String(aVal).localeCompare(String(bVal));
    }
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const totalPages = Math.ceil(filteredTrades.length / itemsPerPage);
  const paginatedTrades = filteredTrades.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const statistics = calculateStatistics(trades);
  const uniqueStates = [...new Set(trades.map(trade => trade.state).filter((state): state is string => Boolean(state)))];
  const uniqueSectors = [...new Set(trades.map(trade => trade.sector).filter((sector): sector is string => Boolean(sector)))];

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-2xl animate-pulse">Loading...</div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-2xl text-red-500">{error}</div>
    </div>
  );

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Congressional Stock Trading</h1>
          <button
            onClick={() => {
              const headers = ['Date', 'Representative', 'Party', 'Stock', 'Transaction Type', 'Amount', 'Description'];
              const csvData = filteredTrades.map(trade => [
                new Date(trade.transaction_date).toLocaleDateString('en-US'),
                trade.representative,
                trade.party,
                trade.ticker,
                trade.type,
                trade.amount,
                trade.asset_description
              ]);
              
              const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
              const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
              const link = document.createElement('a');
              link.href = URL.createObjectURL(blob);
              link.download = 'congress_trades.csv';
              link.click();
            }}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Download CSV
          </button>
        </div>

        <StatisticsPanel
          statistics={statistics}
          showStats={showStats}
          setShowStats={setShowStats}
        />

        <FiltersPanel
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedParty={selectedParty}
          setSelectedParty={setSelectedParty}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          amountFilter={amountFilter}
          setAmountFilter={setAmountFilter}
          dateRange={dateRange}
          setDateRange={setDateRange}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          selectedSector={selectedSector}
          setSelectedSector={setSelectedSector}
          uniqueStates={uniqueStates}
          uniqueSectors={uniqueSectors}
        />

        <TradesTable
          trades={paginatedTrades}
          sortField={sortField}
          sortDirection={sortDirection}
          handleSort={handleSort}
          expandedRow={expandedRow}
          setExpandedRow={setExpandedRow}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          watchlist={watchlist}
          toggleWatchlist={toggleWatchlist}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          totalItems={filteredTrades.length}
          onPageChange={setCurrentPage}
        />
      </div>
    </main>
  );
}
