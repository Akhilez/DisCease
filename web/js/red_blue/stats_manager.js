class StatsManager {
  constructor (grid, trailManager) {
    this.grid = grid;
    this.trailManager = trailManager;
    this.ui = new UIManager();
  }

  perTimeStep() {
    this.ui.updateTimeStep(this.trailManager.timeStep);
  }

  perEpoch() {
    this.ui.updateEpoch(this.trailManager.epoch);
  }

  perTrail() {
    this.ui.updateTrail(this.trailManager.trail);
  }

}
