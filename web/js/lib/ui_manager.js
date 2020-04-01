class UIManager {
  constructor(game) {
    this.game = game;
    this.params = this.game.paramsInjector.params.uiParams;

    this.sketch = null;

    this.registerSliders();
  }

  setupSketch() {
    this.sketch.frameRate(this.params.fps);

    let canvas = this.sketch.createCanvas(this.params.side, this.params.side);
    canvas.parent('sketch-holder');

  }

  registerSliders() {
    this.contagionSlider = document.getElementById("contagionSlider");
    this.recoverySlider = document.getElementById("recoverySlider");
    this.deathSlider = document.getElementById("deathSlider");

    let self = this;
    let params = this.game.paramsInjector;

    this.contagionSlider.onchange = function() {
      params.params.swarmParams.contagionRate = self.contagionSlider.value;
      params.updateAll();
    };

    this.recoverySlider.onchange = function() {
      params.params.swarmParams.immunizationRate = self.recoverySlider.value;
      params.updateAll();
    };

    this.deathSlider.onchange = function() {
      params.params.swarmParams.deathRate = self.deathSlider.value;
      params.updateAll();
    };
  }

}
