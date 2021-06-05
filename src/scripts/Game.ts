import Player from "./Player";
import Gameboard from "./Gameboard";

class Game {
  private shipSizes: number[];
  private players: Player[];
  private currentPlayer: 0 | 1;
  private initialized: boolean;
  private winner: -1 | 0 | 1;

  constructor(shipSizes: number[], size: number) {
    this.shipSizes = shipSizes;
    this.players = [
      new Player(new Gameboard(size), "Player"),
      new Player(new Gameboard(size), "Computer")
    ];
    this.currentPlayer = 0;
    this.initialized = false;
    this.winner = -1;

    this.players[0].getBoard.distributeShips(this.shipSizes);
    this.players[1].getBoard.distributeShips(this.shipSizes);
  }

  init(): void {
    if(this.players[0].getBoard.getShips.length === this.shipSizes.length && !this.initialized) {
      this.initialized = true;
    }
  }

  get getCurrentPlayer(): Player {
    return this.players[this.currentPlayer];
  }

  get getOpponent(): Player {
    return this.players[1 - this.currentPlayer];
  }

  get getTurn(): 0 | 1 {
    return this.currentPlayer;
  }

  get getWinner(): -1 | 0 | 1 {
    return this.winner;
  }

  set setWinner(winner: -1 | 0 | 1) {
    this.winner = winner;
  }

  get getInit(): boolean {
    return this.initialized;
  }

  get getShips(): number[] {
    return this.shipSizes;
  }

  getPlayer(index: 0 | 1): Player {
    return this.players[index];
  }

  next(): void {
    this.currentPlayer = (1 - this.currentPlayer) as 0 | 1;
  }

  playerTurn(location: [number, number]): boolean {
    return this.getOpponent.getBoard.receiveAttack(location);
  }

  computerTurn(): void {
    let attack: [number, number];
    let success = false;
    do {
      attack = (this.getCurrentPlayer.chooseAttack(this.getOpponent.getBoard)) as [number, number];
      success = this.getOpponent.getBoard.receiveAttack(attack);
    } while(!success);
  }

  isWinner(): -1 | 0 | 1 {
    return this.getOpponent.getBoard.allSunk() ? this.currentPlayer : -1;
  }
}
export default Game;