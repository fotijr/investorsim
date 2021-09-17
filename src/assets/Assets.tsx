import React from 'react';
import AssetCard from './Asset';
import { BuyAssetFunc } from '../models';
import { Asset } from './models';

type AssetsProps = {
  assets: Asset[];
  cash: number;
  buyAsset: BuyAssetFunc;
};

/**
 * Component listing Assets.
 * @returns
 */
export const Assets = (props: AssetsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {props.assets.map((a) => (
        <AssetCard
          key={a.name}
          asset={a}
          cash={props.cash}
          buyAsset={props.buyAsset}
        />
      ))}
    </div>
  );
};
