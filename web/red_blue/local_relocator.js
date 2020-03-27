class LocalRelocator extends Relocator {

  constructor() {
    super();
    this.name = "local";
  }

  relocate(agent, grid) {
    let cells = this.getEmptyCellsOfClosestNeighbor(agent, grid);

    if (cells.length === 0)
      return;

    let swapX = cells[0][0];
    let swapY = cells[0][1];

    grid.matrix[swapX][swapY] = agent;
    grid.matrix[agent.x][agent.y] = cellState.empty;
    agent.x = swapX;
    agent.y = swapY;
  }

  getEmptyCellsOfClosestNeighbor(agent, grid) {
    let emptyCells = [];
    let startX = agent.x - 1;
    let startY = agent.y - 1;
    let side = 3;
    while (side <= grid.nRows) {

      for (let i = startX; i <= startX + side; i++)
        for (let j = startY; j <= startY + side; j++)
          if (this.isLocationInScope(i, j, grid) && grid.matrix[i][j].type === agent.type)
            emptyCells = emptyCells.concat(this.getEmptyNeighbors(grid.matrix[i][j], grid));

      if (emptyCells.length > 0)
        break;

      side += 2;
      startX--;
      startY--;
    }
    Grid.shuffle(emptyCells);
    return emptyCells;
  }


  isLocationInScope(i, j, grid) {
    return i >= 0 && i < grid.nRows && j >= 0 && j < grid.nRows;
  }

  getEmptyNeighbors(agent, grid) {
    let emptyCells = [];
    for (let i = agent.x - 1; i <= agent.x + 1; i++)
      for (let j = agent.y - 1; j <= agent.y + 1; j++)
        if (i !== j && this.isLocationInScope(i, j, grid))
          if (grid.matrix[i][j] === cellState.empty)
            emptyCells.push([i, j]);
    return emptyCells;
  }

}
