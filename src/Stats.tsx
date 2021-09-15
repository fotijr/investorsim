import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Chart from 'chart.js';
import { Line } from 'test-react-chartjs-2';
import { formatNumber, UserProfile } from './models';

type StatsProps = {
  cash: number;
  initialNetWorth: number;
  netWorth: number;
  day: number;
  user: UserProfile;
};

type StatsState = {
  chartData: Chart.ChartData;
  chartOptions: Chart.ChartOptions;
};

/**
 * Stats component shows game progress and key metrics.
 * @returns
 */
class Stats extends React.Component<StatsProps, StatsState> {
  lineChart: any;

  constructor(props: StatsProps) {
    super(props);
    this.lineChart = React.createRef();
    this.state = {
      chartData: {
        labels: [1],
        datasets: [
          {
            label: 'Net profit',
            data: [0],
            borderWidth: 0,
            pointBackgroundColor: 'transparent',
            pointBorderColor: 'transparent',
            fill: { above: 'green', below: 'red', target: { value: 0 } },
            tension: 0.9,
          },
        ],
      },
      chartOptions: {
        interaction: {
          intersect: false,
          mode: 'index',
        },
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          x: {
            grid: {
              drawBorder: false,
              display: false,
            },
            ticks: {
              display: false,
            },
          },
          y: {
            grid: {
              drawBorder: false,
              display: false,
            },
            ticks: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            mode: 'nearest',
            callbacks: {
              title: (ctx) => `Day ${ctx[0].parsed.x}`,
            },
          },
        },
      },
    };
  }

  componentWillReceiveProps(nextProps: StatsProps) {
    console.log('chart ref', this.lineChart);
    if ((this.state.chartData.labels?.length as number) < nextProps.day) {
      this.state.chartData.labels?.push(nextProps.day);
      this.state.chartData.datasets[0].data.push(
        Math.round(nextProps.netWorth - nextProps.initialNetWorth)
      );
      this.lineChart.current.update();
    }
    // You don't have to do this check first, but it can help prevent an unneeded render
    // if (nextProps.startTime !== this.state.startTime) {
    //   this.setState({ startTime: nextProps.startTime });
    // }
  }

  render() {
    return (
      <div className="flex items-center mx-10 mt-4 mb-10">
        <div className="group">
          <div className="rounded-full w-40 h-40 overflow-hidden">
            <img
              className="bg-gray-500 grayscale w-40 h-40"
              src={`/img/${this.props.user.img}.jpg`}
              alt="Avatar"
              width="180"
              height="180"
            />
          </div>
          <div className="text-sm bg-gray-50 sticky px-3 py-1 px-4 -my-5 -mx-2 bg-opacity-98 flex items-center overflow-hidden">
            <div className="flex-1">{this.props.user.name}</div>
            <div className="flex-1 text-xs text-right">
              <span className="group-hover:hidden text-gray-600">Level 1</span>
              <Link
                className="hidden group-hover:inline px-4 py-2 -mr-3 bg-gray-100 text-blue-500"
                to="/profile"
              >
                Edit
              </Link>
            </div>
          </div>
        </div>
        <div className="mx-12">
          <span className="label">Cash</span>
          <h3 className="text-5xl">${formatNumber(this.props.cash)}</h3>
        </div>
        <div className="mx-12">
          <span className="label">Net worth</span>
          <h3 className="text-5xl">${formatNumber(this.props.netWorth)}</h3>
        </div>
        <div className={`mx-12${this.props.day > 1 ? '' : ' hidden'}`}>
          <div style={{ width: '250px', height: '125px' }}>
            <Line
              ref={this.lineChart}
              type="line"
              width={250}
              height={125}
              data={this.state.chartData}
              options={this.state.chartOptions}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Stats;
