import React from 'react';
import pluralize from 'pluralize';
import { BuyAssetFunc, formatNumber } from '../models';
import { Asset } from './models';

type AssetProps = {
  asset: Asset;
  cash: number;
  buyAsset: BuyAssetFunc;
};

type AssetState = {
  shares: number;
};

/**
 * Component listing Assets.
 * @returns
 */
class AssetCard extends React.Component<AssetProps, AssetState> {
  handleShareAmountChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    let shares = parseInt(ev.target.value, 10);
    if (isNaN(shares)) {
      shares = 0;
    }
    this.setState({ shares });
  };

  constructor(props: AssetProps) {
    super(props);
    this.state = { shares: 1 };
  }

  render() {
    return (
      <div
        className={`m-4 border py-4 px-6 rounded-md${
          this.props.asset.shares ? ' shadow border-l-4' : ''
        }`}
        key={this.props.asset.name}
      >
        <h4 className="text-xl font-thin uppercase tracking-widest text-gray-800 mb-3">
          {this.props.asset.name}
          <span className={`float-right${ this.props.asset.shares > 0 ? '' : ' hidden' }`}>
            {(((this.props.asset.totalValue / this.props.asset.buyInCost) - 1) * 100).toFixed(2) }%
          </span>
        </h4>

        <div className="grid grid-cols-2">
          <div>
            <div className="text-bold text-4xl">
              $
              {formatNumber(this.props.asset.sharePrice, {
                maximumFractionDigits: 2,
              })}
            </div>
            <span className="label">share price</span>
          </div>

          <div
            className={`flex-1${this.props.asset.shares > 0 ? '' : ' hidden'}`}
          >
            <div className="text-bold text-4xl">
              $
              {formatNumber(
                this.props.asset.sharePrice * this.props.asset.shares
              )}
            </div>
            <span className="label">total value</span>
          </div>
        </div>

        <div className="my-5 text-gray-500 font-thin text-sm">
          {pluralize('share', this.props.asset.shares, true)} owned
        </div>
        <div className="mt-4">
          <button
            className="py-2 px-5"
            disabled={this.state.shares > this.props.asset.shares}
            onClick={() =>
              this.props.buyAsset(this.props.asset, -1 * this.state.shares)
            }
          >
            Sell
          </button>
          <input
            className="w-12 text-right px-2 py-2 mx-1 border"
            type="number"
            value={this.state.shares}
            onChange={this.handleShareAmountChange}
            min="1"
          />
          <button
            className="py-2 px-5"
            disabled={
              this.state.shares * this.props.asset.sharePrice > this.props.cash
            }
            onClick={() =>
              this.props.buyAsset(this.props.asset, this.state.shares)
            }
          >
            Buy
          </button>
        </div>
      </div>
    );
  }
}

export default AssetCard;
