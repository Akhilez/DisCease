let grid;
let trailManager;
let statsManager;

// ------------ Parameters ---------------------

let numRows = 5;
let numAgents = Math.floor(numRows * numRows * 0.9);

let maxCheck = numRows;  // This is q
let k_neighbours = 4;    // This is k

// ------------ END Parameters -----------------

function setup() {
  let canvas = createCanvas(300, 300);
  frameRate(60);
  canvas.parent('red-blue-sketch-holder');

  grid = new Grid(numRows, new RandomRelocator(maxCheck));
  trailManager = new TrailManager(numAgents, 5, 5);
  statsManager = new StatsManager(grid, trailManager);

  grid.fillAgentsRandomly(numAgents);

}

function draw(){

  if (trailManager.isComplete()) {  // All trails are complete. End the game.
    // TODO: End the game.
    background(254);
    return;
  }

  trailManager.update();
  statsManager.perTimeStep();

  if (trailManager.isNewEpoch()){
    statsManager.perEpoch();
  }

  if (trailManager.isNewTrail()) { // All epochs are complete, start new trail.
    // TODO: Gather info of the trail.
    grid.fillAgentsRandomly(numAgents);
    statsManager.perTrail();
  }

  background(244);
  grid.update();
  grid.draw();
}


// This is instance mode
/*
const s = ( sketch ) => {

  let x = 100;
  let y = 100;

  sketch.setup = () => {
    sketch.createCanvas(200, 200);
  };

  sketch.draw = () => {
    sketch.background(0);
    sketch.fill(255);
    sketch.rect(x,y,50,50);
  };
};

let myp5 = new p5(s);
*/
