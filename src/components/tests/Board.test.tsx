import React from 'react';
import renderer from 'react-test-renderer';
import Board from '../Board';
import Game from '../../scripts/Game';

test('component renders', () => {
  const game = new Game([2, 2], 4);
  const tree = renderer
    .create(
      <Board
        game={game}
        player={0}
        state={game.getCurrentPlayer.getBoard.getBoardStates}
        loop={() => {
          return;
        }}
        rotate={() => {
          return;
        }}
        move={() => {
          return;
        }}
        turn={0}
        init={game.getInit}
      />,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
