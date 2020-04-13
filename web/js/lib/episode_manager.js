class EpisodeManager {
  constructor(game) {
    this.game = game;
    game.paramsInjector.register(this);

    this.framesPerTimeStep = null;
    this.timeStepsPerEpisode = null;

    this.updateParams();

    this.episode = 1;
    this.timeStep = 1;
    this.frame = 0;

  }

  updateParams() {
    let params = this.game.paramsInjector.params.episodeParams;
    this.framesPerTimeStep = params.framesPerTimeStep;
    this.timeStepsPerEpisode = params.timeStepsPerEpisode;
  }

  isNewEpisode() {
    return this.timeStep === 1 && this.frame === 1;
  }

  update() {
    this.frame++;
    if (this.frame % this.framesPerTimeStep === 0) { // New time step starts
      this.timeStep++;
      if (this.timeStep >= this.timeStepsPerEpisode) {  // New episode starts
        this.episode++;
        this.timeStep = 1;
        this.frame = 1;
      }
    }
  }

  reset() {
    this.episode = 1;
    this.timeStep = 1;
    this.frame = 1;
  }
}
