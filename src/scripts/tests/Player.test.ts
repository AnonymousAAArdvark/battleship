import Player from '../Player';
import Gameboard from '../Gameboard';

test('chooseAttack works', () => {
  const player = new Player(new Gameboard(1), 'player');
  const enemyBoard = new Gameboard(1);
  expect(player.chooseAttack(enemyBoard)).toEqual([0, 0]);
});
