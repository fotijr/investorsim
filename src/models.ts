import { Asset } from './assets/models';

export type BuyAssetFunc = (asset: Asset, qty: number) => void;

export type UpdateProfileFunc = (user: UserProfile) => void;
export interface UserProfile {
  name: string;
  img: number;
}

export function formatNumber(
  value: number,
  options: Intl.NumberFormatOptions = {}
) {
  const formatOptions = {
    maximumFractionDigits: 1,
    currency: 'USD',
    notation: 'compact',
    compactDisplay: 'short',
    ...options,
  };
  return new Intl.NumberFormat('en-US', formatOptions).format(value);
}
