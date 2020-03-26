class UIManager {
  constructor(game) {
    this.game = game;

    this.epochCount = $(`#epochBar-${this.game.relocator.name}`);
    this.trailCount = $(`#trailBar${this.game.relocator.name}`);
    this.allChartsRef = document.getElementById('allChartsContainer');
    this.statsTable = document.getElementById(`statsTable-${this.game.relocator.name}`);

    this.currentEpochChart = null;
    this.currentTrailChart = null;

    this.initAllTrailsChart();
    this.initTrailsChart();

  }

  updateTimeStep(happiness) {}

  updateEpoch(currentEpoch) {
    this.epochCount.html(`${this.game.trailManager.epoch} / ${this.game.trailManager.numEpochsPerTrail}`);
    this.epochCount.width(`${this.game.trailManager.epoch / this.game.trailManager.numEpochsPerTrail * 100}%`);

    let lastDataIndex = this.currentEpochChart.data.datasets.length - 1;
    this.currentEpochChart.data.datasets[lastDataIndex].data.push(currentEpoch.avgHappiness);
    this.currentEpochChart.update();

    this.addTableRow(this.game.trailManager.trail, this.game.trailManager.epoch, currentEpoch.avgHappiness);

  }

  updateTrail(currentTrail) {

    this.trailCount.html(`${this.game.trailManager.trail} / ${this.game.trailManager.numTrails}`);
    this.trailCount.width(`${this.game.trailManager.trail / this.game.trailManager.numTrails * 100}%`);

    if (!this.game.trailManager.isLastTrail()){
      this.currentEpochChart.data.datasets.push(this.getNewLineDataset());
      this.currentEpochChart.data.labels.push(this.game.trailManager.trail + 1);
      this.currentEpochChart.update();
    }

    this.currentTrailChart.data.datasets[0].data.push(currentTrail.avgHappiness);
    this.currentTrailChart.data.labels.push(this.game.trailManager.trail);
    this.currentTrailChart.update();

    this.addTableRow(this.game.trailManager.trail, '-', currentTrail.avgHappiness);

  }

  updateAtEnd(data){
    this.addTableRow("Average", '-', data.avgHappiness)
  }

  addTableRow(trail, epoch, happiness) {
    let row = this.statsTable.insertRow();

    let colTrail = row.insertCell(0);
    let colEpoch = row.insertCell(1);
    let colHappiness = row.insertCell(2);

    colTrail.innerHTML = trail;
    colEpoch.innerHTML = epoch;
    colHappiness.innerHTML = happiness.toFixed(2);
  }

  initTrailsChart() {
    let chartConfig = {
      type: 'line',
      data: {
        labels: [1],
        datasets: [this.getNewLineDataset()]
      },
      options: {
        title: {
          display: true,
          text: `Epoch vs Happiness for all trails. Relocator: "${this.game.relocator.name}"`
        },
        elements: {
          line: {
            tension: 0
          }
        },
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Epochs'
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Happiness'
            }
          }],
        },
      }
    };
    this.currentEpochChart = this.addChartToPage(chartConfig);
  }

  initAllTrailsChart() {
    let chartConfig = {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{label: 'Happiness', data: []}]
      },
      options: {
        title: {
          display: true,
          text: `Trails vs Happiness. Relocator: "${this.game.relocator.name}"`
        },
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Trails'
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Happiness'
            }
          }],
        }
      }
    };
    this.currentTrailChart = this.addChartToPage(chartConfig);
  }

  getNewLineDataset(){
    let colors = palette('tol', this.game.trailManager.numTrails).map((hex) => '#' + hex);
    let trail = this.game.trailManager.trail;
    trail = (this.game.trailManager.isNewTrail())? trail - 1: trail;
    return {
      label: `Trail ${trail + 1}`,
      data: [],
      fill: false,
      borderColor: colors[trail],
    }
  }

  addChartToPage(chartConfig) {
    let chartDiv = document.createElement('div');
    chartDiv.className = 'col-auto';
    chartDiv.style.width = '600px';
    chartDiv.style.height = '400px';
    let chartCanvas = document.createElement('canvas');

    let timeStepChart = new Chart(chartCanvas, chartConfig);

    chartDiv.appendChild(chartCanvas);
    this.allChartsRef.appendChild(chartDiv);

    return timeStepChart;
  }

  static drawAllPoliciesGraph (games) {

    let allAvg = [];
    games.forEach(game => allAvg.push(game.statsManager.data.avgHappiness));

    let labels = [];
    games.forEach(game => labels.push(game.relocator.name));

    let chartConfig = {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{label: 'Happiness', data: allAvg}]
      },
      options: {
        title: {
          display: true,
          text: "Policies vs Happiness",
        },
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Policies'
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Happiness'
            }
          }],
        }
      }
    };

    let chartDiv = document.createElement('div');
    chartDiv.className = 'col-auto';
    chartDiv.style.width = '600px';
    chartDiv.style.height = '400px';
    let chartCanvas = document.createElement('canvas');

    let timeStepChart = new Chart(chartCanvas, chartConfig);

    chartDiv.appendChild(chartCanvas);
    let allChartsRef = document.getElementById('allChartsContainer');
    allChartsRef.appendChild(chartDiv);

  }

}
