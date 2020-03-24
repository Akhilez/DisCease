class UIManager {
  constructor () {

    this.epochCount = $("#epochBar");
    this.trailCount = $("#trailBar");
    this.allChartsRef = document.getElementById('allChartsContainer');
    this.statsTable = document.getElementById("statsTable");

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
    this.currentTimeStepChart.options.title.text = `TimeSteps v Happiness for Trail: ${trailManager.trail}, Epoch: ${trailManager.epoch}`;

    this.currentEpochChart.data.datasets[0].data.push(currentEpoch.avgHappiness);
    this.currentEpochChart.data.labels.push(trailManager.epoch);
    this.currentEpochChart.update();

    this.addTableRow(trailManager.trail, trailManager.epoch, currentEpoch.avgHappiness);

  }

  updateTrail (trailManager, currentTrail) {
    if (trailManager.isComplete())
      return;

    this.trailCount.html(`${trailManager.trail} / ${trailManager.numTrails}`);
    this.trailCount.width(`${trailManager.trail / trailManager.numTrails * 100}%`);

    this.currentEpochChart = this.createChart();
    this.currentEpochChart.options.title.text = `Epochs vs Happiness (avg) for Trail: ${trailManager.trail}`;

    this.currentTrailChart.data.datasets[0].data.push(currentTrail.avgHappiness);
    this.currentTrailChart.data.labels.push(trailManager.epoch);
    this.currentTrailChart.update();

    this.addTableRow(trailManager.trail, '-', currentTrail.avgHappiness);

  }

  addTableRow (trail, epoch, happiness) {
    let row = this.statsTable.insertRow();

    let colTrail = row.insertCell(0);
    let colEpoch = row.insertCell(1);
    let colHappiness = row.insertCell(2);

    colTrail.innerHTML = trail;
    colEpoch.innerHTML = epoch;
    colHappiness.innerHTML = happiness;
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
