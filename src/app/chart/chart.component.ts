import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

import * as Highcharts from 'highcharts';
import {ChartDataMapper} from "../models/chartData";

declare var require: any;
const More = require('highcharts/highcharts-more');
More(Highcharts);

const Exporting = require('highcharts/modules/exporting');
Exporting(Highcharts);

const ExportData = require('highcharts/modules/export-data');
ExportData(Highcharts);

const Accessibility = require('highcharts/modules/accessibility');
Accessibility(Highcharts);


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class ChartComponent implements OnInit {


  @Input()
  measurementDates: ChartDataMapper[] = [];

  data: number[] = []
  selectedDate: Date = new Date();

  constructor() {
  }


  ngOnInit() {
    this.measurementDates = JSON.parse(<string>localStorage.getItem("Date"));
    console.log("ahhahs ",this.measurementDates)
    this.constructList();
  }

  constructList() {
    for (let i = 1; i < 23; i++) {
      this.data.push(this.checkHours(String(i)))
    }
    Highcharts.chart('container', this.options);
  }

  checkHours(givenHour: string): number {
    for (const m of this.measurementDates) {

      if (m.hour === givenHour)

        return m.consumation;
    }
    return 0;
  }

  public options: any = {
    chart: {
      type: 'area'
    },
    size: {
      height: 20,
      width: 20
    },
    accessibility: {
      description: '',
    },
    title: {
      text: 'Energy Consumation'
    },
    xAxis: {
      allowDecimals: false,
      labels: {},
    },
    yAxis: {
      title: {
        text: ''
      }
    },
    plotOptions: {
      area: {
        pointStart: 1,
        marker: {
          enabled: false,
          symbol: 'circle',
          radius: 1,
          states: {
            hover: {
              enabled: true
            }
          }
        }
      }
    },
    series: [{
      name: 'Consumation kW/h',
      data: this.data
    }]
  }

}
