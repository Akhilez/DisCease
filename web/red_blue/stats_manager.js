class StatsManager {
  constructor(grid, trailManager) {
    this.grid = grid;
    this.ui = new UIManager(trailManager, this);

    this.currentTrail = {epochs: []};
    this.currentEpoch = {timeSteps: []};
    this.data = [];

    /*
    let data = [
      {  // Trail 1
        epochs: [
          {
            avgHappiness: 123,
            timeSteps: [143, 122]
          }
        ],
        avgHappiness: 123,
      }
    ]
    */

  }

  perTimeStep() {
    let happiness = this.grid.getAvgHappiness();
    this.currentEpoch.timeSteps.push(happiness);
    this.ui.updateTimeStep(happiness);
  }

  perEpoch() {
    this.currentEpoch.avgHappiness = 0;
    this.currentEpoch.timeSteps.forEach(timeStepHappiness => {this.currentEpoch.avgHappiness += timeStepHappiness});
    this.currentEpoch.avgHappiness /= this.currentEpoch.timeSteps.length;

    this.currentTrail.epochs.push(this.currentEpoch);
    this.ui.updateEpoch(this.currentEpoch);
    this.currentEpoch = {timeSteps: []};
  }

  perTrail() {
    this.currentTrail.avgHappiness = 0;
    this.currentTrail.epochs.forEach(epoch => {this.currentTrail.avgHappiness += epoch.avgHappiness});
    this.currentTrail.avgHappiness /= this.currentTrail.epochs.length;

    this.data.push(this.currentTrail);
    this.ui.updateTrail(this.currentTrail);
    this.currentTrail = {epochs: []};
  }

}
