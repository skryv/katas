const DELTA_PER_DIRECTION = {
  N: { x: 0, y: 1 },
  E: { x: 1, y: 0 },
  S: { x: 0, y: -1 },
  W: { x: -1, y: 0 }
};
const TURN_LEFT = {
  N: "W",
  E: "N",
  S: "E",
  W: "S"
};
const TURN_RIGHT = {
  N: "E",
  E: "S",
  S: "W",
  W: "N"
};
module.exports = class Rover {
  constructor() {
    this.coordinates = { x: 0, y: 0 };
    this.direction = "N";
  }

  getCoordinates() {
    return this.coordinates;
  }

  getDirection() {
    return this.direction;
  }

  moveForward() {
    const delta = DELTA_PER_DIRECTION[this.getDirection()];
    this.coordinates = {
      x: this.coordinates.x + delta.x,
      y: this.coordinates.y + delta.y
    };
  }

  moveBackward() {
    const delta = DELTA_PER_DIRECTION[this.getDirection()];
    this.coordinates = {
      x: this.coordinates.x - delta.x,
      y: this.coordinates.y - delta.y
    };
  }

  turnLeft() {
    this.direction = TURN_LEFT[this.direction];
  }

  turnRight() {
    this.direction = TURN_RIGHT[this.direction];
  }

  executeCommands(commands) {
    const COMMANDS = {
      F: () => this.moveForward(),
      B: () => this.moveBackward(),
      L: () => this.turnLeft(),
      R: () => this.turnRight()
    };

    commands.forEach((command) => {
      const foundCommand = COMMANDS[command];
      if (foundCommand) foundCommand();
    });
  }
};
