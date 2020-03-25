let grid;
let trailManager;
let statsManager;

// ------------ Parameters ---------------------

let numRows = 5;
let numAgents = Math.floor(numRows * numRows * 0.9);

let maxCheck = numRows;  // This is q
let k_neighbours = 4;    // This is k

let numFriends = 5;      // This is n

// ------------ END Parameters -----------------

function setup() {
  let canvas = createCanvas(600, 600);
  frameRate(60);
  canvas.parent('red-blue-sketch-holder');

  grid = new Grid(numRows, new RandomRelocator(maxCheck));
  trailManager = new TrailManager(numAgents, 5, 5);
  statsManager = new StatsManager(grid);

  grid.fillAgentsRandomly(numAgents);
  grid.setAgentFriends(numFriends);

}

function draw(){

  if (trailManager.isComplete()) {  // All trails are complete. End the game.
    background(230);
    return;
  }

  grid.update();

  trailManager.update();
  statsManager.perTimeStep();

  if (trailManager.isLastTimeStep()){
    statsManager.perEpoch();
  }

  if (trailManager.isLastEpoch()) { // All epochs are complete, start new trail.
    statsManager.perTrail();
    grid.fillAgentsRandomly(numAgents);
  }

  background(244);
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
