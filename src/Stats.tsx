import React from 'react';
import { Link } from 'react-router-dom';
import {
  Chart,
  ChartConfiguration,
  ChartType,
  Filler,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  TimeSeriesScale,
  Tooltip,
} from 'chart.js';
import { formatNumber, UserProfile } from './models';

type StatsProps = {
  cash: number;
  initialNetWorth: number;
  netWorth: number;
  day: number;
  user: UserProfile;
};

type StatsState = {
  // chartConfig: ChartConfiguration<ChartType, any[], number>;
  // chartData: ChartJs.ChartData;
  // chartOptions: ChartJs.ChartOptions;
};

/**
 * Stats component shows game progress and key metrics.
 * @returns
 */
class Stats extends React.Component<StatsProps, StatsState> {
  chart!: Chart;
  chartCanvas: React.RefObject<HTMLCanvasElement>;
  chartConfig: ChartConfiguration<ChartType, any[], number>;

  constructor(props: StatsProps) {
    super(props);

    /** Chart.js setup and defaults */
    Chart.register(
      LineElement,
      PointElement,
      LineController,
      LinearScale,
      TimeSeriesScale,
      Filler,
      Tooltip
    );

    this.chartCanvas = React.createRef();
    this.chartConfig = {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Net profit',
            data: [{ x: 1, y: 0 }],
            borderWidth: 0,
            pointBackgroundColor: 'transparent',
            pointBorderColor: 'transparent',
            fill: {
              above: 'rgba(52, 211, 153, 0.5)',
              below: 'rgba(220, 38, 38, 0.5)',
              target: { value: 0 },
            },
            tension: 0.4,
          },
        ],
      },
      options: {
        animation: false,
        interaction: {
          intersect: false,
          mode: 'index',
        },
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          x: {
            beginAtZero: false,
            min: 0,
            max: 1,
            position: {
              y: 0,
            },
            type: 'linear',
            grid: {
              borderColor: 'rgba(52, 211, 153, 1)',
              drawBorder: true,
              display: false,
            },
            ticks: {
              display: false,
            },
          },
          y: {
            beginAtZero: false,
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
              label: (ctx) => `$${ctx.parsed.y}`,
              labelColor: (ctx) => {
                const color =
                  ctx.parsed.y < 0
                    ? 'rgba(220, 38, 38, 0.5)'
                    : 'rgba(52, 211, 153, 0.5)';
                return {
                  borderColor: color,
                  backgroundColor: color,
                };
              },
            },
          },
        },
      },
    };
  }

  componentDidMount() {
    this.chart = new Chart(this.chartCanvas.current, this.chartConfig);
  }

  componentWillReceiveProps(nextProps: StatsProps) {
    if ((this.chart.data.datasets[0].data.length as number) < nextProps.day) {
      this.chart.data.datasets[0].data.push({
        x: nextProps.day,
        y: Number((nextProps.netWorth - nextProps.initialNetWorth).toFixed(2)),
      });
      this.chart.config.options!.scales!.x!.max = nextProps.day;
      this.chart.update();
    }
  }

  render() {
    return (
      <div className="flex flex-col md:flex-row items-center mx-4 mt-4 md:mt-8 mb-10">
        <div className="group mr-4 md:mx-14 lg:md-20">
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
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 mt-8 md:mt-0 w-full">
          <div className="mb-4 sm:mb-0">
            <span className="label">Cash</span>
            <h3 className="text-5xl">${formatNumber(this.props.cash)}</h3>
            <span className="text-xs text-gray-800">
              ${Number(this.props.cash.toFixed(2)).toLocaleString()}
            </span>
          </div>
          <div className="mb-4 sm:mb-0">
            <span className="label">Net worth</span>
            <h3 className="text-5xl">${formatNumber(this.props.netWorth)}</h3>
            <span className="text-xs text-gray-800">
              ${Number(this.props.netWorth.toFixed(2)).toLocaleString()}
            </span>
          </div>
          <div className={this.props.day > 1 ? 'relative' : ' invisible'}>
            <h4 className="absolute top-0 left-0 pointer-events-none tracking-wider text-gray-600 font-thin">
              Profits
            </h4>
            <canvas ref={this.chartCanvas}></canvas>
          </div>
        </div>
      </div>
    );
  }
}

export default Stats;
