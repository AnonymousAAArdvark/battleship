class Battleship {
    private parts: boolean[];
    private origin: [number, number];
    private rotated: boolean;

    constructor(shipLength: number, origin: [number, number], rotated: boolean) {
        this.parts = new Array(shipLength).fill(false);
        this.origin = origin;
        this.rotated = rotated;
    }

    get getParts(): boolean[] {
        return this.parts;
    }

    get getLength(): number {
        return this.parts.length;
    }

    get getOrigin(): [number, number] {
        return this.origin;
    }

    get getRotated(): boolean {
        return this.rotated;
    }

    hit(part: number): void {
        if(part > this.parts.length - 1) {
            throw new Error("Value higher than ship length");
        }
        this.parts[part] = true;
    }

    isSunk(): boolean {
        return this.parts.every((part) => part);
    }
}

export default Battleship;