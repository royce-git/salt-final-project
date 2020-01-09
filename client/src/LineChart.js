import React from 'react';
import Chart from 'chart.js';

class LineChart extends React.Component {
    
  
    constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }
  
  componentDidUpdate() {
      console.log('props labels', this.props.title);
      console.log('props data', this.props.data);
    // this.myChart.reset();
    this.myChart.data.labels = this.props.title;
    this.myChart.data.datasets[0].data = this.props.data;
    this.myChart.update();
  }

  componentDidMount() {
      console.log('dsdsd', this.props.data);
      console.log('dsdsd', this.props.title);
    this.myChart = new Chart(this.canvasRef.current, {
      type: 'line',
      options: {
        maintainAspectRatio: false,
        legend: {
        display: false,
        position: 'top',
        labels: {
        boxWidth: 80,
        fontColor: 'black'
      }
    }
},
      data: {
        labels: this.props.title,
        datasets: [{
          label: 'Temperature',
          data: this.props.data,
          lineTension: 0,
            fill: false,
            borderColor: 'orange',
            backgroundColor: 'transparent',
            borderDash: [5, 5],
            pointBorderColor: 'orange',
            pointBackgroundColor: 'rgba(255,150,0,0.5)',
            pointRadius: 5,
            pointHoverRadius: 10,
            pointHitRadius: 30,
            pointBorderWidth: 2,
            pointStyle: 'rectRounded'
        }]
      }
    });
  }

  render() {
    return <canvas ref={this.canvasRef} />;
  }
}

export default LineChart;