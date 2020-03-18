class EpisodeManager {
  constructor(frames_per_time_step = 10, length = 60) {
    this.episodeNumber = 1;
    this.timeStep = 0;
    this.frameNumber = 0;
    this.frames_per_time_step = frames_per_time_step;
    this.length = length; // Total number of time steps in an episode.
  }

  isNewEpisode() {
    return this.timeStep === 0;
  }

  update() {
    this.frameNumber++;
    if (this.frameNumber % this.frames_per_time_step === 0) { // New time step starts
      this.timeStep++;
      if (this.timeStep >= this.length) {  // New episode starts
        this.episodeNumber++;
        this.timeStep = 0;
        this.frameNumber = 0;
      }
    }
  }
  reset() {
    this.episodeNumber = 1;
    this.timeStep = 0;
    this.frameNumber = 0.
  }
}
