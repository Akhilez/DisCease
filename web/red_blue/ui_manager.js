class UIManager {
  constructor(trailManager, statsManager, relocator) {

    this.trailManager = trailManager;
    this.stats = statsManager;
    this.relocator = relocator;

    this.epochCount = $(`#epochBar-${relocator.name}`);
    this.trailCount = $(`#trailBar${relocator.name}`);
    this.allChartsRef = document.getElementById('allChartsContainer');
    this.statsTable = document.getElementById(`statsTable-${relocator.name}`);

    this.currentEpochChart = null;
    this.currentTrailChart = null;

    this.initAllTrailsChart();
    this.initTrailsChart();

  }

  updateTimeStep(happiness) {}

  updateEpoch(currentEpoch) {
    this.epochCount.html(`${this.trailManager.epoch} / ${this.trailManager.numEpochsPerTrail}`);
    this.epochCount.width(`${this.trailManager.epoch / this.trailManager.numEpochsPerTrail * 100}%`);

    let lastDataIndex = this.currentEpochChart.data.datasets.length - 1;
    this.currentEpochChart.data.datasets[lastDataIndex].data.push(currentEpoch.avgHappiness);
    this.currentEpochChart.update();

    this.addTableRow(this.trailManager.trail, this.trailManager.epoch, currentEpoch.avgHappiness);

  }

  updateTrail(currentTrail) {

    this.trailCount.html(`${this.trailManager.trail} / ${this.trailManager.numTrails}`);
    this.trailCount.width(`${this.trailManager.trail / this.trailManager.numTrails * 100}%`);

    if (this.trailManager.isLastTrail()){
      let avg = 0;
      this.stats.data.forEach(data => {avg += data.avgHappiness});
      avg /= this.stats.data.length;
      this.addTableRow("Average", '-', avg)
    } else {
      this.currentEpochChart.data.datasets.push(this.getNewLineDataset());
      this.currentEpochChart.data.labels.push(this.trailManager.trail + 1);
      this.currentEpochChart.update();
    }

    this.currentTrailChart.data.datasets[0].data.push(currentTrail.avgHappiness);
    this.currentTrailChart.data.labels.push(this.trailManager.trail);
    this.currentTrailChart.update();

    this.addTableRow(this.trailManager.trail, '-', currentTrail.avgHappiness);

    if (this.trailManager.isLastTrail()){
      let avg = 0;
      this.stats.data.forEach(data => {avg += data.avgHappiness});
      avg /= this.stats.data.length;
      this.addTableRow("Average", '-', avg)
    }

  }

  addTableRow(trail, epoch, happiness) {
    let row = this.statsTable.insertRow();

    let colTrail = row.insertCell(0);
    let colEpoch = row.insertCell(1);
    let colHappiness = row.insertCell(2);

    colTrail.innerHTML = trail;
    colEpoch.innerHTML = epoch;
    colHappiness.innerHTML = happiness.toFixed(2);;
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
          text: `Epoch vs Happiness for all trails. Relocator: "${this.relocator.name}"`
        }
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
          text: `Trails vs Happiness. Relocator: "${this.relocator.name}"`
        }
      }
    };
    this.currentTrailChart = this.addChartToPage(chartConfig);
  }

  getNewLineDataset(){
    let colors = palette('tol', this.trailManager.numTrails).map((hex) => '#' + hex);
    return {
      label: `Trail ${this.trailManager.trail}`,
      data: [],
      fill: false,
      borderColor: colors[this.trailManager.trail],
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

}
