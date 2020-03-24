class UIManager {
  constructor () {
    this.epochCount = $("#epochBar");
    this.trailCount = $("#trailBar");
  }

  updateTimeStep (trailManager) {
  }

  updateEpoch (trailManager) {
    this.epochCount.html(`${trailManager.epoch} / ${trailManager.numEpochsPerTrail}`);
    this.epochCount.width(`${trailManager.epoch / trailManager.numEpochsPerTrail * 100}%`);
  }

  updateTrail (trailManager) {
    this.trailCount.html(`${trailManager.trail} / ${trailManager.numTrails}`);
    this.trailCount.width(`${trailManager.trail / trailManager.numTrails * 100}%`);
  }

}
