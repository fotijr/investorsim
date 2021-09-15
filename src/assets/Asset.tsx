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
        className="m-4 border py-4 px-6 flex-1 rounded-md"
        key={this.props.asset.name}
      >
        <h4 className="text-lg font-thin uppercase tracking-wider text-gray-800 mb-2">{this.props.asset.name}</h4>

        <div className="flex md:justify-items-center">
          <div className="text-right">
            <div className="text-bold text-4xl">
              $
              {formatNumber(this.props.asset.sharePrice, {
                maximumFractionDigits: 2,
              })}
            </div>
            <span className="label">share price</span>
          </div>

          <div
            className={`text-right flex-1${
              this.props.asset.shares > 0 ? '' : ' hidden'
            }`}
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
            disabled={this.state.shares > this.props.asset.shares}
            onClick={() =>
              this.props.buyAsset(this.props.asset, -1 * this.state.shares)
            }
          >
            Sell
          </button>
          <input
            className="w-12 text-right px-2 mx-1 border"
            type="number"
            value={this.state.shares}
            onChange={this.handleShareAmountChange}
            min="1"
          />
          <button
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
