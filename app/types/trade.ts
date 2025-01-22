export interface Trade {
  representative: string;
  ticker: string;
  party: string;
  amount?: string;
  transaction_date: string;
  type: string;
  asset_description: string;
  disclosure_date: string;
  district: string;
  state: string;
  sector?: string;
  industry?: string;
  ptr_link?: string;
} 