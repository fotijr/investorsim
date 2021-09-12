import { Asset } from './assets/models';

export type BuyAssetFunc = (asset: Asset, qty: number) => void;

export function formatNumber(value: number, maxDigits = 1) {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: maxDigits,
    currency: 'USD',
    notation: 'compact',
    compactDisplay: 'short',
  }).format(value);
}
