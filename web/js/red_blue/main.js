let grid;
let trailManager;

// ------------ Parameters ---------------------

let numRows = 100;
let numAgents = Math.floor(numRows * numRows * 0.9);

let maxCheck = 100;       // This is q
let k_neighbours = 4;    // This is k

// ------------ END Parameters -----------------

function setup() {
  let canvas = createCanvas(300, 300);
  frameRate(60);
  canvas.parent('red-blue-sketch-holder');

  trailManager = new TrailManager(numAgents, 300);

  grid = new Grid(numRows, new RandomRelocator(maxCheck));
  grid.fillAgentsRandomly(numAgents);

}

function draw(){

  trailManager.update();

  if (trailManager.isNewTrail()) { // All epochs are complete, start new trail.
    // TODO: Gather info of the trail.
    grid.fillAgentsRandomly();
  }

  if (trailManager.isComplete()) {  // All trails are complete. End the game.
    // TODO: End the game.
  }

  background(244);
  grid.update();
  grid.draw();
}
