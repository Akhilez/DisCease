let grid;

function setup() {
  let canvas = createCanvas(300, 300);
  canvas.parent('red-blue-sketch-holder');
  grid = new Grid(4);
  grid.fillAgentsRandomly(10);
  // grid.update();

}

function draw(){
  // grid.fillAgentsRandomly(10);
  background(244);
  grid.update();
  grid.draw();
}
