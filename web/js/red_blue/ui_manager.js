class UIManager {
  constructor () {
    this.timeStepCount = $("#timeStepCount");
    this.epochCount = $("#epochCount");
    this.trailCount = $("#trailCount");
  }

  updateTimeStep (timeStep) {
    this.timeStepCount.html(`Time Step: ${timeStep}`);
  }

  updateEpoch (epoch) {
    this.epochCount.html(`Epoch: ${epoch}`);
  }

  updateTrail (trail) {
    this.trailCount.html(`Trail: ${trail}`);
  }

}
