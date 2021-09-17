export interface Asset {
  name: string;

  /** Description of asset. */
  description: string;

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

  /** Growth percentage of owned stock */
  growth?: number;

  dividend?: {
    /** Amount (in dollars) of dividend. */
    amount: number;

    /** Amount of days between dividend distribution. */
    frequency: number;

    /** Day dividend was distributed. */
    lastDistributed: number;
  };
}
