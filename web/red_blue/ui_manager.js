class UIManager {
  constructor(trailManager) {

    this.trailManager = trailManager;

    this.epochCount = $("#epochBar");
    this.trailCount = $("#trailBar");
    this.allChartsRef = document.getElementById('allChartsContainer');
    this.statsTable = document.getElementById("statsTable");

    this.currentTimeStepChart = null;
    this.currentEpochChart = null;
    this.currentTrailChart = null;

    this.initTrailChart();
    this.initEpochChart();
    this.initTimeStepChart();

  }

  updateTimeStep(happiness) {
    this.currentTimeStepChart.data.labels.push(this.trailManager.timeStep);
    this.currentTimeStepChart.data.datasets[0].data.push(happiness);

    this.currentTimeStepChart.update();
  }

  updateEpoch(currentEpoch) {
    this.epochCount.html(`${this.trailManager.epoch} / ${this.trailManager.numEpochsPerTrail}`);
    this.epochCount.width(`${this.trailManager.epoch / this.trailManager.numEpochsPerTrail * 100}%`);

    this.initTimeStepChart();

    this.currentEpochChart.data.datasets[0].data.push(currentEpoch.avgHappiness);
    this.currentEpochChart.data.labels.push(this.trailManager.epoch);
    this.currentEpochChart.update();

    this.addTableRow(this.trailManager.trail, this.trailManager.epoch, currentEpoch.avgHappiness);

  }

  updateTrail(currentTrail) {
    if (this.trailManager.isComplete())
      return;

    this.trailCount.html(`${this.trailManager.trail} / ${this.trailManager.numTrails}`);
    this.trailCount.width(`${this.trailManager.trail / this.trailManager.numTrails * 100}%`);

    this.initEpochChart();

    this.currentTrailChart.data.datasets[0].data.push(currentTrail.avgHappiness);
    this.currentTrailChart.data.labels.push(this.trailManager.trail);
    this.currentTrailChart.update();

    this.addTableRow(this.trailManager.trail, '-', currentTrail.avgHappiness);

  }

  addTableRow(trail, epoch, happiness) {
    let row = this.statsTable.insertRow();

    let colTrail = row.insertCell(0);
    let colEpoch = row.insertCell(1);
    let colHappiness = row.insertCell(2);

    colTrail.innerHTML = trail;
    colEpoch.innerHTML = epoch;
    colHappiness.innerHTML = happiness;
  }

  initTimeStepChart() {
    this.currentTimeStepChart = this.createChart();
    this.currentTimeStepChart.options.title.text = `TimeSteps v Happiness for Trail: ${this.trailManager.trail}, Epoch: ${this.trailManager.epoch}`;
  }

  initEpochChart() {
    this.currentEpochChart = this.createChart();
    this.currentEpochChart.options.title.text = `Epochs vs Happiness (avg) for Trail: ${this.trailManager.trail}`;
  }

  initTrailChart() {
    this.currentTrailChart = this.createChart();
    this.currentTrailChart.type = 'bar';
    this.currentTrailChart.options.title.text = `Trails v Happiness`;
    this.currentTrailChart.update();
  }

  createChart() {
    let chartDiv = document.createElement('div');
    chartDiv.className = 'col-auto';
    chartDiv.style.width = '600px';
    chartDiv.style.height = '400px';
    let chartCanvas = document.createElement('canvas');

    let timeStepChart = this.getNewChart(chartCanvas);

    chartDiv.appendChild(chartCanvas);
    this.allChartsRef.appendChild(chartDiv);

    return timeStepChart;
  }

  getNewChart(canvasRef) {
    return new Chart(canvasRef, {
      type: 'line',
      data: {
        labels: [],  // Epochs [1, 2, 3, 4]
        datasets: [{
          label: 'Happiness',
          data: [],  // Happiness
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Title'
        }
      }
    });
  }

}
