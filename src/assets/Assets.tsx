import React from 'react';
import AssetCard from './Asset';
import { BuyAssetFunc } from '../models';
import { Asset } from './models';

type AssetsProps = {
  assets: Asset[];
  cash: number;
  buyAsset: BuyAssetFunc;
};

type AssetsState = {
  count: number;
};

/**
 * Component listing Assets.
 * @returns
 */
class Assets extends React.Component<AssetsProps, AssetsState> {
  render() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {this.props.assets.map((a) => (
          <AssetCard key={a.name} asset={a} cash={this.props.cash} buyAsset={this.props.buyAsset} />
        ))}
      </div>
    );
  }
}

export default Assets;
