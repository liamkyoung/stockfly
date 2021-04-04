import React from 'react'
import ApexChart from 'react-apexcharts'
import Button from 'react-bootstrap/Button'

class Graph extends React.Component {
  constructor (props) {
    super(props)
    // Graph Properties
    this.state = {
      // Graph Dimensions
      width: 700,
      height: 350,
      loaded: false,
      // Graph Data
      series: [{
        name: '',
        data: []
      }],
      // Graph Options
      options: {
        chart: {
          type: 'area',
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
              return val.toFixed(3)
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
              return val.toFixed(3)
            }
          }
        },
        // Graph not loaded
        noData: {
          text: 'Loading...'
        }

      }
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.stock !== prevProps.stock) {
      fetch('http://localhost:5000/api/stock/?stock=' + this.props.stock)
        .then(res => res.json())
        .then(stock => {
        // console.log('STOCK DATAAAA', stock.data)
          const stockData = stock.data.rows
          // console.log('stock formatted dates', stockData)
          const stockName = stock.stockName
          this.setState({
            series: [{
              name: stockName,
              data: stockData
            }],
            loaded: true
          })
        })
        .catch((err) => console.log('An error occured while loading the stock data: ', err))
    }
  }

  render () {
    if (this.state.loaded) {
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
              <p>Nothing Loaded...</p>
            </div>
          </div>
        </div>
      )
    }

  }
}

export default Graph
