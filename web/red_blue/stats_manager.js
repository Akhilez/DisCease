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
    this.currentEpoch.timeSteps.push(this.grid.getTotalHappiness());
    this.ui.updateTimeStep(this.trailManager);
  }

  perEpoch() {
    this.currentEpoch.totalHappiness = this.currentEpoch.timeSteps[this.currentEpoch.timeSteps.length-1];
    this.currentTrail.epochs.push(this.currentEpoch);
    this.currentEpoch = {timeSteps: []};
    this.ui.updateEpoch(this.trailManager);
  }

  perTrail() {
    this.currentTrail.totalHappiness = 0;
    this.data.push(this.currentTrail);
    console.log(this.data);
    this.currentTrail = {epochs: []};
    this.ui.updateTrail(this.trailManager);
  }

}
