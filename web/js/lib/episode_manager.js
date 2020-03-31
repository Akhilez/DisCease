class EpisodeManager {
  constructor(game) {
    this.params = game.paramsInjector.params.episodeParams;
    game.paramsInjector.register(this);

    this.framesPerTimeStep = null;
    this.timeStepsPerEpisode = null;

    this.updateParams();

    this.episode = 1;
    this.timeStep = 0;
    this.frame = 0;

  }

  updateParams(){
    this.framesPerTimeStep = this.params.framesPerTimeStep;
    this.timeStepsPerEpisode = this.params.timeStepsPerEpisode;
  }

  isNewEpisode() {
    return this.timeStep === 0;
  }

  update() {
    this.frame++;
    if (this.frame % this.framesPerTimeStep === 0) { // New time step starts
      this.timeStep++;
      if (this.timeStep >= this.timeStepsPerEpisode) {  // New episode starts
        this.episode++;
        this.timeStep = 0;
        this.frame = 0;
      }
    }
  }

  reset() {
    this.episode = 1;
    this.timeStep = 0;
    this.frame = 0;
  }
}
