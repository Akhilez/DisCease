class Positioner {
  constructor(numRows, numTrails) {
    this.numTrails = numTrails;
    this.numRows = numRows;
    this.positions = this.initPositions();
  }

  initPositions() {
    let allPositions = [];
    for (let i = 0; i < this.numTrails; i++) {
      let trailPositions = [];
      for (let j = 0; j < this.numRows; j++) {
        for (let k = 0; k < this.numRows; k++) {
          trailPositions.push([j, k]);
        }
      }
      Grid.shuffle(trailPositions);
      allPositions.push(trailPositions);
    }
    return allPositions;
  }

  getPositions(trail) {
    return this.positions[trail];
  }

}
