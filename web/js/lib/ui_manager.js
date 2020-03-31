class UIManager {
  constructor(game) {
    this.game = game;
    this.params = game.paramsInjector.params.uiParams;
    game.paramsInjector.register(this);
    this.sketch = null;
  }

  setupSketch() {
    this.sketch.frameRate(this.params.fps);

    let canvas = this.sketch.createCanvas(this.params.side, this.params.side);
    canvas.parent('sketch-holder');

  }

  updateParams(){}
}
