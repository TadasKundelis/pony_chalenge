
import createInstance from '../../mock data/MazeHelper';
import MoveValidator from '../../src/js/utilities/MoveValidator';

describe('moveValidator', () => {
  const mazeHelper = createInstance();
  const matrix = mazeHelper.createMatrix();
  const moveValidator = new MoveValidator(mazeHelper);
  describe('checkLimits method', () => {
    it('should return false if row coordinate is < 0', () => {
      const bool = moveValidator.checkLimits(-1, 10);
      expect(bool).toBe(false);
    });
    it('should return false if row coordinate is >= maze width', () => {
      const bool = moveValidator.checkLimits(15, 0);
      expect(bool).toBe(false);
    });
    it('should return false if column coordinate is < 0', () => {
      const bool = moveValidator.checkLimits(0, -1);
      expect(bool).toBe(false);
    });
    it('should return false if column coordinate is >= maze width', () => {
      const bool = moveValidator.checkLimits(0, 15);
      expect(bool).toBe(false);
    });
    it('should return true if column and row  are > -1 and row < maze height and col < maze width', () => {
      const bool = moveValidator.checkLimits(2, 5);
      expect(bool).toBe(true);
    });
  });
  describe('checkWalls method', () => {
    it('should return false if pony tries to go east and the cell on the right has a west wall', () => {
      const bool = moveValidator.checkWalls(4, 5, 4, 6);
      expect(bool).toBe(false);
    });
    it('should return false if pony tries to go north and the current cell has a north wall', () => {
      const bool = moveValidator.checkWalls(4, 5, 3, 5);
      expect(bool).toBe(false);
    });
    it('should return true if no walls are blocking the way', () => {
      const bool = moveValidator.checkWalls(4, 5, 5, 5);
      expect(bool).toBe(true);
    });
    describe('run method', () => {
      it('should return false if pony tries to go to visited cell', () => {
        matrix[5][5].visited = true;
        const bool = moveValidator.run(5, 5, 6, 5);
        expect(bool).toBe(false);
      });
    });
  });
});
