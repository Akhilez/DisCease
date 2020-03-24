class StatsManager {
  constructor (grid, trailManager) {
    this.grid = grid;
    this.trailManager = trailManager;
    this.ui = new UIManager();
  }

  perTimeStep() {
    this.ui.updateTimeStep(this.trailManager);
  }

  perEpoch() {
    this.ui.updateEpoch(this.trailManager);
  }

  perTrail() {
    this.ui.updateTrail(this.trailManager);
  }

}
