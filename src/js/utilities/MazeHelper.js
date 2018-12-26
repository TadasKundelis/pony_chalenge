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

  findPath() {
    let directions;
    let [currentRow, currentCol] = this.ponyPos;
    let currentCell = this.matrix[currentRow][currentCol];
    //initialize stack with cell that is occupied by the pony
    const stack = [currentCell];

    while (stack.length) {
      //make current cell visited to avoid infinite loop
      currentCell.visited = true;

      //get coordinates for the next move
      const [nextRow, nextCol] = [
        [currentRow + 1, currentCol],
        [currentRow, currentCol + 1],
        [currentRow - 1, currentCol],
        [currentRow, currentCol - 1]
      ].find(([candidateRow, candidateCol]) => this.moveValidator.run(candidateRow, candidateCol, currentRow, currentCol)) || [];

      //in case there's a valid next move
      if (nextRow !== undefined && nextCol !== undefined) {
        //add cell to the path
        stack.push(currentCell);
        //update current cell
        currentCell = this.matrix[nextRow][nextCol];
        //if we reach the endPoint
        if (currentCell.occupiedBy === 'endPoint') {
          stack.push(currentCell);
          //get directions (ex. "south, north" etc)
          directions = this.getDirections(stack);
        }
      } else {
        //take last item from the stack in case you reach a dead-end and remove it from path
        currentCell = stack.pop();
      }
      [currentRow, currentCol] = [currentCell.row, currentCell.col];
    }
    return directions;
  }

  getDirections(path) {
    const directions = [];
    path
      .map(cell => [cell.row, cell.col])
      .forEach(([row, col], index, array) => {
        if (!index) return;
        const [previousRow, previousCol] = array[index - 1];
        if (row - previousRow === 1) directions.push('south');
        else if (row - previousRow === -1) directions.push('north');
        else if (col - previousCol === 1) directions.push('east');
        else if (col - previousCol === -1) directions.push('west');
      });
    return directions;
  }
}
