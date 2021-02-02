// TODO: get TS set up
// TODO: convert colours, sides and directions to enums

class RubiksCube {
    constructor() {
        this.frontFace = new Face('green');
        this.upFace = new Face('yellow');
        this.downFace = new Face('white');
        this.leftFace = new Face('red');
        this.rightFace = new Face('orange');
        this.backFace = new Face('blue');

        // This probably needs breaking out into a separate JSON
        const frontNeighbours = {
            up: {
                face: this.upFace,
                borderRow: [6, 7, 8]
            },
            right: {
                face: this.rightFace,
                borderRow: [0, 3, 6]
            },
            down: {
                face: this.downFace,
                borderRow: [2, 1, 0]
            },
            left: {
                face: this.leftFace,
                borderRow: [8, 5, 2]
            },

        }
        this.frontFace.setNeighbours(frontNeighbours); 

        // Instantiate six faces
        // Link them together as per README
        // Make 1,000 'random' moves (with seed for consistency if required)
    }

    getWholeCube() {
        return [
            this.frontFace.getAllSquares(),
            this.upFace.getAllSquares(),
            this.downFace.getAllSquares(),
            this.leftFace.getAllSquares(),
            this.rightFace.getAllSquares(),
            this.backFace.getAllSquares()
        ];
    }

    // TODO: this is just temp to test basic rotation
    testRotate() {
        this.frontFace.rotateClockwise();
    }
    shuffle(seed) {
        // Apply 1,000 random rotations (randomness controlled by seed)
    }
    
}

class Face {
    constructor(colour) {
        this.squares = Array(9).fill(colour);
    }
    
    getAllSquares() {
        return this.squares;
    }

    setNeighbours(neighbours) {
        this.upNeighbourFace = neighbours.up.face;
        this.rightNeighbourFace = neighbours.right.face;
        this.downNeighbourFace = neighbours.down.face;
        this.leftNeighbourFace = neighbours.left.face;

        // These are information about which specific squares border this face
        this.upBorderRow = neighbours.up.borderRow;
        this.rightBorderRow = neighbours.right.borderRow;
        this.downBorderRow = neighbours.down.borderRow;
        this.leftBorderRow = neighbours.left.borderRow;
    }

    rotateClockwise() {
        // First: rotate this face
        // TODO: refactor, have CW_ROTATIOn and ACW_ROTATION as constant arrays
        let newSquares = [];
        newSquares[0] = this.squares[6];
        newSquares[1] = this.squares[3];
        newSquares[2] = this.squares[0];
        newSquares[3] = this.squares[7];
        newSquares[4] = this.squares[4];
        newSquares[5] = this.squares[1];
        newSquares[6] = this.squares[8];
        newSquares[7] = this.squares[5];
        newSquares[8] = this.squares[2];
        this.squares = newSquares;

        // Second: rotate rows of neighbouring faces
        // TODO: must be a nicer way of doing this...
        // Maybe could explicitly link the faces together in the constructor?
        for (let i = 0; i < 3; i++) {
            const upToRightColour = this.upNeighbourFace
                .getSquare(this.upBorderRow[i]);
            const rightToDownColour = this.rightNeighbourFace
                .getSquare(this.rightBorderRow[i]);
            const downToLeftColour = this.downNeighbourFace
                .getSquare(this.downBorderRow[i]);
            const leftToUpColour = this.leftNeighbourFace
                .getSquare(this.leftBorderRow[i]);
            console.log('rightToDownColour', rightToDownColour);

            this.rightNeighbourFace
                .setSquare(this.rightBorderRow[i], upToRightColour);
            this.downNeighbourFace
                .setSquare(this.downBorderRow[i], rightToDownColour);
            this.leftNeighbourFace
                .setSquare(this.leftBorderRow[i], downToLeftColour);
            this.upNeighbourFace
                .setSquare(this.upBorderRow[i], leftToUpColour);


        }
    }

    rotateAnticlockwise() {
        // TODO: mirror image of above
    }

    getSquare(squareIndex) {
        return this.squares[squareIndex];
    }

    setSquare(squareIndex, colour) {
        this.squares[squareIndex] = colour;
    }
}

const testCube = new RubiksCube();
testCube.testRotate();
console.log(testCube.getWholeCube());
