import "mocha";
import { expect } from "chai";
import { FilterMapReduce, FilterMapAddReduce, FilterMapSubReduce } from "../src/ejercicio-1-pe.js";
 
describe("FilterMapReduce tests", () => {
  let filterMapAddReduce: FilterMapReduce;
  let filterMapSubReduce: FilterMapReduce;

  beforeEach(() => {
    filterMapAddReduce = new FilterMapAddReduce();
    filterMapSubReduce = new FilterMapSubReduce();
  });

  // it("debería aplicar filter, map y reduce para sumar números positivos", () => {
  //   const numbers = [1, -2, 3, -4, 5];
  //   const sumResult = filterMapAddReduce.executePipeline(numbers, filterMapAddReduce.defaultPredicate);
  //   expect(sumResult).to.equal(9); // Suma de 1 + 3 + 5
  // });

  // it("debería aplicar filter, map y reduce para restar números positivos", () => {
  //   const numbers = [1, -2, 3, -4, 5];
  //   const subResult = filterMapSubReduce.executePipeline(numbers, filterMapSubReduce.defaultPredicate);
  //   expect(subResult).to.equal(-9); // Resta de 1 + 3 + 5
  // });

  // it("debería aplicar filter y map sin reducción (suma)", () => {
  //   const numbers = [1, -2, 3, -4, 5];
  //   const mappedData = filterMapAddReduce.mapData(numbers, filterMapAddReduce.mapFunction);
  //   expect(mappedData).to.deep.equal([2, 6, 10]); // Mapeo de 1*2, 3*2, 5*2
  // });

  // it("debería aplicar filter y map sin reducción (resta)", () => {
  //   const numbers = [1, -2, 3, -4, 5];
  //   const mappedData = filterMapSubReduce.mapData(numbers, filterMapSubReduce.mapFunction);
  //   expect(mappedData).to.deep.equal([2, 6, 10]); // Mapeo de 1*2, 3*2, 5*2
  // });

  it("debería filtrar números positivos", () => {
    const numbers = [1, -2, 3, -4, 5];
    const filteredData = filterMapAddReduce.filterData(numbers, filterMapAddReduce.defaultPredicate);
    expect(filteredData).to.deep.equal([1, 3, 5]); // Números positivos
  });

  it("debería filtrar números negativos", () => {
    const numbers = [1, -2, 3, -4, 5];
    const filteredData = filterMapSubReduce.filterData(numbers, (num: number) => num < 0);
    expect(filteredData).to.deep.equal([-2, -4]); // Números negativos
  });
});
