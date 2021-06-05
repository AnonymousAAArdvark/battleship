import Battleship from "./Battleship";

class Gameboard {
  private size: number;
  private tiles: (boolean | Battleship)[][];
  private ships: Battleship[];

  constructor(size: number) {
    this.size = size;
    this.tiles = Array.from({ length: size }, () =>
      new Array(size).fill(false),
    );
    this.ships = [];
  }

  get getTiles(): (boolean | Battleship)[][] {
    return this.tiles;
  }

  get getSize(): number {
    return this.size;
  }

  get getShips(): Battleship[] {
    return this.ships;
  }

  get getBoardStates(): { [state: string]: [number, number][] } {
    const states: { [state: string]: [number, number][] } = {
      shipHit: [],
      shipNotHit: [],
      missed: [],
      notShot: [],
    };

    for(let i = 0; i < this.size; ++i) {
      for(let j = 0; j < this.size; ++j) {
        const tile = this.tiles[i][j];
        if(typeof tile === "boolean") {
          if(!tile) {
            states.notShot.push([i, j]);
          }
          else {
            states.missed.push([i, j]);
          }
        }
        else {
          const shipParts = tile.getParts;
          const shipOrigin = tile.getOrigin;
          const partToHit = shipOrigin[0] - i + (shipOrigin[1] - j);
          if(!shipParts[partToHit]) {
            states.shipNotHit.push([i, j]);
          }
          else {
            states.shipHit.push([i, j]);
          }
        }
      }
    }
    return states;
  }

