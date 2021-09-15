export interface Asset {
  name: string;

  /** Price per share. */
  sharePrice: number;

  /** Range of growth for a stock. First number is the minimum (%), second is the maximum (%). */
  growthRange: [number, number];

  /** Shares owned. */
  shares: number;

  /** Value of current shares owned. */
  totalValue: number;

  /** Total cost of shares purchased. */
  buyInCost: number;

  /** Flag set to `true` if asset is actively trading. Trading starts once the first stock has been purchased. */
  activelyTrading: boolean;
}
