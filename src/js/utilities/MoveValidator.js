export default class MoveValidator {
  constructor(data) {
    this.maze = data.maze;
    this.mazeWidth = data.width;
    this.mazeHeight = data.height;
  }

  run(nextRow, nextCol, currentRow, currentCol) {
    if (!this.checkLimits(nextRow, nextCol)) return false;
    const cell = this.maze[nextRow][nextCol];
    return this.checkWalls(nextRow, nextCol, currentRow, currentCol) && !cell.visited;
  }

  checkLimits(row, col) {
    return row > -1 && row < this.mazeHeight && col > -1 && col < this.mazeWidth;
  }

  checkWalls(nextRow, nextCol, currentRow, currentCol) {
    const nextCell = this.maze[nextRow][nextCol];
    const currentCell = this.maze[currentRow][currentCol];
    if (nextRow - currentRow === 1 && nextCell.walls.includes('north')) return false;
    if (nextCol - currentCol === 1 && nextCell.walls.includes('west')) return false;
    if (nextRow - currentRow === -1 && currentCell.walls.includes('north')) return false;
    if (nextCol - currentCol === -1 && currentCell.walls.includes('west')) return false;
    return true;
  }
}
