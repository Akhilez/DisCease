class StatsManager {
  constructor (grid, trailManager) {
    this.grid = grid;
    this.trailManager = trailManager;
    this.ui = new UIManager();

    this.currentTrail = {epochs: []};
    this.currentEpoch = {timeSteps: []};
    this.data = [];

    /*
    let data = [
      {  // Trail 1
        epochs: [
          {
            totalHappiness: 123,
            timeSteps: [143, 122]
          }
        ],
        totalHappiness: 123,
      }
    ]
    */

  }

  perTimeStep() {
    let happiness = this.grid.getTotalHappiness();
    this.currentEpoch.timeSteps.push(happiness);
    this.ui.updateTimeStep(this.trailManager, happiness);
  }

  perEpoch() {
    this.currentEpoch.number = this.trailManager.epoch;
    this.currentEpoch.totalHappiness = this.currentEpoch.timeSteps[this.currentEpoch.timeSteps.length-1];
    this.currentTrail.epochs.push(this.currentEpoch);
    this.ui.updateEpoch(this.trailManager, this.currentEpoch);
    this.currentEpoch = {timeSteps: []};
  }

  perTrail() {
    this.currentTrail.totalHappiness = 0;  // TODO: Get the total happiness
    this.data.push(this.currentTrail);
    this.ui.updateTrail(this.trailManager, this.currentTrail);
    this.currentTrail = {epochs: []};
  }

}
