import MoveValidator from './MoveValidator';

export default class MazeHelper {
  constructor(data, positions, width, height) {
    this.data = data;
    this.width = width;
    this.height = height;
    [this.ponyPos, this.domokunPos, this.endPoint] = positions.map(num => this.calculateCoordinates(num));
  }

  createMatrix() {
    this.matrix = Array.from({ length: this.height }, _ => []);
    this.buildCells();
    this.insertElement('pony', this.ponyPos);
    this.insertElement('domokun', this.domokunPos);
    this.insertElement('endPoint', this.endPoint);
    this.moveValidator = new MoveValidator(this);
    return this.matrix;
  }

  buildCells() {
    this.data.forEach((walls, index) => {
      const [row, col] = this.calculateCoordinates([index]);
      this.matrix[row].push({ walls, row, col });
    });
  }

  calculateCoordinates([num]) {
    const row = Math.floor(num / this.width);
    const col = num % this.width;
    return [row, col];
  }

  insertElement(element, [row, col]) {
    const cell = this.matrix[row][col];
    //don't delete the endPoint when domokun goes to the same cell
    if (cell.occupiedBy === 'endPoint' && element === 'domokun') return;
    cell.occupiedBy = element;
  }

  updateMaze(nextPonyPos, nextDomokunPos) {
    [this.ponyPos, this.domokunPos].forEach(
      ([row, col]) => {
        const cell = this.matrix[row][col];
        if (cell.occupiedBy === 'endPoint') return;
        cell.occupiedBy = null;
      }
    );
    [this.ponyPos, this.domokunPos] = [nextPonyPos, nextDomokunPos].map(num => this.calculateCoordinates(num));
    this.insertElement('pony', this.ponyPos);
    this.insertElement('domokun', this.domokunPos);
    //always return a new copy of the maze so React component rerenders
    return this.matrix.slice();
  }

  findPath([currentRow, currentCol] = this.ponyPos, stack = []) {
    let nextCell;
    //define current cell
    const currentCell = this.matrix[currentRow][currentCol];
    //mark cell as visited to avoid infinite loop
    currentCell.visited = true;
    
    //find coordinates for the next move
    const [nextRow, nextCol] = [
      [currentRow + 1, currentCol],
      [currentRow, currentCol + 1],
      [currentRow - 1, currentCol],
      [currentRow, currentCol - 1]
    ].find(([candidateRow, candidateCol]) => this.moveValidator.run(candidateRow, candidateCol, currentRow, currentCol)) || [];

    //if coordinates are found
    if (nextRow !== undefined && nextCol !== undefined) {
      //add current cell to the path (stack)
      stack.push(currentCell);
      //define next cell
      nextCell = this.matrix[nextRow][nextCol];
      //if next cell is endpoint, return
      if (nextCell.occupiedBy === 'endPoint') {
        stack.push(nextCell);
        return this.getDirections(stack);
      }
      //if you reach dead end, pop last item from the stack
    } else {
      nextCell = stack.pop();
    }
    //call findPath function with next coordinates and updated stack
    return this.findPath([nextCell.row, nextCell.col], stack);
  };

  getDirections(path) {
    return path
      .map(cell => [cell.row, cell.col])
      .map(([row, col], index, array) => {
        if (!index) return false;
        const [previousRow, previousCol] = array[index - 1];
        if (row - previousRow === 1) return 'south';
        if (row - previousRow === -1) return 'north';
        if (col - previousCol === 1) return 'east';
        if (col - previousCol === -1) return 'west';
      })
      .slice(1);
  }
}
