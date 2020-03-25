const cellState = {
  empty: 0,
  blue: -1,
  red: 1,
};

class Agent {
  constructor(x, y, value, friends) {
    this.x = x;
    this.y = y;
    this.type = value;
    this.friends = friends;
  }
}

class Grid {
  constructor(nRows, relocator) {
    this.nRows = nRows;

    this.cellSize = width / this.nRows;
    this.matrix = this.createMatrix(this.nRows);

    this.relocator = relocator;

    this.selectionIndices = [];
  }

  update() {
    let currentAgent = this.getNextAgent();
    if (!this.isAgentHappy(currentAgent.x, currentAgent.y, currentAgent.type)) {
      this.relocator.relocate(currentAgent, this);
    }
  }

  draw() {
    for (let i = 0; i < this.nRows; i++) {
      for (let j = 0; j < this.nRows; j++) {
        let agentType = this.matrix[i][j].type;

        let cellColor;
        if (agentType === cellState.red)
          cellColor = color('red');
        else if (agentType === cellState.blue)
          cellColor = color('blue');
        else cellColor = color('white');

        fill(cellColor);
        square(i * this.cellSize, j * this.cellSize, this.cellSize);

      }
    }
  }

  getNextAgent() {
    // Randomly pick an agent without replacement.
    if (this.selectionIndices.length === 0) {
      for (let i = 0; i < this.nRows; i++)
        for (let j = 0; j < this.nRows; j++)
          if (this.matrix[i][j] !== cellState.empty)
            this.selectionIndices.push(this.matrix[i][j]);
      this.shuffle(this.selectionIndices);
    }
    return this.selectionIndices.pop();
  }

  isAgentHappy(x, y, agentType) {
    return this.getHappyScore(x, y, agentType) >= k_neighbours;
  }

  getHappyScore(x, y, agentType) {
    let numSameNeighbours = 0;
    for (let i = x - 1; i <= x + 1; i = i + 1)
      for (let j = y - 1; j <= y + 1; j = j + 1) {
        if (i === x && j === y)
          continue;
        let newI = i;
        let newJ = j;
        if (i === -1)
          newI = this.nRows - 1;
        if (j === -1)
          newJ = this.nRows - 1;
        if (i === this.nRows)
          newI = 0;
        if (j === this.nRows)
          newJ = 0;

        if (this.matrix[newI][newJ].type === agentType)
          numSameNeighbours++;
      }

    return numSameNeighbours;
  }

  getAvgHappiness () {
    let happiness = 0;
    let numAgents = 0;
    for (let i = 0; i < this.nRows; i++)
      for (let j=0; j<this.nRows; j++)
        if (this.matrix[i][j] !== cellState.empty) {
          happiness += this.getHappyScore(i, j, this.matrix[i][j].type);
          numAgents++
        }
    return happiness / numAgents;
  }

  fillAgentsRandomly(size) {
    this.matrix = this.createMatrix(this.nRows);

    let shuffledIndices = [];

    for (let i = 0; i < this.nRows; i++)
      for (let j = 0; j < this.nRows; j++)
        shuffledIndices.push([i, j]);
    this.shuffle(shuffledIndices);

    let halfSize = Math.floor(size / 2);
    for (let i = 0; i < halfSize; i++) {
      let x = shuffledIndices[i][0];
      let y = shuffledIndices[i][1];
      this.matrix[x][y] = new Agent(x, y, cellState.blue);
    }
    for (let i = halfSize; i < size; i++) {
      let x = shuffledIndices[i][0];
      let y = shuffledIndices[i][1];
      this.matrix[x][y] = new Agent(x, y, cellState.red);
    }
  }

  setAgentFriends(numFriends) {

    let shuffledIndices = [];

    for (let i = 0; i < this.nRows; i++)
      for (let j = 0; j < this.nRows; j++)
        if (this.matrix[i][j] !== cellState.empty)
          shuffledIndices.push([i, j]);

    for (let i = 0; i < this.nRows; i++)
      for (let j = 0; j < this.nRows; j++)
        if (this.matrix[i][j] !== cellState.empty) {
          this.matrix[i][j].friends = [];
          this.shuffle(shuffledIndices);
          let numFriendsCheck = numFriends;
          for (let k = 0; k < numFriendsCheck; k++) {
            let randX = shuffledIndices[k][0];
            let randY = shuffledIndices[k][1];

            if (this.matrix[randX][randY] === cellState.empty) {
              numFriendsCheck++;
              continue;
            }
            this.matrix[i][j].friends.push(this.matrix[randX][randY]);
          }
        }
  }
  //returns all happy cells around a certain one
  getNearbyHappyCells(x, y, p, agentType) {

    let happyCells = [];
    let edge = Math.floor(p/2);

    //setting vars to avoid out of bounds
    let xMin = Math.max(0, x - edge);
    let xMax = Math.min(nRows-1, x + edge);
    let yMin = Math.max(0, y - edge);
    let yMax = Math.min(nRows-1, y + edge);

    for (let i = xMin; i <= xMax; i++) {
      for (let j = yMin; j <= yMax; j++) {
        if(this.isAgentHappy(i, j, this.matrix[i][j])) {
          happyCells.push(this.matrix[i][j]);
        }
      }
    }

    return happyCells;
  }

  //returns first unhappy cell of opposite color found
  getHappyCell(x, y, agentType) {
    for (let i = 0; i < nRows; i++) {
      for(let j = 0; j < nRows; j++) {
        if((agentType!== this.matrix[i][j]) && !this.isAgentHappy(i, j, this.matrix[i][j] && x != i && y != j)) {
          return this.matrix[i][j];
        }
      }
    }
  }



  getEmptyCells() {
    let emptyCells = [];
    for (let i = 0; i < this.nRows; i++)
      for (let j = 0; j < this.nRows; j++)
        if (this.matrix[i][j] === cellState.empty)
          emptyCells.push([i, j]);
    return emptyCells;
  }

  createMatrix(n) {
    return new Array(n).fill(cellState.empty).map((o, i) => new Array(n).fill(cellState.empty))
  }

  shuffle(array) {
    // This code is taken from the site: https://gomakethings.com/how-to-shuffle-an-array-with-vanilla-js/

    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;

  }

}
