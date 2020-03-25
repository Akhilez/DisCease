class TrailManager {
  constructor(timeStepsPerEpoch, numEpochsPerTrail, numTrails) {
    this.trail = 1;
    this.epoch = 1;
    this.timeStep = 0;
    this.timeStepsPerEpoch = timeStepsPerEpoch;
    this.numEpochsPerTrail = numEpochsPerTrail;
    this.numTrails = numTrails; // Total number of time steps in an episode.
  }

  isLastTimeStep() {
    return this.timeStep === this.timeStepsPerEpoch;
  }

  isLastEpoch() {
    return this.epoch === this.numEpochsPerTrail && this.isLastTimeStep();
  }

  isLastTrail() {
    return this.trail === this.numTrails;
  }

  isComplete() {
    return this.trail > this.numTrails;
  }

  update() {
    this.timeStep++;
    if (this.timeStep > this.timeStepsPerEpoch) { // New epoch starts
      this.epoch++;
      this.timeStep = 1;
      if (this.epoch > this.numEpochsPerTrail && !this.isComplete()) {  // New trail starts
        this.trail++;
        this.epoch = 1;
      }
    }
  }

}
