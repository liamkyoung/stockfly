import React from 'react'
import ApexChart from 'react-apexcharts'
import Button from 'react-bootstrap/Button'

class Graph extends React.Component {
  constructor (props) {
    super(props)
    // Graph Properties
    this.state = {
      // Graph Dimensions
      width: 1200,
      height: 700,
      stockGraphLoaded: false,
      barChartLoaded: false,
      smaLoaded: false,
      // Graph Data
      series: [{
        name: '',
        data: []
      }],
      // Graph Options
      options: {
        chart: {
          type: 'area',
          id: 'stockChart',
          stacked: false,
          height: 350,

          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
          },

          toolbar: {
            autoSelected: 'zoom'
          }
        },

        dataLabels: {
          enabled: false
        },

        markers: {
          size: 0
        },

        title: {
          text: 'Stock Price Movement',
          align: 'left'
        },

        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100]
          }
        },
        // Graph axes and tooltip
        yaxis: {
          labels: {
            formatter: function (val) {
              return val.toFixed(2)
            }
          },
          title: {
            text: 'Price'
          }
        },

        xaxis: {
          type: 'datetime'
        },

        tooltip: {
          shared: false,
          y: {
            formatter: function (val) {
              return val.toFixed(2)
            }
          }
        },
        // Graph not loaded
        noData: {
          text: 'Loading...'
        }

      }

      // seriesBar: [{
      //   name: 'volume',
      //   data: []
      // }],
      // optionsBar: {
      //   chart: {
      //     height: 160,
      //     type: 'bar',
      //     brush: {
      //       enabled: true,
      //       target: 'stockChart'
      //     },
      //     selection: {
      //       enabled: true,
      //       xaxis: {
      //         min: '',
      //         max: ''
      //       },
      //       fill: {
      //         color: '#ccc',
      //         opacity: 0.4
      //       },
      //       stroke: {
      //         color: '#0D47A1',
      //       }
      //     },
      //   },
      //   dataLabels: {
      //     enabled: false
      //   },
      //   plotOptions: {
      //     bar: {
      //       columnWidth: '80%',
      //       colors: {
      //         ranges: [{
      //           from: -1000,
      //           to: 0,
      //           color: '#F15B46'
      //         }, {
      //           from: 1,
      //           to: 10000,
      //           color: '#FEB019'
      //         }]
      //       }
      //     }
      //   },
      //   stroke: {
      //     width: 0
      //   },
      //   xaxis: {
      //     type: 'datetime',
      //     axisBorder: {
      //       offsetX: 13
      //     }
      //   },
      //   yaxis: {
      //     labels: {
      //       show: false
      //     }
      //   }
      // },
    }
  }

  async componentDidMount () {
    // Load Stock Price Information
    if (this.props.stock) {
      await fetch('http://localhost:5000/api/stock/?stock=' + this.props.stock)
        .then(res => res.json())
        .then(stock => {
          const stockData = stock.data.rows
          const stockName = stock.stockName
          this.setState({
            series: [{
              name: stockName,
              data: stockData
            }],
            stockGraphLoaded: true
          })
        })
        .catch((err) => console.log('An error occured while loading the stock data: ', err))
    }

    // Load Simple Moving Average Information
    if (this.props.smaActive && this.props.smaDays) {
      console.log('Loading SMA from Mount')
      await fetch('http://localhost:5000/api/sma/?stock=' + this.props.stock + '&days=' + this.props.smaDays)
        .then(res => res.json())
        .then(sma => {
          const smaData = sma.data.rows
          const smaLine = {
            name: `${this.props.smaDays}day_moving_average`,
            data: smaData
          }
          this.setState(prevState => ({
            series: [...prevState.series, smaLine],
            smaLoaded: true
          }))
        })
    }
    // If percentage query is active and has days...
    if (this.props.pActive && this.props.pDays) {
      console.log('LOADING PERCENTAGE DATAAA')
      await fetch('http://localhost:5000/api/percentChange/?stock=' + this.props.stock + '&days=' + this.props.pDays)
        .then(res => res.json())
        .then(pChange => {
          const pChangeData = pChange.data.rows
          const pChangeLine = {
            name: `${this.props.pDays} day percentage change`,
            data: pChangeData
          }
          this.setState(prevState => ({
            series: [...prevState.series, pChangeLine]
          }))
        })
    }

    if (this.props.sector && this.props.stock && this.props.compActive && this.props.compDays) {
      await fetch('http://localhost:5000/api/stockPerfSector/?stock=' + this.props.stock + '&days=' + this.props.compDays + '&sector=' + this.props.sector)
        .then(res => res.json())
        .then(pChange => {
          const pChangeData = pChange.data.rows
          const pChangeLine = {
            name: `${this.props.stock} Performance vs ${this.props.sector} Performance`,
            data: pChangeData
          }
          this.setState(prevState => ({
            series: [...prevState.series, pChangeLine]
          }))
        })
    }

    if (this.props.index && this.props.stock && this.props.compActive && this.props.compDays) {
      await fetch('http://localhost:5000/api/stockPerfIndex/?stock=' + this.props.stock + '&days=' + this.props.compDays + '&index=' + this.props.index)
        .then(res => res.json())
        .then(pChange => {
          const pChangeData = pChange.data.rows
          const pChangeLine = {
            name: `${this.props.stock} Performance vs ${this.props.index} Performance`,
            data: pChangeData
          }
          this.setState(prevState => ({
            series: [...prevState.series, pChangeLine]
          }))
        })
    }

    if (this.props.stock && this.props.vActive) {
      await fetch('http://localhost:5000/api/dollarsTraded/?stock=' + this.props.stock)
        .then(res => res.json())
        .then(dTraded => {
          const dTradedData = dTraded.data.rows
          const dTradedLine = {
            name: `Total Cash Flow for ${this.props.stock}`,
            data: dTradedData
          }
          this.setState(prevState => ({
            series: [...prevState.series, dTradedLine]
          }))
        })
    }
  }

  // Problem with loading different sets of data: the stock must be loaded before the other things can be added as well.
  async componentDidUpdate (prevProps, prevState) {
    // console.log('componentDidUpdate...')
    if (prevProps.stock && !this.props.stock && this.state.series[0].data) {
      console.log('resetting graph...')
      this.setState({
        series: [{
          name: '',
          data: []
        }]
      })
    }

    // Reset SMA Line if Deselected
    if (this.state.smaLoaded && this.props.stock && !this.props.smaActive && (prevProps.smaActive !== this.props.smaActive)) {
      console.log('Deselected SMA...')
      const newSeries = this.state.series
      newSeries.pop()
      this.setState({
        series: newSeries,
        smaLoaded: false
      })
    }

    // Load Stock if input changes. Need to delete old data too.
    if (this.props.stock && (this.props.stock !== prevProps.stock) && (prevProps.smaActive === this.props.smaActive)) {
      console.log('Update...')
      await fetch('http://localhost:5000/api/stock/?stock=' + this.props.stock)
        .then(res => res.json())
        .then(stock => {
          const stockData = stock.data.rows
          const stockName = stock.stockName
          this.setState({
            series: [{
              name: stockName,
              data: stockData
            }],
            stockGraphLoaded: true
          })
        })
        .catch((err) => console.log('An error occured while loading the stock data: ', err))
    }

    // Set simple moving average if there is not one already.
    if (!this.state.smaLoaded && this.props.stock && this.props.smaActive && this.props.smaDays && (prevState === this.state)) {
      console.log('Loading SMA from Update')
      await fetch('http://localhost:5000/api/sma/?stock=' + this.props.stock + '&days=' + this.props.smaDays)
        .then(res => res.json())
        .then(sma => {
          const smaData = sma.data.rows
          const smaLine = {
            name: `${this.props.smaDays}day_moving_average`,
            data: smaData
          }
          this.setState(prevState => ({
            series: [...prevState.series, smaLine],
            smaLoaded: true
          }))
        })
    }
  }

  // <ApexChart options={this.state.optionsBar} series={this.state.seriesbar} type='bar' height={300} width={this.state.width} />
  render () {
    // console.log(this.state.stockGraphLoaded)
    if (this.state.stockGraphLoaded) {
      return (
        <div id='stockchart'>
          <div className='container'>
            <div className='row justify-content-md-center'>
              <ApexChart options={this.state.options} series={this.state.series} type='area' height={this.state.height} width={this.state.width} />
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div id='stockchart'>
          <div className='container'>
            <div className='row justify-content-md-center'>
              <p>Loading...</p>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default Graph
