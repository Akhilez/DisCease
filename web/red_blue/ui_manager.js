class UIManager {
  constructor () {

    this.epochCount = $("#epochBar");
    this.trailCount = $("#trailBar");
    this.allChartsRef = document.getElementById('allChartsContainer');

    this.currentTimeStepChart = this.createChart();
    this.currentEpochChart = this.createChart();
    this.currentTrailChart = this.createChart();

  }

  updateTimeStep (trailManager, happiness) {
    this.currentTimeStepChart.data.labels.push(trailManager.timeStep);
    this.currentTimeStepChart.data.datasets[0].data.push(happiness);

    this.currentTimeStepChart.update();
  }

  updateEpoch (trailManager, currentEpoch) {
    this.epochCount.html(`${trailManager.epoch} / ${trailManager.numEpochsPerTrail}`);
    this.epochCount.width(`${trailManager.epoch / trailManager.numEpochsPerTrail * 100}%`);

    this.currentTimeStepChart = this.createChart();
    this.currentTimeStepChart.options.title = `Trail: ${trailManager.trail}. Epoch: ${trailManager.epoch}. TimeStep: ${trailManager.timeStep}`;

    this.currentEpochChart.data.datasets[0].data.push(currentEpoch.totalHappiness);
    this.currentEpochChart.data.labels.push(trailManager.epoch);
    this.currentEpochChart.update();

  }

  updateTrail (trailManager, currentTrail) {
    this.trailCount.html(`${trailManager.trail} / ${trailManager.numTrails}`);
    this.trailCount.width(`${trailManager.trail / trailManager.numTrails * 100}%`);

    this.currentEpochChart = this.createChart();
    this.currentEpochChart.options.title = `Trail: ${trailManager.trail}. Epoch: ${trailManager.epoch}`;

    this.currentTrailChart.data.datasets[0].data.push(currentTrail.totalHappiness);
    this.currentTrailChart.data.labels.push(trailManager.epoch);
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

  getNewChart(canvasRef){
    return new Chart(canvasRef, {
      type: 'line',
      data: {
        labels: [],  // Epochs [1, 2, 3, 4]
        datasets: [{
          label: '',
          data: [],  // Happiness
        }]
      }
    });
  }

}
