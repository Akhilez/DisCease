let grid;

function setup() {
  let canvas = createCanvas(300, 300);
  frameRate(60);
  canvas.parent('red-blue-sketch-holder');
  grid = new Grid(50, new RandomRelocator(4));
  grid.fillAgentsRandomly(2000);
  // grid.update();

}

function draw(){
  // grid.fillAgentsRandomly(10);
  background(244);
  grid.update();
  grid.draw();
}
