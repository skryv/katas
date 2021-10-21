const Rover = require("./rover");

describe("rover", () => {
  // prettier-ignore
  it.each([
    [{x: 0, y: 0, direction: "N"}, [], {x: 0, y: 0, direction: "N"}],
    [{x: 0, y: 0, direction: "N"}, ["F"], {x: 0, y: 1, direction: "N"}],
    [{x: 0, y: -5, direction: "N"}, ["F", "F"], {x: 0, y: -3, direction: "N"}],
    [{x: 0, y: 0, direction: "N"}, ["B"], {x: 0, y: -1, direction: "N"}],
    [{x: 0, y: 0, direction: "N"}, ["MUSTAFA"], {x: 0, y: 0, direction: "N"}],
    [{x: 0, y: 0, direction: "N"}, ["L"], {x: 0, y: 0, direction: "W"}],
    [{x: 0, y: 3, direction: "N"}, ["L", "F"], {x: -1, y: 3, direction: "W"}],
    [{x: 0, y: 0, direction: "N"}, ["L", "L"], {x: 0, y: 0, direction: "S"}],
    [{x: 0, y: 0, direction: "N"}, ["L", "L", "L"], {x: 0, y: 0, direction: "E"}],
    [{x: 0, y: 0, direction: "N"}, ["L", "L", "L", "L"], {x: 0, y: 0, direction: "N"}],
    [{x: 0, y: 0, direction: "N"}, ["R"], {x: 0, y: 0, direction: "E"}],
    [{x: 0, y: 0, direction: "N"}, ["R", "R"], {x: 0, y: 0, direction: "S"}],
    [{x: 0, y: 0, direction: "N"}, ["R", "R", "R"], {x: 0, y: 0, direction: "W"}],
    [{x: 0, y: 0, direction: "S"}, ["R", "R", "R", "R"], {x: 0, y: 0, direction: "S"}],
    [{x: 1, y: 0, direction: "N"}, ["R", "F", "F", "L", "B", "L", "F"], {x: 2, y: -1, direction: "W"}],
  ])("Starting from %o, given commands [%s]\n -> (%o, %s)", (initialPosition, commands, expectedPosition) => {
    const rover = new Rover(initialPosition);
    rover.executeCommands(commands);
    expect(rover.getPosition()).toEqual(expectedPosition);
  });
});
