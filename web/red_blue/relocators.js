class Relocator {
  relocate(agent, grid) {}
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
    grid.shuffle(emptyCells);

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
  constructor(numberOfFriends, p) {
    super();
    this.name = 'friend';
    this.numberOfFriends = numberOfFriends;
    this.p = p;

    this.randomRelocator = new RandomRelocator(numberOfFriends);
  }

  relocate(agent, grid) {
    /*
    1- decide who the n friends are
    2- when the agent wants to move it informs its friends.
      a. if the friends have an empty spot (THAT IS SUITABLE - Must be a happy cell) around them, they tell it
      b. else it picks a spot randomly
    3-
    */

    /*
    ISSUES & TODO FOR JENNA:
      1- this doesn't take into consideration that friends can be of the same type or of another type.. (Akhil: Wrong. It does take this into account. Check grid.setAgentFriends())
      2- This doesn't check to see if around a happy friend there is a spot for this agent to go..

    */

    let happyCells = [];
    for (let friend of agent.friends) {
      happyCells = happyCells.concat(grid.getNearbyHappyCells(friend.x, friend.y, this.p, agent.type));
    }

    if (happyCells.length === 0)
      return this.randomRelocator.relocate(agent, grid);

    grid.shuffle(happyCells);

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

    for (let i = 0; i < grid.matrix.nRows; i++) {
      for (let j = 0; j < grid.matrix.nRows; j++) {
        if(!grid.isAgentHappy(i, j, grid.matrix[i][j])) {
          let newAgent = grid.getHappyCell(i, j, grid.matrix[i][j]);
          let oldAgent = grid.matrix[i][j];
          grid.matrix[i][j] = newAgent;
          grid.matrix[newAgent.x][newAgent.y] = oldAgent;
        }
      }
    }
  }
}
