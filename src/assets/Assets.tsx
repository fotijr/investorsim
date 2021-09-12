import React from 'react';
import { BuyAssetFunc, formatNumber } from '../models';
import { Asset } from './models';

type AssetsProps = {
  assets: Asset[];
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
      <div>
        {this.props.assets.map((a) => (
          <div className="mb-3" key={a.name}>
            <h4 className="text-lg">{a.name}</h4>
            <span className="label">Price</span>
            <div className="text-bold">${formatNumber(a.price, 2)}</div>
            <div>Shares {a.shares}</div>
            <button onClick={() => this.props.buyAsset(a, 1)}>Buy</button>
            <button onClick={() => this.props.buyAsset(a, -1)}>Sell</button>
          </div>
        ))}
      </div>
    );
  }
}

export default Assets;
