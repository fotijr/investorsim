export interface Asset {
  name: string;
  price: number;
  
  /** Range of growth for a stock. First number is the minimum (%), second is the maximum (%). */
  growthRange: [number, number];
  
  /** Shares owned. */
  shares: number;
}
