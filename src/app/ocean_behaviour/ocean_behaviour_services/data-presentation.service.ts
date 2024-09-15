import { Injectable } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataPresentationService {

  chart : any = null;
  trend_chart : any = null;
  graph : any = {};
  label_sensor_date : any = [];
  loading : any;
  isLoading : boolean = false;

  constructor(private loadingController: LoadingController) { }

  async loadingMessage() {
    this.isLoading = true;
    this.loadingController.create({
      message: 'Por favor espere un momento...'
    }).then(loader => {
      loader.present().then(() => {
        if (!this.isLoading) {
          loader.dismiss();
        }
      });
    });
  }

  async dismissLoading() {
    this.isLoading = false;
    this.loadingController.getTop().then(loader => {
      if (loader) {
        loader.dismiss();
      }
    });
  }

  fillDaysArray(sensor_data : any){

    if(this.label_sensor_date.length == 0){

      for(var value in sensor_data) {
        this.label_sensor_date.push(parseInt(value, 10) + 1);
      }

      this.label_sensor_date.pop();
    }
  }

  drawingChart(title : string, sensor_data : any, chart_element : any, chart_type : any, label : string, month : string, year : string, y_title : string, hex_line_color : string, hex_point_color : string){

    if(this.chart){
      this.chart.destroy();
    }

    this.fillDaysArray(sensor_data);

    let label_sensor_value = [];
    let label_max_data = [];
    let label_min_data = [];

    for (var value in sensor_data) {

      label_sensor_value.push(sensor_data[value]['sensor_data']);
      label_max_data.push(sensor_data[value]['max_data']);
      label_min_data.push(sensor_data[value]['min_data']);
    }

    let data : any = [{

      data: {
        labels: this.label_sensor_date,
        datasets: [
          {
            label: label,
            fill: false,
            tension: 0.1,
            backgroundColor: hex_line_color,
            borderColor: hex_line_color,
            borderCapStyle: 'round',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'round',
            pointBorderColor: hex_point_color,
            pointBackgroundColor: hex_point_color,
            pointBorderWidth: 1,
            pointRadius: 4,
            pointHitRadius: 10,
            data: label_sensor_value,
            spanGaps: false,
            hidden: false
          },
          {
            type: 'scatter',
            label: "Dato máximo",
            fill: false,
            tension: 0.1,
            backgroundColor: "#000000",
            borderColor: "#000000",
            borderCapStyle: 'round',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'round',
            pointBorderColor: "#000000",
            pointBackgroundColor: "#000000",
            pointBorderWidth: 1,
            pointRadius: 4,
            pointHitRadius: 10,
            data: label_max_data,
            spanGaps: false,
            hidden: false
          },
          {
            type: 'scatter',
            label: "Dato mínimo",
            fill: false,
            tension: 0.1,
            backgroundColor: "#FFDC00",
            borderColor: "#FFDC00",
            borderCapStyle: 'round',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'round',
            pointBorderColor: "#000000",
            pointBackgroundColor: "#FFDC00",
            pointBorderWidth: 1,
            pointRadius: 4,
            pointHitRadius: 10,
            data: label_min_data,
            spanGaps: false,
            hidden: false
          }
        ]
      }
    },
    {
      data: {
        labels: this.label_sensor_date,
        datasets: [
          {
            label: label,
            fill: false,
            tension: 0.1,
            backgroundColor: hex_line_color,
            borderColor: hex_line_color,
            borderCapStyle: 'round',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'round',
            pointBorderColor: hex_point_color,
            pointBackgroundColor: hex_point_color,
            pointBorderWidth: 1,
            pointRadius: 4,
            pointHitRadius: 10,
            data: label_sensor_value,
            spanGaps: false,
            hidden: false
          }
        ]
      }
    }];

    let options : any = [{

      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            align: 'center',
            display: true,
            text: title,
            color: '#000000',
            font: {
              family: 'Arial, monospace',
              size: 14
            }
          },
          legend: {
            position: "bottom",
            display: true,
            title: {
              color: '#000000'
            },
            labels: {
              color: '#000000',
              font: {
                family: 'Arial, monospace',
                size: 13
              }
            }
          }
        },
        scales: {
          x: {
            title: {
              color: '#000000',
              display: true,
              text: 'Tiempo(días) - ' + month + ' ' + year
            },
            grid: {
              color: '#D1D1D1',
              borderColor: '#000000',
              tickColor: '#000000'
            }
          },
          y: {
            title: {
              color: '#000000',
              display: true,
              text: y_title
            },
            grid: {
              color: '#D1D1D1',
              borderColor: '#000000',
              tickColor: '#000000'
            },
            ticks: {
              stepSize: 2
            }
          }
        },
        layout: {
          padding: 20
        }
      }
      },
      {
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              align: 'center',
              display: true,
              text: title,
              color: '#000000',
              font: {
                family: 'Arial, monospace',
                size: 14
              }
            },
            legend: {
              position: "bottom",
              display: true,
              title: {
                color: '#000000'
              },
              labels: {
                color: '#000000',
                font: {
                  family: 'Arial, monospace',
                  size: 13
                }
              }
            }
          },
          scales: {
            x: {
              title: {
                color: '#000000',
                display: true,
                text: 'Tiempo(días) - ' + month + ' ' + year
              },
              grid: {
                color: '#D1D1D1',
                borderColor: '#000000',
                tickColor: '#000000'
              }
            },
            y: {
              title: {
                color: '#000000',
                display: true,
                text: y_title
              },
              grid: {
                color: '#D1D1D1',
                borderColor: '#000000',
                tickColor: '#000000'
              }
            }
          },
          layout: {
            padding: 20
          }
        }
      }];

    Chart.register(...registerables);

    if(chart_type === 'line'){

      this.chart = new Chart(chart_element, {
        type: 'line',
        data: data[0]['data'],
        options: options[0]['options']
      });
    }
    else if(chart_type === 'bar'){

      this.chart = new Chart(chart_element, {
        type: 'bar',
        data: data[1]['data'],
        options: options[1]['options']
      });
    }
  }

  drawingTrendChart(title : string, sensor_data : any, chart_element : any, label : string, month : string, year : string, y_title : string, hex_line_color : string, hex_point_color : string){

    if(this.trend_chart){
      this.trend_chart.destroy();
    }

    let data : any = {

      data: {
        labels: this.label_sensor_date,
        datasets: [
          {
            label: label,
            fill: false,
            tension: 0.1,
            backgroundColor: hex_line_color,
            borderColor: hex_line_color,
            borderCapStyle: 'round',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'round',
            pointBorderColor: hex_point_color,
            pointBackgroundColor: hex_point_color,
            pointBorderWidth: 1,
            pointRadius: 4,
            pointHitRadius: 10,
            data: sensor_data[sensor_data.length - 1].trend,
            spanGaps: false,
            hidden: false
          }
        ]
      }
    };

    let options : any = {

      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            align: 'center',
            display: true,
            text: title,
            color: '#000000',
            font: {
              family: 'Arial, monospace',
              size: 14
            }
          },
          legend: {
            position: "bottom",
            display: true,
            title: {
              color: '#000000'
            },
            labels: {
              color: '#000000',
              font: {
                family: 'Arial, monospace',
                size: 13
              }
            }
          }
        },
        scales: {
          x: {
            title: {
              color: '#000000',
              display: true,
              text: 'Tiempo(días) - ' + month + ' ' + year
            },
            grid: {
              color: '#D1D1D1',
              borderColor: '#000000',
              tickColor: '#000000'
            }
          },
          y: {
            title: {
              color: '#000000',
              display: true,
              text: y_title
            },
            grid: {
              color: '#D1D1D1',
              borderColor: '#000000',
              tickColor: '#000000'
            },
            ticks: {
              stepSize: 2
            }
          }
        },
        layout: {
          padding: 20
        }
      }
      };

    Chart.register(...registerables);

    this.trend_chart = new Chart(chart_element, {
      type: 'line',
      data: data.data,
      options: options.options
    });

    this.label_sensor_date = [];
  }
}