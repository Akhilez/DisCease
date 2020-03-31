let immunizationRateSlider;
let deathRateSlider;
let diseaseProbabilitySlider;


class Game {
  constructor(){
    this.paramsInjector = ParameterInjector.getInstance();
    this.episodeManager = new EpisodeManager(this);
    this.swarmManager = new SwarmManager(this);
    this.uiManager = new UIManager(this);
    this.stats = new Stats(this);
    this.sketch = null;
    this.p5 = null;
  }

  run(){
    this.p5 = new p5((sketch) => {
      sketch.setup = () => this.setup(sketch);
      sketch.draw = () => this.draw(sketch);
    });
  }

  setup(sketch){
    this.sketch = sketch;
    this.uiManager.sketch = sketch;

    this.uiManager.setupSketch();

    // ----------------------------------------------

    diseaseProbabilitySlider = sketch.createSlider(0, 1000, 800);
    deathRateSlider = sketch.createSlider(0, 1000, 5);
    immunizationRateSlider = sketch.createSlider(0, 1000, 1);

    let self = this;
    let resetter = function () {
      self.episodeManager.reset();
      self.swarmManager.reset(diseaseProbabilitySlider.value()/1000);
      self.swarmManager.finishEpisode();
      self.swarmManager.initEpisode(diseaseProbabilitySlider.value()/1000, deathRateSlider.value()/1000, immunizationRateSlider.value()/1000);
    };

    immunizationRateSlider.changed(resetter);
    deathRateSlider.changed(resetter);
    diseaseProbabilitySlider.changed(resetter);

    // diseaseProbabilitySlider.parent('hyper-parameters');

    let group;
    let label;

    group = sketch.createDiv('');
    group.position(30, 30);
    label = sketch.createSpan(' Disease Probability');
    diseaseProbabilitySlider.parent(group);
    label.parent(group);
    group.parent('hyper-parameters');

    group = sketch.createDiv('');
    group.position(30, 60);
    label = sketch.createSpan(' Death Rate');
    deathRateSlider.parent(group);
    label.parent(group);
    group.parent('hyper-parameters');

    group = sketch.createDiv('');
    group.position(30, 90);
    label = sketch.createSpan(' Immunization Rate');
    immunizationRateSlider.parent(group);
    label.parent(group);
    group.parent('hyper-parameters');

  }

  draw(sketch){
    this.episodeManager.update();

    if (this.episodeManager.isNewEpisode()) {
      this.swarmManager.finishEpisode();
      this.swarmManager.initEpisode(0.8, 0.05, 0.01);
    }

    this.swarmManager.updateAll(this.episodeManager);
    this.stats.update();

    sketch.background(230);
    this.swarmManager.displayAll(sketch);
  }
}

$(document).ready(function () {

  new Game().run();

});

