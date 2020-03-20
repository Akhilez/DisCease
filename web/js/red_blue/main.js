let grid;

function setup() {
  let canvas = createCanvas(300, 300);
  frameRate(10);
  canvas.parent('red-blue-sketch-holder');
  grid = new Grid(10, new RandomRelocator(4));
  grid.fillAgentsRandomly(90);
  // grid.update();

}

function draw(){
  // grid.fillAgentsRandomly(10);
  background(244);
  grid.update();
  grid.draw();
}
