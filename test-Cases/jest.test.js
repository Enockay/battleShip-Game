const operation  = require('../src/script.js');

/*test("return reduced length",()=>{
    expect(Ship.length(5)).toBe(4)
});*/

test ("ship shoot",()=>{
    expect(operation.shoot([1,2,3,4],3)).toBe([1,2,4]);
});

test ("length of ship",()=>{
    expect(operation.shipLength([],"AI")).toBe("AI,Ship Sunk Down")
})