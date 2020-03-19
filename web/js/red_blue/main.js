let grid;

function setup() {
  let canvas = createCanvas(300, 300);
  canvas.parent('sketch-holder');
  grid = new Grid(50);
  grid.fillAgentsRandomly(90);

}

function draw(){
  background(244);
  grid.update();
  grid.draw();
}
