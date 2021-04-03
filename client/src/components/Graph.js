import React from 'react'
import ApexChart from 'react-apexcharts'
import Button from 'react-bootstrap/Button'

class Graph extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      width: 700,
      height: 350,
      series: [],

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

        yaxis: {
          labels: {
            formatter: val => (val / 1000000).toFixed(0)
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
            formatter: val => (val / 1000000).toFixed(0)
          }
        },

        noData: {
          text: 'Loading...'
        }

      }
    }
  }

  render () {
    return (
      <div id='stockchart'>
        <div class='container'>
          <div class='row justify-content-md-center'>
            <ApexChart options={this.state.options} series={this.state.series} type='area' height={this.state.height} width ={this.state.width} />
          </div>
        </div>
      </div>
    )
  }
}

export default Graph
