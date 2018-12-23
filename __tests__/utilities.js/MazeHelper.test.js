import directions from '../../mock data/directions';
import createInstance from '../../mock data/MazeHelper';


describe('MazeHelper', () => {
  const mazeHelper = createInstance();
  const maze = mazeHelper.build();

  describe('build method', () => {
    it('should create a matrix whose length equals maze height', () => {
      expect(maze).toHaveLength(mazeHelper.height);
    });
    it('number of objects in a matrix row should equal maze width', () => {
      expect(maze[0]).toHaveLength(mazeHelper.width);
    });
  });
  describe('buildCells method', () => {
    it('matrix cell should contain rol, col and walls properties', () => {
      const cell = maze[0][0];
      const props = Object.keys(cell);
      expect(props).toEqual(expect.arrayContaining(['row', 'col', 'walls']));
    });
  });
  describe('insertElement method', () => {
    it('should insert pony, domokun and endPoint into matrix', () => {
      const pony = maze[4][5].occupiedBy;
      const domokun = maze[14][8].occupiedBy;
      const endPoint = maze[10][14].occupiedBy;
      expect([pony, domokun, endPoint]).toEqual(['pony', 'domokun', 'endPoint']);
    });
  });
  describe('calculateCoordinates method', () => {
    it('should calculate row and column coordinates from a given number', () => {
      const num = 25;
      const [row, col] = mazeHelper.calculateCoordinates([num]);
      expect([row, col]).toEqual([1, 10]);
    });
  });
  describe('findPath method', () => {
    it('should return an array with directions', () => {
      const path = mazeHelper.findPath();
      expect(path).toEqual(directions);
    });
  });
  describe('updateMaze method', () => {
    it('should put pony and domokun in new positions and remove from previous positions', () => {
      const updatedMaze = mazeHelper.updateMaze([66], [219]);
      const previousPony = updatedMaze[4][5].occupiedBy;
      const previousDomokun = updatedMaze[14][8].occupiedBy;
      const pony = updatedMaze[4][6].occupiedBy;
      const domokun = updatedMaze[14][9].occupiedBy;
      expect([previousPony, previousDomokun, pony, domokun]).toEqual([null, null, 'pony', 'domokun']);
    });
    it('should not remove endPoint when domokun goes to it', () => {
      const updatedMaze = mazeHelper.updateMaze([67], [164]);
      const endPoint = updatedMaze[10][14].occupiedBy;
      expect(endPoint).toEqual('endPoint');
    });
  });
});
