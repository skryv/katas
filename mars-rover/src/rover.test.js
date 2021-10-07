const Rover = require('./rover');

describe("rover", () => {

  it.each([
      [[], {x: 0, y: 0}, "N"],
      [["F"], {x: 0, y: 1}, "N"],
      [["F", "F"], {x: 0, y: 2}, "N"],
      [["B"], {x: 0, y: -1}, "N"],
      [["MUSTAFA"], {x: 0, y: 0}, "N"],
      [["L"], {x: 0, y: 0}, "W"],
      [["L", "F"], {x: -1, y: 0}, "W"],
      [["L", "L"], {x: 0, y: 0 }, "S"],
      [["L", "L", "L"], {x: 0, y: 0 }, "E"],
      [["L", "L", "L", "L"], {x: 0, y: 0 }, "N"],
      [["R"], {x: 0, y: 0 }, "E"],
      [["R", "R"], {x: 0, y: 0 }, "S"],
      [["R", "R", "R"], {x: 0, y: 0 }, "W"],
      [["R", "R", "R", "R"], {x: 0, y: 0 }, "N"],
    ])("Given [%s] -> (%o, %s)", (commands, coordinates, direction)=>{
    const rover = new Rover();
    rover.executeCommands(commands);

    expect(rover.getCoordinates()).toEqual(coordinates);
    expect(rover.getDirection()).toEqual(direction);
  })
});