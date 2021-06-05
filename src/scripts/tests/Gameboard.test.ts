import Gameboard from '../Gameboard';
import Battleship from '../Battleship';

test('returns empty gameboard after creation', () => {
  expect(new Gameboard(3).getTiles).toEqual([
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ]);
});

test('allows placing ship', () => {
  const board = new Gameboard(3);
  board.placeShip(1, [1, 1], true);
  expect(board.getTiles).toEqual([
    [false, false, false],
    [false, new Battleship(1, [1, 1], true), false],
    [false, false, false],
  ]);
});

test('throw error if we try to place ship in occupied space', () => {
  const board = new Gameboard(3);
  board.placeShip(1, [1, 1], true);
  expect(() => board.placeShip(1, [1, 1], true)).toThrow();
});

test('correctly places ship horizontally', () => {
  const board = new Gameboard(3);
  const ship = new Battleship(2, [1, 1], false);
  board.placeShip(2, [1, 1], false);
  expect(board.getTiles).toEqual([
    [false, false, false],
    [ship, ship, false],
    [false, false, false],
  ]);
});

test('correctly places ship vertically', () => {
  const board = new Gameboard(3);
  const ship = new Battleship(2, [1, 1], true);
  board.placeShip(2, [1, 1], true);
  expect(board.getTiles).toEqual([
    [false, ship, false],
    [false, ship, false],
    [false, false, false],
  ]);
});

test('2 ships placement test', () => {
  const board = new Gameboard(5);
  const ship1 = new Battleship(2, [1, 1], true);
  board.placeShip(2, [1, 1], true);
  const ship2 = new Battleship(4, [4, 4], false);
  board.placeShip(4, [4, 4], false);
  expect(board.getTiles).toEqual([
    [false, ship1, false, false, false],
    [false, ship1, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, ship2, ship2, ship2, ship2],
  ]);
});

test("throws if any part of the ship wouldn't fit on the board", () => {
  const board = new Gameboard(3);
  expect(() => board.placeShip(4, [1, 1], false)).toThrow();
});

test("can't place ships touching each other", () => {
  const board = new Gameboard(5);
  board.placeShip(2, [1, 1], true);
  expect(() => board.placeShip(4, [4, 2], true)).toThrow();
});

test('checks if attacking empty slot works', () => {
  const board = new Gameboard(3);
  expect(board.receiveAttack([0, 1])).toBe(true);
  expect(board.getTiles).toEqual([
    [false, true, false],
    [false, false, false],
    [false, false, false],
  ]);
});

test('attacking already marked space returns false', () => {
  const board = new Gameboard(3);
  board.receiveAttack([0, 1]);
  expect(board.receiveAttack([0, 1])).toBe(false);
});

test('attacking position occupied by ship hits it', () => {
  const board = new Gameboard(3);
  const ship = new Battleship(2, [1, 1], false);
  board.placeShip(2, [1, 1], false);
  ship.hit(0);
  expect(board.receiveAttack([1, 1])).toBe(true);
  expect(board.getTiles).toEqual([
    [false, false, false],
    [ship, ship, false],
    [false, false, false],
  ]);
});

test('attacking ship not at origin position works', () => {
  const board = new Gameboard(3);
  const ship = new Battleship(2, [1, 1], false);
  board.placeShip(2, [1, 1], false);
  ship.hit(1);
  expect(board.receiveAttack([1, 0])).toBe(true);
  expect(board.getTiles).toEqual([
    [false, false, false],
    [ship, ship, false],
    [false, false, false],
  ]);
});

test('attacking already damaged part returns false', () => {
  const board = new Gameboard(3);
  board.placeShip(2, [1, 1], false);
  board.receiveAttack([1, 0]);
  expect(board.receiveAttack([1, 0])).toBe(false);
});

test('correctly returns true if all ships are sunk', () => {
  const board = new Gameboard(3);
  board.placeShip(1, [0, 0], false);
  board.placeShip(1, [2, 2], false);
  board.placeShip(1, [2, 0], false);
  board.placeShip(1, [0, 2], false);
  board.receiveAttack([0, 0]);
  board.receiveAttack([2, 2]);
  board.receiveAttack([2, 0]);
  board.receiveAttack([0, 2]);
  expect(board.allSunk()).toBe(true);
});

test('returns correct state for empty board', () => {
  const board = new Gameboard(3);
  expect(board.getBoardStates).toEqual({
    shipHit: [],
    shipNotHit: [],
    missed: [],
    notShot: [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 0],
      [1, 1],
      [1, 2],
      [2, 0],
      [2, 1],
      [2, 2],
    ],
  });
});

test('places ship automatically', () => {
  const board = new Gameboard(1);
  expect(board.distributeShips([1])).toBe(true);
  expect(board.getTiles[0][0] instanceof Battleship).toBeTruthy();
});

test('places 2 ships', () => {
  const board = new Gameboard(10);
  expect(board.distributeShips([1, 1])).toBe(true);
});

test('places all ships in standard game', () => {
  const board = new Gameboard(10);
  expect(board.distributeShips([2, 3, 3, 4, 5])).toBe(true);
});

test('properly marks tiles around sunk ship', () => {
  const board = new Gameboard(3);
  const ship = new Battleship(2, [1, 1], false);
  ship.hit(0);
  ship.hit(1);
  board.placeShip(2, [1, 1], false);
  board.receiveAttack([1, 0]);
  board.receiveAttack([1, 1]);
  expect(board.getTiles).toEqual([
    [true, true, true],
    [ship, ship, true],
    [true, true, true],
  ]);
});
