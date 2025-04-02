export interface CryptoData {
  id: string;
  name: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
  market_cap_rank: number;
}

export interface CategoryData {
  name: string;
  y: number;
  marketCap: number;
  volume24h: number;
  priceChange24h: number;
  rank: number;
}
