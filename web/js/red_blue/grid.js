const cellState = {
  empty: 0,
  blue: -1,
  red: 1,
};

class Grid {
  constructor(nRows) {
    this.nRows = nRows;

    this.cellSize = width / this.nRows;
    this.matrix = this.createMatrix(this.nRows);
  }

  update() {

  }

  draw() {
    for (let i = 0; i < this.nRows; i++) {
      for (let j = 0; j < this.nRows; j++) {
        let agentType = this.matrix[i][j];

        let cellColor;
        if (agentType === cellState.red)
          cellColor = color('red');
        else if (agentType === cellState.blue)
          cellColor = color('blue');
        else cellColor = color('white');

        fill(cellColor);
        square(i*this.cellSize, j*this.cellSize, this.cellSize);

      }
    }
  }

  fillAgentsRandomly(size) {
    let halfSize = Math.floor(size / 2);
    for (let i = 0; i < halfSize; i++) {
      this._fillAgentRandomly(cellState.blue);
    }
    for (let i = halfSize; i < size; i++) {
      this._fillAgentRandomly(cellState.red);
    }
  }

  _fillAgentRandomly(agentType) {
    let randomX = Math.floor(random(0, this.nRows));
    let randomY = Math.floor(random(0, this.nRows));

    if (this.matrix[randomX][randomY] === cellState.empty)
      this.matrix[randomX][randomY] = agentType;
    else this._fillAgentRandomly(agentType);
  }

  createMatrix(n) {
    return new Array(n).fill(cellState.empty).map((o, i) => new Array(n).fill(cellState.empty))
  }

}
