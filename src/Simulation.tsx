import React from 'react';
import {
  Switch,
  Route,
  Redirect,
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import Stats from './Stats';
import Areas from './Areas';
import Assets from './assets/Assets';
import Loans from './Loans';
import Algorithms from './Algorithms';
import Profile from './Profile';
import { Asset } from './assets/models';
import { UserProfile } from './models';

type SimState = {
  day: number;
  cash: number;
  initialNetWorth: number;
  netWorth: number;
  user: UserProfile;
  assets: Asset[];
};

class Simulation extends React.Component<RouteComponentProps, SimState> {
  constructor(props: any) {
    super(props);
    const userImgId = Math.floor(this.getRandomNumber(0, 18));
    this.state = {
      day: 1,
      cash: 1000,
      initialNetWorth: 1000,
      netWorth: 1000,
      user: {
        name: 'You',
        img: userImgId,
      },
      assets: [
        {
          name: 'Dividend',
          sharePrice: 71,
          growthRange: [-0.05, 0.064],
          shares: 0,
          buyInCost: 0,
          totalValue: 0,
          activelyTrading: false,
          dividend: {
            amount: 2,
            lastDistributed: 0,
            frequency: 100,
          },
        },
        {
          name: 'Safe',
          sharePrice: 50,
          growthRange: [-0.2, 0.25],
          shares: 0,
          buyInCost: 0,
          totalValue: 0,
          activelyTrading: false,
        },
        {
          name: 'Risky',
          sharePrice: 125,
          growthRange: [-1, 1.0103],
          shares: 0,
          buyInCost: 0,
          totalValue: 0,
          activelyTrading: false,
        },
        {
          name: 'YOLO',
          sharePrice: 88,
          growthRange: [-3, 3.0003],
          shares: 0,
          buyInCost: 0,
          totalValue: 0,
          activelyTrading: false,
        },
      ],
    };
  }

  componentDidMount() {
    setInterval(() => this.advanceDay(), 1000);
  }

  render() {
    return (
      <div>
        <Stats
          cash={this.state.cash}
          day={this.state.day}
          initialNetWorth={this.state.initialNetWorth}
          netWorth={this.state.netWorth}
          user={this.state.user}
        />
        <Areas />
        <Switch>
          <Redirect exact from="/" to="/assets" />
          <Route path="/assets">
            <Assets
              assets={this.state.assets}
              cash={this.state.cash}
              buyAsset={this.buySellAsset}
            />
          </Route>
          <Route path="/credit" component={Loans} />
          <Route path="/algorithms" component={Algorithms} />
          <Route path="/profile">
            <Profile
              user={this.state.user}
              updated={this.updateUserProfile.bind(this)}
            />
          </Route>
        </Switch>
      </div>
    );
  }

  private updateUserProfile(user: UserProfile) {
    this.setState((state, props) => {
      return { user };
    });
  }

  private buySellAsset = (asset: Asset, qty: number = 1) => {
    if (qty === 0) {
      return;
    }

    this.setState((state, props) => {
      const assets = state.assets.map((a) => {
        if (a.name === asset.name) {
          // replace existing asset with updated share count
          asset.buyInCost += qty * asset.sharePrice;
          asset.totalValue = asset.buyInCost;
          asset.shares = asset.shares + qty;
          asset.activelyTrading = true;
          if (a.shares === 0 && qty > 0 && asset.dividend) {
            // first time buying shares of a stock with dividend
            asset.dividend.lastDistributed = state.day;
          }
          return asset;
        }
        return a;
      });
      return {
        assets,
        cash: state.cash - asset.sharePrice * qty,
      };
    });
  };

  private advanceDay() {
    this.setState((state, props) => {
      let cash = state.cash;
      let netWorth = 0;
      let day = state.day;
      let isTradingDay = false;
      const assets = state.assets.map((a) => {
        if (!a.activelyTrading) {
          // stock isn't yet trading, don't adjust price
          return a;
        }
        // console.log('starting price', a.price);
        isTradingDay = true;
        const rate = this.getRandomNumber(a.growthRange[0], a.growthRange[1]);
        const multiplier = rate / 100 + 1;
        // console.log(a.growthRange[0], a.growthRange[1], rate, multiplier);
        // console.log('rate', rate);
        a.sharePrice *= multiplier;
        const holdingsValue = a.sharePrice * a.shares;
        a.totalValue = holdingsValue;
        netWorth += holdingsValue;

        if (a.dividend) {
          if (day >= a.dividend.lastDistributed + a.dividend.frequency) {
            // it's dividend day!
            cash += a.dividend.amount * a.shares;
            a.dividend.lastDistributed = day;
          }
        }

        return a;
      });

      if (isTradingDay) {
        day++;
      }

      netWorth += cash;

      return {
        day,
        cash,
        assets,
        netWorth,
      };
    });
  }

  private getRandomNumber(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
}

export default withRouter(Simulation);