  get getValidTiles(): [number, number][] {
    const valid: [number, number][] = [];
    const offset: [number, number][] = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];
    for(let i = 0; i < this.size; ++i) {
      for(let j = 0; j < this.size; ++j) {
        if(
          offset.every((off) => {
            if(
              i + off[0] < 0 ||
              i + off[0] > this.size - 1 ||
              j + off[1] < 0 ||
              j + off[1] > this.size - 1
            ) {
              return true;
            }
            return this.tiles[i + off[0]][j + off[1]] === false;
          })
        ) {
          valid.push([i, j]);
        }
      }
    }
    return valid;
  }

  placeShip(shipLength: number, location: [number, number], rotated: boolean): void {
    const validPlacement = this.getBoardStates.notShot;
    const battleship = new Battleship(shipLength, [location[0], location[1]], rotated);
    const placementOffset: [number, number][] = Array.from(
      { length: shipLength },
      (_, k) => (rotated ? [k, 0] : [0, k])
    );
    const contactOffset: number[][] = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    placementOffset.forEach((placement) => {
      if(
        !validPlacement.some(
          (tile) =>
            tile[0] === location[0] - placement[0] &&
            tile[1] === location[1] - placement[1]
        )
      ) {
        throw new Error("Invalid location.");
      }
      contactOffset.forEach((contact) => {
        if(
          location[0] - placement[0] + contact[0] < 0 ||
          location[0] - placement[0] + contact[0] > this.size - 1 ||
          location[1] - placement[1] + contact[1] < 0 ||
          location[1] - placement[1] + contact[1] > this.size - 1
        ) {
          return;
        }
        if(this.tiles[location[0]-placement[0]+contact[0]][location[1]-placement[1]+contact[1]]) {
          throw new Error("Invalid location.");
        }
      });
    });
    placementOffset.forEach((placement) => {
      this.tiles[location[0] - placement[0]][location[1] - placement[1]] = battleship;
    });
    this.ships.push(battleship);
  }

  removeShip(location: number[]): void | Battleship {
    if(typeof this.tiles[location[0]][location[1]] === "boolean") return;

    const ship = this.tiles[location[0]][location[1]] as Battleship;
    const shipLength = ship.getLength;
    const shipOrigin = ship.getOrigin;
    const shipRotated = ship.getRotated;
    const offset: [number, number][] = Array.from(
      {length: shipLength},
      (_, k) => (shipRotated ? [k, 0] : [0, k])
    );

    offset.forEach((off) => {
      this.tiles[shipOrigin[0] - off[0]][shipOrigin[1] - off[1]] = false;
    });
    this.ships = this.ships.filter((ship) =>
      ship.getLength !== shipLength ||
      ship.getOrigin[0] !== shipOrigin[0] ||
      ship.getOrigin[1] !== shipOrigin[1] ||
      ship.getRotated !== shipRotated
    );

    return ship;
  }

  rotateShip(location: [number, number]): boolean {
    const ship = this.removeShip(location);
    if(ship) {
      try {
        this.placeShip(ship.getLength, ship.getOrigin, !ship.getRotated);
        return true;
      }
      catch {
        this.placeShip(ship.getLength, ship.getOrigin, ship.getRotated);
        return false;
      }
    }
    return false;
  }

  moveShip(from: [number, number], to: [number, number]): boolean {
    const ship = this.removeShip(from);
    if(ship) {
      try {
        this.placeShip(ship.getLength, to, ship.getRotated);
        return true;
      }
      catch {
        this.placeShip(ship.getLength, from, ship.getRotated);
        return false;
      }
    }
    return false;
  }

  receiveAttack(location: [number, number]): boolean {
    const state = this.getBoardStates;
    const validAttacks = [...state.shipNotHit, ...state.notShot];
    if(!validAttacks.some((attack) => attack[0] === location[0] && attack[1] === location[1])) {
      return false;
    }
    if(state.notShot.find((el) => el[0] === location[0] && el[1] === location[1])) {
      this.tiles[location[0]][location[1]] = true;
      return true;
    }
    if(state.shipNotHit.find((el) => el[0] === location[0] && el[1] === location[1])) {
      const tile = this.tiles[location[0]][location[1]];
      (tile as Battleship).hit(
        ((tile as Battleship).getOrigin[0] - location[0]) + ((tile as Battleship).getOrigin[1] - location[1])
      );
      this.markAroundSunk(tile as Battleship);
      return true;
    }
    return false;
  }

  allSunk(): boolean {
    return this.ships.every((ship) => ship.isSunk());
  }

  distributeShips(ships: number[]): boolean {
    const done: boolean[] = [];
    ships
      .sort((a, b) => b - a)
      .forEach((len) => {
        let success = false;
        const tried: [[number, number], boolean][] = [];
        let location: [number, number] = [
          Math.floor(Math.random() * this.size),
          Math.floor(Math.random() * this.size)
        ];
        let rotated: boolean = Math.random() < .5;
        const find = () => {
          return tried.find((el) =>
            el[0][0] === location[0] && el[0][1] === location[1] && el[1] === rotated
          );
        }
        do {
          try {
            do {
              location = [
                Math.floor(Math.random() * this.size),
                Math.floor(Math.random() * this.size)
              ];
              rotated = Math.random() < .5;
            } while(
              find()
            );
            this.placeShip(len, location, rotated);
            success = true;
          }
          catch {
            tried.push([location, rotated]);
            success = false;
          }
        } while(!success && tried.length < this.size * this.size);
        done.push(success);
      });
    return done.every((d) => d);
  }

  private markAroundSunk(ship: Battleship): void {
    if(ship.isSunk()) {
      const origin = ship.getOrigin;
      const partsOffset = Array.from({length: ship.getLength}, (_, k) => ship.getRotated ? [k, 0] : [0, k]);
      const aroundOffset: number[][] = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
      ];
      partsOffset.forEach((part) => {
        aroundOffset.forEach((around) => {
          if(
            origin[0] - part[0] + around[0] < 0 ||
            origin[0] - part[0] + around[0] > this.size - 1 ||
            origin[1] - part[1] + around[1] < 0 ||
            origin[1] - part[1] + around[1] > this.size - 1
          ) {
            return;
          }
          if(!this.tiles[origin[0] - part[0] + around[0]][origin[1] - part[1] + around[1]]) {
            this.tiles[origin[0] - part[0] + around[0]][origin[1] - part[1] + around[1]] = true;
          }
        });
      });
    }
  }
}

export default Gameboard;