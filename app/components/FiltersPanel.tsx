import React from 'react';

interface DateRange {
  start: string;
  end: string;
}

interface FiltersPanelProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedParty: string;
  setSelectedParty: (party: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  amountFilter: string;
  setAmountFilter: (filter: string) => void;
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
  selectedState: string;
  setSelectedState: (state: string) => void;
  selectedSector: string;
  setSelectedSector: (sector: string) => void;
  uniqueStates: string[];
  uniqueSectors: string[];
}

export const FiltersPanel: React.FC<FiltersPanelProps> = ({
  searchTerm,
  setSearchTerm,
  selectedParty,
  setSelectedParty,
  selectedType,
  setSelectedType,
  amountFilter,
  setAmountFilter,
  dateRange,
  setDateRange,
  selectedState,
  setSelectedState,
  selectedSector,
  setSelectedSector,
  uniqueStates,
  uniqueSectors,
}) => {
  const handleDateChange = (field: keyof DateRange) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateRange({ ...dateRange, [field]: e.target.value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Search representative, stock or description..."
          className="p-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <select
          className="p-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500"
          value={selectedParty}
          onChange={(e) => setSelectedParty(e.target.value)}
        >
          <option value="all">All Parties</option>
          <option value="Democrat">Democrat</option>
          <option value="Republican">Republican</option>
        </select>

        <select
          className="p-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="all">All Transaction Types</option>
          <option value="purchase">Purchase</option>
          <option value="sale_full">Full Sale</option>
          <option value="sale_partial">Partial Sale</option>
        </select>

        <select
          className="p-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500"
          value={amountFilter}
          onChange={(e) => setAmountFilter(e.target.value)}
        >
          <option value="all">All Amounts</option>
          <option value="under15k">Under $15,000</option>
          <option value="15k-50k">$15,000 - $50,000</option>
          <option value="over50k">Over $50,000</option>
        </select>

        <div className="col-span-2">
          <div className="flex gap-4">
            <input
              type="date"
              className="p-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500"
              value={dateRange.start}
              onChange={handleDateChange('start')}
            />
            <input
              type="date"
              className="p-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500"
              value={dateRange.end}
              onChange={handleDateChange('end')}
            />
          </div>
        </div>

        <select
          className="p-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          <option value="all">All States</option>
          {uniqueStates.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>

        <select
          className="p-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-500"
          value={selectedSector}
          onChange={(e) => setSelectedSector(e.target.value)}
        >
          <option value="all">All Sectors</option>
          {uniqueSectors.map(sector => (
            <option key={sector} value={sector}>{sector}</option>
          ))}
        </select>
      </div>
    </div>
  );
}; 