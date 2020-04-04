class Relocator {
  relocate(agent, grid) {
  }
}

class RandomRelocator extends Relocator {
  constructor(maxCheck) {
    super();
    this.maxCheck = maxCheck; // This is q
    this.name = "random";
  }

  relocate(agent, grid) {
    /*
    1. Find all the empty cells.
    2. Shuffle them.
    3. Iterate this empty cells array from 0 to q.
       a. Keep track of happiest cell
       b. if happy, then select that cell.
    4. If happiest is happier than current, then return happiest
    5. Else return current location.
     */

    let emptyCells = grid.getEmptyCells();
    Grid.shuffle(emptyCells);

    let maxHappyLocation = [agent.x, agent.y];
    let maxHappyScore = grid.getHappyScore(agent.x, agent.y, agent.type);

    for (let i = 0; i < this.maxCheck; i++) {
      if (i >= emptyCells.length)
        break;
      let happyScore = grid.getHappyScore(emptyCells[i][0], emptyCells[i][1], agent.type);
      if (happyScore >= k_neighbours) {
        maxHappyLocation = emptyCells[i];
        break;
      }
      if (happyScore > maxHappyScore) {
        maxHappyScore = happyScore;
        maxHappyLocation = emptyCells[i];
      }
    }

    grid.matrix[agent.x][agent.y] = cellState.empty;
    grid.matrix[maxHappyLocation[0]][maxHappyLocation[1]] = agent;
    agent.x = maxHappyLocation[0];
    agent.y = maxHappyLocation[1];

  }
}

class FriendRelocator extends Relocator {
  constructor(p) {
    super();
    this.name = 'friend';
    this.p = p;

    this.randomRelocator = new RandomRelocator(10);
  }

  relocate(agent, grid) {
    /*
    1- decide who the n friends are
    2- when the agent wants to move it informs its friends.
      a. if the friends have an empty spot (THAT IS SUITABLE - Must be a happy cell) around them, they tell it
      b. else it picks a spot randomly
    */

    let happyCells = [];
    for (let friend of agent.friends) {
      happyCells = happyCells.concat(grid.getNearbyHappyCells(friend.x, friend.y, this.p, agent.type));
    }

    if (happyCells.length === 0)
      return this.randomRelocator.relocate(agent, grid);

    Grid.shuffle(happyCells);

    let happyX = happyCells[0][0];
    let happyY = happyCells[0][1];

    grid.matrix[agent.x][agent.y] = cellState.empty;
    grid.matrix[happyX][happyY] = agent;
    agent.x = happyX;
    agent.y = happyY;

  }
}

class UnhappySwapRelocator extends Relocator {
  constructor() {
    super();
    this.name = 'swap'
  }

  relocate(agent, grid) {

    let unhappyCell = grid.getUnhappyHappyCell(agent.x, agent.y, agent.type);
    if (unhappyCell.length === 0)
      return;

    let agentType = agent.type;
    agent.type = unhappyCell[0].type;
    unhappyCell[0].type = agentType;

  }
}
