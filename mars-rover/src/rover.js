const DELTA_PER_DIRECTION = {
  N: { x: 0, y: 1 },
  E: { x: 1, y: 0 },
  S: { x: 0, y: -1 },
  W: { x: -1, y: 0 },
};
const TURN_LEFT = {
  N: "W",
  E: "N",
  S: "E",
  W: "S",
};
const TURN_RIGHT = {
  N: "E",
  E: "S",
  S: "W",
  W: "N",
};

module.exports = class Rover {
  #position;

  #COMMANDS = {
    F: () => this.#moveForward(),
    B: () => this.#moveBackward(),
    L: () => this.#turnLeft(),
    R: () => this.#turnRight(),
  };

  constructor(initialPosition) {
    this.#position = { ...initialPosition };
  }

  getPosition() {
    return { ...this.#position };
  }

  executeCommands(commands) {
    commands.forEach((command) => {
      const foundCommand = this.#COMMANDS[command];
      if (foundCommand) foundCommand();
    });
  }

  #moveForward() {
    const delta = DELTA_PER_DIRECTION[this.#position.direction];
    this.#position.x = this.#position.x + delta.x;
    this.#position.y = this.#position.y + delta.y;
  }

  #moveBackward() {
    const delta = DELTA_PER_DIRECTION[this.#position.direction];
    this.#position.x = this.#position.x - delta.x;
    this.#position.y = this.#position.y - delta.y;
  }

  #turnLeft() {
    this.#position.direction = TURN_LEFT[this.#position.direction];
  }

  #turnRight() {
    this.#position.direction = TURN_RIGHT[this.#position.direction];
  }
};
