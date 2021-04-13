import React from 'react'
import ApexChart from 'react-apexcharts'
import Button from 'react-bootstrap/Button'

class Graph extends React.Component {
  constructor (props) {
    super(props)
    // Graph Properties
    this.state = {
      // Graph Dimensions
      width: 1400,
      height: 700,
      stockGraphLoaded: false,
      barChartLoaded: false,
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

      },

      seriesBar: [{
        name: 'volume',
        data: []
      }],
      optionsBar: {
        chart: {
          height: 160,
          type: 'bar',
          brush: {
            enabled: true,
            target: 'stockChart'
          },
          selection: {
            enabled: true,
            xaxis: {
              min: '',
              max: ''
            },
            fill: {
              color: '#ccc',
              opacity: 0.4
            },
            stroke: {
              color: '#0D47A1',
            }
          },
        },
        dataLabels: {
          enabled: false
        },
        plotOptions: {
          bar: {
            columnWidth: '80%',
            colors: {
              ranges: [{
                from: -1000,
                to: 0,
                color: '#F15B46'
              }, {
                from: 1,
                to: 10000,
                color: '#FEB019'
              }],
        
            },
          }
        },
        stroke: {
          width: 0
        },
        xaxis: {
          type: 'datetime',
          axisBorder: {
            offsetX: 13
          }
        },
        yaxis: {
          labels: {
            show: false
          }
        }
      },
    }
  }

  // Problem with loading different sets of data: the stock must be loaded before the other things can be added as well.
  componentDidUpdate (prevProps) {
    if (this.props.stock !== prevProps.stock) {
      fetch('http://localhost:5000/api/stock/?stock=' + this.props.stock)
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

      fetch('http://localhost:5000/api/volumeChart/?stock=' + this.props.stock + '&days=' + this.props.days)
        .then(res => res.json())
        .then(stock => {
          const stockData = stock.data.rows
          const stockName = stock.stockName
          this.setState({
            seriesBar: [{
              name: stockName,
              data: stockData
            }],
            barChartloaded: true
          })
        })
    }
  }

  render () {
    console.log(this.state.stockGraphLoaded)
    if (this.state.stockGraphLoaded && this.state.barChartLoaded) {
      return (
        <div id='stockchart'>
          <div className='container'>
            <div className='row justify-content-md-center'>
              <ApexChart options={this.state.options} series={this.state.series} type='area' height={this.state.height} width={this.state.width} />
              <ApexChart options={this.state.optionsBar} series={this.state.seriesbar} type='bar' height={300} width={this.state.width} />
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div id='stockchart'>
          <div className='container'>
            <div className='row justify-content-md-center'>
              <p>Nothing Loaded...</p>
            </div>
          </div>
        </div>
      )
    }

  }
}

export default Graph
