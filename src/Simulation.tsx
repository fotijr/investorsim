import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Stats from './Stats';
import Areas from './Areas';
import Assets from './assets/Assets';
import Investments from './Investments';
import Algorithms from './Algorithms';
import { Asset } from './assets/models';

type SimState = {
  cash: number;
  netWorth: number;
  assets: Asset[];
};

class Simulation extends React.Component<{}, SimState> {
  constructor(props: any) {
    super(props);
    this.state = {
      cash: 100,
      netWorth: 100,
      assets: [
        { name: 'Safe', price: 50, growthRange: [-0.004, 0.006], shares: 0 },
        { name: 'Risky', price: 125, growthRange: [-0.3, 0.4], shares: 0 },
      ],
    };
  }

  componentDidMount() {
    setInterval(() => this.advanceDay(), 1000);
  }

  render() {
    return (
      <div>
        <Stats cash={this.state.cash} netWorth={this.state.netWorth} />
        <Areas />
        <Switch>
          <Route exact path="/">
            <div>Overview/about</div>
          </Route>
          <Route path="/assets">
            <Assets
              assets={this.state.assets}
              buyAsset={this.buySellAsset.bind(this)}
            />
          </Route>
          <Route path="/investments" component={Investments} />
          <Route path="/algorithms" component={Algorithms} />
        </Switch>
      </div>
    );
  }

  private buySellAsset(asset: Asset, qty: number = 1) {
    console.log('Buying asset 💰', asset);
    asset.shares = (asset.shares + qty);
    this.setState((state, props) => {
      const assets = state.assets.map((a) => {
        if (a.name === asset.name) {
          // replace existing asset with updated share count
          return asset;
        }
        return a;
      });
      return {
        assets,
        cash: state.cash - (asset.price * qty),
      };
    });
  }

  private advanceDay() {
    this.setState((state, props) => {
      let netWorth = 0;
      const assets = state.assets.map((a) => {
        if (!a.shares) {
          // no shares, don't grow stock
          return a;
        }
       // console.log('starting price', a.price);
        const rate = this.getGrowthRate(a.growthRange[0], a.growthRange[1]);
        console.log('rate', rate);
        a.price *= rate;
        netWorth += (a.price * a.shares);
        // console.log('new price', a.price);
        return a;
      });
      // console.log('pre nw', netWorth);
      netWorth += state.cash;
      // console.log('post nw', netWorth);
      return {
        assets,
        netWorth
      };
    });
  }

  private getGrowthRate(min: number, max: number) {
    return 1 + (Math.random() * (max - min) + min);
  }
}

export default Simulation;
