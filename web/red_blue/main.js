width = 300;

// ------------ Parameters ---------------------

let numRows = 5;
let numAgents = Math.floor(numRows * numRows * 0.9);

let maxCheck = numRows;  // This is q
let k_neighbours = 4;    // This is k

let numFriends = 5;      // This is n

// ------------ END Parameters -----------------

class Game {
  constructor(relocator) {
    this.relocator = relocator;
    this.grid = new Grid(numRows, relocator);
    this.trailManager = new TrailManager(numAgents, 5, 5);
    this.statsManager = new StatsManager(this.grid, this.trailManager, relocator);
  }

  run() {
    new p5((sketch) => {
      sketch.setup = () => this.setup(sketch);
      sketch.draw = () => this.draw(sketch);
    });
  }

  setup(sketch) {
    let canvas = sketch.createCanvas(width, width);
    sketch.frameRate(60);
    canvas.parent(`red-blue-sketch-holder-${this.relocator.name}-policy`);

    this.grid.fillAgentsRandomly(numAgents);
    this.grid.setAgentFriends(numFriends);
  }

  draw(sketch) {

    if (this.trailManager.isComplete()) {  // All trails are complete. End the game.
      sketch.background(230);
      return;
    }

    this.grid.update();

    this.trailManager.update();
    this.statsManager.perTimeStep();

    if (this.trailManager.isLastTimeStep()) {
      this.statsManager.perEpoch();
    }

    if (this.trailManager.isLastEpoch()) { // All epochs are complete, start new trail.
      this.statsManager.perTrail();
      this.grid.fillAgentsRandomly(numAgents);
    }

    if (this.trailManager.isComplete()) {
      this.statsManager.atEnd();
    }

    sketch.background(244);
    this.grid.draw(sketch);
  }
}

$(document).ready(function () {
  let relocator1 = new RandomRelocator(maxCheck);

  let relocator2 = new RandomRelocator(maxCheck);
  relocator2.name = 'friend';

  let relocator3 = new RandomRelocator(maxCheck);
  relocator3.name = 'swap';

  let relocator4 = new RandomRelocator(maxCheck);
  relocator4.name = 'local';

  let games = [
    new Game(relocator1),
    new Game(relocator2),
    new Game(relocator3),
    new Game(relocator4),
  ];
  games.forEach(game => game.run());

  let addFinalGraph = function () {
    if (games.every(game => game.statsManager.data.avgHappiness != null)) {
      UIManager.drawAllPoliciesGraph(games);
    } else {
      setTimeout(addFinalGraph, 5000);  // wait 5000 milliseconds then recheck
    }
  };

  addFinalGraph();
});
