let swarmManager;
let episodeManager;
let fps = 60;
let stats;
let immunizationRateSlider;
let deathRateSlider;
let diseaseProbabilitySlider;



function setup() {
  var canvas = createCanvas(300, 300);
  frameRate(fps);

  // Move the canvas so it’s inside our <div id="sketch-holder">.
  canvas.parent('sketch-holder');

  diseaseProbabilitySlider = createSlider(0, 1000, 800);
  deathRateSlider = createSlider(0, 1000, 5);
  immunizationRateSlider = createSlider(0, 1000, 1);

  immunizationRateSlider.changed(reset); 
  deathRateSlider.changed(reset);
  diseaseProbabilitySlider.changed(reset);

  diseaseProbabilitySlider.parent('hyper-parameters');
  deathRateSlider.parent('hyper-parameters');
  immunizationRateSlider.parent('hyper-parameters');

  episodeManager = new EpisodeManager(3, 300);
  swarmManager = new SwarmManager(50, 0.1, 0.01);

  stats = new Stats();
}

function draw() {

  episodeManager.update();

  if (episodeManager.isNewEpisode()) {
    swarmManager.finishEpisode();
    swarmManager.initEpisode(0.8, 0.05, 0.01);
  }

  // text('Immunization Rate', immunizationRateSlider.x * 2 + immunizationRateSlider.width, 35);
  // text('Death Rate', deathRateSlider.x * 2 + deathRateSlider.width, 65);
  // text('Disease Probability', diseaseProbabilitySlider.x * 2 + diseaseProbabilitySlider.width, 95);
  
  swarmManager.updateAll(episodeManager);
  stats.update();

  background(230);
  swarmManager.displayAll();
}

function reset() {
  episodeManager.reset();
  swarmManager.reset(diseaseProbabilitySlider.value()/1000);
  swarmManager.finishEpisode();
  swarmManager.initEpisode(diseaseProbabilitySlider.value()/1000, deathRateSlider.value()/1000, immunizationRateSlider.value()/1000);
}
