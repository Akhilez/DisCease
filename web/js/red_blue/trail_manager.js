class TrailManager {
  constructor(timeStepsPerEpoch, numEpochsPerTrail, numTrails) {
    this.trail = 1;
    this.epoch = 0;
    this.timeStep = 0;
    this.timeStepsPerEpoch = timeStepsPerEpoch;
    this.numEpochsPerTrail = numEpochsPerTrail;
    this.numTrails = numTrails; // Total number of time steps in an episode.
  }

  isNewEpoch() {
    return this.timeStep === 0;
  }

  isNewTrail() {
    return this.epoch === 0 && this.timeStep === 0;
  }

  isComplete() {
    return this.trail >= this.numTrails;
  }

  update() {
    this.timeStep++;
    if (this.timeStep >= this.timeStepsPerEpoch) { // New epoch starts
      this.epoch++;
      this.timeStep = 0;
      if (this.epoch >= this.numEpochsPerTrail && !this.isComplete()) {  // New trail starts
        this.trail++;
        this.epoch = 0;
      }
    }
  }

  reset() {
    this.trail = 1;
    this.epoch = 0;
    this.timeStep = 0;
  }
}
